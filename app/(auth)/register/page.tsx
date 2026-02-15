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
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h1 className="text-xl font-semibold text-gray-900">Kayıt ol</h1>
      <p className="mt-1 text-sm text-gray-500">Admin onayından sonra giriş yapabilirsiniz.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {message && (
          <p className={message.type === "ok" ? "text-sm text-green-600" : "text-sm text-red-600"}>{message.text}</p>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">Hesap türü</label>
          <div className="mt-1 flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="role" checked={role === "hotel"} onChange={() => setRole("hotel")} />
              Otel
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="role" checked={role === "guide"} onChange={() => setRole("guide")} />
              Rehber
            </label>
          </div>
        </div>
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
            Şifre (en az 6 karakter)
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        {role === "hotel" && (
          <div>
            <label htmlFor="hotelName" className="block text-sm font-medium text-gray-700">
              Otel adı
            </label>
            <input
              id="hotelName"
              type="text"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        )}
        {role === "guide" && (
          <>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                Ad
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Soyad
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Gönderiliyor..." : "Kayıt ol"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Zaten hesabınız var mı?{" "}
        <Link href="/login" className="font-medium text-blue-600 hover:underline">
          Giriş yapın
        </Link>
      </p>
    </div>
  );
}
