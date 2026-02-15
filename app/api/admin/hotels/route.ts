import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const hotels = await prisma.hotel.findMany({
    include: { user: { select: { email: true } } },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(
    hotels.map((h) => ({
      id: h.id,
      name: h.name,
      email: h.user.email,
      listed: h.listed,
    }))
  );
}
