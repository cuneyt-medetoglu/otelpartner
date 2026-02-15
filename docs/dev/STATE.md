# Geliştirme Durumu (Tek Kaynak)

**Son güncelleme:** 15 Şubat 2026  
**Güncelleyen:** Project Manager

---

## Şu anki faz

**Faz 6 – Rezervasyon Sistemi** (başlatıldı)

---

## Şu anki görev

**Faz 6 – Rezervasyon oluşturma, listeleme ve onay/red (tamamlandı)**

- **Yapılan:** Reservation modeli; GET/POST `/api/reservations`; katalog otel detayda rehber için “Rezervasyon yap” formu; `/dashboard/reservations` (rehber + otel listesi); PATCH `/api/reservations/[id]` (sadece otel, status: approved | rejected, opsiyonel rejectionReason); rezervasyon listesinde otel için bekleyen satırlarda “Onayla” / “Reddet” butonları.
- **Sıradaki:** Rezervasyon kodu/QR (opsiyonel), rezervasyon detay sayfası, iptal.

---

## Devam eden (şu an üzerinde çalışılan)

- Yok.

---

## Sıradaki görevler (Faz 6)

- ~~Rezervasyon model + API (oluştur, liste)~~ ✓
- ~~Rezervasyon formu + liste sayfası~~ ✓
- ~~Onay/red API + otel tarafında butonlar~~ ✓
- Rezervasyon kodu / QR (opsiyonel)

Tam liste: `docs/PROJECT_PHASES.md` → Faz 3.

---

## Notlar

- Faz 0 tamamlandı (dokümantasyon + GitHub repo). Tasarım maddeleri ilgili fazlara taşındı: Admin dashboard tasarımı → Faz 2, Otel katalog tasarımı → Faz 5, Rezervasyon akış tasarımı → Faz 6; mobil responsive → Faz 10.
- Veri modeli şemaları = DATA_STRUCTURE.md ile uyumlu ER diyagramı (Mermaid); Faz 1’de veritabanı şeması ile birlikte yapılacak.
- Veritabanı: AWS EC2’de PostgreSQL; lokal bağlantı SSH tünel (`npm run ssh:tunnel`) ile localhost:5433. Migration uygulandı, uygulama çalışıyor.
- Bu dosya her "görev tamamlandı" veya "şu göreve geçiyoruz" bildiriminde Project Manager tarafından güncellenir.
