"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ReservationActions({
  reservationId,
  status,
  showApproveReject = true,
}: {
  reservationId: string;
  status: string;
  showApproveReject?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<"approve" | "reject" | "cancel" | null>(null);

  const canCancel = status === "pending" || status === "approved";
  const showPendingActions = showApproveReject && status === "pending";

  async function update(newStatus: "approved" | "rejected" | "cancelled") {
    setLoading(newStatus === "approved" ? "approve" : newStatus === "rejected" ? "reject" : "cancel");
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

  if (!showPendingActions && !canCancel) return <span className="text-gray-400">—</span>;

  return (
    <div className="flex justify-end gap-2">
      {showPendingActions && (
        <>
          <button
            type="button"
            onClick={() => update("approved")}
            disabled={!!loading}
            className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
          >
            {loading === "approve" ? "..." : "Onayla"}
          </button>
          <button
            type="button"
            onClick={() => update("rejected")}
            disabled={!!loading}
            className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
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
          className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
        >
          {loading === "cancel" ? "..." : "İptal"}
        </button>
      )}
    </div>
  );
}
