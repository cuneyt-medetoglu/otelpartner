import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { AvailabilityCheck } from "./AvailabilityCheck";

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
    <div>
      <div className="mb-4 flex items-center gap-4">
        <Link href="/dashboard/catalog" className="text-sm text-blue-600 hover:underline">
          ← Katalog
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">{hotel.name}</h1>
      </div>
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        {hotel.starRating != null && (
          <p className="text-sm text-gray-600">{hotel.starRating} yıldız</p>
        )}
        {hotel.description && (
          <p className="mt-2 text-gray-700">{hotel.description}</p>
        )}
        <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          {hotel.address && <p><span className="font-medium text-gray-500">Adres:</span> {hotel.address}</p>}
          {hotel.city && <p><span className="font-medium text-gray-500">Şehir:</span> {hotel.city}</p>}
          {hotel.region && <p><span className="font-medium text-gray-500">Bölge:</span> {hotel.region}</p>}
          {hotel.phone && <p><span className="font-medium text-gray-500">Telefon:</span> {hotel.phone}</p>}
          {hotel.website && (
            <p>
              <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Web sitesi
              </a>
            </p>
          )}
        </div>
        {amenities.length > 0 && (
          <p className="mt-3 text-sm text-gray-600">
            <span className="font-medium text-gray-500">Olanaklar:</span> {amenities.join(", ")}
          </p>
        )}
        <h2 className="mt-6 font-medium text-gray-900">Oda tipleri</h2>
        <div className="mt-2 overflow-hidden rounded border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-gray-500">Tip</th>
                <th className="px-3 py-2 text-left font-medium text-gray-500">Adet</th>
                <th className="px-3 py-2 text-left font-medium text-gray-500">Fiyat</th>
              </tr>
            </thead>
            <tbody>
              {hotel.rooms.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-3 py-2">{r.roomType}</td>
                  <td className="px-3 py-2">{r.totalCount}</td>
                  <td className="px-3 py-2">{r.basePrice != null ? `${Number(r.basePrice)} ₺` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {hotel.rooms.length === 0 && <p className="p-4 text-gray-500">Oda tipi tanımlanmamış.</p>}
        </div>
        <AvailabilityCheck hotelId={hotel.id} />
      </div>
    </div>
  );
}
