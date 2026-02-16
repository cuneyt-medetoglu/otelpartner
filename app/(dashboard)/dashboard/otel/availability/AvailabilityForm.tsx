"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Room = { id: string; roomType: string; totalCount: number };
type Row = { id: string; roomId: string; roomType: string; date: string; availableCount: number };

export function AvailabilityForm({ rooms, initialList }: { rooms: Room[]; initialList: Row[] }) {
  const router = useRouter();
  const [list, setList] = useState(initialList);
  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState(rooms[0]?.id ?? "");
  const [date, setDate] = useState("");
  const [availableCount, setAvailableCount] = useState("");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const room = rooms.find((r) => r.id === roomId);
    if (!room || !date) return;
    const count = parseInt(availableCount, 10);
    if (Number.isNaN(count) || count < 0 || count > room.totalCount) {
      setError(`0–${room.totalCount} arası girin`);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/hotel/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, date, availableCount: count }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Kaydedilemedi");
        return;
      }
      setList((prev) => {
        const rest = prev.filter((r) => !(r.roomId === data.roomId && r.date === data.date));
        return [...rest, data].sort((a, b) => a.date.localeCompare(b.date));
      });
      setDate("");
      setAvailableCount("");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Doluluk ayarla</h2>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Oda tipi</label>
              <select
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>{r.roomType}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Tarih</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Müsait adet</label>
              <input
                type="number"
                min={0}
                placeholder="0"
                value={availableCount}
                onChange={(e) => setAvailableCount(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50"
          >
            {loading ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </form>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
        {list.length === 0 ? (
          <p className="text-center text-gray-500">Henüz kayıt yok.</p>
        ) : (
          <div className="overflow-hidden rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Oda tipi</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Tarih</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Müsait adet</th>
                </tr>
              </thead>
              <tbody>
                {list.map((r) => (
                  <tr key={r.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 text-gray-600">{r.roomType}</td>
                    <td className="px-4 py-3 text-gray-600">{r.date}</td>
                    <td className="px-4 py-3 text-gray-600">{r.availableCount}</td>
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
