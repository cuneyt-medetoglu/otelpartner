import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== "guide" && session.user.role !== "admin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const region = searchParams.get("region") ?? undefined;
  const city = searchParams.get("city") ?? undefined;
  const starRating = searchParams.get("starRating");
  const star = starRating ? parseInt(starRating, 10) : undefined;

  const where: { listed: boolean; region?: string; city?: string; starRating?: number } = { listed: true };
  if (region) where.region = region;
  if (city) where.city = city;
  if (Number.isInteger(star) && star! >= 1 && star! <= 5) where.starRating = star!;

  const hotels = await prisma.hotel.findMany({
    where,
    select: {
      id: true,
      name: true,
      city: true,
      region: true,
      starRating: true,
      description: true,
    },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(hotels);
}
