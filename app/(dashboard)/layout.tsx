import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "./DashboardSidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const role = (session.user as { role?: string }).role ?? "guide";
  const email = session.user?.email ?? null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100">
      {/* Spacer: sidebar fixed olduğu için akışta yer kaplasın diye; içerik drawer altına girmez */}
      <div className="hidden w-64 flex-shrink-0 md:block" aria-hidden />
      <DashboardSidebar role={role} email={email} />
      <main className="min-w-0 flex-1 min-h-screen pt-14 p-4 sm:p-6 md:pt-0 md:p-8">{children}</main>
    </div>
  );
}
