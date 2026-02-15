import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const postSchema = z.object({
  roomId: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  availableCount: z.number().int().min(0),
});

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "hotel") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const hotel = await prisma.hotel.findUnique({ where: { userId: session.user.id }, include: { rooms: true } });
  if (!hotel) return NextResponse.json({ error: "Otel bulunamadı" }, { status: 404 });

  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");
  const roomIds = roomId ? [roomId] : hotel.rooms.map((r) => r.id);
  const validIds = roomIds.filter((id) => hotel.rooms.some((r) => r.id === id));

  const list = await prisma.roomAvailability.findMany({
    where: { roomId: { in: validIds } },
    orderBy: [{ date: "asc" }],
  });
  return NextResponse.json(
    list.map((a) => ({
      id: a.id,
      roomId: a.roomId,
      date: a.date.toISOString().slice(0, 10),
      availableCount: a.availableCount,
    }))
  );
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "hotel") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const hotel = await prisma.hotel.findUnique({ where: { userId: session.user.id }, include: { rooms: true } });
  if (!hotel) return NextResponse.json({ error: "Otel bulunamadı" }, { status: 404 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON" }, { status: 400 });
  }
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "roomId, date (YYYY-MM-DD), availableCount gerekli" }, { status: 400 });
  }
  const d = parsed.data;
  const room = hotel.rooms.find((r) => r.id === d.roomId);
  if (!room) return NextResponse.json({ error: "Oda bulunamadı" }, { status: 404 });
  if (d.availableCount > room.totalCount) {
    return NextResponse.json({ error: "Müsait adet oda sayısından fazla olamaz" }, { status: 400 });
  }

  const date = new Date(d.date + "T00:00:00Z");
  const a = await prisma.roomAvailability.upsert({
    where: { roomId_date: { roomId: d.roomId, date } },
    create: { roomId: d.roomId, date, availableCount: d.availableCount },
    update: { availableCount: d.availableCount },
  });
  return NextResponse.json({
    id: a.id,
    roomId: a.roomId,
    date: a.date.toISOString().slice(0, 10),
    availableCount: a.availableCount,
  });
}
