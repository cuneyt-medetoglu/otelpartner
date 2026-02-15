# v0.app ile OtelPartner UI – Adım Adım Plan

Sırayla her adımı yapıyoruz. Şu an sadece **Adım 1** var.

---

## Adım 1 – Login sayfası

### Ne yapacaksın (3 adım)

1. **Şunu kopyala** → Aşağıdaki **"Adım 1 – Kopyalanacak metin"** kutusundaki metnin **tamamını** seçip kopyala (Ctrl+C).
2. **v0’a yapıştır** → [v0.dev](https://v0.dev) aç, yeni sohbet başlat, kopyaladığın metni sohbet kutusuna yapıştır, Enter’a bas.
3. **Çıkan kodu al** → v0 ekranda bir giriş sayfası tasarımı gösterecek. Sağ üstte **"Copy code"** (veya benzeri) butonuna tıkla; kodu kopyala. Sonra projede `app/(auth)/login/page.tsx` dosyasını aç, içeriği sil, bu kodu yapıştır, kaydet.

### Ne çıkacak?

- **v0’da:** Ortada kart içinde “Giriş yap” başlığı, Email ve Şifre alanları, “Giriş yap” butonu, “Kayıt ol” linki olan bir sayfa tasarımı (canlı önizleme).
- **Kod:** v0 “Copy code” dediğinde React/Next.js + Tailwind ile yazılmış bir veya birkaç component kodu verir. Bunu olduğu gibi `app/(auth)/login/page.tsx` içine yapıştırırsın. (Girişe tıklayınca henüz bir şey yapmayabilir; önce görünümü projeye alıyoruz, sonra NextAuth’u bağlarız.)

### Adım 1 – Kopyalanacak metin

**Sadece bu kutudaki metni kopyala ve v0 sohbet kutusuna yapıştır.**

```
Design for "OtelPartner" – B2B hotel–guide platform. Next.js, React, Tailwind CSS.

Design system (use on every screen):
- Primary: blue (e.g. blue-600 buttons, blue-50 subtle backgrounds). Secondary: gray (text, borders).
- Typography: clear headings (font-semibold), body gray-700, labels gray-600.
- Cards: white bg, rounded-lg, border border-gray-200, shadow-sm, padding p-6.
- Buttons: primary blue-600 hover:blue-700, rounded, px-4 py-2; secondary = border gray.
- Inputs: rounded border border-gray-300, px-3 py-2.
- Spacing: consistent gap-4 / space-y-4.

Site standards:
- All user-facing text in Turkish.
- Footer when relevant: simple, dark gray bg (e.g. gray-800), light text; OtelPartner ©, Gizlilik / İletişim (placeholders). Header: logo "OtelPartner", same button style.

---

Login page for OtelPartner. Standalone page (public, no dashboard sidebar).

- Centered card: white, rounded-lg, shadow, max-width like max-w-md.
- Title: "Giriş yap" or "Hesabınıza giriş yap".
- Form: Email (type email), Şifre (type password). Labels in Turkish above inputs.
- Primary button: "Giriş yap".
- Link below: "Hesabınız yok mu? Kayıt ol" linking to /register.
- Optional: small footer (OtelPartner ©, same design system).
- UI only, no backend. Next.js App Router, single page component.
```

---

### Sonuç (isteğe bağlı doldur)

- **Projeye yapıştırdım:** Evet / Hayır
- **Not:** —

---

## Sonraki adımlar (şimdilik sadece liste)

Adım 1 bittikten sonra bu dosyaya **Adım 2 – Register** prompt’u eklenecek.

- Adım 2: Register
- Adım 3: Dashboard
- Sonrası: Katalog, Rezervasyonlar, Admin…
