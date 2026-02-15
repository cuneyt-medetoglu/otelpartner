import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/db";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["hotel", "guide"]),
  hotelName: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Geçersiz veri" }, { status: 400 });
    }
    const { email, password, role, hotelName, firstName, lastName } = parsed.data;

    if (role === "hotel" && !hotelName) {
      return NextResponse.json({ error: "Otel adı gerekli" }, { status: 400 });
    }
    if (role === "guide" && (!firstName || !lastName)) {
      return NextResponse.json({ error: "Ad ve soyad gerekli" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Bu email zaten kayıtlı" }, { status: 400 });
    }

    const hashed = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        role,
        status: "pending",
      },
    });

    if (role === "hotel") {
      await prisma.hotel.create({
        data: { userId: user.id, name: hotelName ?? "" },
      });
    } else {
      await prisma.guide.create({
        data: { userId: user.id, firstName: firstName ?? "", lastName: lastName ?? "" },
      });
    }

    return NextResponse.json({ ok: true, message: "Kayıt alındı. Admin onayından sonra giriş yapabilirsiniz." });
  } catch (e) {
    return NextResponse.json({ error: "Kayıt sırasında hata" }, { status: 500 });
  }
}
