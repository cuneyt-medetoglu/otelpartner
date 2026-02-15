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
    <div>
      <div className="mb-4 flex items-center gap-4">
        <Link href="/dashboard/otel/rooms" className="text-sm text-blue-600 hover:underline">
          ← Oda tipleri
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">Doluluk / Müsaitlik</h1>
      </div>
      <AvailabilityForm rooms={rooms} initialList={availability} />
    </div>
  );
}
