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

  function getStatusBadge(status: string) {
    const statusMap: Record<string, { bg: string; text: string; label: string }> = {
      pending: { bg: "bg-amber-100", text: "text-amber-800", label: "Bekliyor" },
      approved: { bg: "bg-green-100", text: "text-green-800", label: "Onaylandı" },
      rejected: { bg: "bg-red-100", text: "text-red-800", label: "Reddedildi" },
      cancelled: { bg: "bg-gray-100", text: "text-gray-800", label: "İptal edildi" },
    };
    const info = statusMap[status] ?? { bg: "bg-gray-100", text: "text-gray-800", label: status };
    return (
      <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-medium ${info.bg} ${info.text}`}>
        {info.label}
      </span>
    );
  }

  return (
    <div className="max-w-7xl space-y-6">
      <div className="flex flex-col gap-2">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-cyan-600"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          {session.user.role === "guide" ? "Rezervasyonlarım" : "Rezervasyonlar"}
        </h1>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
        {reservations.length === 0 ? (
          <p className="text-center text-gray-500">Rezervasyon yok.</p>
        ) : (
          <div className="overflow-hidden rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Kod</th>
                  {session.user.role === "guide" ? (
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Otel</th>
                  ) : (
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Rehber</th>
                  )}
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Oda</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Giriş</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Çıkış</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Adet</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Durum</th>
                  {session.user.role === "hotel" && (
                    <th className="px-4 py-3 text-right font-semibold text-gray-700">İşlem</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr key={r.id} className="border-t border-gray-100">
                    <td className="px-4 py-3">
                      <Link href={`/dashboard/reservations/${r.id}`} className="font-mono text-xs text-blue-600 hover:text-cyan-600 hover:underline">
                        {r.reservationCode}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{r.hotelName ?? r.guideName ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{r.roomType}</td>
                    <td className="px-4 py-3 text-gray-600">{r.checkInDate}</td>
                    <td className="px-4 py-3 text-gray-600">{r.checkOutDate}</td>
                    <td className="px-4 py-3 text-gray-600">{r.roomCount}</td>
                    <td className="px-4 py-3">{getStatusBadge(r.status)}</td>
                    {session.user.role === "hotel" && (
                      <td className="px-4 py-3 text-right">
                        <ReservationActions reservationId={r.id} status={r.status} />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
