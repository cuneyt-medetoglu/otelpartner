import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { ReservationActions } from "./ReservationActions";

export default async function ReservationsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if (session.user.role !== "guide" && session.user.role !== "hotel") redirect("/dashboard");

  let list: { id: string; reservationCode: string; hotelName?: string; guideName?: string; roomType: string; checkInDate: string; checkOutDate: string; roomCount: number; status: string }[];

  if (session.user.role === "guide") {
    const guide = await prisma.guide.findUnique({ where: { userId: session.user.id } });
    const rows = guide
      ? await prisma.reservation.findMany({
          where: { guideId: guide.id },
          include: { hotel: { select: { name: true } }, room: { select: { roomType: true } } },
          orderBy: { checkInDate: "desc" },
        })
      : [];
    list = rows.map((r) => ({
      id: r.id,
      reservationCode: r.reservationCode,
      hotelName: r.hotel.name,
      roomType: r.room.roomType,
      checkInDate: r.checkInDate.toISOString().slice(0, 10),
      checkOutDate: r.checkOutDate.toISOString().slice(0, 10),
      roomCount: r.roomCount,
      status: r.status,
    }));
  } else {
    const hotel = await prisma.hotel.findUnique({ where: { userId: session.user.id } });
    const rows = hotel
      ? await prisma.reservation.findMany({
          where: { hotelId: hotel.id },
          include: { guide: true, room: { select: { roomType: true } } },
          orderBy: { checkInDate: "desc" },
        })
      : [];
    list = rows.map((r) => ({
      id: r.id,
      reservationCode: r.reservationCode,
      guideName: `${r.guide.firstName} ${r.guide.lastName}`,
      roomType: r.room.roomType,
      checkInDate: r.checkInDate.toISOString().slice(0, 10),
      checkOutDate: r.checkOutDate.toISOString().slice(0, 10),
      roomCount: r.roomCount,
      status: r.status,
    }));
  }
  const reservations = list;

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
          ← Dashboard
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">Rezervasyonlarım</h1>
      </div>
      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-gray-500">Kod</th>
              {session.user.role === "guide" ? (
                <th className="px-3 py-2 text-left font-medium text-gray-500">Otel</th>
              ) : (
                <th className="px-3 py-2 text-left font-medium text-gray-500">Rehber</th>
              )}
              <th className="px-3 py-2 text-left font-medium text-gray-500">Oda</th>
              <th className="px-3 py-2 text-left font-medium text-gray-500">Giriş</th>
              <th className="px-3 py-2 text-left font-medium text-gray-500">Çıkış</th>
              <th className="px-3 py-2 text-left font-medium text-gray-500">Adet</th>
              <th className="px-3 py-2 text-left font-medium text-gray-500">Durum</th>
              {session.user.role === "hotel" && (
                <th className="px-3 py-2 text-right font-medium text-gray-500">İşlem</th>
              )}
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-3 py-2 font-mono text-xs">{r.reservationCode}</td>
                <td className="px-3 py-2">{r.hotelName ?? r.guideName ?? "—"}</td>
                <td className="px-3 py-2">{r.roomType}</td>
                <td className="px-3 py-2">{r.checkInDate}</td>
                <td className="px-3 py-2">{r.checkOutDate}</td>
                <td className="px-3 py-2">{r.roomCount}</td>
                <td className="px-3 py-2">{r.status}</td>
                {session.user.role === "hotel" && (
                  <td className="px-3 py-2 text-right">
                    <ReservationActions reservationId={r.id} status={r.status} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {reservations.length === 0 && <p className="p-4 text-gray-500">Rezervasyon yok.</p>}
      </div>
    </div>
  );
}
