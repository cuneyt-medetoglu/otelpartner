"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ReservationDetailActions({
  reservationId,
  status,
  role,
}: {
  reservationId: string;
  status: string;
  role: "guide" | "hotel";
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<"approve" | "reject" | "cancel" | null>(null);

  const canCancel = status === "pending" || status === "approved";
  const canApproveReject = role === "hotel" && status === "pending";

  async function update(newStatus: "approved" | "rejected" | "cancelled") {
    const key = newStatus === "approved" ? "approve" : newStatus === "rejected" ? "reject" : "cancel";
    setLoading(key);
    try {
      const res = await fetch(`/api/reservations/${reservationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data.error || "İşlem başarısız");
        return;
      }
      router.refresh();
    } finally {
      setLoading(null);
    }
  }

  if (!canCancel && !canApproveReject) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {canApproveReject && (
        <>
          <button
            type="button"
            onClick={() => update("approved")}
            disabled={!!loading}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
          >
            {loading === "approve" ? "..." : "Onayla"}
          </button>
          <button
            type="button"
            onClick={() => update("rejected")}
            disabled={!!loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
          >
            {loading === "reject" ? "..." : "Reddet"}
          </button>
        </>
      )}
      {canCancel && (
        <button
          type="button"
          onClick={() => update("cancelled")}
          disabled={!!loading}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
        >
          {loading === "cancel" ? "..." : "İptal et"}
        </button>
      )}
    </div>
  );
}
