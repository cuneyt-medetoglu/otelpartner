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
    <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-8 shadow-lg">
      <h2 className="text-lg font-bold text-gray-900">Rezervasyon yap</h2>
      <form onSubmit={submit} className="mt-4 space-y-4">
        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-3">
            <p className="text-sm font-semibold text-red-700">{error}</p>
          </div>
        )}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Oda tipi</label>
          <select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="mt-2 w-full max-w-xs rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>{r.roomType} (max {r.totalCount})</option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Giriş</label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              required
              className="mt-2 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Çıkış</label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              required
              className="mt-2 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Oda sayısı</label>
            <input
              type="number"
              min={1}
              value={roomCount}
              onChange={(e) => setRoomCount(parseInt(e.target.value, 10) || 1)}
              className="mt-2 w-24 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Misafir sayısı (ops.)</label>
            <input
              type="number"
              min={1}
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              className="mt-2 w-24 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Gönderiliyor..." : "Rezervasyon isteği gönder"}
        </button>
      </form>
    </div>
  );
}
