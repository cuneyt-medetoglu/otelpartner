# Geliştirme Durumu (Tek Kaynak)

**Son güncelleme:** 15 Şubat 2026  
**Güncelleyen:** Project Manager

---

## Şu anki faz

**Faz 1 – Temel Altyapı ve Kullanıcı Yönetimi**

---

## Şu anki görev

**Faz 1 test ve (isteğe bağlı) şifre sıfırlama / Faz 2’ye geçiş**

- NextAuth (Credentials), middleware, Login/Register, Dashboard tamamlandı. Ana sayfada Giriş/Kayıt ol linkleri var; `/dashboard` korumalı.
- Sıradaki: `.env`’de `NEXTAUTH_SECRET` doldurulması; giriş testi (ilk admin veya pending kullanıcıyı DB’de `active` yapma); ardından Faz 2 (Admin paneli – bekleyen kayıtları onaylama).

---

## Devam eden (şu an üzerinde çalışılan)

- Yok.

---

## Sıradaki görevler (Faz 1 içinde)

1. ~~Proje kurulumu, Veritabanı şeması, migration~~ ✓
2. ~~Authentication (NextAuth.js) ve rol bazlı middleware~~ ✓
3. ~~Layout (Auth, Dashboard)~~ ✓
4. ~~Login / Register sayfaları ve form validasyonu (Zod)~~ ✓
5. Otel ve Rehber kayıt akışı (register API ile yapılıyor; onay için Faz 2 gerekli), şifre sıfırlama (isteğe bağlı)

Tam liste: `docs/PROJECT_PHASES.md` → Faz 1.

---

## Notlar

- Faz 0 tamamlandı (dokümantasyon + GitHub repo). Tasarım maddeleri ilgili fazlara taşındı: Admin dashboard tasarımı → Faz 2, Otel katalog tasarımı → Faz 5, Rezervasyon akış tasarımı → Faz 6; mobil responsive → Faz 10.
- Veri modeli şemaları = DATA_STRUCTURE.md ile uyumlu ER diyagramı (Mermaid); Faz 1’de veritabanı şeması ile birlikte yapılacak.
- Veritabanı: AWS EC2’de PostgreSQL; lokal bağlantı SSH tünel (`npm run ssh:tunnel`) ile localhost:5433. Migration uygulandı, uygulama çalışıyor.
- Bu dosya her "görev tamamlandı" veya "şu göreve geçiyoruz" bildiriminde Project Manager tarafından güncellenir.
