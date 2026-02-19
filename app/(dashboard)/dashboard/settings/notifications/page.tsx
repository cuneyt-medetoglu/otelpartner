import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { NotificationPreferencesForm } from "./NotificationPreferencesForm";

export default async function NotificationPreferencesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  let prefs = await prisma.notificationPreference.findUnique({
    where: { userId: session.user.id },
  });
  if (!prefs) {
    prefs = await prisma.notificationPreference.create({
      data: { userId: session.user.id },
    });
  }

  const initial = {
    emailNewReservation: prefs.emailNewReservation,
    emailApproval: prefs.emailApproval,
    emailCancellation: prefs.emailCancellation,
  };

  return (
    <div className="max-w-7xl space-y-6">
      <div className="flex flex-col gap-2">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-cyan-600"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Bildirim tercihleri</h1>
        <p className="text-sm text-gray-600">
          Hangi olaylarda e-posta almak istediğinizi seçin. Uygulama içi bildirimler her zaman oluşturulur.
        </p>
      </div>

      <NotificationPreferencesForm initial={initial} />
    </div>
  );
}
