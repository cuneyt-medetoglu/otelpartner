import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900">OtelPartner</span>
          <span className="text-sm text-gray-600">
            {session.user.email} ({session.user.role})
          </span>
        </div>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
