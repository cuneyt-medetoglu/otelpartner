"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ReservationActions({ reservationId, status }: { reservationId: string; status: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);

  if (status !== "pending") return <span className="text-gray-400">—</span>;

  async function update(newStatus: "approved" | "rejected") {
    setLoading(newStatus === "approved" ? "approve" : "reject");
    try {
      const res = await fetch(`/api/reservations/${reservationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "İşlem başarısız");
        return;
      }
      router.refresh();
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => update("approved")}
        disabled={!!loading}
        className="rounded bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-50"
      >
        {loading === "approve" ? "..." : "Onayla"}
      </button>
      <button
        type="button"
        onClick={() => update("rejected")}
        disabled={!!loading}
        className="rounded bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
      >
        {loading === "reject" ? "..." : "Reddet"}
      </button>
    </div>
  );
}
