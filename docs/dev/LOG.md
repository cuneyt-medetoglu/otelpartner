# Geliştirme Logu (Kronolojik)

En güncel en altta.

---

## 2025-02-15 (Faz 6 – QR kod)

- **QR kod**
  - Paket: `qrcode` + `@types/qrcode`.
  - **GET /api/reservations/[id]/qr:** Rezervasyon kodunu QR olarak PNG döndürür. Yetki: rehber kendi, otel kendi oteli.
  - Rezervasyon detay sayfasında **ReservationQRCard:** QR görseli, "Müşteriye verin – check-in'de otel tarayacak" metni, "PNG indir" butonu.
- **Dokümantasyon:** PROJECT_PHASES (QR backend + frontend [x]), STATE, LOG güncellendi. Faz 6 tamamlandı; Faz 7’ye geçilebilir.

---

## 2025-02-15 (Faz 6 kalan)

- **Rezervasyon detay sayfası**
  - `/dashboard/reservations/[id]`: Rezervasyon kodu, durum, otel/rehber (role göre), oda tipi, giriş–çıkış, oda adedi, misafir sayısı (ops.), toplam tutar (ops.), oluşturulma, red gerekçesi (rejected ise). Rol bazlı erişim (rehber kendi, otel kendi oteli).
  - `ReservationDetailActions`: Rehber için "İptal et" (pending/approved); otel için Onayla/Reddet (pending) ve "İptal et" (pending/approved).
- **Rezervasyon iptal**
  - PATCH `/api/reservations/[id]`: `status: "cancelled"` eklendi. Rehber kendi rezervasyonunu (pending/approved), otel kendi otelindeki rezervasyonu (pending/approved) iptal edebilir.
  - Liste sayfasında durum badge: "İptal edildi" (cancelled) eklendi.
- **Liste → detay**
  - Rezervasyon listesinde koda tıklanınca `/dashboard/reservations/[id]` sayfasına link verildi.
- **Dokümantasyon:** STATE, PROJECT_PHASES (Faz 6 detay + iptal checkbox’ları), LOG güncellendi.

---

## 2025-02-15 (önceki)

- **v0.app Adım 8 – Admin paneli tamamlandı**
  - Admin ana sayfa ve Görünürlük sayfası mevcut tasarım diline getirildi (geri link + ok, text-3xl başlık, rounded-xl kartlar, istatistik kartları, tablolar, Onayla/Reddet, Askıya al/Aktifleştir, Evet/Hayır toggle).
  - Dosyalar: `admin/page.tsx`, `AllUsersSection.tsx`, `PendingUserActions.tsx`, `admin/visibility/page.tsx`, `HotelListedToggle.tsx`.
  - v0’a Adım 8 prompt’u gönderildi; v0 mevcut kodun prompt ile uyumlu olduğunu tespit edip ek değişiklik yapmadı (önceki oturumda tasarım zaten uygulanmıştı).
- **Dokümantasyon güncellendi**
  - `docs/dev/STATE.md` oluşturuldu (mevcut faz, v0 ilerlemesi, sıradaki görevler).
  - `docs/dev/LOG.md` oluşturuldu.
  - `docs/PROJECT_PHASES.md`: v0 ile tamamlanan tasarım maddeleri işaretlendi (Faz 2 Admin, Faz 5 Katalog, Faz 6 Rezervasyon).
  - `docs/dev/ROADMAP.md`: mevcut odak ve faz özeti güncellendi.
  - `docs/INDEX.md`: proje durumu özeti güncellendi.

---

## Önceki ilerleme (özet)

- **Faz 1–5:** Altyapı, auth, admin, otel/oda/doluluk, görünürlük (listed), katalog ve otel detay API + sayfalar tamamlandı.
- **Faz 6:** Rezervasyon oluşturma, listeleme (rehber/otel), onay/red tamamlandı.
- **v0 Adım 1–7:** Login, Register, Dashboard, Katalog, Otel detay, Rezervasyonlar, Otel paneli (profil/oda/doluluk) modern tasarım diline getirildi.

Detaylı faz listesi: **docs/PROJECT_PHASES.md**.
