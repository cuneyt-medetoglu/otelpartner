"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Row = {
  id: string;
  reservationCode: string;
  hotelName?: string;
  guideName?: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  roomCount: number;
  status: string;
  totalPrice: number | null;
};

type Summary = {
  count: number;
  totalPriceSum: number;
  completedCount: number;
  commissionSum: number;
};

const statusLabels: Record<string, string> = {
  pending: "Bekliyor",
  approved: "Onaylandı",
  rejected: "Reddedildi",
  cancelled: "İptal edildi",
};

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-800",
};

export function ReportsContent({ role }: { role: "guide" | "hotel" }) {
  const [list, setList] = useState<Row[]>([]);
  const [summary, setSummary] = useState<Summary>({ count: 0, totalPriceSum: 0, completedCount: 0, commissionSum: 0 });
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    if (status) params.set("status", status);
    setLoading(true);
    fetch(`/api/reports/reservations?${params}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.list) setList(data.list);
        if (data.summary) setSummary(data.summary);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [startDate, endDate, status]);

  return (
    <>
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Filtreler</h2>
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">Başlangıç</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">Bitiş</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">Durum</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">Tümü</option>
              <option value="pending">Bekliyor</option>
              <option value="approved">Onaylandı</option>
              <option value="rejected">Reddedildi</option>
              <option value="cancelled">İptal</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
          <p className="text-sm font-medium text-gray-500">Toplam rezervasyon</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{summary.count}</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
          <p className="text-sm font-medium text-gray-500">Toplam tutar (₺)</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{summary.totalPriceSum.toFixed(2)}</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
          <p className="text-sm font-medium text-gray-500">Tamamlanan</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{summary.completedCount}</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
          <p className="text-sm font-medium text-gray-500">Komisyon (tahmini ₺)</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{summary.commissionSum.toFixed(2)}</p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Rezervasyon listesi</h2>
        {loading ? (
          <p className="text-center text-gray-500">Yükleniyor...</p>
        ) : list.length === 0 ? (
          <p className="text-center text-gray-500">Filtreye uyan kayıt yok.</p>
        ) : (
          <div className="overflow-hidden rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Kod</th>
                  {role === "guide" ? (
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Otel</th>
                  ) : (
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Rehber</th>
                  )}
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Oda</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Giriş</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Çıkış</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Adet</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Durum</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">Tutar</th>
                </tr>
              </thead>
              <tbody>
                {list.map((r) => (
                  <tr key={r.id} className="border-t border-gray-100">
                    <td className="px-4 py-3">
                      <Link href={`/dashboard/reservations/${r.id}`} className="font-mono text-xs text-blue-600 hover:underline">
                        {r.reservationCode}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{r.hotelName ?? r.guideName ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{r.roomType}</td>
                    <td className="px-4 py-3 text-gray-600">{r.checkInDate}</td>
                    <td className="px-4 py-3 text-gray-600">{r.checkOutDate}</td>
                    <td className="px-4 py-3 text-gray-600">{r.roomCount}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-medium ${statusStyles[r.status] ?? "bg-gray-100 text-gray-800"}`}>
                        {statusLabels[r.status] ?? r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">{r.totalPrice != null ? `₺${r.totalPrice.toFixed(2)}` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
