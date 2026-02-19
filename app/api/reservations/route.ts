import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

function generateCode() {
  return "OP-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();
}

const createSchema = z.object({
  hotelId: z.string(),
  roomId: z.string(),
  checkInDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOutDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  roomCount: z.number().int().min(1),
  guestCount: z.number().int().min(1).optional(),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (session.user.role === "guide") {
    const guide = await prisma.guide.findUnique({ where: { userId: session.user.id } });
    if (!guide) return NextResponse.json({ reservations: [] });
    const list = await prisma.reservation.findMany({
      where: { guideId: guide.id },
      include: { hotel: { select: { name: true } }, room: { select: { roomType: true } } },
      orderBy: { checkInDate: "desc" },
    });
    return NextResponse.json(list.map((r) => ({
      id: r.id,
      reservationCode: r.reservationCode,
      hotelName: r.hotel.name,
      roomType: r.room.roomType,
      checkInDate: r.checkInDate.toISOString().slice(0, 10),
      checkOutDate: r.checkOutDate.toISOString().slice(0, 10),
      roomCount: r.roomCount,
      status: r.status,
    })));
  }

  if (session.user.role === "hotel") {
    const hotel = await prisma.hotel.findUnique({ where: { userId: session.user.id } });
    if (!hotel) return NextResponse.json({ reservations: [] });
    const list = await prisma.reservation.findMany({
      where: { hotelId: hotel.id },
      include: { guide: true, room: { select: { roomType: true } } },
      orderBy: { checkInDate: "desc" },
    });
    return NextResponse.json(list.map((r) => ({
      id: r.id,
      reservationCode: r.reservationCode,
      guideName: `${r.guide.firstName} ${r.guide.lastName}`,
      roomType: r.room.roomType,
      checkInDate: r.checkInDate.toISOString().slice(0, 10),
      checkOutDate: r.checkOutDate.toISOString().slice(0, 10),
      roomCount: r.roomCount,
      status: r.status,
    })));
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "guide") {
    return NextResponse.json({ error: "Sadece rehber rezervasyon oluşturabilir" }, { status: 403 });
  }

  const guide = await prisma.guide.findUnique({ where: { userId: session.user.id } });
  if (!guide) return NextResponse.json({ error: "Rehber bulunamadı" }, { status: 404 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON" }, { status: 400 });
  }
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz alanlar" }, { status: 400 });
  }

  const { hotelId, roomId, checkInDate, checkOutDate, roomCount, guestCount } = parsed.data;
  const checkIn = new Date(checkInDate + "T00:00:00Z");
  const checkOut = new Date(checkOutDate + "T00:00:00Z");
  if (checkOut <= checkIn) {
    return NextResponse.json({ error: "Çıkış tarihi girişten sonra olmalı" }, { status: 400 });
  }

  const room = await prisma.room.findFirst({
    where: { id: roomId, hotelId },
    include: { hotel: true },
  });
  if (!room || !room.hotel.listed) {
    return NextResponse.json({ error: "Oda bulunamadı veya otel katalogda değil" }, { status: 404 });
  }
  if (roomCount > room.totalCount) {
    return NextResponse.json({ error: "Oda sayısı yetersiz" }, { status: 400 });
  }

  const totalPrice = room.basePrice != null ? Number(room.basePrice) * roomCount * (Math.ceil((checkOut.getTime() - checkIn.getTime()) / (24 * 60 * 60 * 1000))) : null;
  let code = generateCode();
  while (await prisma.reservation.findUnique({ where: { reservationCode: code } })) {
    code = generateCode();
  }

  const res = await prisma.reservation.create({
    data: {
      reservationCode: code,
      guideId: guide.id,
      hotelId,
      roomId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      roomCount,
      guestCount: guestCount ?? null,
      totalPrice: totalPrice ?? undefined,
      status: "pending",
    },
  });

  // Bildirim: otel kullanıcısına yeni rezervasyon (e-posta + uygulama içi)
  try {
    const hotelWithUser = await prisma.hotel.findUnique({
      where: { id: hotelId },
      include: { user: { select: { id: true, email: true } } },
    });
    if (hotelWithUser?.user) {
      const { notifyNewReservation } = await import("@/lib/notifications");
      await notifyNewReservation({
        hotelUserId: hotelWithUser.user.id,
        hotelUserEmail: hotelWithUser.user.email,
        reservationCode: res.reservationCode,
        guideName: `${guide.firstName} ${guide.lastName}`,
        roomType: room.roomType,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        reservationId: res.id,
      });
    }
  } catch (e) {
    console.error("notifyNewReservation error:", e);
  }

  return NextResponse.json({
    id: res.id,
    reservationCode: res.reservationCode,
    status: res.status,
  });
}
