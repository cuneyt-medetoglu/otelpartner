"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [role, setRole] = useState<"hotel" | "guide">("hotel");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role,
          hotelName: role === "hotel" ? hotelName : undefined,
          firstName: role === "guide" ? firstName : undefined,
          lastName: role === "guide" ? lastName : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error ?? "Kayıt başarısız" });
        return;
      }
      setMessage({ type: "ok", text: data.message ?? "Kayıt alındı." });
    } catch {
      setMessage({ type: "error", text: "Bağlantı hatası" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100">
      {/* Icon decoration */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
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
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kayıt ol</h1>
        <p className="text-base text-gray-600">Admin onayından sonra giriş yapabilirsiniz.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        {message?.type === "error" && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-700 font-medium">{message.text}</p>
          </div>
        )}

        {message?.type === "ok" && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-4">
            <p className="text-sm text-green-600 font-medium">{message.text}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Hesap türü</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                checked={role === "hotel"}
                onChange={() => setRole("hotel")}
                className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
              />
              <span className="text-sm font-medium text-gray-700">Otel</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                checked={role === "guide"}
                onChange={() => setRole("guide")}
                className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
              />
              <span className="text-sm font-medium text-gray-700">Rehber</span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            placeholder="ornek@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
            Şifre (en az 6 karakter)
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            placeholder="••••••••"
          />
        </div>

        {role === "hotel" && (
          <div>
            <label htmlFor="hotelName" className="block text-sm font-semibold text-gray-700 mb-2">
              Otel adı
            </label>
            <input
              id="hotelName"
              type="text"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              required
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              placeholder="Otel adını giriniz"
            />
          </div>
        )}

        {role === "guide" && (
          <>
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                Ad
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Adınız"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                Soyad
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Soyadınız"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3 text-base font-semibold text-white hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
        >
          {loading ? "Gönderiliyor..." : "Kayıt ol"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Zaten hesabınız var mı?{" "}
          <Link href="/login" className="font-semibold text-blue-600 hover:text-cyan-600 transition-colors">
            Giriş yapın
          </Link>
        </p>
      </div>
    </div>
  );
}
