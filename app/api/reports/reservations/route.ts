import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const COMMISSION_RATE = (Number(process.env.COMMISSION_RATE_PERCENT) || 10) / 100;
const TODAY_END = new Date();
TODAY_END.setHours(23, 59, 59, 999);

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.user.role !== "guide" && session.user.role !== "hotel") {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get("startDate") ?? undefined;
  const endDate = searchParams.get("endDate") ?? undefined;
  const status = searchParams.get("status") ?? undefined;

  const dateFilter: { checkInDate?: { gte?: Date; lte?: Date } } = {};
  if (startDate) dateFilter.checkInDate = { ...dateFilter.checkInDate, gte: new Date(startDate + "T00:00:00Z") };
  if (endDate) dateFilter.checkInDate = { ...dateFilter.checkInDate, lte: new Date(endDate + "T23:59:59Z") };

  const statusFilter = status && ["pending", "approved", "rejected", "cancelled"].includes(status) ? { status: status as "pending" | "approved" | "rejected" | "cancelled" } : {};

  if (session.user.role === "guide") {
    const guide = await prisma.guide.findUnique({ where: { userId: session.user.id } });
    if (!guide) return NextResponse.json({ list: [], summary: { count: 0, totalPriceSum: 0, completedCount: 0, commissionSum: 0 } });

    const rows = await prisma.reservation.findMany({
      where: { guideId: guide.id, ...dateFilter, ...statusFilter },
      include: { hotel: { select: { name: true } }, room: { select: { roomType: true } } },
      orderBy: { checkInDate: "desc" },
      take: 500,
    });

    const list = rows.map((r) => ({
      id: r.id,
      reservationCode: r.reservationCode,
      hotelName: r.hotel.name,
      roomType: r.room.roomType,
      checkInDate: r.checkInDate.toISOString().slice(0, 10),
      checkOutDate: r.checkOutDate.toISOString().slice(0, 10),
      roomCount: r.roomCount,
      status: r.status,
      totalPrice: r.totalPrice != null ? Number(r.totalPrice) : null,
    }));

    const totalPriceSum = list.reduce((s, r) => s + (r.totalPrice ?? 0), 0);
    const completed = list.filter((r) => r.status === "approved" && r.checkOutDate <= TODAY_END.toISOString().slice(0, 10));
    const completedCount = completed.length;
    const commissionSum = completed.reduce((s, r) => s + (r.totalPrice ?? 0) * COMMISSION_RATE, 0);

    return NextResponse.json({
      list,
      summary: { count: list.length, totalPriceSum, completedCount, commissionSum: Math.round(commissionSum * 100) / 100 },
    });
  }

  const hotel = await prisma.hotel.findUnique({ where: { userId: session.user.id } });
  if (!hotel) return NextResponse.json({ list: [], summary: { count: 0, totalPriceSum: 0, completedCount: 0, commissionSum: 0 } });

  const rows = await prisma.reservation.findMany({
    where: { hotelId: hotel.id, ...dateFilter, ...statusFilter },
    include: { guide: true, room: { select: { roomType: true } } },
    orderBy: { checkInDate: "desc" },
    take: 500,
  });

  const list = rows.map((r) => ({
    id: r.id,
    reservationCode: r.reservationCode,
    guideName: `${r.guide.firstName} ${r.guide.lastName}`,
    roomType: r.room.roomType,
    checkInDate: r.checkInDate.toISOString().slice(0, 10),
    checkOutDate: r.checkOutDate.toISOString().slice(0, 10),
    roomCount: r.roomCount,
    status: r.status,
    totalPrice: r.totalPrice != null ? Number(r.totalPrice) : null,
  }));

  const totalPriceSum = list.reduce((s, r) => s + (r.totalPrice ?? 0), 0);
  const completed = list.filter((r) => r.status === "approved" && r.checkOutDate <= TODAY_END.toISOString().slice(0, 10));
  const completedCount = completed.length;
  const commissionSum = completed.reduce((s, r) => s + (r.totalPrice ?? 0) * COMMISSION_RATE, 0);

  return NextResponse.json({
    list,
    summary: { count: list.length, totalPriceSum, completedCount, commissionSum: Math.round(commissionSum * 100) / 100 },
  });
}
