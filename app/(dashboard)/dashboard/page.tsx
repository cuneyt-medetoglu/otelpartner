import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

interface QuickLinkCard {
  href: string;
  title: string;
  description: string;
  icon: string;
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  // Define role-based quick links
  const adminLinks: QuickLinkCard[] = [
    {
      href: "/dashboard/admin",
      title: "Admin Paneli",
      description: "Bekleyen kayıtları yönetin ve kullanıcıları onaylayın",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    },
    {
      href: "/dashboard/admin/visibility",
      title: "Otel Görünürlük",
      description: "Otellerin katalogda görünürlüğünü kontrol edin",
      icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
    },
  ];

  const hotelLinks: QuickLinkCard[] = [
    {
      href: "/dashboard/otel/profile",
      title: "Otel Profilim",
      description: "Otel bilgilerinizi düzenleyin ve güncelleyin",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      href: "/dashboard/otel/rooms",
      title: "Oda Tipleri",
      description: "Oda tiplerini tanımlayın ve fiyatlandırma yapın",
      icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
    },
    {
      href: "/dashboard/otel/availability",
      title: "Doluluk",
      description: "Oda doluluk durumlarını güncelleyin",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    },
    {
      href: "/dashboard/reservations",
      title: "Rezervasyonlar",
      description: "Gelen rezervasyonları görüntüleyin ve yönetin",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    },
  ];

  const guideLinks: QuickLinkCard[] = [
    {
      href: "/dashboard/catalog",
      title: "Otel Kataloğu",
      description: "Mevcut otelleri inceleyin ve rezervasyon yapın",
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    },
    {
      href: "/dashboard/reservations",
      title: "Rezervasyonlarım",
      description: "Yaptığınız rezervasyonları görüntüleyin",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    },
  ];

  // Select links based on role
  let quickLinks: QuickLinkCard[] = [];
  let roleDisplayName = "";

  if (session.user.role === "admin") {
    quickLinks = adminLinks;
    roleDisplayName = "Admin";
  } else if (session.user.role === "hotel") {
    quickLinks = hotelLinks;
    roleDisplayName = "Otel";
  } else if (session.user.role === "guide") {
    quickLinks = guideLinks;
    roleDisplayName = "Rehber";
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-md flex-shrink-0">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hoş geldiniz!</h1>
            <p className="text-base text-gray-600">
              {session.user.email} • <span className="font-semibold text-gray-700">{roleDisplayName}</span>
            </p>
            <p className="mt-3 text-gray-600">
              OtelPartner platformuna hoş geldiniz. Aşağıdaki hızlı bağlantılardan işlemlerinizi gerçekleştirebilirsiniz.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Hızlı Erişim</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all hover:border-blue-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={link.icon}
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
