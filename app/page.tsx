import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold text-gray-900">OtelPartner</h1>
      <p className="text-gray-600">B2B Otel Yönlendirme Platformu</p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Giriş
        </Link>
        <Link
          href="/register"
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Kayıt ol
        </Link>
      </div>
    </main>
  );
}
