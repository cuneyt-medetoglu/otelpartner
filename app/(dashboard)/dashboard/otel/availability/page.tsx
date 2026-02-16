import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { AvailabilityForm } from "./AvailabilityForm";

export default async function AvailabilityPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "hotel") redirect("/dashboard");

  const hotel = await prisma.hotel.findUnique({
    where: { userId: session.user.id },
    include: { rooms: true },
  });
  if (!hotel) redirect("/dashboard");

  const list = await prisma.roomAvailability.findMany({
    where: { room: { hotelId: hotel.id } },
    include: { room: true },
    orderBy: [{ date: "asc" }],
    take: 100,
  });

  const rooms = hotel.rooms.map((r) => ({ id: r.id, roomType: r.roomType, totalCount: r.totalCount }));
  const availability = list.map((a) => ({
    id: a.id,
    roomId: a.roomId,
    roomType: a.room.roomType,
    date: a.date.toISOString().slice(0, 10),
    availableCount: a.availableCount,
  }));

  return (
    <div className="max-w-7xl space-y-6">
      <div className="flex flex-col gap-2">
        <Link
          href="/dashboard/otel/rooms"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-cyan-600"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Oda tipleri
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Doluluk</h1>
      </div>
      <AvailabilityForm rooms={rooms} initialList={availability} />
    </div>
  );
}
