# Geliştirme Durumu (Tek Kaynak)

**Son güncelleme:** 15 Şubat 2026  
**Güncelleyen:** Project Manager

---

## Şu anki faz

**Faz 4 – Görünürlük ve Yetkilendirme** (başlatıldı)

---

## Şu anki görev

**Faz 4 – Otel katalogda listeleme (ilk dilim tamamlandı)**

- **Yapılan:** Hotel.listed alanı, migration, GET `/api/admin/hotels`, PATCH `/api/admin/hotels/[id]` (listed), `/dashboard/admin/visibility` sayfası (Evet/Hayır toggle), Admin panelde “Otel görünürlük” linki. NOTES’a “DB/tünel hatalarında kullanıcıya sor” notu eklendi.
- **Sıradaki:** Faz 4’te bölgesel kısıtlama / rehber yetkisi (isteğe bağlı) veya Faz 5 (Otel katalog).

---

## Devam eden (şu an üzerinde çalışılan)

- Yok.

---

## Sıradaki görevler (Faz 4)

- ~~Otel görünürlük: katalogda listele (listed) + admin sayfa~~ ✓
- Bölgesel kısıtlama / rehber yetkisi (opsiyonel)

Tam liste: `docs/PROJECT_PHASES.md` → Faz 3.

---

## Notlar

- Faz 0 tamamlandı (dokümantasyon + GitHub repo). Tasarım maddeleri ilgili fazlara taşındı: Admin dashboard tasarımı → Faz 2, Otel katalog tasarımı → Faz 5, Rezervasyon akış tasarımı → Faz 6; mobil responsive → Faz 10.
- Veri modeli şemaları = DATA_STRUCTURE.md ile uyumlu ER diyagramı (Mermaid); Faz 1’de veritabanı şeması ile birlikte yapılacak.
- Veritabanı: AWS EC2’de PostgreSQL; lokal bağlantı SSH tünel (`npm run ssh:tunnel`) ile localhost:5433. Migration uygulandı, uygulama çalışıyor.
- Bu dosya her "görev tamamlandı" veya "şu göreve geçiyoruz" bildiriminde Project Manager tarafından güncellenir.
