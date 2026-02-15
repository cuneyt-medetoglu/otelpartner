# Geliştirme Durumu (Tek Kaynak)

**Son güncelleme:** 15 Şubat 2026  
**Güncelleyen:** Project Manager

---

## Şu anki faz

**Faz 1 – Temel Altyapı ve Kullanıcı Yönetimi**

---

## Şu anki görev

**Proje kurulumu (Next.js + Tailwind + shadcn/ui + Prisma)**

- İlk adım: Next.js projesi oluşturma, TypeScript, Tailwind, shadcn/ui kurulumu.
- Sonra: PostgreSQL + Prisma schema (User, Hotel, Guide), Auth altyapısı.

---

## Devam eden (şu an üzerinde çalışılan)

- Yok (henüz geliştirme başlamadı).

---

## Sıradaki görevler (Faz 1 içinde)

1. Proje kurulumu (Next.js, Tailwind, shadcn/ui, Prisma)
2. Veritabanı şeması (User, Hotel, Guide, Admin) ve ilk migration
3. Authentication (NextAuth.js) ve rol bazlı middleware
4. Layout (Auth, Dashboard)
5. Login / Register sayfaları ve form validasyonu (Zod)
6. Otel ve Rehber kayıt akışı, şifre sıfırlama

Tam liste: `docs/PROJECT_PHASES.md` → Faz 1.

---

## Notlar

- Faz 0 tamamlandı (dokümantasyon + GitHub repo). Tasarım maddeleri ilgili fazlara taşındı: Admin dashboard tasarımı → Faz 2, Otel katalog tasarımı → Faz 5, Rezervasyon akış tasarımı → Faz 6; mobil responsive → Faz 10.
- Veri modeli şemaları = DATA_STRUCTURE.md ile uyumlu ER diyagramı (Mermaid); Faz 1’de veritabanı şeması ile birlikte yapılacak.
- Bu dosya her "görev tamamlandı" veya "şu göreve geçiyoruz" bildiriminde Project Manager tarafından güncellenir.
