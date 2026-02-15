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
    <div className="space-y-4">
      <form onSubmit={submit} className="flex flex-wrap items-end gap-2 rounded border bg-white p-3">
        <select
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="rounded border px-2 py-1.5 text-sm"
        >
          {rooms.map((r) => (
            <option key={r.id} value={r.id}>{r.roomType} (max {r.totalCount})</option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded border px-2 py-1.5 text-sm"
          required
        />
        <input
          type="number"
          min={0}
          placeholder="Müsait adet"
          value={availableCount}
          onChange={(e) => setAvailableCount(e.target.value)}
          className="w-24 rounded border px-2 py-1.5 text-sm"
        />
        <button type="submit" disabled={loading} className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white disabled:opacity-50">
          Kaydet
        </button>
      </form>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="rounded border bg-white overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-gray-500">Oda</th>
              <th className="px-3 py-2 text-left font-medium text-gray-500">Tarih</th>
              <th className="px-3 py-2 text-left font-medium text-gray-500">Müsait</th>
            </tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-3 py-2">{r.roomType}</td>
                <td className="px-3 py-2">{r.date}</td>
                <td className="px-3 py-2">{r.availableCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && <p className="p-4 text-gray-500">Henüz kayıt yok. Oda, tarih ve müsait adet girip Kaydet.</p>}
      </div>
    </div>
  );
}
