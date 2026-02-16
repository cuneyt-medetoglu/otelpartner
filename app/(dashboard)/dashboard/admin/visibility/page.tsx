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
    <div className="max-w-7xl space-y-6">
      <div className="flex flex-col gap-2">
        <Link
          href="/dashboard/admin"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-cyan-600"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Admin
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Otel görünürlük</h1>
      </div>
      <p className="text-sm text-gray-600">
        Katalogda listelensin: Evet ise otel rehberlere katalogda görünür. Hayır ise listede çıkmaz.
      </p>
      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
        {hotels.length === 0 ? (
          <p className="text-center text-gray-500">Henüz otel yok.</p>
        ) : (
          <div className="overflow-hidden rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Otel</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">Katalogda listele</th>
                </tr>
              </thead>
              <tbody>
                {hotels.map((h) => (
                  <tr key={h.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-900">{h.name}</td>
                    <td className="px-4 py-3 text-gray-600">{h.user.email}</td>
                    <td className="px-4 py-3 text-right">
                      <HotelListedToggle hotelId={h.id} listed={h.listed} />
                    </td>
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
