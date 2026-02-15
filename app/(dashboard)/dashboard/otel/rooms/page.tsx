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
    <div>
      <div className="mb-4 flex items-center gap-4">
        <Link href="/dashboard/otel/profile" className="text-sm text-blue-600 hover:underline">
          ← Profil
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">Oda tipleri</h1>
      </div>
      <RoomList initialRooms={rooms} />
    </div>
  );
}
