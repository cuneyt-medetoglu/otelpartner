# v0.app ile OtelPartner UI – Adım Adım Plan

Bu doküman tek kaynak. Sırayla her adımı tamamlayıp sonucu buraya ekliyoruz; sonra sıradaki adımın prompt’u yazılacak.

---

## Tasarım dili (her prompt’ta kullanılacak)

Aşağıdaki metni **her v0 prompt’unun başına** ekle. Böylece tüm sayfalar aynı dili konuşur.

**Kopyala-yapıştır (İngilizce, v0’a yapıştır):**

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
- Pages that are part of the main site must feel like one product: same header/footer style if shown, same card and button style.
- Footer when relevant: simple, dark gray bg (e.g. gray-800), light text, small font; columns or single line: OtelPartner ©, links like Gizlilik / İletişim (can be placeholders).
- Header when relevant: clean nav, logo/text "OtelPartner", same primary button style for CTAs.
```

Bu blok **her sayfa prompt’unda** en üstte olsun; altına o sayfaya özel istekleri yazacağız.

---

## Adım 1 – Login

**Hedef:** Giriş sayfası. v0’dan alıp projeye yapıştıracağız; sonra NextAuth entegrasyonunu seninle ekleyeceğiz.

### 1.1 v0’da kullanılacak prompt

v0.app’te yeni sohbet aç. Aşağıdaki **tüm** metni yapıştır (önce tasarım dili, sonra sayfa tarifi).

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
- Pages that are part of the main site must feel like one product: same header/footer style if shown, same card and button style.
- Footer when relevant: simple, dark gray bg (e.g. gray-800), light text, small font; columns or single line: OtelPartner ©, links like Gizlilik / İletişim (can be placeholders).
- Header when relevant: clean nav, logo/text "OtelPartner", same primary button style for CTAs.

---

Login page for OtelPartner. Standalone page (public, no dashboard sidebar).

- Centered card: white, rounded-lg, shadow, max-width reasonable (e.g. max-w-md).
- Title: "Giriş yap" or "Hesabınıza giriş yap".
- Form fields: Email (type email), Şifre (type password). Labels above inputs, Turkish.
- Primary button: "Giriş yap".
- Link below form: "Hesabınız yok mu? Kayıt ol" → link to /register.
- Optional: small footer on the page (OtelPartner ©, same design system).
- No need for backend logic; just the UI. Use Next.js App Router structure (e.g. a single page component).
```

### 1.2 Senin yapacakların

1. v0’da bu prompt’u çalıştır; çıkan kodu beğenmezsen “Login ile aynı tasarım dilinde, sadece … değişsin” diye refine et.
2. v0’dan kodu kopyala (Copy code).
3. Projede **login sayfası** şu dosyada: `app/(auth)/login/page.tsx`. Mevcut içeriği v0 çıktısıyla değiştir.
4. v0 sadece UI verir; form submit’i şu an boş veya placeholder olabilir. Adım 1 tamamlandıktan sonra birlikte NextAuth `signIn` ve hata mesajını bağlarız.

### 1.3 Sonuç (buraya eklenecek)

- **Tarih:** —
- **v0 linki veya ekran görüntüsü:** —
- **Projeye yapıştırıldı mı:** Evet / Hayır
- **Notlar:** —

---

## Sıradaki adımlar (sırayla açılacak)

- **Adım 2:** Register (Adım 1 tamamlanınca prompt ve talimatlar eklenecek)
- **Adım 3:** Dashboard layout + ana sayfa (Adım 2 sonrası eklenecek)
- Sonrası: Katalog, Otel detay, Rezervasyonlar, Otel paneli, Admin…

---

*Her adım bittiğinde “Sonuç” kısmı doldurulacak; bir sonraki adımın prompt’u bu dosyaya eklenecek.*
