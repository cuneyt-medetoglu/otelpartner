import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [pending, activeHotels, activeGuides, suspended] = await Promise.all([
    prisma.user.count({ where: { status: "pending" } }),
    prisma.user.count({ where: { role: "hotel", status: "active" } }),
    prisma.user.count({ where: { role: "guide", status: "active" } }),
    prisma.user.count({ where: { status: "suspended" } }),
  ]);

  return NextResponse.json({
    pending,
    activeHotels,
    activeGuides,
    suspended,
  });
}
