import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== "guide" && session.user.role !== "admin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const hotel = await prisma.hotel.findFirst({
    where: { id, listed: true },
    include: {
      rooms: { orderBy: { roomType: "asc" } },
    },
  });
  if (!hotel) return NextResponse.json({ error: "Otel bulunamadı" }, { status: 404 });

  return NextResponse.json({
    id: hotel.id,
    name: hotel.name,
    description: hotel.description,
    address: hotel.address,
    city: hotel.city,
    region: hotel.region,
    country: hotel.country,
    starRating: hotel.starRating,
    phone: hotel.phone,
    website: hotel.website,
    amenities: hotel.amenities,
    rooms: hotel.rooms.map((r) => ({
      id: r.id,
      roomType: r.roomType,
      totalCount: r.totalCount,
      basePrice: r.basePrice != null ? Number(r.basePrice) : null,
    })),
  });
}
