"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Room = { id: string; roomType: string; totalCount: number; basePrice: number | null };

export function RoomList({ initialRooms }: { initialRooms: Room[] }) {
  const router = useRouter();
  const [rooms, setRooms] = useState(initialRooms);
  const [loading, setLoading] = useState(false);
  const [roomType, setRoomType] = useState("");
  const [totalCount, setTotalCount] = useState("");
  const [basePrice, setBasePrice] = useState("");

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const count = parseInt(totalCount, 10);
    if (!roomType.trim() || !Number.isInteger(count) || count < 1) return;
    setLoading(true);
    try {
      const res = await fetch("/api/hotel/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomType: roomType.trim(),
          totalCount: count,
          basePrice: basePrice ? parseFloat(basePrice) : null,
        }),
      });
      if (!res.ok) return;
      const newRoom = await res.json();
      setRooms((prev) => [...prev, newRoom]);
      setRoomType("");
      setTotalCount("");
      setBasePrice("");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Yeni oda tipi ekle</h2>
        <form onSubmit={add} className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Oda tipi</label>
            <input
              placeholder="örn. Çift kişilik"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="w-24">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Adet</label>
            <input
              type="number"
              min={1}
              placeholder="1"
              value={totalCount}
              onChange={(e) => setTotalCount(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="w-32">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Fiyat - ops.</label>
            <input
              type="number"
              min={0}
              step={0.01}
              placeholder="0.00"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50"
          >
            Ekle
          </button>
        </form>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
        {rooms.length === 0 ? (
          <p className="text-center text-gray-500">Henüz oda tipi yok.</p>
        ) : (
          <div className="overflow-hidden rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Tip</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Adet</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Fiyat</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((r) => (
                  <tr key={r.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 text-gray-600">{r.roomType}</td>
                    <td className="px-4 py-3 text-gray-600">{r.totalCount}</td>
                    <td className="px-4 py-3 text-gray-600">{r.basePrice != null ? `₺${r.basePrice}` : "—"}</td>
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
