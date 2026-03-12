# Teknik Altyapı

## 🏗️ Mimari Yaklaşım

**Önerilen Mimari**: Monolithic (İlk Faz)

Proje başlangıcında tek bir uygulama olarak başlayıp, ileride ihtiyaç olursa microservice'lere geçilebilir.

---

## 💻 Frontend

### Framework Seçenekleri

**Önerilen**: Next.js 14+ (App Router)
- SSR ve SEO avantajı
- API Routes ile backend entegrasyonu
- Vercel kolay deploy
- TypeScript desteği

**Alternatifler**:
- React + Vite (Daha hızlı development)
- Nuxt.js (Vue tercih edilirse)

### UI Framework

**Önerilen**: Tailwind CSS + shadcn/ui
- v0.app ve bolt.new ile uyumlu
- Hızlı geliştirme
- Modern görünüm

**Ek Kütüphaneler**:
- React Hook Form (form yönetimi)
- Zod (validasyon)
- TanStack Query (data fetching)
- Zustand veya Redux Toolkit (state management)

---

## ⚙️ Backend

### Framework

**Önerilen**: Node.js + Express.js / Fastify
- JavaScript/TypeScript ile full-stack
- Hızlı geliştirme
- Büyük ekosistem

**Alternatifler**:
- NestJS (daha yapısal, enterprise)
- Bun + Hono (yeni teknoloji, çok hızlı)

### API Tipi

**Önerilen**: RESTful API
- Basit ve anlaşılır
- Standard HTTP methodları

**İleride Eklenebilir**:
- GraphQL (kompleks sorgular için)
- WebSocket (real-time bildirimler)

---

## 🗄️ Veritabanı

### Ana Veritabanı

**Önerilen**: PostgreSQL
- İlişkisel veri yapısı
- ACID compliance
- Güçlü sorgulama
- JSON desteği (esneklik için)

**Alternatif**:
- MySQL (daha basit setup)
- MongoDB (NoSQL - esneklik ama ilişki zorluğu)

### ORM/Query Builder

**Önerilen**: Prisma
- TypeScript desteği
- Migration yönetimi
- Kolay syntax

**Alternatif**:
- Drizzle ORM (daha hafif)
- TypeORM (daha mature)

---

## 🔐 Kimlik Doğrulama

**Önerilen**: NextAuth.js / Auth.js
- Next.js entegrasyonu
- JWT token yönetimi
- Rol bazlı yetkilendirme

**Alternatif**:
- JWT manuel implementasyon
- Supabase Auth (hızlı setup)
- Clerk (ücretli ama kolay)

---

## 🔔 Bildirim Servisleri

### Email
- **Amazon SES** (AWS hesabı ile; domain doğrulama, ucuz, güvenilir)
- **SendGrid** (enterprise alternatif)

### SMS
- **Twilio** (global)
- **Netgsm** (Türkiye)
- **İletimerkezi** (Türkiye)

### Push Notification
- **Firebase Cloud Messaging** (ücretsiz)
- **OneSignal** (kolay entegrasyon)

---

## 📤 Dosya Yükleme

**Otel Fotoğrafları İçin**:

**Önerilen**: AWS S3 + CloudFront
- Zaten AWS (EC2) kullanıldığı için tek fatura, IAM ile güvenlik
- S3’te depolama, CloudFront ile CDN; resize için sunucuda Sharp veya Lambda
- Uzun vadede maliyet ve kontrol açısından uygun

**Alternatif**:
- Cloudinary (hazır resize/CDN, ayrı sağlayıcı)
- Vercel Blob Storage, UploadThing

---

## 🎨 QR Kod

**Kütüphane**: qrcode / qrcode.react
- Rezervasyon kodu için QR oluşturma
- PDF export için

---

## 📊 Dashboard ve Grafikler

**Chart Kütüphanesi**:
- Recharts (React friendly)
- Chart.js (klasik)
- Tremor (shadcn uyumlu)

---

## 🚀 Deployment

**Not:** Geliştirme önce **localhost** üzerinde yapılacak. Production’da uygulama **AWS EC2** üzerinde çalışacak (Faz 10 / deployment aşamasında detaylandırılacak).

### Production (Hedef): AWS EC2

- Uygulama bir EC2 instance’da çalışacak (Node.js / Next.js).
- Veritabanı: EC2’de PostgreSQL veya AWS RDS / dış servis (Neon, Supabase vb.) kullanılabilir.
- Nginx reverse proxy, PM2 veya benzeri process manager, SSL (Let’s Encrypt) ileride eklenecek.

### Geliştirme: Localhost

- `npm run dev` ile localhost’ta çalıştırma.
- Geliştirme için lokal PostgreSQL `DATABASE_URL` ile kullanılır (localhost:5432).

### Alternatif (Production)

**Vercel** (Next.js için uygun):
- Kolay deploy, otomatik HTTPS.
- EC2 tercih edildiği için şu an hedef değil; ileride istenirse değerlendirilebilir.

**Diğer**: Netlify, Railway, Render.

### Veritabanı Hosting

**Geliştirme**: Lokal PostgreSQL. **Production**: AWS RDS veya yönetilen Postgres.
- Serverless Postgres
- Ücretsiz tier
- Otomatik scaling

**Alternatif**:
- Supabase (Postgres + auth + storage)
- Railway Postgres
- DigitalOcean Managed Database

---

## 🛠️ DevOps

### Version Control
- Git + GitHub/GitLab

### CI/CD
- Vercel otomatik deploy
- GitHub Actions (test için)

### Monitoring
- Sentry (hata takibi)
- Vercel Analytics (performance)

---

## 📁 Proje Yapısı (Next.js)

```
otelpartner/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth layout
│   ├── (dashboard)/       # Dashboard layout
│   ├── admin/             # Admin pages
│   ├── hotel/             # Hotel pages
│   ├── guide/             # Guide pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # shadcn components
│   └── shared/           # Custom components
├── lib/                   # Utilities
│   ├── db/               # Database (Prisma)
│   ├── auth/             # Auth helpers
│   └── utils/            # Helper functions
├── prisma/               # Database schema
├── public/               # Static files
└── docs/                 # Documentation
```

---

## 🔄 Önerilen Tech Stack (Başlangıç)

```
Frontend:  Next.js 14 + TypeScript + Tailwind + shadcn/ui
Backend:   Next.js API Routes / NestJS
Database:  PostgreSQL + Prisma
Auth:      NextAuth.js
Storage:   AWS S3 (+ CloudFront)
Email:     AWS SES (veya ileride)
SMS:       Netgsm
Deploy:    AWS EC2 (production); Vercel alternatif.
```

---

**Not**: Stack seçimi projenin büyüklüğü ve ekip yetkinliklerine göre ayarlanabilir.
