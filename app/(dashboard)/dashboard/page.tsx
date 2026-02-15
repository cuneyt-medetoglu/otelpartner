import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Hoş geldiniz, {session.user.email}. Rol: <strong>{session.user.role}</strong>
      </p>
      {session.user.role === "admin" && (
        <p className="mt-3">
          <Link href="/dashboard/admin" className="text-blue-600 hover:underline">
            Admin – Bekleyen kayıtlar →
          </Link>
        </p>
      )}
      {session.user.role === "hotel" && (
        <p className="mt-3 flex flex-wrap gap-4">
          <Link href="/dashboard/otel/profile" className="text-blue-600 hover:underline">
            Otel profilim
          </Link>
          <Link href="/dashboard/otel/rooms" className="text-blue-600 hover:underline">
            Oda tipleri
          </Link>
          <Link href="/dashboard/otel/availability" className="text-blue-600 hover:underline">
            Doluluk
          </Link>
        </p>
      )}
      <p className="mt-4 text-sm text-gray-500">
        Hesaptan çıkmak için:{" "}
        <Link href="/api/auth/signout" className="text-blue-600 hover:underline">
          Çıkış yap
        </Link>
      </p>
    </div>
  );
}
