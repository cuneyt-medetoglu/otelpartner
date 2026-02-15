import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OtelPartner",
  description: "B2B Otel Yönlendirme Platformu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
