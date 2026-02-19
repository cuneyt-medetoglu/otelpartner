/**
 * Bildirim oluşturma ve e-posta gönderimi.
 * Rezervasyon olaylarında hem Notification kaydı hem (tercih varsa) e-posta.
 */

import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import type { NotificationType } from "@prisma/client";

async function getOrCreatePreference(userId: string) {
  let prefs = await prisma.notificationPreference.findUnique({
    where: { userId },
  });
  if (!prefs) {
    prefs = await prisma.notificationPreference.create({
      data: { userId },
    });
  }
  return prefs;
}

export async function createNotification(params: {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  relatedEntityType?: string;
  relatedEntityId?: string;
}) {
  return prisma.notification.create({
    data: {
      userId: params.userId,
      type: params.type,
      title: params.title,
      message: params.message,
      relatedEntityType: params.relatedEntityType ?? null,
      relatedEntityId: params.relatedEntityId ?? null,
    },
  });
}

/** Otel kullanıcısına: Yeni rezervasyon bildirimi */
export async function notifyNewReservation(params: {
  hotelUserId: string;
  hotelUserEmail: string;
  reservationCode: string;
  guideName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  reservationId: string;
}) {
  const prefs = await getOrCreatePreference(params.hotelUserId);
  const title = "Yeni rezervasyon";
  const message = `${params.guideName} tarafından ${params.roomType} için ${params.checkIn}–${params.checkOut} tarihlerinde rezervasyon (${params.reservationCode}) oluşturuldu.`;

  await createNotification({
    userId: params.hotelUserId,
    type: "reservation_received",
    title,
    message,
    relatedEntityType: "reservation",
    relatedEntityId: params.reservationId,
  });

  if (prefs.emailNewReservation) {
    await sendEmail({
      to: params.hotelUserEmail,
      subject: `[OtelPartner] ${title} – ${params.reservationCode}`,
      html: `
        <p>Merhaba,</p>
        <p>${message}</p>
        <p>Panodan rezervasyonları görüntüleyip onaylayabilir veya reddedebilirsiniz.</p>
        <p>— OtelPartner</p>
      `,
    });
  }
}

/** Rehber kullanıcısına: Rezervasyon onaylandı */
export async function notifyReservationApproved(params: {
  guideUserId: string;
  guideUserEmail: string;
  reservationCode: string;
  hotelName: string;
  reservationId: string;
}) {
  const prefs = await getOrCreatePreference(params.guideUserId);
  const title = "Rezervasyon onaylandı";
  const message = `${params.hotelName} oteli ${params.reservationCode} numaralı rezervasyonu onayladı.`;

  await createNotification({
    userId: params.guideUserId,
    type: "reservation_approved",
    title,
    message,
    relatedEntityType: "reservation",
    relatedEntityId: params.reservationId,
  });

  if (prefs.emailApproval) {
    await sendEmail({
      to: params.guideUserEmail,
      subject: `[OtelPartner] ${title} – ${params.reservationCode}`,
      html: `
        <p>Merhaba,</p>
        <p>${message}</p>
        <p>— OtelPartner</p>
      `,
    });
  }
}

/** Rehber kullanıcısına: Rezervasyon reddedildi */
export async function notifyReservationRejected(params: {
  guideUserId: string;
  guideUserEmail: string;
  reservationCode: string;
  hotelName: string;
  rejectionReason?: string | null;
  reservationId: string;
}) {
  const prefs = await getOrCreatePreference(params.guideUserId);
  const title = "Rezervasyon reddedildi";
  const reason = params.rejectionReason ? ` Gerekçe: ${params.rejectionReason}` : "";
  const message = `${params.hotelName} oteli ${params.reservationCode} numaralı rezervasyonu reddetti.${reason}`;

  await createNotification({
    userId: params.guideUserId,
    type: "reservation_rejected",
    title,
    message,
    relatedEntityType: "reservation",
    relatedEntityId: params.reservationId,
  });

  if (prefs.emailApproval) {
    await sendEmail({
      to: params.guideUserEmail,
      subject: `[OtelPartner] ${title} – ${params.reservationCode}`,
      html: `
        <p>Merhaba,</p>
        <p>${message}</p>
        <p>— OtelPartner</p>
      `,
    });
  }
}

/** İlgili tarafa: Rezervasyon iptal edildi */
export async function notifyReservationCancelled(params: {
  targetUserId: string;
  targetUserEmail: string;
  reservationCode: string;
  cancelledBy: "guide" | "hotel";
  otherPartyName: string;
  reservationId: string;
}) {
  const prefs = await getOrCreatePreference(params.targetUserId);
  const title = "Rezervasyon iptal edildi";
  const who = params.cancelledBy === "guide" ? "Rehber" : "Otel";
  const message = `${params.otherPartyName} (${who}) ${params.reservationCode} numaralı rezervasyonu iptal etti.`;

  await createNotification({
    userId: params.targetUserId,
    type: "reservation_cancelled",
    title,
    message,
    relatedEntityType: "reservation",
    relatedEntityId: params.reservationId,
  });

  if (prefs.emailCancellation) {
    await sendEmail({
      to: params.targetUserEmail,
      subject: `[OtelPartner] ${title} – ${params.reservationCode}`,
      html: `
        <p>Merhaba,</p>
        <p>${message}</p>
        <p>— OtelPartner</p>
      `,
    });
  }
}
