import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Suspense } from "react";
import { CatalogFilters } from "./CatalogFilters";

type SearchParams = { region?: string; city?: string; starRating?: string };

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if (session.user.role !== "guide" && session.user.role !== "admin") redirect("/dashboard");

  const params = await searchParams;
  const region = params.region ?? undefined;
  const city = params.city ?? undefined;
  const star = params.starRating ? parseInt(params.starRating, 10) : undefined;

  const where: { listed: boolean; region?: string; city?: string; starRating?: number } = { listed: true };
  if (region) where.region = region;
  if (city) where.city = city;
  if (Number.isInteger(star) && star! >= 1 && star! <= 5) where.starRating = star!;

  const hotels = await prisma.hotel.findMany({
    where,
    select: { id: true, name: true, city: true, region: true, starRating: true, description: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-7xl space-y-6">
      <div className="flex flex-col gap-2">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-cyan-600"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Otel kataloğu</h1>
      </div>

      <Suspense
        fallback={
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">Filtre yükleniyor...</div>
        }
      >
        <CatalogFilters current={{ region, city, starRating: params.starRating }} />
      </Suspense>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hotels.map((h) => (
          <Link
            key={h.id}
            href={`/dashboard/catalog/${h.id}`}
            className="group rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all hover:border-blue-200 hover:shadow-xl"
          >
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">{h.name}</h2>
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {[h.city, h.region].filter(Boolean).join(", ") || "—"}
            </p>
            {h.starRating != null && (
              <span className="mt-2 inline-block rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 px-2 py-0.5 text-xs font-semibold text-white">
                {h.starRating} yıldız
              </span>
            )}
            {h.description && (
              <p className="mt-3 line-clamp-2 text-sm text-gray-500">{h.description}</p>
            )}
          </Link>
        ))}
      </div>

      {hotels.length === 0 && (
        <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-lg">
          <p className="text-gray-600">Filtreye uyan otel bulunamadı.</p>
        </div>
      )}
    </div>
  );
}
