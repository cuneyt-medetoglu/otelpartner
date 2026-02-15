"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Room = { id: string; roomType: string; totalCount: number };

export function BookForm({ hotelId, rooms }: { hotelId: string; rooms: Room[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [roomId, setRoomId] = useState(rooms[0]?.id ?? "");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [roomCount, setRoomCount] = useState(1);
  const [guestCount, setGuestCount] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!checkInDate || !checkOutDate) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hotelId,
          roomId,
          checkInDate,
          checkOutDate,
          roomCount,
          guestCount: guestCount ? parseInt(guestCount, 10) : undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Rezervasyon alınamadı");
        return;
      }
      router.push("/dashboard/reservations");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  if (rooms.length === 0) return null;

  return (
    <div className="mt-6 rounded border bg-blue-50 p-4">
      <h2 className="font-medium text-gray-900">Rezervasyon yap</h2>
      <form onSubmit={submit} className="mt-3 space-y-3">
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-gray-700">Oda tipi</label>
          <select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="mt-1 w-full max-w-xs rounded border px-2 py-1.5 text-sm"
          >
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>{r.roomType} (max {r.totalCount})</option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Giriş</label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              required
              className="mt-1 rounded border px-2 py-1.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Çıkış</label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              required
              className="mt-1 rounded border px-2 py-1.5 text-sm"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Oda sayısı</label>
            <input
              type="number"
              min={1}
              value={roomCount}
              onChange={(e) => setRoomCount(parseInt(e.target.value, 10) || 1)}
              className="mt-1 w-20 rounded border px-2 py-1.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Misafir sayısı (ops.)</label>
            <input
              type="number"
              min={1}
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              className="mt-1 w-20 rounded border px-2 py-1.5 text-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Gönderiliyor..." : "Rezervasyon isteği gönder"}
        </button>
      </form>
    </div>
  );
}
