# Proje Fazları

## 📐 v0.app ile tasarım

### Ne zaman
- **Başlama:** Faz 6 ortası veya Faz 6 bittikten hemen sonra (rezervasyon akışı çalışır durumda olduktan sonra).
- Tüm sayfalar **birbiri ile uyumlu** olacak şekilde tasarlanacak; v0 çıktıları tek bir tasarım dilinde (renk, tipografi, bileşenler) tutulmalı.

### v0.app + GitHub
- Proje GitHub’a bağlanacak; v0.app repo’yu görebilecek ve tasarımlar mevcut kodla uyumlu ilerleyecek.

### Önerilen tasarım sırası (v0 ile hangi ekranlara ne sırayla bakılır)
1. **Rezervasyon akışı** — Katalog detay → rezervasyon formu → rezervasyon listesi → otel tarafı onay/red.
2. **Otel katalog** — Liste + filtre; **Otel detay** — Tekil otel sayfası.
3. **Rezervasyon listesi** — Rehber ve otel görünümü.
4. **Dashboard** — Giriş sonrası ana sayfa (rol bazlı).
5. **Auth** — Login, Register.
6. **Admin** — Bekleyen kayıtlar, kullanıcı listesi, görünürlük.
7. **Otel paneli** — Profil, oda tipleri, doluluk.

Bu sıra önce “ürün yüzü” (katalog + rezervasyon), sonra yönetim ekranları şeklindedir.

**Brief’ler:** Her adım için v0’da kullanılacak tasarım brief’leri `docs/design/` altında numaralı dosyalarda (örn. `01-rezervasyon-akisi.md`). Detay: `docs/design/README.md`.

---

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

**Yapılmayan maddeler notu (Faz 1):** Veri modeli şemaları (ER/Mermaid): dokümantasyon önceliği düşük, ihtiyaç halinde yapılacak. Şifre sıfırlama: Faz 7 (bildirim) ile birlikte e-posta akışı planlandığı için bekletildi.

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

**Yapılmayan maddeler notu (Faz 2):** Tasarım (Admin dashboard): v0 tasarım diliminde yapılacak; öncelik rezervasyon/katalog ekranlarına verildi. Manuel kullanıcı ekleme ve kullanıcı detay görüntüleme: MVP sonrası veya ihtiyaç çıktıkça eklenecek.

---

## 🏨 Faz 3: Otel Profili ve Oda Yönetimi

### Backend
- [x] Otel profil API (GET/PATCH)
- [x] Oda tanımlama API (liste + ekleme)
- [x] Doluluk yönetimi API (günlük müsait adet)
- [ ] Fotoğraf upload (Cloudinary)

### Frontend
- [x] Otel profil sayfası
- [ ] Otel fotoğraf galerisi
- [x] Oda tipi ve sayı girişi
- [x] Doluluk takvimi (oda + tarih + müsait adet formu)
- [ ] Fiyat girişi

### Özellikler
- [x] Otel bilgileri güncelleme
- [ ] Fotoğraf yükleme
- [x] Oda tipi oluşturma
- [x] Günlük doluluk girişi
- [ ] Manuel oda bloke/açma (opsiyonel; müsait 0 = bloke)

**Yapılmayan maddeler notu (Faz 3):** Fotoğraf upload (Cloudinary) ve fotoğraf galerisi: altyapı/entegrasyon gerektirdiği için ertelendi; v0 tasarımında galeri placeholder ile planlanabilir. Fiyat girişi: Room.basePrice mevcut; ayrı “fiyat yönetimi” ekranı ileride. Manuel bloke/açma: müsait adet 0 ile zaten bloke sayılıyor; ayrı toggle opsiyonel.

---

## 👁️ Faz 4: Görünürlük ve Yetkilendirme

### Backend
- [ ] Configüratif yetkilendirme sistemi
- [x] Otel görünürlük kuralları (listed: katalogda göster/gizle)
- [ ] Bölge/şehir filtreleme
- [ ] Özel grup yönetimi

### Frontend
- [x] Admin görünürlük ayar sayfası (Otel görünürlük – listed toggle)
- [ ] Otel bazlı yetki düzenleme
- [ ] Rehber bazlı yetki düzenleme
- [ ] Görünürlük test ekranı

### Özellikler
- [x] Admin tarafından otel görünürlüğü ayarlama (listed)
- [ ] Bölgesel kısıtlamalar
- [ ] Anlaşmalı otel grupları

**Yapılmayan maddeler notu (Faz 4):** Configüratif yetkilendirme, bölge/şehir filtreleme, özel grup, otel/rehber bazlı yetki, test ekranı: MVP kapsamında sadece “listed” ile yetinildi; gelişmiş yetkilendirme post-MVP veya ihtiyaç halinde.

---

## 🔍 Faz 5: Otel Katalog ve Detay Sayfası

### Backend
- [x] Otel listeleme API (filtreleme: bölge, şehir, yıldız)
- [x] Otel detay API
- [x] Müsaitlik kontrol API (tarih bazlı, katalog detayda)

### Frontend
- [ ] Tasarım: Otel katalog sayfası (v0.app / wireframe – opsiyonel)
- [x] Otel katalog sayfası (rehber)
- [x] Filtreleme (bölge, şehir, yıldız)
- [ ] Sıralama
- [x] Otel detay sayfası
- [ ] Fotoğraf galerisi
- [x] Oda tipi ve fiyat gösterimi

### Özellikler
- [ ] Müsait otelleri listeleme
- [ ] Otel detaylarını görüntüleme
- [ ] Fiyat karşılaştırma
- [ ] Müsait oda sayısı gösterme

**Yapılmayan maddeler notu (Faz 5):** Tasarım (katalog/detay): v0 tasarım diliminde önerilen sırada yapılacak. Sıralama: öncelik düşük. Fotoğraf galerisi: Faz 3 fotoğraf upload’a bağlı. Özellik checkbox’ları (müsait oteller listeleme vb.): işlev olarak katalog ve müsaitlik API’si var; metin özet/detay sayfa copy’si güncellenebilir.

---

## 🔄 Faz 6: Rezervasyon Sistemi

### Backend
- [x] Rezervasyon oluşturma API (rehber)
- [x] Rezervasyon onay/red API (otel)
- [x] Rezervasyon durum güncelleme
- [x] Rezervasyon kodu oluşturma (OP-xxx)
- [ ] QR kod oluşturma

### Frontend
- [ ] Tasarım: Rezervasyon akışı (v0.app / wireframe – opsiyonel)
- [x] Rezervasyon oluşturma formu (katalog otel detayda)
- [x] Rezervasyon onay ekranı (otel – listede Onayla/Reddet)
- [x] Rezervasyon listesi (rehber + otel)
- [ ] Rezervasyon detay sayfası
- [ ] QR kod görüntüleme
- [ ] Rezervasyon iptal

### Özellikler
- [x] Rezervasyon oluşturma
- [ ] Hedef otele bildirim
- [x] Rezervasyon onaylama
- [x] Rezervasyon kodu üretme
- [x] Rezervasyon statü yönetimi (onay/red)
- [ ] İptal işlemi

**Yapılmayan maddeler notu (Faz 6):** Tasarım (rezervasyon akışı): v0 tasarım diliminde 1. sırada. Rezervasyon detay sayfası ve iptal: sıradaki geliştirme adımları. QR kod: opsiyonel; detay sayfası sonrası. Hedef otele bildirim: Faz 7 (bildirim sistemi) ile yapılacak.

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
