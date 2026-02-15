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
    <div>
      <div className="mb-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
          ← Dashboard
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">Admin paneli</h1>
        <Link href="/dashboard/admin/visibility" className="text-sm text-blue-600 hover:underline">
          Otel görünürlük
        </Link>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
          <p className="text-xs font-medium text-gray-500">Bekleyen</p>
          <p className="text-xl font-semibold text-gray-900">{pendingCount}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
          <p className="text-xs font-medium text-gray-500">Aktif otel</p>
          <p className="text-xl font-semibold text-gray-900">{activeHotels}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
          <p className="text-xs font-medium text-gray-500">Aktif rehber</p>
          <p className="text-xl font-semibold text-gray-900">{activeGuides}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
          <p className="text-xs font-medium text-gray-500">Askıda</p>
          <p className="text-xl font-semibold text-gray-900">{suspendedCount}</p>
        </div>
      </div>

      <h2 className="mb-3 text-lg font-semibold text-gray-900">Bekleyen kayıtlar</h2>
      {pending.length === 0 ? (
        <p className="text-gray-500">Bekleyen kayıt yok.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Email</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Rol</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Detay</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Tarih</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {pending.map((u) => (
                <tr key={u.id}>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">{u.email}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">{u.role}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {u.hotel ? u.hotel.name : u.guide ? `${u.guide.firstName} ${u.guide.lastName}` : "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
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

      <AllUsersSection />
    </div>
  );
}
