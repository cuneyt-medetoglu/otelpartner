# Geliştirme Durumu (Tek Kaynak)

**Son güncelleme:** 15 Şubat 2026  
**Güncelleyen:** Project Manager

---

## Şu anki faz

**Faz 3 – Otel Profili ve Oda Yönetimi** (sıradaki)

---

## Şu anki görev

**Faz 3 – Oda tipleri tamamlandı, doluluk sırada**

- **Yapılan:** Otel profil + oda tipleri (Room model, migration, GET/POST `/api/hotel/rooms`, `/dashboard/otel/rooms`, Dashboard’da “Oda tipleri” linki).
- **Sıradaki:** Doluluk/müsaitlik (tarih bazlı müsait adet veya bloke).

---

## Devam eden (şu an üzerinde çalışılan)

- Yok.

---

## Sıradaki görevler (Faz 3)

- ~~Otel profil API ve sayfa~~ ✓
- ~~Oda tipi tanımlama (şema + API + UI)~~ ✓
- Doluluk/müsaitlik yönetimi

Tam liste: `docs/PROJECT_PHASES.md` → Faz 3.

---

## Notlar

- Faz 0 tamamlandı (dokümantasyon + GitHub repo). Tasarım maddeleri ilgili fazlara taşındı: Admin dashboard tasarımı → Faz 2, Otel katalog tasarımı → Faz 5, Rezervasyon akış tasarımı → Faz 6; mobil responsive → Faz 10.
- Veri modeli şemaları = DATA_STRUCTURE.md ile uyumlu ER diyagramı (Mermaid); Faz 1’de veritabanı şeması ile birlikte yapılacak.
- Veritabanı: AWS EC2’de PostgreSQL; lokal bağlantı SSH tünel (`npm run ssh:tunnel`) ile localhost:5433. Migration uygulandı, uygulama çalışıyor.
- Bu dosya her "görev tamamlandı" veya "şu göreve geçiyoruz" bildiriminde Project Manager tarafından güncellenir.
