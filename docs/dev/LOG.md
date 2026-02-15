# Geliştirme Logu

Kronolojik geliştirme kaydı. Yeni satırlar en üste eklenir.

**Sorumlu:** Project Manager (güncellemeleri bu dosyaya işler).

---

## 2026-02-15

- Faz 1 Auth tamamlandı: NextAuth.js (Credentials, JWT, session’da role), middleware (public: /, /login, /register; /dashboard korumalı), SessionProvider, Auth layout, Login ve Register sayfaları (Zod, register API ile User+Hotel/Guide oluşturma), Dashboard layout ve sayfa (/dashboard). Ana sayfaya Giriş/Kayıt ol linkleri eklendi. Sıradaki: NEXTAUTH_SECRET doldurulması, giriş testi, Faz 2 Admin paneli.

- Geliştirme takip yapısı oluşturuldu: `docs/dev/` (README, STATE, ROADMAP, LOG).
- Project Manager kuralına dev takip sorumluluğu eklendi.
- Başlangıç durumu: Faz 1, ilk görev "Proje kurulumu" olarak işlendi.
- Faz 0 güncellendi: GitHub repo tamamlandı olarak işaretlendi (kontrol edildi). "Veri modeli şemaları" tanımlandı (ER diyagramı; Faz 1’de yapılacak). Tasarım ve hazırlık maddeleri ilgili fazlara taşındı: Admin dashboard tasarımı → Faz 2, Otel katalog tasarımı → Faz 5, Rezervasyon akış tasarımı → Faz 6, mobil responsive → Faz 10; development ortamı ve proje yapısı → Faz 1.

- Faz 1 başlatıldı: AWS EC2 / localhost ve sizin yapacaklarınız notları eklendi (docs/dev/NOTES.md). Next.js 14 + TypeScript + Tailwind + Prisma kuruldu; User, Hotel, Guide şeması; .env.example, lib/db.ts; app layout ve page; build başarılı. Sıradaki: .env + migration (sizin), sonra NextAuth ve Login/Register.

- Faz 1 ilerleme: AWS EC2’de PostgreSQL kuruldu; SSH tünel (npm run ssh:tunnel) ile lokal bağlantı; otelpartner kullanıcı/veritabanı oluşturuldu; ilk migration (init) uygulandı; npm run dev çalışıyor, localhost:3000 açıldı. Sıradaki: NextAuth.js, Layout, Login/Register.

---

*(Yeni tamamlanan görevler için buraya tarih + kısa açıklama eklenecek.)*
