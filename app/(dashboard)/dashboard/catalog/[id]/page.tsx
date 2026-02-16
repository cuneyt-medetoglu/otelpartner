import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { AvailabilityCheck } from "./AvailabilityCheck";
import { BookForm } from "./BookForm";

export default async function CatalogHotelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if (session.user.role !== "guide" && session.user.role !== "admin") redirect("/dashboard");

  const { id } = await params;
  const hotel = await prisma.hotel.findFirst({
    where: { id, listed: true },
    include: { rooms: { orderBy: { roomType: "asc" } } },
  });
  if (!hotel) notFound();

  const amenities = Array.isArray(hotel.amenities) ? (hotel.amenities as string[]) : [];

  return (
    <div className="max-w-7xl space-y-8">
      <div className="flex flex-col gap-2">
        <Link
          href="/dashboard/catalog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-cyan-600"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Katalog
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
        {hotel.starRating != null && (
          <span className="inline-block rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 px-2 py-0.5 text-xs font-semibold text-white">
            {hotel.starRating} yıldız
          </span>
        )}
        {hotel.description && (
          <p className="mt-4 text-gray-600">{hotel.description}</p>
        )}
        <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          {hotel.address && (
            <p><span className="font-semibold text-gray-700">Adres:</span> <span className="text-gray-600">{hotel.address}</span></p>
          )}
          {hotel.city && (
            <p><span className="font-semibold text-gray-700">Şehir:</span> <span className="text-gray-600">{hotel.city}</span></p>
          )}
          {hotel.region && (
            <p><span className="font-semibold text-gray-700">Bölge:</span> <span className="text-gray-600">{hotel.region}</span></p>
          )}
          {hotel.phone && (
            <p><span className="font-semibold text-gray-700">Telefon:</span> <span className="text-gray-600">{hotel.phone}</span></p>
          )}
          {hotel.website && (
            <p>
              <span className="font-semibold text-gray-700">Web sitesi:</span>{" "}
              <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:text-cyan-600">
                {hotel.website}
              </a>
            </p>
          )}
        </div>
        {amenities.length > 0 && (
          <p className="mt-4 text-sm">
            <span className="font-semibold text-gray-700">Olanaklar:</span> <span className="text-gray-600">{amenities.join(", ")}</span>
          </p>
        )}

        <h2 className="mt-8 text-lg font-bold text-gray-900">Oda tipleri</h2>
        <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Tip</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Adet</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Fiyat</th>
              </tr>
            </thead>
            <tbody>
              {hotel.rooms.map((r) => (
                <tr key={r.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 text-gray-600">{r.roomType}</td>
                  <td className="px-4 py-3 text-gray-600">{r.totalCount}</td>
                  <td className="px-4 py-3 text-gray-600">{r.basePrice != null ? `${Number(r.basePrice)} ₺` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {hotel.rooms.length === 0 && <p className="p-4 text-gray-500">Oda tipi tanımlanmamış.</p>}
        </div>

        <AvailabilityCheck hotelId={hotel.id} />
        {session.user.role === "guide" && (
          <BookForm hotelId={hotel.id} rooms={hotel.rooms.map((r) => ({ id: r.id, roomType: r.roomType, totalCount: r.totalCount }))} />
        )}
      </div>
    </div>
  );
}
