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
    <div>
      <div className="mb-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
          ← Dashboard
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">Otel profilim</h1>
      </div>
      <HotelProfileForm initial={initial} />
    </div>
  );
}
