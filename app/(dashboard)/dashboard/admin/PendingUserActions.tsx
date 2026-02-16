"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function PendingUserActions({ userId }: { userId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);

  async function handleStatus(status: "active" | "rejected") {
    setLoading(status === "active" ? "approve" : "reject");
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
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
    <div className="flex justify-end gap-2">
      <button
        type="button"
        onClick={() => handleStatus("active")}
        disabled={!!loading}
        className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
      >
        {loading === "approve" ? "..." : "Onayla"}
      </button>
      <button
        type="button"
        onClick={() => handleStatus("rejected")}
        disabled={!!loading}
        className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
      >
        {loading === "reject" ? "..." : "Reddet"}
      </button>
    </div>
  );
}
