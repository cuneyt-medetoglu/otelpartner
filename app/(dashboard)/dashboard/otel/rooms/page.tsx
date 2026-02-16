import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { RoomList } from "./RoomList";

export default async function OtelRoomsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "hotel") redirect("/dashboard");

  const hotel = await prisma.hotel.findUnique({ where: { userId: session.user.id } });
  if (!hotel) redirect("/dashboard");

  const rows = await prisma.room.findMany({
    where: { hotelId: hotel.id },
    orderBy: { createdAt: "asc" },
  });
  const rooms = rows.map((r) => ({
    id: r.id,
    roomType: r.roomType,
    totalCount: r.totalCount,
    basePrice: r.basePrice != null ? Number(r.basePrice) : null,
  }));

  return (
    <div className="max-w-7xl space-y-6">
      <div className="flex flex-col gap-2">
        <Link
          href="/dashboard/otel/profile"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-cyan-600"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Profil
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Oda tipleri</h1>
      </div>
      <RoomList initialRooms={rooms} />
    </div>
  );
}
