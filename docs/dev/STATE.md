# Geliştirme Durumu (Tek Kaynak)

**Son güncelleme:** 15 Şubat 2026  
**Güncelleyen:** Project Manager

---

## Şu anki faz

**Faz 5 – Otel Katalog ve Detay** (başlatıldı)

---

## Şu anki görev

**Faz 5 – Katalog (rehber) tamamlandı**

- **Yapılan:** Katalog API’leri + sayfalar + **müsaitlik**: GET `/api/catalog/hotels/[id]/availability?date=`, otel detay sayfasında “Müsaitlik sorgula” (tarih seç, Sorgula, oda tipi × müsait adet tablosu).
- **Sıradaki:** Faz 6 (Rezervasyon) veya diğer iyileştirmeler.

---

## Devam eden (şu an üzerinde çalışılan)

- Yok.

---

## Sıradaki görevler (Faz 5)

- ~~Otel listeleme API + filtre~~ ✓
- ~~Otel detay API~~ ✓
- ~~Rehber katalog sayfası (liste + detay)~~ ✓
- ~~Müsaitlik sorgula (tarih, oda bazlı)~~ ✓

Tam liste: `docs/PROJECT_PHASES.md` → Faz 3.

---

## Notlar

- Faz 0 tamamlandı (dokümantasyon + GitHub repo). Tasarım maddeleri ilgili fazlara taşındı: Admin dashboard tasarımı → Faz 2, Otel katalog tasarımı → Faz 5, Rezervasyon akış tasarımı → Faz 6; mobil responsive → Faz 10.
- Veri modeli şemaları = DATA_STRUCTURE.md ile uyumlu ER diyagramı (Mermaid); Faz 1’de veritabanı şeması ile birlikte yapılacak.
- Veritabanı: AWS EC2’de PostgreSQL; lokal bağlantı SSH tünel (`npm run ssh:tunnel`) ile localhost:5433. Migration uygulandı, uygulama çalışıyor.
- Bu dosya her "görev tamamlandı" veya "şu göreve geçiyoruz" bildiriminde Project Manager tarafından güncellenir.
