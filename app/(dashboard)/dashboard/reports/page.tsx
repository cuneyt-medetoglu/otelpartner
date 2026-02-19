import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ReportsContent } from "./ReportsContent";

export default async function ReportsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if (session.user.role !== "guide" && session.user.role !== "hotel") redirect("/dashboard");

  const isGuide = session.user.role === "guide";

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
        <h1 className="text-3xl font-bold text-gray-900">Raporlar</h1>
        <p className="text-sm text-gray-600">
          {isGuide ? "Gönderdiğiniz rezervasyonlar ve komisyon özeti." : "Aldığınız rezervasyonlar ve komisyon özeti."}
        </p>
      </div>
      <ReportsContent role={session.user.role!} />
    </div>
  );
}
