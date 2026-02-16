"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function HotelListedToggle({ hotelId, listed: initial }: { hotelId: string; listed: boolean }) {
  const router = useRouter();
  const [listed, setListed] = useState(initial);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/hotels/${hotelId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listed: !listed }),
      });
      if (!res.ok) return;
      setListed(!listed);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      className={`rounded-lg px-3 py-1.5 text-sm font-medium text-white transition-colors disabled:opacity-50 ${
        listed ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 hover:bg-gray-500"
      }`}
    >
      {listed ? "Evet" : "Hayır"}
    </button>
  );
}
