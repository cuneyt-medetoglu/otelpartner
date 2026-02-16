import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { PendingUserActions } from "./PendingUserActions";
import { AllUsersSection } from "./AllUsersSection";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/dashboard");

  const [pending, pendingCount, activeHotels, activeGuides, suspendedCount] = await Promise.all([
    prisma.user.findMany({
      where: { status: "pending" },
      include: { hotel: true, guide: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where: { status: "pending" } }),
    prisma.user.count({ where: { role: "hotel", status: "active" } }),
    prisma.user.count({ where: { role: "guide", status: "active" } }),
    prisma.user.count({ where: { status: "suspended" } }),
  ]);

  return (
    <div className="max-w-7xl space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-cyan-600"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Dashboard
          </Link>
          <Link
            href="/dashboard/admin/visibility"
            className="text-sm font-semibold text-blue-600 transition-colors hover:text-cyan-600"
          >
            Otel görünürlük
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Admin paneli</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
          <p className="text-sm font-medium text-gray-500">Bekleyen</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{pendingCount}</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
          <p className="text-sm font-medium text-gray-500">Aktif otel</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{activeHotels}</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
          <p className="text-sm font-medium text-gray-500">Aktif rehber</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{activeGuides}</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
          <p className="text-sm font-medium text-gray-500">Askıda</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{suspendedCount}</p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Bekleyen kayıtlar</h2>
        {pending.length === 0 ? (
          <p className="text-center text-gray-500">Bekleyen kayıt yok.</p>
        ) : (
          <div className="overflow-hidden rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Rol</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Detay</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Tarih</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((u) => (
                  <tr key={u.id} className="border-t border-gray-100">
                    <td className="whitespace-nowrap px-4 py-3 text-gray-900">{u.email}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-600">{u.role}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {u.hotel ? u.hotel.name : u.guide ? `${u.guide.firstName} ${u.guide.lastName}` : "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                      {new Date(u.createdAt).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <PendingUserActions userId={u.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AllUsersSection />
    </div>
  );
}
