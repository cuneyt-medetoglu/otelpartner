"use client";

import { useState } from "react";

export function AvailabilityCheck({ hotelId }: { hotelId: string }) {
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ date: string; rooms: { roomType: string; totalCount: number; availableCount: number | null }[] } | null>(null);

  async function check() {
    if (!date) return;
    setLoading(true);
    setData(null);
    try {
      const res = await fetch(`/api/catalog/hotels/${hotelId}/availability?date=${encodeURIComponent(date)}`);
      if (!res.ok) return;
      const json = await res.json();
      setData(json);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 rounded border bg-gray-50 p-4">
      <h2 className="font-medium text-gray-900">Müsaitlik sorgula</h2>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded border px-2 py-1.5 text-sm"
        />
        <button
          type="button"
          onClick={check}
          disabled={loading || !date}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Sorgulanıyor..." : "Sorgula"}
        </button>
      </div>
      {data && (
        <div className="mt-3 overflow-hidden rounded border bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-gray-600">Oda tipi</th>
                <th className="px-3 py-2 text-right font-medium text-gray-600">Toplam</th>
                <th className="px-3 py-2 text-right font-medium text-gray-600">{data.date} müsait</th>
              </tr>
            </thead>
            <tbody>
              {data.rooms.map((r) => (
                <tr key={r.roomType} className="border-t">
                  <td className="px-3 py-2">{r.roomType}</td>
                  <td className="px-3 py-2 text-right">{r.totalCount}</td>
                  <td className="px-3 py-2 text-right">
                    {r.availableCount !== null ? r.availableCount : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
