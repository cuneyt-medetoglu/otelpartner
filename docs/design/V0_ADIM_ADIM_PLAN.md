# v0.app ile OtelPartner UI – Adım Adım Plan

Sırayla her adımı yapıyoruz. **Tüm prompt’larda aşağıdaki “Sistem özeti” ve “Tasarım yönü” kullanılacak** ki v0 platformu ve sonraki ekranları hayal edebilsin; tutarlı, modern bir yapı çıksın.

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

## Adım 1 – Login sayfası (yeniden – modern versiyon)

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

## Sonraki adımlar (uyumlu prompt için notlar)

- **Adım 2 – Register:** "Same product context and modern design direction as above. Register page: same header/footer as Login, same card style (gradient bg, shadow-lg), form fields for registration, link to Login."
- **Adım 3 – Dashboard:** "Same system and modern design. Dashboard layout: sidebar + main area; role-based; same color, shadows, typography. This is the shell for Catalog, Reservations, etc."
- **Sonraki sayfalar:** Her seferinde "OtelPartner B2B platform, same modern design as Login (gradients, depth, strong typography, Turkish)" ile başla; sayfa özel içeriği ekle.

---

*PRD: `docs/PRD.md`. Tasarım notları bu dosyada güncellenir.*
