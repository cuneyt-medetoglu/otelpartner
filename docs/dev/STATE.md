# Geliştirme Durumu (Tek Kaynak)

**Son güncelleme:** 15 Şubat 2026  
**Güncelleyen:** Project Manager

---

## Şu anki faz

**Faz 5 – Otel Katalog ve Detay** (başlatıldı)

---

## Şu anki görev

**Faz 5 – Katalog (rehber) tamamlandı**

- **Yapılan:** GET `/api/catalog/hotels` (listed, filtre: region, city, starRating), GET `/api/catalog/hotels/[id]` (detay + odalar), `/dashboard/catalog` (liste, filtre formu), `/dashboard/catalog/[id]` (otel detay), middleware ile katalog sadece guide/admin, Dashboard’da rehber için “Otel kataloğu” linki.
- **Sıradaki:** Faz 5’te müsaitlik gösterimi / tarih seçimi (opsiyonel) veya Faz 6 (Rezervasyon).

---

## Devam eden (şu an üzerinde çalışılan)

- Yok.

---

## Sıradaki görevler (Faz 5)

- ~~Otel listeleme API + filtre~~ ✓
- ~~Otel detay API~~ ✓
- ~~Rehber katalog sayfası (liste + detay)~~ ✓
- Müsaitlik / tarih (opsiyonel); v0 tasarım (opsiyonel)

Tam liste: `docs/PROJECT_PHASES.md` → Faz 3.

---

## Notlar

- Faz 0 tamamlandı (dokümantasyon + GitHub repo). Tasarım maddeleri ilgili fazlara taşındı: Admin dashboard tasarımı → Faz 2, Otel katalog tasarımı → Faz 5, Rezervasyon akış tasarımı → Faz 6; mobil responsive → Faz 10.
- Veri modeli şemaları = DATA_STRUCTURE.md ile uyumlu ER diyagramı (Mermaid); Faz 1’de veritabanı şeması ile birlikte yapılacak.
- Veritabanı: AWS EC2’de PostgreSQL; lokal bağlantı SSH tünel (`npm run ssh:tunnel`) ile localhost:5433. Migration uygulandı, uygulama çalışıyor.
- Bu dosya her "görev tamamlandı" veya "şu göreve geçiyoruz" bildiriminde Project Manager tarafından güncellenir.
