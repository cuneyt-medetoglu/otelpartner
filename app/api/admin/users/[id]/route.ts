import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const bodySchema = z.object({ status: z.enum(["active", "rejected", "suspended"]) });

export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
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
    return NextResponse.json({ error: "status: 'active', 'rejected' veya 'suspended' olmalı" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });

  const next = parsed.data.status;
  if (user.status === "pending") {
    if (next !== "active" && next !== "rejected") {
      return NextResponse.json({ error: "Bekleyen kayıt için sadece active veya rejected gönderin" }, { status: 400 });
    }
  } else if (user.status === "active") {
    if (next !== "suspended") {
      return NextResponse.json({ error: "Aktif kullanıcı sadece suspended yapılabilir" }, { status: 400 });
    }
  } else if (user.status === "suspended") {
    if (next !== "active") {
      return NextResponse.json({ error: "Askıdaki kullanıcı sadece active yapılabilir" }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: "Reddedilmiş kullanıcı güncellenemez" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id },
    data: { status: next },
  });

  return NextResponse.json({ ok: true, status: next });
}
