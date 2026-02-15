import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const postSchema = z.object({
  roomType: z.string().min(1),
  totalCount: z.number().int().min(1),
  basePrice: z.number().min(0).nullable().optional(),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "hotel") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const hotel = await prisma.hotel.findUnique({ where: { userId: session.user.id } });
  if (!hotel) return NextResponse.json({ error: "Otel bulunamadı" }, { status: 404 });

  const rooms = await prisma.room.findMany({
    where: { hotelId: hotel.id },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(
    rooms.map((r) => ({
      id: r.id,
      roomType: r.roomType,
      totalCount: r.totalCount,
      basePrice: r.basePrice != null ? Number(r.basePrice) : null,
    }))
  );
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "hotel") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const hotel = await prisma.hotel.findUnique({ where: { userId: session.user.id } });
  if (!hotel) return NextResponse.json({ error: "Otel bulunamadı" }, { status: 404 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON" }, { status: 400 });
  }
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "roomType ve totalCount gerekli" }, { status: 400 });
  }

  const room = await prisma.room.create({
    data: {
      hotelId: hotel.id,
      roomType: parsed.data.roomType,
      totalCount: parsed.data.totalCount,
      basePrice: parsed.data.basePrice ?? undefined,
    },
  });
  return NextResponse.json({
    id: room.id,
    roomType: room.roomType,
    totalCount: room.totalCount,
    basePrice: room.basePrice != null ? Number(room.basePrice) : null,
  });
}
