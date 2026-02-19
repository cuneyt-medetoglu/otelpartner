"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Initial = {
  emailNewReservation: boolean;
  emailApproval: boolean;
  emailCancellation: boolean;
};

export function NotificationPreferencesForm({ initial }: { initial: Initial }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [prefs, setPrefs] = useState(initial);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/notifications/preferences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prefs),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Kaydedilemedi");
        return;
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg"
    >
      <div className="space-y-6">
        <label className="flex cursor-pointer items-center justify-between gap-4">
          <span className="text-sm font-semibold text-gray-700">Yeni rezervasyon (e-posta)</span>
          <input
            type="checkbox"
            checked={prefs.emailNewReservation}
            onChange={(e) => setPrefs((p) => ({ ...p, emailNewReservation: e.target.checked }))}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </label>
        <p className="text-xs text-gray-500">Otel: Size gelen yeni rezervasyonlarda e-posta alırsınız.</p>

        <label className="flex cursor-pointer items-center justify-between gap-4">
          <span className="text-sm font-semibold text-gray-700">Onay / Red (e-posta)</span>
          <input
            type="checkbox"
            checked={prefs.emailApproval}
            onChange={(e) => setPrefs((p) => ({ ...p, emailApproval: e.target.checked }))}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </label>
        <p className="text-xs text-gray-500">Rehber: Rezervasyonunuz onaylandığında veya reddedildiğinde e-posta alırsınız.</p>

        <label className="flex cursor-pointer items-center justify-between gap-4">
          <span className="text-sm font-semibold text-gray-700">İptal (e-posta)</span>
          <input
            type="checkbox"
            checked={prefs.emailCancellation}
            onChange={(e) => setPrefs((p) => ({ ...p, emailCancellation: e.target.checked }))}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </label>
        <p className="text-xs text-gray-500">Rezervasyon iptal edildiğinde e-posta alırsınız.</p>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50"
        >
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </form>
  );
}
