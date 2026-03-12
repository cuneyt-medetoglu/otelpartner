# Canlı Ortam (otelpartner.xyz)

**Son güncelleme:** 2026-03-15

---

## 1. Özet ve mevcut altyapı

**https://otelpartner.xyz** canlıda çalışıyor. Giriş: admin@otelpartner.local / Admin123!

| Bileşen | Durum |
|---------|--------|
| Sunucu | Tek EC2 (otelpartner) – Ubuntu, 13.53.136.68 |
| Uygulama | Next.js, PM2, port 3010 |
| Veritabanı | PostgreSQL aynı makinede, localhost:5432 |
| Domain | otelpartner.xyz + www → Route 53 (AWS) |
| SSL | Let's Encrypt (Certbot + Nginx) |
| Reverse proxy | Nginx (80/443 → 3010) |

**Sıradaki (opsiyonel):** Admin şifresi değiştir, e-posta (AWS SES), fotoğraf (S3), Certbot otomatik yenileme.

---

## 2. Adım adım komutlar (yeniden kurulum / referans)

### Adım 1: Sunucu kurulumu (Node.js 20 + PM2 + Nginx)

SSH ile sunucuya bağlan (`npm run ssh:server`), sırayla:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
sudo apt-get update && sudo apt-get install -y nginx
sudo systemctl status nginx   # active (running) olmalı
```

### Adım 2: Projeyi yükle ve build

Sunucuda: `git clone https://github.com/KULLANICI/otelpartner.git`, `cd otelpartner`. Sonra:

```bash
nano .env   # en az DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL
npm install
npx prisma generate
npm run build
```

**DB aynı makinede:** `DATABASE_URL="postgresql://otelpartner:otelpartner2026@localhost:5432/otelpartner"`. PostgreSQL yoksa `sudo apt-get install -y postgresql`, kullanıcı/DB oluştur, `npx prisma migrate deploy`, `npx prisma db seed`.

### Adım 3: .env (production)

```env
DATABASE_URL="postgresql://otelpartner:otelpartner2026@localhost:5432/otelpartner"
NEXTAUTH_SECRET="<openssl rand -base64 32 çıktısı>"
NEXTAUTH_URL="https://otelpartner.xyz"
```

### Adım 4: PM2 + Nginx

```bash
cd ~/otelpartner
PORT=3010 pm2 start npm --name "otelpartner" -- start
pm2 save && pm2 startup   # çıkan sudo komutunu çalıştır
```

Nginx: `sudo nano /etc/nginx/sites-available/default` → `location / { proxy_pass http://127.0.0.1:3010; ... }` (proxy header’lar ekle). Sonra `sudo nginx -t`, `sudo systemctl reload nginx`.

### Adım 5: DNS + SSL

- **DNS:** Route 53’te hosted zone + A kayıtları @ ve www → 13.53.136.68. Natro’da nameserver’ları Route 53’e çevir.
- **SSL:** `sudo apt-get install -y certbot python3-certbot-nginx`, `sudo certbot --nginx -d otelpartner.xyz -d www.otelpartner.xyz`.

---

## 3. SSL (Let's Encrypt) ve subdomain

- **Yöntem:** Let's Encrypt DV sertifikası, Certbot ile. Ücretsiz; 90 günde bir `certbot renew` ile yenilenir.
- **Subdomain (x.otelpartner.xyz):** Route 53’te A kaydı `x` → 13.53.136.68. Sonra `sudo certbot --nginx -d otelpartner.xyz -d www.otelpartner.xyz -d x.otelpartner.xyz`.

---

## 4. Sonraya bırakılanlar (kısa)

- E-posta: AWS SES veya SendGrid.
- Fotoğraf: S3 + CloudFront.
- Faz 10 Test, SEO (robots.txt, sitemap), monitoring (Sentry), yedekleme (pg_dump), Google Analytics.
