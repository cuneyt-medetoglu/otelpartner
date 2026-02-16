import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { HotelProfileForm } from "./HotelProfileForm";

export default async function OtelProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if (session.user.role !== "hotel") redirect("/dashboard");

  const hotel = await prisma.hotel.findUnique({
    where: { userId: session.user.id },
  });
  if (!hotel) {
    return (
      <div>
        <p className="text-gray-600">Otel kaydınız bulunamadı.</p>
        <Link href="/dashboard" className="mt-2 inline-block text-sm text-blue-600 hover:underline">
          ← Dashboard
        </Link>
      </div>
    );
  }

  const initial = {
    name: hotel.name,
    description: hotel.description ?? "",
    address: hotel.address ?? "",
    city: hotel.city ?? "",
    region: hotel.region ?? "",
    country: hotel.country,
    starRating: hotel.starRating ?? undefined,
    phone: hotel.phone ?? "",
    website: hotel.website ?? "",
    amenities: Array.isArray(hotel.amenities) ? (hotel.amenities as string[]).join(", ") : "",
    latitude: hotel.latitude != null ? String(hotel.latitude) : "",
    longitude: hotel.longitude != null ? String(hotel.longitude) : "",
  };

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
        <h1 className="text-3xl font-bold text-gray-900">Otel profilim</h1>
      </div>
      <HotelProfileForm initial={initial} />
    </div>
  );
}
