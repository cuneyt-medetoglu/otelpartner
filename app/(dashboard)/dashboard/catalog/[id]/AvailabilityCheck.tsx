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
    <div className="mt-8 rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
      <h2 className="text-lg font-bold text-gray-900">Müsaitlik sorgula</h2>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
        <button
          type="button"
          onClick={check}
          disabled={loading || !date}
          className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50"
        >
          {loading ? "Sorgulanıyor..." : "Sorgula"}
        </button>
      </div>
      {data && (
        <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Oda tipi</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">Toplam</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">{data.date} müsait</th>
              </tr>
            </thead>
            <tbody>
              {data.rooms.map((r) => (
                <tr key={r.roomType} className="border-t border-gray-100">
                  <td className="px-4 py-3 text-gray-600">{r.roomType}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{r.totalCount}</td>
                  <td className="px-4 py-3 text-right text-gray-600">
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
