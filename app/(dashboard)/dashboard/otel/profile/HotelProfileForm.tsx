"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Initial = {
  name: string;
  description: string;
  address: string;
  city: string;
  region: string;
  country: string;
  starRating?: number;
  phone: string;
  website: string;
  amenities: string;
  latitude: string;
  longitude: string;
};

export function HotelProfileForm({ initial }: { initial: Initial }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(initial);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const amenities = form.amenities
        ? form.amenities.split(",").map((s) => s.trim()).filter(Boolean)
        : null;
      const body = {
        name: form.name,
        description: form.description || null,
        address: form.address || null,
        city: form.city || null,
        region: form.region || null,
        country: form.country,
        starRating: form.starRating ? Number(form.starRating) : null,
        phone: form.phone || null,
        website: form.website || null,
        amenities,
        latitude: form.latitude ? parseFloat(form.latitude) : null,
        longitude: form.longitude ? parseFloat(form.longitude) : null,
      };
      const res = await fetch("/api/hotel/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error?.message ?? data.error ?? "Kaydetme başarısız");
        return;
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";
  const labelClass = "block text-sm font-semibold text-gray-700";

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-6 rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="name" className={labelClass}>Otel adı *</label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="description" className={labelClass}>Açıklama</label>
        <textarea
          id="description"
          rows={3}
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="address" className={labelClass}>Adres</label>
        <input
          id="address"
          type="text"
          value={form.address}
          onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className={labelClass}>Şehir</label>
          <input
            id="city"
            type="text"
            value={form.city}
            onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="region" className={labelClass}>Bölge</label>
          <input
            id="region"
            type="text"
            value={form.region}
            onChange={(e) => setForm((p) => ({ ...p, region: e.target.value }))}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="country" className={labelClass}>Ülke</label>
        <input
          id="country"
          type="text"
          value={form.country}
          onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="starRating" className={labelClass}>Yıldız (1–5)</label>
        <select
          id="starRating"
          value={form.starRating ?? ""}
          onChange={(e) => setForm((p) => ({ ...p, starRating: e.target.value ? Number(e.target.value) : undefined }))}
          className={inputClass}
        >
          <option value="">Seçin</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n} yıldız</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="phone" className={labelClass}>Telefon</label>
        <input
          id="phone"
          type="text"
          value={form.phone}
          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="website" className={labelClass}>Web sitesi</label>
        <input
          id="website"
          type="url"
          value={form.website}
          onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
          className={inputClass}
          placeholder="https://"
        />
      </div>
      <div>
        <label htmlFor="amenities" className={labelClass}>Olanaklar (virgülle ayırın)</label>
        <input
          id="amenities"
          type="text"
          value={form.amenities}
          onChange={(e) => setForm((p) => ({ ...p, amenities: e.target.value }))}
          className={inputClass}
          placeholder="wifi, havuz, spa, otopark"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="latitude" className={labelClass}>Enlem</label>
          <input
            id="latitude"
            type="text"
            inputMode="decimal"
            value={form.latitude}
            onChange={(e) => setForm((p) => ({ ...p, latitude: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="longitude" className={labelClass}>Boylam</label>
          <input
            id="longitude"
            type="text"
            inputMode="decimal"
            value={form.longitude}
            onChange={(e) => setForm((p) => ({ ...p, longitude: e.target.value }))}
            className={inputClass}
          />
        </div>
      </div>
      <div className="pt-2">
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
