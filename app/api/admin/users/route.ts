import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role") as "admin" | "hotel" | "guide" | null;
  const status = searchParams.get("status") as "pending" | "active" | "suspended" | "rejected" | null;

  const where: { role?: "admin" | "hotel" | "guide"; status?: "pending" | "active" | "suspended" | "rejected" } = {};
  if (role) where.role = role;
  if (status) where.status = status;

  const users = await prisma.user.findMany({
    where,
    include: { hotel: true, guide: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(users);
}
