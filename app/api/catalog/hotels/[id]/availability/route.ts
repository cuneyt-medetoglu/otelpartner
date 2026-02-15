import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== "guide" && session.user.role !== "admin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id: hotelId } = await params;
  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get("date");
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return NextResponse.json({ error: "date (YYYY-MM-DD) gerekli" }, { status: 400 });
  }
  const date = new Date(dateStr + "T00:00:00Z");

  const hotel = await prisma.hotel.findFirst({
    where: { id: hotelId, listed: true },
    include: { rooms: { orderBy: { roomType: "asc" } } },
  });
  if (!hotel) return NextResponse.json({ error: "Otel bulunamadı" }, { status: 404 });

  const roomIds = hotel.rooms.map((r) => r.id);
  const availability = await prisma.roomAvailability.findMany({
    where: { roomId: { in: roomIds }, date },
  });
  const map = new Map(availability.map((a) => [a.roomId, a.availableCount]));

  const list = hotel.rooms.map((r) => ({
    roomId: r.id,
    roomType: r.roomType,
    totalCount: r.totalCount,
    availableCount: map.get(r.id) ?? null,
  }));

  return NextResponse.json({ date: dateStr, rooms: list });
}
