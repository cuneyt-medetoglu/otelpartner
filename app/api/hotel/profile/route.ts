import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  region: z.string().nullable().optional(),
  country: z.string().min(1).optional(),
  starRating: z.number().int().min(1).max(5).nullable().optional(),
  phone: z.string().nullable().optional(),
  website: z.string().url().nullable().optional(),
  amenities: z.array(z.string()).nullable().optional(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "hotel") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const hotel = await prisma.hotel.findUnique({
    where: { userId: session.user.id },
  });
  if (!hotel) return NextResponse.json({ error: "Otel bulunamadı" }, { status: 404 });

  const { createdAt, updatedAt, ...rest } = hotel;
  return NextResponse.json({
    ...rest,
    starRating: hotel.starRating ?? null,
    amenities: (hotel.amenities as string[] | null) ?? null,
    latitude: hotel.latitude != null ? Number(hotel.latitude) : null,
    longitude: hotel.longitude != null ? Number(hotel.longitude) : null,
  });
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "hotel") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON" }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    const msg = parsed.error.errors.map((e) => e.message).join("; ") || "Geçersiz veri";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const hotel = await prisma.hotel.findUnique({
    where: { userId: session.user.id },
  });
  if (!hotel) return NextResponse.json({ error: "Otel bulunamadı" }, { status: 404 });

  const d = parsed.data;
  const data: Prisma.HotelUpdateInput = {};
  if (d.name != null) data.name = d.name;
  if (d.description !== undefined) data.description = d.description;
  if (d.address !== undefined) data.address = d.address;
  if (d.city !== undefined) data.city = d.city;
  if (d.region !== undefined) data.region = d.region;
  if (d.country != null) data.country = d.country;
  if (d.starRating !== undefined) data.starRating = d.starRating;
  if (d.phone !== undefined) data.phone = d.phone;
  if (d.website !== undefined) data.website = d.website;
  if (d.amenities !== undefined) data.amenities = d.amenities === null ? Prisma.JsonNull : d.amenities;
  if (d.latitude !== undefined) data.latitude = d.latitude;
  if (d.longitude !== undefined) data.longitude = d.longitude;

  const updated = await prisma.hotel.update({
    where: { id: hotel.id },
    data,
  });

  const { createdAt, updatedAt, ...rest } = updated;
  return NextResponse.json({
    ...rest,
    starRating: updated.starRating ?? null,
    amenities: (updated.amenities as string[] | null) ?? null,
    latitude: updated.latitude != null ? Number(updated.latitude) : null,
    longitude: updated.longitude != null ? Number(updated.longitude) : null,
  });
}
