import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const bodySchema = z.object({
  status: z.enum(["approved", "rejected", "cancelled"]),
  rejectionReason: z.string().optional(),
});

export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.user.role !== "hotel" && session.user.role !== "guide") {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
  }

  const { id } = await params;
  let body: unknown;
  try {
    body = await _req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON" }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "status: approved, rejected veya cancelled" }, { status: 400 });
  }

  const res = await prisma.reservation.findUnique({
    where: { id },
  });
  if (!res) return NextResponse.json({ error: "Rezervasyon bulunamadı" }, { status: 404 });

  const status = parsed.data.status;

  if (status === "cancelled") {
    // Rehber: sadece kendi rezervasyonunu, pending veya approved iken iptal edebilir. Otel: kendi otelindeki rezervasyonu iptal edebilir.
    const canCancel =
      res.status === "pending" || res.status === "approved";
    if (!canCancel) {
      return NextResponse.json({ error: "Bu rezervasyon iptal edilemez" }, { status: 400 });
    }
    if (session.user.role === "guide") {
      const guide = await prisma.guide.findUnique({ where: { userId: session.user.id } });
      if (!guide || res.guideId !== guide.id) {
        return NextResponse.json({ error: "Bu rezervasyona erişim yok" }, { status: 403 });
      }
    } else {
      const hotel = await prisma.hotel.findUnique({ where: { userId: session.user.id } });
      if (!hotel || res.hotelId !== hotel.id) {
        return NextResponse.json({ error: "Bu rezervasyona erişim yok" }, { status: 403 });
      }
    }
    await prisma.reservation.update({
      where: { id },
      data: { status: "cancelled" },
    });
    return NextResponse.json({ ok: true, status: "cancelled" });
  }

  // Onay / Red: sadece otel, sadece pending
  if (session.user.role !== "hotel") {
    return NextResponse.json({ error: "Onay/red sadece otel tarafından yapılabilir" }, { status: 403 });
  }
  const hotel = await prisma.hotel.findUnique({ where: { userId: session.user.id } });
  if (!hotel || res.hotelId !== hotel.id) {
    return NextResponse.json({ error: "Rezervasyon bulunamadı" }, { status: 404 });
  }
  if (res.status !== "pending") {
    return NextResponse.json({ error: "Sadece bekleyen rezervasyon onaylanabilir veya reddedilebilir" }, { status: 400 });
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
