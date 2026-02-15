"use client";

export function CatalogFilters({
  current,
}: {
  current: { region?: string; city?: string; starRating?: string };
}) {
  return (
    <form method="get" action="/dashboard/catalog" className="flex flex-wrap items-center gap-2 rounded border bg-white p-3">
      <span className="text-sm font-medium text-gray-600">Filtre:</span>
      <input
        type="text"
        name="region"
        placeholder="Bölge"
        defaultValue={current.region ?? ""}
        className="w-28 rounded border px-2 py-1 text-sm"
      />
      <input
        type="text"
        name="city"
        placeholder="Şehir"
        defaultValue={current.city ?? ""}
        className="w-28 rounded border px-2 py-1 text-sm"
      />
      <select
        name="starRating"
        defaultValue={current.starRating ?? ""}
        className="rounded border px-2 py-1 text-sm"
      >
        <option value="">Tüm yıldızlar</option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>{n} yıldız</option>
        ))}
      </select>
      <button type="submit" className="rounded bg-gray-700 px-3 py-1 text-sm text-white hover:bg-gray-800">
        Uygula
      </button>
    </form>
  );
}
