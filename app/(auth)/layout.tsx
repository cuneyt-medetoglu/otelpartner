import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100">
      {/* Header */}
      <header className="p-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            OtelPartner
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 relative">
        {/* Decorative circles - subtle background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-md relative z-10">{children}</div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-medium">&copy; {new Date().getFullYear()} OtelPartner. Tüm hakları saklıdır.</p>
          <div className="flex justify-center gap-6 mt-3">
            <Link href="#" className="text-sm hover:text-white transition-colors">
              Gizlilik
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="#" className="text-sm hover:text-white transition-colors">
              İletişim
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
