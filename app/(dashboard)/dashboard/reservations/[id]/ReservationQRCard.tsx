"use client";

import { useState } from "react";

export function ReservationQRCard({
  reservationId,
  reservationCode,
}: {
  reservationId: string;
  reservationCode: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const res = await fetch(`/api/reservations/${reservationId}/qr`);
      if (!res.ok) throw new Error("İndirilemedi");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qr-${reservationCode}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("QR kod indirilemedi.");
    } finally {
      setLoading(false);
    }
  }

  const qrUrl = `/api/reservations/${reservationId}/qr`;

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
      <h2 className="mb-2 text-lg font-bold text-gray-900">QR Kod – Müşteriye verin</h2>
      <p className="mb-4 text-sm text-gray-600">
        Bu kodu müşteriye verin; check-in sırasında otel tarafından taranacak.
      </p>
      <div className="flex flex-wrap items-start gap-6">
        <div className="flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrUrl}
            alt={`QR: ${reservationCode}`}
            width={200}
            height={200}
            className="h-[200px] w-[200px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-mono text-gray-500">{reservationCode}</p>
          <button
            type="button"
            onClick={handleDownload}
            disabled={loading}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
          >
            {loading ? "İndiriliyor..." : "PNG indir"}
          </button>
        </div>
      </div>
    </div>
  );
}
