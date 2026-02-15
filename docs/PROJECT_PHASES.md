# Proje Fazları

## 🎯 Faz 0: Planlama ve Tasarım

Sadece planlama aşamasında yapılanlar. Tasarım ve hazırlık maddeleri ilgili geliştirme fazlarına taşındı (aşağıda).

### Dokümentasyon
- [x] Proje özeti
- [x] Özellikler listesi
- [x] Teknik stack belirleme
- [x] Akış diyagramları
- [x] GitHub repo oluşturma

**Not:** Veri modeli şemaları = DATA_STRUCTURE.md'deki tabloların görsel gösterimi (ER diyagramı, örn. Mermaid). Faz 1'de veritabanı şeması ile birlikte yapılacak.

---

## 🏗️ Faz 1: Temel Altyapı ve Kullanıcı Yönetimi

### Backend
- [x] Proje kurulumu (Next.js / NestJS)
- [x] Development ortamı kurulumu ve temel proje yapısı
- [x] PostgreSQL + Prisma setup (veritabanı AWS EC2’de; lokalde SSH tünel ile bağlantı)
- [x] Veritabanı şeması (User, Hotel, Guide, Admin) ve ilk migration
- [ ] Veri modeli şemaları (ER diyagramı, Mermaid – opsiyonel)
- [x] Authentication sistemi (NextAuth.js)
- [x] Rol bazlı middleware

### Frontend
- [x] Next.js + Tailwind + shadcn/ui kurulumu
- [x] Layout yapısı (Auth, Dashboard)
- [x] Login/Register sayfaları
- [x] Form validasyonu (Zod)

### Özellikler
- [x] Otel kayıt
- [x] Rehber kayıt
- [x] Kullanıcı girişi
- [ ] Şifre sıfırlama

**Not (Faz 1):** Geliştirme önce localhost’ta yapılacak; production’da uygulama AWS EC2’de çalışacak. Sizin yapmanız gerekenler (Node.js, PostgreSQL veya bulut DB, `.env` oluşturma, ilk migration): `docs/dev/NOTES.md`.

---

## 👤 Faz 2: Admin Paneli

### Backend
- [x] Admin API endpoints (users list, stats, PATCH status)
- [x] Kullanıcı onay sistemi
- [x] Kullanıcı yetkilendirme configürasyonu (middleware, role check)

### Frontend
- [ ] Tasarım: Admin dashboard (v0.app / wireframe – opsiyonel)
- [x] Admin dashboard
- [x] Bekleyen kayıtlar listesi
- [x] Kullanıcı onay/red işlemi
- [x] Kullanıcı listesi ve yönetimi (filtre, askıya al/aktifleştir)
- [x] Basit istatistikler

### Özellikler
- [x] Otel/Rehber onaylama
- [ ] Manuel kullanıcı ekleme
- [x] Kullanıcı silme/askıya alma
- [ ] Kullanıcı detay görüntüleme

---

## 🏨 Faz 3: Otel Profili ve Oda Yönetimi

### Backend
- [ ] Otel profil API
- [ ] Oda tanımlama API
- [ ] Doluluk yönetimi API
- [ ] Fotoğraf upload (Cloudinary)

### Frontend
- [ ] Otel profil sayfası
- [ ] Otel fotoğraf galerisi
- [ ] Oda tipi ve sayı girişi
- [ ] Doluluk takvimi
- [ ] Fiyat girişi

### Özellikler
- [ ] Otel bilgileri güncelleme
- [ ] Fotoğraf yükleme
- [ ] Oda tipi oluşturma
- [ ] Günlük doluluk girişi
- [ ] Manuel oda bloke/açma

---

## 👁️ Faz 4: Görünürlük ve Yetkilendirme

### Backend
- [ ] Configüratif yetkilendirme sistemi
- [ ] Otel görünürlük kuralları
- [ ] Bölge/şehir filtreleme
- [ ] Özel grup yönetimi

### Frontend
- [ ] Admin görünürlük ayar sayfası
- [ ] Otel bazlı yetki düzenleme
- [ ] Rehber bazlı yetki düzenleme
- [ ] Görünürlük test ekranı

### Özellikler
- [ ] Admin tarafından otel görünürlüğü ayarlama
- [ ] Bölgesel kısıtlamalar
- [ ] Anlaşmalı otel grupları

---

## 🔍 Faz 5: Otel Katalog ve Detay Sayfası

### Backend
- [ ] Otel listeleme API (filtreleme ile)
- [ ] Otel detay API
- [ ] Müsaitlik kontrol API

### Frontend
- [ ] Tasarım: Otel katalog sayfası (v0.app / wireframe)
- [ ] Otel katalog sayfası
- [ ] Filtreleme (fiyat, bölge, yıldız, müsaitlik)
- [ ] Sıralama
- [ ] Otel detay modal/sayfası
- [ ] Fotoğraf galerisi
- [ ] Oda tipi ve fiyat gösterimi

### Özellikler
- [ ] Müsait otelleri listeleme
- [ ] Otel detaylarını görüntüleme
- [ ] Fiyat karşılaştırma
- [ ] Müsait oda sayısı gösterme

---

## 🔄 Faz 6: Rezervasyon Sistemi

### Backend
- [ ] Rezervasyon oluşturma API
- [ ] Rezervasyon onay/red API
- [ ] Rezervasyon durum güncelleme
- [ ] Rezervasyon kodu oluşturma
- [ ] QR kod oluşturma

### Frontend
- [ ] Tasarım: Rezervasyon akışı (v0.app / wireframe)
- [ ] Rezervasyon oluşturma formu
- [ ] Rezervasyon onay ekranı
- [ ] Rezervasyon listesi
- [ ] Rezervasyon detay sayfası
- [ ] QR kod görüntüleme
- [ ] Rezervasyon iptal

### Özellikler
- [ ] Rezervasyon oluşturma
- [ ] Hedef otele bildirim
- [ ] Rezervasyon onaylama
- [ ] QR/Rezervasyon kodu üretme
- [ ] Rezervasyon statü yönetimi
- [ ] İptal işlemi

---

## 🔔 Faz 7: Bildirim Sistemi

### Backend
- [ ] Email servis entegrasyonu (Resend)
- [ ] SMS servis entegrasyonu (Netgsm)
- [ ] Bildirim template sistemi
- [ ] Bildirim kuyruğu (Bull/BullMQ)

### Frontend
- [ ] Bildirim tercihleri sayfası
- [ ] Uygulama içi bildirim merkezi
- [ ] Bildirim ayarları

### Özellikler
- [ ] Yeni rezervasyon bildirimi
- [ ] Onay bildirimi
- [ ] İptal bildirimi
- [ ] Kullanıcı tercih seçimi
- [ ] Admin zorunlu bildirim

---

## 📊 Faz 8: Raporlama ve Komisyon

### Backend
- [ ] Rezervasyon raporlama API
- [ ] Komisyon hesaplama
- [ ] İstatistik API'leri
- [ ] PDF rapor oluşturma

### Frontend
- [ ] Raporlar sayfası
- [ ] Grafik gösterimi (Recharts)
- [ ] Komisyon raporu
- [ ] Aylık özet
- [ ] PDF export

### Özellikler
- [ ] Gönderilen/Alınan rezervasyon raporları
- [ ] Tamamlanan konaklamalar
- [ ] Komisyon tutarı hesaplama
- [ ] Aylık komisyon raporu
- [ ] Ödeme durumu takibi

---

## 🎛️ Faz 9: Gelişmiş Admin Dashboard

### Backend
- [ ] Dashboard istatistik API'leri
- [ ] Sistem log API
- [ ] Aktivite takibi

### Frontend
- [ ] Detaylı dashboard
- [ ] Kullanıcı aktiviteleri
- [ ] Sistem sağlığı
- [ ] Grafikler ve metrikler
- [ ] Log viewer

### Özellikler
- [ ] Toplam istatistikler
- [ ] Trend grafikleri
- [ ] Kullanıcı aktivite geçmişi
- [ ] Sistem logları
- [ ] Hata raporları

---

## ✅ Faz 10: Test ve İyileştirme

### Test
- [ ] Unit testler
- [ ] Integration testler
- [ ] E2E testler (Playwright)
- [ ] Load testing
- [ ] Security audit

### İyileştirme
- [ ] Performance optimizasyonu
- [ ] SEO optimizasyonu
- [ ] Mobil responsive kontrol (tüm sayfalar)
- [ ] Bug fix
- [ ] UX iyileştirmeleri

### Deployment
- [ ] **AWS EC2’de uygulama kurulumu** (şu an sunucuda sadece PostgreSQL var; proje lokalde çalışıyor. İleride: Node.js, proje kodu, PM2/Nginx, .env, build)
- [ ] Production deployment
- [ ] Database migration (production DB)
- [ ] SSL sertifikası
- [ ] Domain ayarları
- [ ] Monitoring setup (Sentry)

---

## 🚀 Faz 11: MVP Launch

### Pre-launch
- [ ] Beta test kullanıcıları
- [ ] Feedback toplama
- [ ] Son düzeltmeler
- [ ] Dokümantasyon

### Launch
- [ ] Production'a al
- [ ] İlk kullanıcı onboarding
- [ ] Destek sistemi hazırlık

---

## 📈 Sonraki Fazlar (Post-MVP)

### Faz 12: Gelişmiş Özellikler
- [ ] Mobil uygulama (React Native)
- [ ] WhatsApp entegrasyonu
- [ ] Otomatik fiyat önerileri (AI)
- [ ] Müşteri rating sistemi
- [ ] İndirim ve kampanya yönetimi
- [ ] API için external partner entegrasyonu
- [ ] Multi-language (İngilizce, Rusça)

### Faz 13: Ölçeklendirme
- [ ] Microservice'lere geçiş
- [ ] Redis cache
- [ ] ElasticSearch (arama)
- [ ] CDN optimizasyonu
- [ ] Database sharding

---

**Not**: Faz sırası korunur; ilerleme proje durumuna göre takip edilir.
