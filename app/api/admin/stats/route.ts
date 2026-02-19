import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "admin") {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
  }

  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const [
    pendingCount,
    activeHotels,
    activeGuides,
    suspendedCount,
    totalReservations,
    reservationsByStatus,
    hotelsCount,
    listedHotelsCount,
    thisMonthReservations,
    recentReservations,
    reservationsLast6Months,
  ] = await Promise.all([
    prisma.user.count({ where: { status: "pending" } }),
    prisma.user.count({ where: { role: "hotel", status: "active" } }),
    prisma.user.count({ where: { role: "guide", status: "active" } }),
    prisma.user.count({ where: { status: "suspended" } }),
    prisma.reservation.count(),
    prisma.reservation.groupBy({
      by: ["status"],
      _count: { id: true },
    }),
    prisma.hotel.count(),
    prisma.hotel.count({ where: { listed: true } }),
    prisma.reservation.count({
      where: {
        createdAt: { gte: new Date(now.getFullYear(), now.getMonth(), 1) },
      },
    }),
    prisma.reservation.findMany({
      take: 15,
      orderBy: { createdAt: "desc" },
      include: {
        hotel: { select: { name: true } },
        guide: true,
        room: { select: { roomType: true } },
      },
    }),
    prisma.reservation.findMany({
      where: { createdAt: { gte: sixMonthsAgo } },
      select: { createdAt: true },
    }),
  ]);

  const byStatus: Record<string, number> = {};
  reservationsByStatus.forEach((r) => { byStatus[r.status] = r._count.id; });

  const byMonth: { month: string; count: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const count = reservationsLast6Months.filter(
      (r) => r.createdAt.getFullYear() === d.getFullYear() && r.createdAt.getMonth() === d.getMonth()
    ).length;
    byMonth.push({ month: key, count });
  }

  const recent = recentReservations.map((r) => ({
    id: r.id,
    reservationCode: r.reservationCode,
    hotelName: r.hotel.name,
    guideName: `${r.guide.firstName} ${r.guide.lastName}`,
    roomType: r.room.roomType,
    status: r.status,
    createdAt: r.createdAt.toISOString(),
  }));

  return NextResponse.json({
    pendingCount,
    activeHotels,
    activeGuides,
    suspendedCount,
    totalReservations,
    reservationsByStatus: byStatus,
    hotelsCount,
    listedHotelsCount,
    thisMonthReservations,
    reservationsByMonth: byMonth,
    recentReservations: recent,
  });
}
