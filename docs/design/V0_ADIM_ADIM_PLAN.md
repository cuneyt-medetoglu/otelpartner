# v0.app ile OtelPartner UI – Adım Adım Plan

Sırayla her adımı yapıyoruz. **Tüm prompt’larda aşağıdaki “Sistem özeti” ve “Tasarım yönü” kullanılacak** ki v0 platformu ve sonraki ekranları hayal edebilsin; tutarlı, modern bir yapı çıksın.

---

## Geldiğimiz nokta (Özet)

| Adım | Durum | Not |
|------|--------|-----|
| **Adım 1 – Login** | Tamamlandı | Modern tasarım (gradient arka plan, kart, ikon). Auth layout: header + footer (OtelPartner ©, Gizlilik, İletişim). NextAuth bağlı. |
| **Adım 2 – Register** | Tamamlandı | Aynı tasarım dili; Hesap türü (Otel/Rehber), koşullu alanlar. POST /api/auth/register bağlı. |
| **Adım 3 – Dashboard** | Tamamlandı | Layout: spacer + fixed sidebar, gradient arka plan. Sidebar: logo, rol bazlı menü, email, Çıkış yap. Ana sayfa: hoş geldin kartı, rol bazlı hızlı erişim kartları. Responsive: mobilde hamburger + overlay drawer; içerik drawer altına girmiyor. Ana sayfadaki çıkış kartı kaldırıldı (çıkış sadece sidebar’da). |

**Dosyalar:** `app/(auth)/layout.tsx`, `app/(auth)/login/page.tsx`, `app/(auth)/register/page.tsx`, `app/(dashboard)/layout.tsx`, `app/(dashboard)/DashboardSidebar.tsx`, `app/(dashboard)/dashboard/page.tsx`.

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

- **Hedef:** Rehber için otel listesi sayfası. Filtreler (bölge, şehir, yıldız vb.), liste/grid, modern kartlar.
- **Dosya(lar):** `app/(dashboard)/dashboard/catalog/page.tsx`; gerekirse `CatalogFilters.tsx` stilleri.
- **Not:** Dashboard layout zaten var; sadece bu sayfanın içeriği v0 ile yenilenecek. Mevcut API (GET /api/catalog/hotels) ve filtre mantığı korunacak.
- **Prompt:** Bu adım sırasında eklenecek.

---

### Adım 5 – Otel detay (katalog)

- **Hedef:** Tek otel sayfası: bilgiler, oda tipleri, müsaitlik sorgula, rezervasyon formu.
- **Dosya(lar):** `app/(dashboard)/dashboard/catalog/[id]/page.tsx`, `BookForm.tsx`, `AvailabilityCheck.tsx` (stil uyumu).
- **Not:** Rehber bu sayfadan rezervasyon isteği oluşturur. Mevcut API’ler korunacak.
- **Prompt:** Bu adım sırasında eklenecek.

---

### Adım 6 – Rezervasyonlar

- **Hedef:** Rezervasyon listesi (rehber: kendi rezervasyonları; otel: gelen rezervasyonlar). Onay/red butonları (otel), durum gösterimi.
- **Dosya(lar):** `app/(dashboard)/dashboard/reservations/page.tsx`, `ReservationActions.tsx`.
- **Not:** Rol bazlı farklı sütunlar/aksiyonlar. Mevcut API’ler korunacak.
- **Prompt:** Bu adım sırasında eklenecek.

---

### Adım 7 – Otel paneli (profil, oda tipleri, doluluk)

- **Hedef:** Otel rolü sayfaları: Otel profilim, Oda tipleri, Doluluk. Formlar ve listeler aynı modern dilde.
- **Dosya(lar):** `app/(dashboard)/dashboard/otel/profile/page.tsx`, `otel/rooms/page.tsx`, `otel/availability/page.tsx`; ilgili form bileşenleri.
- **Prompt:** İstersen tek prompt’ta üç sayfa, ya da sayfa sayfa (önce profil, sonra oda, sonra doluluk). Bu adım sırasında eklenecek.

---

### Adım 8 – Admin (kullanıcılar, görünürlük)

- **Hedef:** Admin paneli: kullanıcı listesi (onay/askıya al), otel görünürlük (Evet/Hayır). İstatistik kartları.
- **Dosya(lar):** `app/(dashboard)/dashboard/admin/page.tsx`, `admin/visibility/page.tsx`; `AllUsersSection`, `PendingUserActions`, `HotelListedToggle` stilleri.
- **Prompt:** Bu adım sırasında eklenecek.

---

*PRD: `docs/PRD.md`. Tasarım notları ve prompt’lar bu dosyada güncellenir. Bir sonraki adıma geçildiğinde ilgili adımın "Kopyalanacak metin" kutusu eklenecek.*
