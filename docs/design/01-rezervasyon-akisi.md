# v0 Tasarım Brief – 1. Rezervasyon akışı

**Sıra:** PROJECT_PHASES.md → v0 önerilen tasarım sırası, madde 1.  
**Amaç:** Rehberin katalogdan otele rezervasyon göndermesi, otelin onay/red etmesi akışındaki ekranların tutarlı ve modern tasarımı.

---

## Akış özeti

1. **Rehber** katalogda otel seçer → otel detay sayfasına girer.
2. Otel detayda **oda tipi, giriş/çıkış, oda sayısı, misafir sayısı** ile rezervasyon formunu doldurur, gönderir.
3. Rehber **rezervasyon listesi**nde talebini görür (kod, otel, oda, tarihler, durum: pending/approved/rejected).
4. **Otel** kendi **rezervasyon listesi**nde gelen talebi görür; **Onayla** veya **Reddet** ile yanıtlar.

Tüm sayfalar birbiri ile uyumlu olmalı (renk, tipografi, bileşenler, boşluklar).

---

## Ekranlar ve mevcut konumlar

| Ekran | Rol | Route | Dosya (referans) |
|-------|-----|--------|-------------------|
| Otel detay (katalog) | Rehber, Admin | `/dashboard/catalog/[id]` | `app/(dashboard)/dashboard/catalog/[id]/page.tsx` |
| Rezervasyon formu | Rehber | Aynı sayfada, alt blok | `app/(dashboard)/dashboard/catalog/[id]/BookForm.tsx` |
| Rezervasyon listesi (rehber) | Rehber | `/dashboard/reservations` | `app/(dashboard)/dashboard/reservations/page.tsx` |
| Rezervasyon listesi (otel) | Otel | `/dashboard/reservations` | Aynı sayfa; otel için sütunlar + Onayla/Reddet (ReservationActions) |

---

## 1. Otel detay sayfası (katalog)

- **Görünen:** Otel adı, yıldız, açıklama, adres/şehir/bölge, telefon, web, olanaklar.
- **Oda tipleri tablosu:** Tip, adet, fiyat (₺).
- **Müsaitlik sorgu:** Tarih seçip o gün oda bazlı müsait adet gösteren blok (AvailabilityCheck).
- **Rezervasyon formu (sadece rehber):** Oda tipi (select), giriş/çıkış (date), oda sayısı, misafir sayısı (ops.), "Rezervasyon isteği gönder" butonu. Gönderince `/dashboard/reservations`'a yönlendirme.
- **Navigasyon:** "← Katalog" linki.

---

## 2. Rezervasyon formu (blok)

- **Alanlar:** Oda tipi (dropdown), giriş tarihi, çıkış tarihi, oda sayısı (number), misafir sayısı (opsiyonel).
- **Aksiyon:** Gönder → API `POST /api/reservations`; başarıda `/dashboard/reservations`'a git.
- **Hata:** API hata dönerse form altında mesaj göster.

---

## 3. Rezervasyon listesi (rehber görünümü)

- **Tablo sütunları:** Kod (OP-xxx), Otel, Oda, Giriş, Çıkış, Adet, Durum (pending / approved / rejected).
- **Navigasyon:** "← Dashboard", başlık "Rezervasyonlarım".

---

## 4. Rezervasyon listesi (otel görünümü)

- **Tablo sütunları:** Kod, Rehber (ad soyad), Oda, Giriş, Çıkış, Adet, Durum, **İşlem**.
- **İşlem:** Sadece `pending` satırlarda "Onayla" ve "Reddet" butonları; tıklanınca `PATCH /api/reservations/[id]` (status: approved | rejected), sonra sayfa yenilenir.

---

## Teknik referans (v0 + repo uyumu)

- **Layout:** Dashboard layout (`app/(dashboard)/layout.tsx`) içinde; sidebar/nav mevcut.
- **Auth:** Sayfalar `getServerSession` ile korunuyor; rehber/otel rolüne göre içerik değişiyor.
- **Stil:** Proje Tailwind + shadcn/ui kullanıyor; v0 çıktısı aynı token'larla uyumlu tutulabilir.

---

## Neden İngilizce prompt?

v0.app modelleri UI ve bileşen tariflerini **İngilizce** ile daha iyi eşleştirir. Türkçe prompt verirsen bileşen isimleri, layout ve stil tutarsız olabilir. Bu yüzden aşağıdaki metinler **İngilizce**; v0'a olduğu gibi kopyala-yapıştır için. Arayüz metinleri (buton, başlık) Türkçe kalacaksa prompt içinde tırnak içinde yaz (aşağıdaki örneklerde olduğu gibi).

---

## Copy-paste prompts for v0 (English)

Aşağıdaki her kutu v0'a **tek seferde** yapıştırılacak. Ekran sırasıyla kullan. Tutarlılık için ilk ekranı ürettikten sonra sonraki prompt'ların başına ekle: *"Same design system: colors, typography, border radius, and card style as the previous hotel detail page."*

---

### Prompt 1 — Hotel detail page (catalog)

```
Dashboard page for a hotel detail view. Next.js 14, React, Tailwind CSS.

- Top: back link "← Katalog" (link to catalog list).
- Main card: hotel name as h1, then star rating (e.g. "4 yıldız"), short description paragraph.
- Grid (2 cols on sm): Address, City, Region, Phone, Website (external link). Labels in Turkish: Adres, Şehir, Bölge, Telefon, Web sitesi.
- Section "Olanaklar" (Amenities): comma-separated list.
- Section "Oda tipleri" (Room types): table with columns Tip (room type name), Adet (count), Fiyat (price with ₺). Example rows: Double, 10, 1500 ₺.
- Section for availability check: label "Müsaitlik sorgula", date input, button "Sorgula", then a small table or list showing room type and available count for that date.
- Booking form block (distinct background, e.g. blue-50): heading "Rezervasyon yap". Form: select "Oda tipi" (room type options), date inputs "Giriş" and "Çıkış", number input "Oda sayısı", optional number "Misafir sayısı (ops.)", primary button "Rezervasyon isteği gönder". Show inline error message below form if any.
- Use consistent spacing, rounded corners, subtle borders. No sidebar in this component; it sits inside a dashboard layout.
```

---

### Prompt 2 — Reservation form (standalone block, same style)

```
A compact booking form block for a Next.js dashboard. Tailwind CSS. Same visual style as the hotel detail card (rounded border, padding, light background).

Fields: Room type (select dropdown), Check-in date (date input), Check-out date (date input), Room count (number, min 1), Guest count (number, optional). Labels in Turkish: Oda tipi, Giriş, Çıkış, Oda sayısı, Misafir sayısı (ops.). Primary submit button: "Rezervasyon isteği gönder". Error message area below the form. Layout: vertical stack, responsive.
```

---

### Prompt 3 — Reservations list (guide view)

```
Dashboard page: reservations list for a guide. Next.js 14, Tailwind.

- Top: back link "← Dashboard", then heading "Rezervasyonlarım".
- White card with table. Columns: Kod (monospace, e.g. OP-XXX), Otel (hotel name), Oda (room type), Giriş (date), Çıkış (date), Adet (number), Durum (status: pending / approved / rejected). Use subtle row borders and thead background.
- Empty state: "Rezervasyon yok." inside the card.
- Clean, minimal table design; no action buttons in this view.
```

---

### Prompt 4 — Reservations list (hotel view, with actions)

```
Dashboard page: reservations list for a hotel. Next.js 14, Tailwind. Same table style as the guide reservations list.

- Top: back link "← Dashboard", heading "Rezervasyonlar".
- Table columns: Kod, Rehber (guide full name), Oda, Giriş, Çıkış, Adet, Durum, İşlem (actions).
- In "İşlem" column: for rows with status "pending", show two buttons side by side — "Onayla" (green/primary) and "Reddet" (red/destructive). For non-pending rows show "—" or nothing.
- Keep button size small (e.g. text-xs, px-2 py-1) so the table stays readable.
- Empty state: "Rezervasyon yok."
```

---

## Tutarlılık için

İlk ekranı v0'da ürettikten sonra, 2–4 numaralı prompt'ların **başına** şunu ekle: *"Same design system: colors, typography, border radius, and card style as the previous hotel detail page."* Böylece tüm sayfalar uyumlu görünür.
