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
    <div className="space-y-4">
      <form onSubmit={add} className="flex flex-wrap items-end gap-2 rounded border bg-white p-3">
        <input
          placeholder="Oda tipi (örn. Çift kişilik)"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          className="rounded border px-2 py-1.5 text-sm"
        />
        <input
          type="number"
          min={1}
          placeholder="Adet"
          value={totalCount}
          onChange={(e) => setTotalCount(e.target.value)}
          className="w-20 rounded border px-2 py-1.5 text-sm"
        />
        <input
          type="number"
          min={0}
          step={0.01}
          placeholder="Fiyat (ops.)"
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
          className="w-24 rounded border px-2 py-1.5 text-sm"
        />
        <button type="submit" disabled={loading} className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white disabled:opacity-50">
          Ekle
        </button>
      </form>
      <div className="rounded border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-gray-500">Oda tipi</th>
              <th className="px-3 py-2 text-left font-medium text-gray-500">Adet</th>
              <th className="px-3 py-2 text-left font-medium text-gray-500">Fiyat</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-3 py-2">{r.roomType}</td>
                <td className="px-3 py-2">{r.totalCount}</td>
                <td className="px-3 py-2">{r.basePrice != null ? `${r.basePrice} ₺` : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rooms.length === 0 && <p className="p-4 text-gray-500">Henüz oda tipi yok. Yukarıdan ekleyin.</p>}
      </div>
    </div>
  );
}
