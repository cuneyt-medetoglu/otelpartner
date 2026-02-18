import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { ReservationDetailActions } from "./ReservationDetailActions";
import { ReservationQRCard } from "./ReservationQRCard";

const statusLabels: Record<string, string> = {
  pending: "Bekliyor",
  approved: "Onaylandı",
  rejected: "Reddedildi",
  cancelled: "İptal edildi",
};

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-800",
};

export default async function ReservationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if (session.user.role !== "guide" && session.user.role !== "hotel") redirect("/dashboard");

  const { id } = await params;
  const res = await prisma.reservation.findUnique({
    where: { id },
    include: {
      hotel: { select: { name: true, city: true, region: true } },
      guide: true,
      room: { select: { roomType: true } },
    },
  });

  if (!res) notFound();

  if (session.user.role === "guide") {
    const guide = await prisma.guide.findUnique({ where: { userId: session.user.id } });
    if (!guide || res.guideId !== guide.id) notFound();
  } else {
    const hotel = await prisma.hotel.findUnique({ where: { userId: session.user.id } });
    if (!hotel || res.hotelId !== hotel.id) notFound();
  }

  const checkIn = res.checkInDate.toISOString().slice(0, 10);
  const checkOut = res.checkOutDate.toISOString().slice(0, 10);
  const createdAt = new Date(res.createdAt).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="max-w-7xl space-y-6">
      <div className="flex flex-col gap-2">
        <Link
          href="/dashboard/reservations"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-cyan-600"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {session.user.role === "guide" ? "Rezervasyonlarım" : "Rezervasyonlar"}
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Rezervasyon detayı</h1>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-sm font-semibold text-gray-500">{res.reservationCode}</p>
            <span className={`mt-1 inline-block rounded-md px-2 py-0.5 text-xs font-medium ${statusStyles[res.status] ?? "bg-gray-100 text-gray-800"}`}>
              {statusLabels[res.status] ?? res.status}
            </span>
          </div>
          <ReservationDetailActions reservationId={res.id} status={res.status} role={session.user.role!} />
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-semibold text-gray-500">Otel</dt>
            <dd className="mt-0.5 text-gray-900">{res.hotel.name}</dd>
            {(res.hotel.city || res.hotel.region) && (
              <dd className="text-sm text-gray-600">{[res.hotel.city, res.hotel.region].filter(Boolean).join(", ")}</dd>
            )}
          </div>
          {session.user.role === "hotel" && (
            <div>
              <dt className="text-sm font-semibold text-gray-500">Rehber</dt>
              <dd className="mt-0.5 text-gray-900">{res.guide.firstName} {res.guide.lastName}</dd>
            </div>
          )}
          <div>
            <dt className="text-sm font-semibold text-gray-500">Oda tipi</dt>
            <dd className="mt-0.5 text-gray-900">{res.room.roomType}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-gray-500">Giriş – Çıkış</dt>
            <dd className="mt-0.5 text-gray-900">{checkIn} – {checkOut}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-gray-500">Oda adedi</dt>
            <dd className="mt-0.5 text-gray-900">{res.roomCount}</dd>
          </div>
          {res.guestCount != null && (
            <div>
              <dt className="text-sm font-semibold text-gray-500">Misafir sayısı</dt>
              <dd className="mt-0.5 text-gray-900">{res.guestCount}</dd>
            </div>
          )}
          {res.totalPrice != null && (
            <div>
              <dt className="text-sm font-semibold text-gray-500">Toplam tutar</dt>
              <dd className="mt-0.5 text-gray-900">₺{Number(res.totalPrice)}</dd>
            </div>
          )}
          <div>
            <dt className="text-sm font-semibold text-gray-500">Oluşturulma</dt>
            <dd className="mt-0.5 text-gray-600">{createdAt}</dd>
          </div>
          {res.status === "rejected" && res.rejectionReason && (
            <div className="sm:col-span-2">
              <dt className="text-sm font-semibold text-gray-500">Red gerekçesi</dt>
              <dd className="mt-0.5 text-red-700">{res.rejectionReason}</dd>
            </div>
          )}
        </dl>
      </div>

      <ReservationQRCard reservationId={res.id} reservationCode={res.reservationCode} />
    </div>
  );
}
