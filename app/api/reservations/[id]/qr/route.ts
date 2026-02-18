import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import QRCode from "qrcode";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.user.role !== "guide" && session.user.role !== "hotel") {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
  }

  const { id } = await params;
  const res = await prisma.reservation.findUnique({
    where: { id },
    select: { id: true, reservationCode: true, guideId: true, hotelId: true },
  });

  if (!res) return NextResponse.json({ error: "Rezervasyon bulunamadı" }, { status: 404 });

  if (session.user.role === "guide") {
    const guide = await prisma.guide.findUnique({ where: { userId: session.user.id } });
    if (!guide || res.guideId !== guide.id) return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
  } else {
    const hotel = await prisma.hotel.findUnique({ where: { userId: session.user.id } });
    if (!hotel || res.hotelId !== hotel.id) return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
  }

  try {
    const buffer = await QRCode.toBuffer(res.reservationCode, {
      type: "png",
      width: 280,
      margin: 2,
      errorCorrectionLevel: "M",
    });
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `inline; filename="qr-${res.reservationCode}.png"`,
      },
    });
  } catch (e) {
    console.error("QR generate error:", e);
    return NextResponse.json({ error: "QR oluşturulamadı" }, { status: 500 });
  }
}
