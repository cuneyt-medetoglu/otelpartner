# v0.app ile OtelPartner UI – Adım Adım Plan

Sırayla her adımı yapıyoruz. **Tüm prompt’larda aşağıdaki “Sistem özeti” ve “Tasarım yönü” kullanılacak** ki v0 platformu ve sonraki ekranları hayal edebilsin; tutarlı, modern bir yapı çıksın.

---

## Geldiğimiz nokta (Özet)

| Adım | Durum | Not |
|------|--------|-----|
| **Adım 1 – Login** | Tamamlandı | Modern tasarım (gradient arka plan, kart, ikon). Auth layout: header + footer (OtelPartner ©, Gizlilik, İletişim). NextAuth bağlı. |
| **Adım 2 – Register** | Tamamlandı | Aynı tasarım dili; Hesap türü (Otel/Rehber), koşullu alanlar. POST /api/auth/register bağlı. |
| **Adım 3 – Dashboard** | Tamamlandı | Layout: spacer + fixed sidebar, gradient arka plan. Sidebar: logo, rol bazlı menü, email, Çıkış yap. Ana sayfa: hoş geldin kartı, rol bazlı hızlı erişim kartları. Responsive: mobilde hamburger + overlay drawer; içerik drawer altına girmiyor. Ana sayfadaki çıkış kartı kaldırıldı (çıkış sadece sidebar’da). |
| **Adım 4 – Katalog** | Tamamlandı | Filtreler kartı (Bölge, Şehir, Yıldız, Uygula), otel kartları grid (rounded-xl, shadow-lg, yıldız badge, ok ikonu), boş durum kartı. Prisma + searchParams korundu. |
| **Adım 5 – Otel detay** | Tamamlandı | Geri link (ok + Katalog), otel adı (text-3xl), bilgi kartı (yıldız badge, açıklama, adres grid, olanaklar), oda tipleri tablosu, Müsaitlik sorgula (kart + gradient buton), Rezervasyon yap (mavi-50 kart, gradient buton). BookForm + AvailabilityCheck stilleri güncellendi. |
| **Adım 6 – Rezervasyonlar** | Tamamlandı | Geri link (ok + Dashboard), başlık rol bazlı (Rezervasyonlarım / Rezervasyonlar), beyaz kart içinde tablo, durum badge’leri (Bekliyor/Onaylandı/Reddedildi), otel için Onayla/Reddet (rounded-lg). ReservationActions stilleri güncellendi. |

**Dosyalar:** `app/(auth)/layout.tsx`, `app/(auth)/login/page.tsx`, `app/(auth)/register/page.tsx`, `app/(dashboard)/layout.tsx`, `app/(dashboard)/DashboardSidebar.tsx`, `app/(dashboard)/dashboard/page.tsx`, `app/(dashboard)/dashboard/catalog/page.tsx`, `app/(dashboard)/dashboard/catalog/CatalogFilters.tsx`, `app/(dashboard)/dashboard/catalog/[id]/page.tsx`, `app/(dashboard)/dashboard/catalog/[id]/AvailabilityCheck.tsx`, `app/(dashboard)/dashboard/catalog/[id]/BookForm.tsx`, `app/(dashboard)/dashboard/reservations/page.tsx`, `app/(dashboard)/dashboard/reservations/ReservationActions.tsx`.

---

## Sistem özeti (PRD – v0’ın anlaması için)

**OtelPartner** = Oteller ve tur rehberleri için B2B yönlendirme platformu. Son kullanıcı yok; sadece kayıtlı otel ve rehberler kullanır.

- **Roller:** Admin (tüm sistem), Hotel (oda/doluluk, rezervasyon onayı, raporlar), Guide (müsait otellere rezervasyon, yönlendirme listesi).
- **Ana ekranlar (hayal et):** Login → Register → Dashboard (rol bazlı) → Katalog (otel listesi) → Otel detay (rezervasyon formu) → Rezervasyonlar (liste, onay/red) → Otel paneli (profil, oda tipleri, doluluk) → Admin (kullanıcılar, görünürlük, raporlar).
- **Ton:** Profesyonel, güven veren, kurumsal ama **canlı**; otel / seyahat sektörüne uygun.

Bu özeti **her v0 prompt’unun başında** (kısaltılmış veya tam) kullan; böylece v0 “hangi ürün, kim kullanıyor, sonraki sayfalar ne” anlar ve tasarımı buna göre tutarlı üretir.

---

## Tasarım yönü (sade değil – modern ve çarpıcı)

- **Sade / düz tasarım istemiyoruz.** Hedef: **Harika, modern**, görsel olarak zengin arayüz.
- **Ne yapılacak (v0 prompt’larında belirt):**
  - **Derinlik:** Gradient arka planlar (hafif mavi–gri veya marka renkleri), kartlarda belirgin gölge (shadow-lg / xl), katman hissi.
  - **Görsel ilgi:** Uygun yerlerde illüstrasyon, ikon veya dekoratif öğe; boş alanlar “düz gri kutu” olmasın.
  - **Tipografi:** Net hiyerarşi; büyük, güçlü başlıklar; alt metin okunaklı.
  - **Renk:** Mavi ana marka rengi olabilir ama tek başına yetmez; vurgular, hover’da canlılık, gerekirse hafif ikincil renk (örn. turkuaz, lacivert) kullanılsın.
  - **Footer / Header:** Her sayfada aynı dil; footer sadece metin değil, hafif çizgi veya arka plan ile ayrılsın; header logo + net navigasyon hissi.
- **Sonraki sayfalar:** Register, Dashboard, Katalog vb. **aynı modern dilde** olacak; “Login ile aynı modern, gradient/gölge/derinlik dilini kullan” diye referans verilecek.

Bu blok, **sonraki her sayfa prompt’unda** “Design direction” veya “Visual style” diye tekrarlanacak veya kısaca “Same modern, non-plain design as Login” denerek referans verilecek.

---

## Adım 1 – Login sayfası (Tamamlandı)

### Ne yapacaksın (3 adım)

1. **Şunu kopyala** → Aşağıdaki **"Adım 1 – Kopyalanacak metin (modern)"** kutusundaki metnin **tamamını** kopyala.
2. **v0’a yapıştır** → [v0.dev](https://v0.dev) aç, yeni sohbet başlat, metni yapıştır, Enter.
3. **Çıkan kodu al** → v0 tasarımı beğenirsen "Copy code" ile kodu al; `app/(auth)/login/page.tsx` içeriğini bu kodla değiştir. (NextAuth entegrasyonunu sonra tekrar bağlarız.)

### Adım 1 – Kopyalanacak metin (modern)

**Bu kutunun tamamını v0 sohbet kutusuna yapıştır.**

```
OtelPartner is a B2B platform: hotels and tour guides use it to refer guests and manage reservations. Roles: Admin, Hotel, Guide. Screens: Login, Register, Dashboard (role-based), Catalog (hotel list), Hotel detail (booking form), Reservations, Hotel panel (profile, rooms, availability), Admin panel. Tone: professional, trustworthy, modern, suitable for travel/hospitality. All user-facing text in Turkish.

Design direction – we want a striking, modern UI, NOT plain or flat:
- Depth: subtle gradient backgrounds (e.g. blue-gray), cards with clear shadow (shadow-lg or similar) so they feel elevated.
- Visual interest: where it fits, use a small illustration, icon, or decorative element so the page feels designed, not empty.
- Typography: strong hierarchy, bold headline, readable body; avoid "just a form on gray".
- Color: blue as primary brand color is fine but add life – accent on hover, maybe a secondary tint (e.g. teal or deeper blue) so it doesn’t look flat.
- Header: clear "OtelPartner" logo/brand; footer: dark band (e.g. gray-800), copyright, placeholder links (Gizlilik, İletişim). Same style across auth pages.

---

Login page for OtelPartner. Public, standalone (no dashboard sidebar).

- Full-page layout with a subtle gradient or soft background (not plain gray).
- Centered card: white, rounded-xl, noticeable shadow (shadow-lg), padding p-6 or p-8 – it should feel like a clear, premium card.
- Headline: "Hesabınıza giriş yap" (or similar). Subtext: "OtelPartner hesabınızla giriş yapın." – typography should feel modern and confident.
- Form: Email (type email), Şifre (type password). Labels above, Turkish. Inputs with rounded border, good padding; optional focus ring in brand color.
- Primary button: "Giriş yap" – prominent, blue, with hover state.
- Below form: "Hesabınız yok mu? Kayıt ol" linking to /register.
- Include the shared header (OtelPartner logo) and footer (OtelPartner ©, Gizlilik, İletişim) so this page sets the visual language for Register and the rest of the app.
- Next.js, React, Tailwind CSS. App Router, single page component. UI only, no backend logic.
```

---

### Adım 1 – Nasıl test edilir?

1. `npm run dev` → `http://localhost:3000/login`
2. Görünüm: gradient/derinlik, belirgin kart gölgesi, header + footer.
3. Yanlış giriş → "Email veya şifre hatalı." (kodu yapıştırdıktan sonra NextAuth’u tekrar bağlamak gerekebilir).
4. Doğru giriş (örn. `admin@otelpartner.local` / `Admin123!`) → `/dashboard`.
5. "Kayıt ol" → `/register`.

### Sonuç (isteğe bağlı)

- **Projeye yapıştırdım:** —
- **Not:** —

---

## Adım 2 – Register sayfası (Tamamlandı)

### Ne yapacaksın (3 adım)

1. **Kopyala** → Aşağıdaki **"Adım 2 – Kopyalanacak metin"** kutusundaki metnin **tamamını** kopyala.
2. **v0’a yapıştır** → [v0.dev](https://v0.dev) aç (yeni sohbet veya aynı sohbet), metni yapıştır, Enter.
3. **Kodu projeye al** → v0’dan "Copy code" ile kodu kopyala. `app/(auth)/register/page.tsx` dosyasının **içeriğini** bu kodla değiştir. v0 sadece UI verir; kayıt API’sini (POST /api/auth/register) ve rol/alan mantığını sonra tekrar bağlarız.

### Adım 2 – Kopyalanacak metin

**Bu kutunun tamamını v0 sohbet kutusuna yapıştır.**

```
IMPORTANT: This may be a new v0 thread. You have no visual reference of the Login page – apply the design specs below exactly so Register looks like the same product (same design language, no drift).

OtelPartner is a B2B platform: hotels and tour guides use it to refer guests and manage reservations. Roles: Admin, Hotel, Guide. This is the Register page; must look like the same app as Login. Tone: professional, modern, travel/hospitality. All text in Turkish.

Design language (match Login exactly – these are the only styles to use):
- Card: white bg, rounded-xl, shadow-lg, border border-gray-100, padding p-8. Centered in layout (layout is separate; we only need the card content).
- Top of card: circular icon decoration, w-16 h-16, rounded-full, bg-gradient-to-br from-blue-500 to-cyan-500, shadow-md, with a simple icon inside (e.g. user-plus or document-text). Same as Login’s “house” icon style.
- Typography: headline text-3xl font-bold text-gray-900; subtext text-base text-gray-600; labels text-sm font-semibold text-gray-700 mb-2.
- Inputs: rounded-lg border border-gray-300 px-4 py-3, focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all.
- Primary button: w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600, hover:from-blue-700 hover:to-cyan-700, px-4 py-3 font-semibold text-white, shadow-md hover:shadow-lg, disabled:opacity-50.
- Link: font-semibold text-blue-600 hover:text-cyan-600 (e.g. "Giriş yapın"). Error block: rounded-lg bg-red-50 border border-red-200 p-4 text-red-700. Success: text-green-600.
- This component is only the card; header and footer come from the shared auth layout.

---

Register page – centered card content only (no header/footer in this component).

- Headline: "Kayıt ol". Subtext: "Admin onayından sonra giriş yapabilirsiniz."
- Form fields (Turkish labels):
  1. Hesap türü: two options side by side – "Otel" and "Rehber" (radio or toggle). Default: Otel.
  2. Email (type email), placeholder ornek@email.com.
  3. Şifre (type password), label "Şifre (en az 6 karakter)", placeholder dots.
  4. If "Otel" selected: one extra field "Otel adı" (text).
  5. If "Rehber" selected: two extra fields "Ad" and "Soyad" (text).
- Primary button: "Kayıt ol" (loading state: "Gönderiliyor...").
- Below form: "Zaten hesabınız var mı? Giriş yapın" linking to /login.
- Success message area: green text. Error message area: red background/border, red text (e.g. "Kayıt başarısız" or "Bağlantı hatası").
- Next.js, React, Tailwind CSS. Single client component. UI only – no API calls; we will wire submit handler later.
```

### Adım 2 – Nasıl test edilir?

1. `npm run dev` → `http://localhost:3000/register`
2. Görünüm: Login ile aynı layout (gradient arka plan, header, footer), ortada Register kartı; Hesap türü (Otel/Rehber), Email, Şifre; Otel seçilince "Otel adı", Rehber seçilince "Ad" ve "Soyad" görünmeli.
3. "Giriş yapın" linki → `/login` sayfasına gitmeli.
4. (v0 kodu yapıştırdıktan sonra) Formu doldurup "Kayıt ol" tıklayınca henüz API çağrısı olmayabilir; kodu aldıktan sonra mevcut `/api/auth/register` ve state mantığını tekrar bağlarız – o zaman gerçek kayıt testi yapılır.

### Sonuç (isteğe bağlı)

- **Projeye yapıştırdım:** —
- **Not:** —

---

## Adım 3 – Dashboard (layout + ana sayfa) (Tamamlandı)

### Ne yapacaksın (özet)

1. **Kopyala** → Aşağıdaki **"Adım 3 – Kopyalanacak metin"** kutusundaki metnin **tamamını** kopyala.
2. **v0’a yapıştır** → [v0.dev](https://v0.dev) (yeni sohbet), metni yapıştır, Enter.
3. **Kodu projeye al** → v0 büyük ihtimalle **iki parça** verecek: (a) Dashboard layout (sidebar + main alan), (b) Dashboard ana sayfa içeriği. Bunları sırayla projeye uygulayacağız:
   - **Layout** → `app/(dashboard)/layout.tsx` (mevcut session kontrolü ve `redirect` korunacak; v0’ın verdiği sidebar + main yapısı ve stiller kullanılacak).
   - **Ana sayfa** → `app/(dashboard)/dashboard/page.tsx` (hoş geldin, rol bazlı linkler, çıkış – session bilgisi korunacak).
4. v0 tek blok verirse: kodu paylaş, ben layout ile page’i ayırıp doğru dosyalara yazarım.

### Adım 3 – Kopyalanacak metin

**Bu kutunun tamamını v0 sohbet kutusuna yapıştır.**

```
IMPORTANT: New v0 thread. No visual reference – apply the design specs below exactly so Dashboard matches Login and Register (same product, same design language).

OtelPartner: B2B platform for hotels and tour guides (reservations, catalog, admin). Roles: admin, hotel, guide. All text in Turkish. This is the Dashboard: after login, user sees a sidebar + main content area. Design must match our Login/Register: gradient accents, rounded-xl cards, shadow-lg, blue-600 to cyan-600 buttons/links, white surfaces, gray-700 labels.

Design language (same as Login/Register):
- Background: subtle gradient (e.g. bg-gradient-to-br from-blue-50/100 via-slate-50 to-blue-100) or clean gray-50.
- Cards/surfaces: white, rounded-xl, shadow-lg, border-gray-100.
- Primary actions: bg-gradient-to-r from-blue-600 to-cyan-600, hover darker, shadow-md.
- Links: text-blue-600 hover:text-cyan-600 font-semibold.
- Typography: bold headlines (text-2xl or 3xl), body text-gray-600, labels font-semibold text-gray-700.

---

Part 1 – Dashboard layout (sidebar + main area).

- Left: fixed sidebar. White or very light bg, border-r border-gray-200, shadow-sm. Width ~64 or 72 (w-64 / w-72).
- Sidebar top: "OtelPartner" logo/brand (text-xl font-bold text-blue-600), optionally small icon.
- Sidebar nav: vertical list of links. Links change by user role (we will pass role from server). For now include all and we hide by role:
  - Admin: "Admin", "Otel görünürlük" (href /dashboard/admin, /dashboard/admin/visibility).
  - Hotel: "Otel profilim", "Oda tipleri", "Doluluk", "Rezervasyonlar" (href /dashboard/otel/profile, /dashboard/otel/rooms, /dashboard/otel/availability, /dashboard/reservations).
  - Guide: "Otel kataloğu", "Rezervasyonlarım" (href /dashboard/catalog, /dashboard/reservations).
- Sidebar bottom: user email (text-sm text-gray-600) and "Çıkış yap" link (href /api/auth/signout).
- Main area: right side, flex-1, padding p-6 or p-8, min-h-screen. This is where {children} render (page content).
- Layout is a wrapper: it receives children. Use Next.js App Router. Sidebar nav can be a client component that receives role as prop and shows the right links, or we can render different nav in server layout – your choice. Use Link from next/link.

---

Part 2 – Dashboard home page (content inside main area).

- Welcome section: headline "Hoş geldiniz" or "Dashboard", subtext with user email and role (e.g. "…@email.com – Rehber").
- Role-based quick links: same links as sidebar but as cards or prominent buttons (e.g. "Otel kataloğu", "Rezervasyonlarım" for guide). Each in a small card or button, same gradient button style or card with shadow-lg.
- Sign out: "Çıkış yap" link (href /api/auth/signout) at bottom or in card.
- This page receives session (user.email, user.role) – we will pass it from getServerSession in the real app; for v0 output use placeholder props or mock "user" so the layout is clear.
- Next.js, React, Tailwind. Server component for page is fine (we need session); if you need client interactivity keep it minimal.
```

### Adım 3 – Nasıl test edilir?

1. Giriş yap (örn. admin veya rehber) → `/dashboard`.
2. Sol tarafta sidebar: OtelPartner logosu, rolüne göre menü linkleri (Admin ise Admin / Otel görünürlük; Otel ise Otel profilim, Oda tipleri, Doluluk, Rezervasyonlar; Rehber ise Otel kataloğu, Rezervasyonlarım), altta email ve Çıkış yap.
3. Sağda ana alan: Hoş geldiniz metni, rol bazlı hızlı linkler (kart veya buton), çıkış linki.
4. Linklere tıklayınca ilgili sayfaya gitmeli (mevcut sayfalar henüz eski tasarımda olabilir; Dashboard shell ve ana sayfa modern olsun).

### Sonuç (isteğe bağlı)

- **Layout güncellendi:** —
- **Ana sayfa güncellendi:** —
- **Not:** —

---

## Sonraki yapılacaklar (sırayla; prompt her adımda eklenecek)

Aşağıdaki adımlar aynı yöntemle ilerleyecek: v0’a sistem özeti + tasarım dili + sayfa tarifi verilecek; çıkan kod ilgili dosyalara uygulanacak. **Prompt metni her adıma geçildiğinde bu dosyaya eklenecek.**

---

### Adım 4 – Katalog (otel listesi)

- **Hedef:** Rehber için otel listesi sayfası. Filtreler (bölge, şehir, yıldız), grid, modern kartlar.
- **Dosya(lar):** `app/(dashboard)/dashboard/catalog/page.tsx`; gerekirse `CatalogFilters.tsx` stilleri.
- **Not:** Dashboard layout zaten var; sadece bu sayfanın içeriği v0 ile yenilenecek. Veri Prisma + searchParams ile geliyor; mantık korunacak, sadece UI yenilenecek.

#### Ne yapacaksın (3 adım)

1. **Kopyala** → Aşağıdaki **"Adım 4 – Kopyalanacak metin"** kutusundaki metnin **tamamını** kopyala.
2. **v0’a yapıştır** → [v0.dev](https://v0.dev) (yeni sohbet), metni yapıştır, Enter.
3. **Kodu projeye al** → v0’dan gelen kodu `catalog/page.tsx` ve (ayrı component verirse) `CatalogFilters.tsx` için uygula. Veri çekme (prisma, searchParams) ve filtre mantığı projede kalacak; v0 sadece UI/stil. Kodu paylaşırsan ben entegre edebilirim.

#### Adım 4 – Kopyalanacak metin

**Bu kutunun tamamını v0 sohbet kutusuna yapıştır.**

```
IMPORTANT: New v0 thread. Apply the design specs below exactly so this page matches Login/Register/Dashboard (same product, same design language).

OtelPartner: B2B platform for hotels and tour guides. This is the Catalog page – list of hotels for guides. Page lives inside the dashboard (sidebar already exists); only output the main content area. All text in Turkish.

Design language (same as Dashboard):
- Background: page sits in dashboard main area (gradient bg from layout). Use white cards: rounded-xl, shadow-lg, border border-gray-100.
- Primary actions/links: text-blue-600 hover:text-cyan-600 font-semibold; or gradient buttons (from-blue-600 to-cyan-600).
- Typography: bold headlines (text-2xl), body text-gray-600, labels font-semibold text-gray-700.
- Inputs/selects: rounded-lg border border-gray-300 px-4 py-2, focus:ring-2 focus:ring-blue-500/20.

---

Catalog page – hotel list (main content only, no sidebar).

1. Top: Back link "← Dashboard" to /dashboard. Then headline "Otel kataloğu" (text-2xl or 3xl font-bold).

2. Filters section (card or bar): Form with GET method, action points to same page (we use query params). Fields:
   - "Bölge" (region) – text input, placeholder "Bölge"
   - "Şehir" (city) – text input, placeholder "Şehir"
   - "Yıldız" – select: options "Tüm yıldızlar" (value ""), then "1 yıldız", "2 yıldız" … "5 yıldız"
   - Submit button: "Uygula" – use gradient style (blue-600 to cyan-600) or solid blue. Form can be in a white rounded-xl card.

3. Hotel grid: Responsive grid (e.g. grid-cols-1 md:grid-cols-2 lg:grid-cols-3), gap-6. Each hotel is a card (Link to detail page):
   - Card: white bg, rounded-xl, shadow-lg, border-gray-100, padding p-6, hover:shadow-xl hover:border-blue-200.
   - Inside: Hotel name as heading (font-bold text-lg). Then one line: city, region (e.g. "İstanbul, Marmara"). Then if star rating: "X yıldız" (small badge or text). Optional: short description (line-clamp-2, text-gray-500). Arrow or "Detay →" to indicate link.
   - Cards are links (Link component) to /dashboard/catalog/[id] – use placeholder [id] or pass as prop; we will wire real data.

4. Empty state: When no hotels, show a friendly message in a card or centered: "Filtreye uyan otel bulunamadı." (gray-500 or gray-600).

5. Data: For v0 you can use 2–3 mock hotels (name, city, region, starRating, short description) so the layout and card design are clear. We will replace with real data from the server.

Next.js App Router, React, Tailwind. Prefer one page component; if you split filters into a separate component that's fine. Use Link from next/link.
```

#### Adım 4 – Nasıl test edilir?

1. Rehber veya admin ile giriş yap → Dashboard → "Otel kataloğu" (sidebar veya hızlı erişim).
2. Katalog sayfası: "← Dashboard", "Otel kataloğu" başlığı, filtre alanları (Bölge, Şehir, Yıldız, Uygula), otel kartları grid’i. Kartlara tıklayınca otel detay sayfasına gitmeli.
3. Filtre uygulayınca aynı sayfa query params ile yenilenmeli (mevcut mantık korunacak).
4. Hiç otel yoksa "Filtreye uyan otel bulunamadı." görünmeli.

#### Sonuç (isteğe bağlı)

- **Projeye uygulandı:** —
- **Not:** —

---

### Adım 5 – Otel detay (katalog)

- **Hedef:** Tek otel sayfası: bilgiler, oda tipleri tablosu, müsaitlik sorgula, rezervasyon formu (rehber için).
- **Dosya(lar):** `app/(dashboard)/dashboard/catalog/[id]/page.tsx`; isteğe bağlı `AvailabilityCheck.tsx`, `BookForm.tsx` stilleri.
- **Not:** Veri Prisma ile geliyor (hotel, rooms); BookForm ve AvailabilityCheck mevcut API’lere bağlı. v0 çıktısı ile sayfa layout’u ve stiller güncellenecek, mantık korunacak.

#### Ne yapacaksın (3 adım)

1. **Kopyala** → Aşağıdaki **"Adım 5 – Kopyalanacak metin"** kutusundaki metnin **tamamını** kopyala.
2. **v0’a yapıştır** → [v0.dev](https://v0.dev) (yeni sohbet), metni yapıştır, Enter.
3. **Kodu projeye al** → v0’dan gelen kodu paylaş; ben `page.tsx` ile birleştirip hotel/rooms verisi ve mevcut BookForm/AvailabilityCheck bileşenlerini koruyarak uygularım. v0 ayrı component stilleri verirse `AvailabilityCheck.tsx` ve `BookForm.tsx` de güncellenir.

#### Adım 5 – Kopyalanacak metin

**Bu kutunun tamamını v0 sohbet kutusuna yapıştır.**

```
IMPORTANT: New v0 thread. Apply the design specs below exactly so this page matches Login/Register/Dashboard/Catalog list (same product, same design language).

OtelPartner: B2B platform for hotels and tour guides. This is the Hotel detail page – single hotel view for guides (and admin). Page lives inside the dashboard; only output the main content area. All text in Turkish.

Design language (same as Dashboard and Catalog):
- White cards: rounded-xl, shadow-lg, border border-gray-100, padding p-6 or p-8.
- Headlines: text-2xl or 3xl font-bold. Section titles: text-lg font-bold text-gray-900.
- Labels: text-sm font-semibold text-gray-700. Body: text-gray-600.
- Primary button: rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600, hover darker, shadow-md.
- Inputs/selects: rounded-lg border border-gray-300 px-4 py-2, focus:ring-2 focus:ring-blue-500/20.
- Links: text-blue-600 hover:text-cyan-600 font-semibold. Back link with arrow icon.
- Tables: rounded-lg overflow-hidden, header bg-gray-50 or gray-100, cells px-4 py-3.

---

Hotel detail page – main content only (no sidebar). Use mock data: one hotel (e.g. "Örnek Otel"), 4 yıldız, short description, address, city, region, phone, website link, amenities list. Two room types (e.g. Double 10 adet 1500 ₺, Suite 5 adet 3000 ₺).

1. Top: Back link "← Katalog" to /dashboard/catalog (with arrow icon, blue/cyan hover). Then headline: hotel name (text-3xl font-bold).

2. Main info card (one white card):
   - Star rating: e.g. "4 yıldız" (small badge or text).
   - Description paragraph.
   - Grid (2 cols on sm): Adres, Şehir, Bölge, Telefon, Web sitesi (external link). Labels bold, values gray-600.
   - "Olanaklar" (Amenities): comma-separated list.

3. Section "Oda tipleri" (Room types): same card or new card. Table: columns Tip, Adet, Fiyat (₺). Rounded table, header bg-gray-50. If no rooms: "Oda tipi tanımlanmamış." (gray-500).

4. Section "Müsaitlik sorgula" (Availability check): same design system. Title, then date input + button "Sorgula" (gradient). Below: table with columns Oda tipi, Toplam, [Tarih] müsait. We will wire this to real API; for v0 use static example row.

5. Section "Rezervasyon yap" (Booking form) – only for guide role; we will conditionally render. For v0 show the form: Title "Rezervasyon yap". Fields: Oda tipi (select), Giriş (date), Çıkış (date), Oda sayısı (number), Misafir sayısı (ops.) (number). Button "Rezervasyon isteği gönder" (gradient). Error message area (red bg/border). Use light blue-50 background for this block to differentiate. We will wire to existing BookForm component.

Next.js App Router, React, Tailwind. Prefer one page component that receives hotel and rooms as props; sections can be separate divs or sub-components. Use Link from next/link.
```

#### Adım 5 – Nasıl test edilir?

1. Rehber veya admin ile giriş → Katalog → bir otel kartına tıkla.
2. Otel detay: "← Katalog", otel adı, bilgi kartı (yıldız, açıklama, adres, şehir, bölge, telefon, web, olanaklar), oda tipleri tablosu, müsaitlik sorgula (tarih + Sorgula + tablo), rehber ise rezervasyon formu.
3. "Katalog" linki → katalog listesine dönmeli. Rezervasyon formu gönderimi mevcut API ile çalışmaya devam etmeli.

#### Sonuç (isteğe bağlı)

- **Projeye uygulandı:** —
- **Not:** —

---

### Adım 6 – Rezervasyonlar

- **Hedef:** Rezervasyon listesi sayfası: rehber kendi rezervasyonlarını (otel adı), otel gelen rezervasyonları (rehber adı) görür. Otel için bekleyen satırlarda Onayla/Reddet. Durum sütunu (pending, approved, rejected vb.).
- **Dosya(lar):** `app/(dashboard)/dashboard/reservations/page.tsx`, `app/(dashboard)/dashboard/reservations/ReservationActions.tsx`.
- **Not:** Veri Prisma ile rol bazlı çekiliyor; PATCH /api/reservations/[id] (Onayla/Reddet) mevcut. v0 çıktısı ile sayfa ve buton stilleri güncellenecek, mantık korunacak.

#### Ne yapacaksın (3 adım)

1. **Kopyala** → Aşağıdaki **"Adım 6 – Kopyalanacak metin"** kutusundaki metnin **tamamını** kopyala.
2. **v0’a yapıştır** → [v0.dev](https://v0.dev) (yeni sohbet), metni yapıştır, Enter.
3. **Kodu projeye al** → v0’dan gelen kodu paylaş; ben `page.tsx` ve gerekirse `ReservationActions.tsx` ile birleştirip veri çekme ve API mantığını koruyarak uygularım.

#### Adım 6 – Kopyalanacak metin

**Bu kutunun tamamını v0 sohbet kutusuna yapıştır.**

```
IMPORTANT: New v0 thread. Apply the design specs below exactly so this page matches Dashboard/Catalog (same product, same design language).

OtelPartner: B2B platform for hotels and tour guides. This is the Reservations list page. Two roles use it: (1) Guide sees their own reservations (columns: code, hotel name, room, dates, count, status). (2) Hotel sees incoming reservations (columns: code, guide name, room, dates, count, status, and an "Actions" column with Approve/Reject buttons for pending only). Page lives inside the dashboard; only output the main content area. All text in Turkish.

Design language (same as Dashboard and Catalog):
- White cards: rounded-xl, shadow-lg, border border-gray-100, padding p-6 or p-8.
- Headlines: text-2xl or 3xl font-bold. Back link with arrow icon, blue-600 hover:text-cyan-600.
- Tables: rounded-lg overflow-hidden, thead bg-gray-50, th/td with px-4 py-3, font-semibold for headers, text-gray-600 for cells.
- Status: show as small badge – e.g. pending = yellow/amber, approved = green, rejected = red (rounded-md px-2 py-0.5 text-xs font-medium).
- Primary button (e.g. Approve): green gradient or solid green-600. Danger button (Reject): red-600. Same rounded-lg, padding.

---

Reservations list page – main content only.

1. Top: Back link "← Dashboard" to /dashboard (arrow icon, font-semibold text-blue-600 hover:text-cyan-600). Headline "Rezervasyonlar" or "Rezervasyonlarım" (text-3xl font-bold).

2. One white card (rounded-xl shadow-lg border-gray-100) containing the table. Table columns (we will pass data by role):
   - Kod (reservation code, monospace or font-mono text-xs)
   - For guide: "Otel" (hotel name). For hotel: "Rehber" (guide name).
   - Oda (room type)
   - Giriş (check-in date)
   - Çıkış (check-out date)
   - Adet (room count)
   - Durum (status: pending, approved, rejected – show as colored badge)
   - For hotel only: "İşlem" (Actions) – for pending rows show two buttons "Onayla" (approve, green) and "Reddet" (reject, red). For non-pending show "—" or nothing.

3. Use mock data: 2–3 rows. One row status "pending", one "approved", one "rejected" so badges and action column are visible. We will wire real data and the action buttons to PATCH API.

4. Empty state: if no reservations, show inside the card a friendly message "Rezervasyon yok." (text-gray-500, centered or padded).

5. Action buttons (for hotel, pending only): "Onayla" green (e.g. bg-green-600 hover:bg-green-700), "Reddet" red (bg-red-600 hover:bg-red-700). Small rounded-lg px-3 py-1.5 text-sm. Disabled state when loading. We will wire onClick to PATCH; for v0 static buttons are fine.

Next.js App Router, React, Tailwind. Page can be server component that receives a list; the Actions column can be a small client component that receives reservationId and status and renders the two buttons. Use Link from next/link for the back link.
```

#### Adım 6 – Nasıl test edilir?

1. Rehber ile giriş → Rezervasyonlar: kendi rezervasyonları (Kod, Otel, Oda, Giriş, Çıkış, Adet, Durum). Otel ile giriş → gelen rezervasyonlar (Rehber sütunu), pending satırlarda Onayla/Reddet.
2. Onayla tıklayınca ilgili rezervasyon approved olmalı; Reddet tıklayınca rejected. Sayfa yenilenecek (router.refresh).
3. Liste boşsa "Rezervasyon yok." görünmeli.

#### Sonuç (isteğe bağlı)

- **Projeye uygulandı:** —
- **Not:** —

---

### Adım 7 – Otel paneli (profil, oda tipleri, doluluk)

- **Hedef:** Otel rolü için üç sayfa: Otel profilim (form), Oda tipleri (ekle formu + liste), Doluluk (form + liste). Aynı modern tasarım dili.
- **Dosya(lar):** `app/(dashboard)/dashboard/otel/profile/page.tsx` + `HotelProfileForm.tsx`; `otel/rooms/page.tsx` + `RoomList.tsx`; `otel/availability/page.tsx` + `AvailabilityForm.tsx`.
- **Not:** Veri ve API’ler (PATCH /api/hotel/profile, POST /api/hotel/rooms, POST /api/hotel/availability) mevcut; v0 çıktısı ile layout ve form stilleri güncellenecek.

#### Ne yapacaksın (3 adım)

1. **Kopyala** → Aşağıdaki **"Adım 7 – Kopyalanacak metin"** kutusundaki metnin **tamamını** kopyala.
2. **v0’a yapıştır** → [v0.dev](https://v0.dev) (yeni sohbet), metni yapıştır, Enter.
3. **Kodu projeye al** → v0 büyük ihtimalle birden fazla parça verecek (profil sayfası+form, oda sayfası+liste, doluluk sayfası+form). Kodu paylaş; ben ilgili `page.tsx` ve form bileşenlerine entegre edip API mantığını korurum. İstersen sayfa sayfa da yapabilirsin (önce profil, sonra oda, sonra doluluk).

#### Adım 7 – Kopyalanacak metin

**Bu kutunun tamamını v0 sohbet kutusuna yapıştır.**

```
IMPORTANT: New v0 thread. Apply the design specs below exactly so these pages match Dashboard/Catalog/Reservations (same product, same design language).

OtelPartner: B2B platform. These are the Hotel panel pages (role: hotel only): (1) Otel profilim – edit hotel info, (2) Oda tipleri – list rooms + add new, (3) Doluluk – set availability per room/date. All inside dashboard; only main content. All text in Turkish.

Design language (same as rest of app):
- Back link: arrow icon + text (e.g. "← Dashboard"), font-semibold text-blue-600 hover:text-cyan-600.
- Headline: text-3xl font-bold text-gray-900.
- White cards: rounded-xl, shadow-lg, border border-gray-100, p-6 or p-8.
- Labels: text-sm font-semibold text-gray-700. Inputs: rounded-lg border border-gray-300 px-4 py-2, focus:ring-2 focus:ring-blue-500/20.
- Primary button: rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600, hover darker, shadow-md. Error: rounded-lg bg-red-50 border border-red-200 p-3 text-red-700.
- Tables: rounded-lg overflow-hidden, thead bg-gray-50, th/td px-4 py-3.

---

Page 1 – Otel profilim (profile edit).

- Back link "← Dashboard" to /dashboard. Headline "Otel profilim".
- One form card. Fields (Turkish labels): Otel adı * (text), Açıklama (textarea), Adres (text), Şehir (text), Bölge (text), Ülke (text), Yıldız (number 1–5 or select), Telefon (text), Web sitesi (text), Olanaklar (text, placeholder "virgülle ayırın"), Enlem (number), Boylam (number). Submit button "Kaydet" (gradient). Error message area. We will wire to PATCH /api/hotel/profile; for v0 use local state and mock submit.

---

Page 2 – Oda tipleri (rooms list + add).

- Back link "← Otel profilim" or "← Profil" to /dashboard/otel/profile. Headline "Oda tipleri".
- Section A – Add form (in same card or small card): Oda tipi (text placeholder "örn. Çift kişilik"), Adet (number min 1), Fiyat – ops. (number), button "Ekle" (gradient). We will wire to POST /api/hotel/rooms.
- Section B – Table of rooms: columns Tip, Adet, Fiyat (₺). Rounded table, gray-50 header. Empty state: "Henüz oda tipi yok." or similar.
- Use 1–2 mock rows for layout. We will pass real data from server.

---

Page 3 – Doluluk / Müsaitlik (availability).

- Back link "← Oda tipleri" to /dashboard/otel/rooms. Headline "Doluluk" or "Doluluk / Müsaitlik".
- Section A – Form: Oda tipi (select, options from rooms), Tarih (date), Müsait adet (number), button "Kaydet" (gradient). Error area (e.g. "0–X arası girin"). We will wire to POST /api/hotel/availability.
- Section B – Table of saved availability: columns Oda tipi, Tarih, Müsait adet. Empty state if no rows. We will pass real list from server.
- Use mock rooms (e.g. "Çift kişilik", "Suite") and 1–2 mock availability rows for layout.

---

Output: Provide the three page components and their form/table sub-components so we can drop them into app/(dashboard)/dashboard/otel/profile/page.tsx, otel/rooms/page.tsx, otel/availability/page.tsx and the corresponding HotelProfileForm, RoomList, AvailabilityForm files. Next.js App Router, React, Tailwind. Use Link from next/link.
```

#### Adım 7 – Nasıl test edilir?

1. Otel rolü ile giriş → Dashboard → Otel profilim / Oda tipleri / Doluluk.
2. **Profil:** Geri "Dashboard", başlık "Otel profilim", form kartı, alanlar, Kaydet. Kaydedince PATCH çalışmalı.
3. **Oda tipleri:** Geri "Otel profilim", başlık "Oda tipleri", ekle formu, tablo. Ekle → POST, liste güncellenmeli.
4. **Doluluk:** Geri "Oda tipleri", başlık "Doluluk", oda seç + tarih + müsait adet, Kaydet. Tablo güncellenmeli.

#### Sonuç (isteğe bağlı)

- **Projeye uygulandı:** —
- **Not:** —

---

### Adım 8 – Admin (kullanıcılar, görünürlük)

- **Hedef:** Admin paneli: kullanıcı listesi (onay/askıya al), otel görünürlük (Evet/Hayır). İstatistik kartları.
- **Dosya(lar):** `app/(dashboard)/dashboard/admin/page.tsx`, `admin/visibility/page.tsx`; `AllUsersSection`, `PendingUserActions`, `HotelListedToggle` stilleri.
- **Prompt:** Bu adım sırasında eklenecek.

---

*PRD: `docs/PRD.md`. Tasarım notları ve prompt’lar bu dosyada güncellenir. Bir sonraki adıma geçildiğinde ilgili adımın "Kopyalanacak metin" kutusu eklenecek.*
