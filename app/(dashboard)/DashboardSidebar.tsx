"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
  href: string;
  label: string;
}

const adminNav: NavItem[] = [
  { href: "/dashboard/admin", label: "Admin" },
  { href: "/dashboard/admin/visibility", label: "Otel görünürlük" },
];

const hotelNav: NavItem[] = [
  { href: "/dashboard/otel/profile", label: "Otel profilim" },
  { href: "/dashboard/otel/rooms", label: "Oda tipleri" },
  { href: "/dashboard/otel/availability", label: "Doluluk" },
  { href: "/dashboard/reservations", label: "Rezervasyonlar" },
];

const guideNav: NavItem[] = [
  { href: "/dashboard/catalog", label: "Otel kataloğu" },
  { href: "/dashboard/reservations", label: "Rezervasyonlarım" },
];

export function DashboardSidebar({
  role,
  email,
}: {
  role: string;
  email: string | null;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  let navItems: NavItem[] = [];
  if (role === "admin") navItems = adminNav;
  else if (role === "hotel") navItems = hotelNav;
  else if (role === "guide") navItems = guideNav;

  const roleLabel = role === "admin" ? "Admin" : role === "hotel" ? "Otel" : "Rehber";

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="border-b border-gray-100 p-6">
        <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md">
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-blue-600">OtelPartner</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User & Sign out */}
      <div className="border-t border-gray-200 p-4">
        <p className="truncate text-xs text-gray-500" title={email ?? ""}>
          {email}
        </p>
        <p className="mt-0.5 text-xs font-medium text-gray-700">{roleLabel}</p>
        <Link
          href="/api/auth/signout"
          className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-red-600"
        >
          Çıkış yap
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobil: üst bar + hamburger */}
      <div className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          aria-label="Menüyü aç"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link href="/dashboard" className="text-lg font-bold text-blue-600">
          OtelPartner
        </Link>
        <div className="w-10" />
      </div>

      {/* Mobil: drawer overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            aria-hidden
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed left-0 top-0 z-50 h-full w-64 max-w-[85vw] border-r border-gray-200 bg-white shadow-xl md:hidden">
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
              <span className="font-bold text-blue-600">Menü</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                aria-label="Menüyü kapat"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="h-[calc(100%-4rem)] overflow-y-auto">
              {sidebarContent}
            </div>
          </aside>
        </>
      )}

      {/* md ve üzeri: sabit sidebar (içerik spacer ile drawer altına girmez) */}
      <aside className="fixed left-0 top-0 z-20 hidden h-screen w-64 flex-shrink-0 border-r border-gray-200 bg-white shadow-sm md:block">
        {sidebarContent}
      </aside>
    </>
  );
}
