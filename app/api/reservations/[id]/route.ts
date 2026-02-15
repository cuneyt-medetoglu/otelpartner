import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const bodySchema = z.object({
  status: z.enum(["approved", "rejected"]),
  rejectionReason: z.string().optional(),
});

export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "hotel") {
    return NextResponse.json({ error: "Sadece otel onay/red yapabilir" }, { status: 403 });
  }

  const hotel = await prisma.hotel.findUnique({ where: { userId: session.user.id } });
  if (!hotel) return NextResponse.json({ error: "Otel bulunamadı" }, { status: 404 });

  const { id } = await params;
  let body: unknown;
  try {
    body = await _req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON" }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "status: approved veya rejected" }, { status: 400 });
  }

  const res = await prisma.reservation.findFirst({
    where: { id, hotelId: hotel.id },
  });
  if (!res) return NextResponse.json({ error: "Rezervasyon bulunamadı" }, { status: 404 });
  if (res.status !== "pending") {
    return NextResponse.json({ error: "Sadece bekleyen rezervasyon güncellenebilir" }, { status: 400 });
  }

  await prisma.reservation.update({
    where: { id },
    data: {
      status: parsed.data.status,
      ...(parsed.data.status === "rejected" && parsed.data.rejectionReason != null && { rejectionReason: parsed.data.rejectionReason }),
    },
  });

  return NextResponse.json({ ok: true, status: parsed.data.status });
}
