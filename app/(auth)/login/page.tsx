"use client";

import { signIn } from "next-auth/react";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("Email veya şifre hatalı.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h1 className="text-xl font-semibold text-gray-900">Giriş</h1>
      <p className="mt-1 text-sm text-gray-500">OtelPartner hesabınızla giriş yapın.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Şifre
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Giriş yapılıyor..." : "Giriş yap"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Hesabınız yok mu?{" "}
        <Link href="/register" className="font-medium text-blue-600 hover:underline">
          Kayıt olun
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="rounded-lg border bg-white p-6 shadow-sm">Yükleniyor...</div>}>
      <LoginForm />
    </Suspense>
  );
}
