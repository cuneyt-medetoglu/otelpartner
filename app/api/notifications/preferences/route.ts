import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const patchSchema = z.object({
  emailNewReservation: z.boolean().optional(),
  emailApproval: z.boolean().optional(),
  emailCancellation: z.boolean().optional(),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let prefs = await prisma.notificationPreference.findUnique({
    where: { userId: session.user.id },
  });
  if (!prefs) {
    prefs = await prisma.notificationPreference.create({
      data: { userId: session.user.id },
    });
  }

  return NextResponse.json({
    emailNewReservation: prefs.emailNewReservation,
    emailApproval: prefs.emailApproval,
    emailCancellation: prefs.emailCancellation,
  });
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON" }, { status: 400 });
  }
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz alanlar" }, { status: 400 });
  }

  const prefs = await prisma.notificationPreference.upsert({
    where: { userId: session.user.id },
    create: {
      userId: session.user.id,
      ...(parsed.data.emailNewReservation !== undefined && { emailNewReservation: parsed.data.emailNewReservation }),
      ...(parsed.data.emailApproval !== undefined && { emailApproval: parsed.data.emailApproval }),
      ...(parsed.data.emailCancellation !== undefined && { emailCancellation: parsed.data.emailCancellation }),
    },
    update: {
      ...(parsed.data.emailNewReservation !== undefined && { emailNewReservation: parsed.data.emailNewReservation }),
      ...(parsed.data.emailApproval !== undefined && { emailApproval: parsed.data.emailApproval }),
      ...(parsed.data.emailCancellation !== undefined && { emailCancellation: parsed.data.emailCancellation }),
    },
  });

  return NextResponse.json({
    emailNewReservation: prefs.emailNewReservation,
    emailApproval: prefs.emailApproval,
    emailCancellation: prefs.emailCancellation,
  });
}
