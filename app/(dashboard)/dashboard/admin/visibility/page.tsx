import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { HotelListedToggle } from "./HotelListedToggle";

export default async function VisibilityPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/dashboard");

  const hotels = await prisma.hotel.findMany({
    include: { user: { select: { email: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <Link href="/dashboard/admin" className="text-sm text-blue-600 hover:underline">
          ← Admin
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">Otel görünürlük</h1>
      </div>
      <p className="mb-3 text-sm text-gray-600">
        Katalogda listelensin: Evet ise otel rehberlere katalogda görünür (Faz 5). Hayır ise listede çıkmaz.
      </p>
      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-500">Otel</th>
              <th className="px-4 py-2 text-left font-medium text-gray-500">Email</th>
              <th className="px-4 py-2 text-right font-medium text-gray-500">Katalogda listele</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {hotels.map((h) => (
              <tr key={h.id}>
                <td className="px-4 py-3 font-medium text-gray-900">{h.name}</td>
                <td className="px-4 py-3 text-gray-600">{h.user.email}</td>
                <td className="px-4 py-3 text-right">
                  <HotelListedToggle hotelId={h.id} listed={h.listed} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {hotels.length === 0 && <p className="p-4 text-gray-500">Henüz otel yok.</p>}
      </div>
    </div>
  );
}
