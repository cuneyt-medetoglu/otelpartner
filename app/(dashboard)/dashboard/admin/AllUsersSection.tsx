"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type UserStatus = "pending" | "active" | "suspended" | "rejected";
type Role = "admin" | "hotel" | "guide";

type UserRow = {
  id: string;
  email: string;
  role: Role;
  status: UserStatus;
  createdAt: string;
  hotel: { name: string } | null;
  guide: { firstName: string; lastName: string } | null;
};

export function AllUsersSection() {
  const router = useRouter();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  async function load() {
    setLoading(true);
    setLoaded(true);
    try {
      const params = new URLSearchParams();
      if (role) params.set("role", role);
      if (status) params.set("status", status);
      const res = await fetch(`/api/admin/users?${params}`);
      if (!res.ok) return;
      const data = await res.json();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
      <h2 className="mb-4 text-lg font-bold text-gray-900">Tüm kullanıcılar</h2>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="">Tüm roller</option>
          <option value="admin">Admin</option>
          <option value="hotel">Otel</option>
          <option value="guide">Rehber</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="">Tüm durumlar</option>
          <option value="pending">Bekleyen</option>
          <option value="active">Aktif</option>
          <option value="suspended">Askıda</option>
          <option value="rejected">Reddedilen</option>
        </select>
        <button
          type="button"
          onClick={load}
          disabled={loading}
          className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50"
        >
          {loading ? "Yükleniyor..." : "Listele"}
        </button>
      </div>
      {!loaded ? (
        <p className="text-sm text-gray-500">Filtre seçip &quot;Listele&quot; ile kullanıcıları getirin.</p>
      ) : (
        <>
          <div className="overflow-hidden rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Rol</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Durum</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Detay</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t border-gray-100">
                    <td className="whitespace-nowrap px-4 py-3 text-gray-900">{u.email}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-600">{u.role}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-600">{u.status}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {u.hotel ? u.hotel.name : u.guide ? `${u.guide.firstName} ${u.guide.lastName}` : "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <UserRowActions userId={u.id} userStatus={u.status} onDone={() => load()} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {users.length === 0 && (
            <p className="py-6 text-center text-gray-500">Kayıt bulunamadı.</p>
          )}
        </>
      )}
    </div>
  );
}

function UserRowActions({
  userId,
  userStatus,
  onDone,
}: {
  userId: string;
  userStatus: UserStatus;
  onDone: () => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function setStatus(status: "active" | "suspended") {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "İşlem başarısız");
        return;
      }
      onDone();
      router.refresh();
    } finally {
      setLoading(false);
    }
  }
  if (userStatus === "active") {
    return (
      <button
        type="button"
        onClick={() => setStatus("suspended")}
        disabled={loading}
        className="rounded-lg bg-amber-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-amber-700 disabled:opacity-50"
      >
        {loading ? "..." : "Askıya al"}
      </button>
    );
  }
  if (userStatus === "suspended") {
    return (
      <button
        type="button"
        onClick={() => setStatus("active")}
        disabled={loading}
        className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "..." : "Aktifleştir"}
      </button>
    );
  }
  return <span className="text-gray-400">—</span>;
}
