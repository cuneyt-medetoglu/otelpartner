"use client";

export function CatalogFilters({
  current,
}: {
  current: { region?: string; city?: string; starRating?: string };
}) {
  return (
    <form
      method="get"
      action="/dashboard/catalog"
      className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg"
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-900">Filtreler</h2>

        <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="region" className="text-sm font-semibold text-gray-700">
              Bölge
            </label>
            <input
              type="text"
              id="region"
              name="region"
              placeholder="Bölge"
              defaultValue={current.region ?? ""}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="city" className="text-sm font-semibold text-gray-700">
              Şehir
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Şehir"
              defaultValue={current.city ?? ""}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="starRating" className="text-sm font-semibold text-gray-700">
              Yıldız
            </label>
            <select
              id="starRating"
              name="starRating"
              defaultValue={current.starRating ?? ""}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">Tüm yıldızlar</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} yıldız
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2 font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-cyan-700 hover:shadow-lg"
          >
            Uygula
          </button>
        </div>
      </div>
    </form>
  );
}
