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
    <div>
      <div className="mb-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
          ← Dashboard
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">Otel kataloğu</h1>
      </div>
      <Suspense fallback={<div className="rounded border bg-white p-3">Filtre yükleniyor...</div>}>
        <CatalogFilters current={{ region, city, starRating: params.starRating }} />
      </Suspense>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {hotels.map((h) => (
          <Link
            key={h.id}
            href={`/dashboard/catalog/${h.id}`}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow"
          >
            <h2 className="font-medium text-gray-900">{h.name}</h2>
            <p className="mt-1 text-sm text-gray-600">
              {[h.city, h.region].filter(Boolean).join(", ") || "—"}
              {h.starRating != null && ` · ${h.starRating} yıldız`}
            </p>
            {h.description && (
              <p className="mt-2 line-clamp-2 text-sm text-gray-500">{h.description}</p>
            )}
          </Link>
        ))}
      </div>
      {hotels.length === 0 && (
        <p className="mt-6 text-center text-gray-500">Filtreye uyan otel bulunamadı.</p>
      )}
    </div>
  );
}
