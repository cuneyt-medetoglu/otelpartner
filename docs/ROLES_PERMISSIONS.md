# Roller ve Yetkiler

## 👥 Kullanıcı Rolleri

Sistemde 3 ana rol bulunmaktadır:

1. **Admin** - Sistem yöneticisi
2. **Hotel** - Otel kullanıcıları
3. **Guide** - Tur rehberi kullanıcıları

---

## 🔐 Admin Yetkileri

### Kullanıcı Yönetimi
- ✅ Tüm kullanıcıları görüntüleme
- ✅ Otel/Rehber kayıtlarını onaylama
- ✅ Otel/Rehber kayıtlarını reddetme
- ✅ Manuel otel ekleme
- ✅ Manuel rehber ekleme
- ✅ Kullanıcı silme
- ✅ Kullanıcı askıya alma
- ✅ Kullanıcı bilgilerini düzenleme

### Görünürlük Yönetimi
- ✅ Otel görünürlük kuralları belirleme
- ✅ Rehber yetkileri belirleme
- ✅ Bölgesel kısıtlamalar
- ✅ Özel otel grupları oluşturma
- ✅ Anlaşmalı otel listeleri

### Rezervasyon Yönetimi
- ✅ Tüm rezervasyonları görüntüleme
- ✅ Rezervasyon detayları
- ✅ Rezervasyon iptal etme
- ✅ Rezervasyon statüsü değiştirme

### Raporlama
- ✅ Tüm istatistiklere erişim
- ✅ Komisyon raporları
- ✅ Kullanıcı aktivite logları
- ✅ Sistem sağlığı raporları
- ✅ Finansal raporlar

### Sistem Ayarları
- ✅ Platform komisyon oranı belirleme
- ✅ Bildirim şablonları düzenleme
- ✅ Genel sistem ayarları
- ✅ Kullanıcı bildirim tercihlerini düzenleme

### Dashboard Erişimi
- ✅ Detaylı admin dashboard
- ✅ Tüm grafikler ve metrikler
- ✅ Log viewer
- ✅ Hata raporları

---

## 🏨 Hotel (Otel) Yetkileri

### Profil Yönetimi
- ✅ Kendi otel bilgilerini düzenleme
- ✅ Otel fotoğrafları yükleme
- ✅ Otel açıklaması güncelleme
- ✅ İletişim bilgileri güncelleme

### Oda Yönetimi
- ✅ Oda tipi ekleme/düzenleme
- ✅ Oda sayısı belirleme
- ✅ Oda fiyatları belirleme
- ✅ Günlük doluluk girişi
- ✅ Manuel oda bloke/açma

### Otel Görüntüleme
- ✅ **Otel Kataloğu**: Hem Otel hem Rehber rolü katalogu görüntüleyebilir (menü ve hızlı erişim). Yetki kurallarına göre diğer otellere rezervasyon gönderebilir.
- ✅ İzin verilen otelleri görüntüleme (admin config'e göre)
- ✅ Otel detaylarını görme
- ✅ Müsaitlik durumunu görme
- ✅ Fiyatları görme
- ❌ İzin verilmeyen otelleri görme

### Rezervasyon İşlemleri
- ✅ Diğer otellere rezervasyon gönderme
- ✅ Gelen rezervasyonları görüntüleme
- ✅ Gelen rezervasyonları onaylama/reddetme
- ✅ Kendi gönderdiği rezervasyonu iptal etme
- ✅ Müşteri check-in işlemi
- ✅ Konaklama tamamlama (completed statüsü)

### Raporlama
- ✅ Kendi gönderdiği rezervasyonlar
- ✅ Aldığı rezervasyonlar
- ✅ Tamamlanan konaklamalar
- ✅ Aylık özet raporu
- ❌ Diğer otellerin raporları

### Bildirimler
- ✅ Kendi bildirim tercihlerini ayarlama
- ✅ Uygulama içi bildirimler
- ✅ Email/SMS tercih seçimi

---

## 🧳 Guide (Rehber) Yetkileri

### Profil Yönetimi
- ✅ Kendi profil bilgilerini düzenleme
- ✅ İletişim bilgileri güncelleme
- ✅ Firma bilgileri

### Otel Görüntüleme
- ✅ İzin verilen otelleri görüntüleme (admin config'e göre)
- ✅ Otel detaylarını görme
- ✅ Müsaitlik durumunu görme
- ✅ Fiyatları görme
- ❌ İzin verilmeyen otelleri görme
- ❌ Oda yönetimi

### Rezervasyon İşlemleri
- ✅ Otellere rezervasyon gönderme
- ✅ Gönderdiği rezervasyonları görüntüleme
- ✅ Kendi gönderdiği rezervasyonu iptal etme
- ❌ Rezervasyon onaylama (sadece otel onaylar)
- ❌ Check-in işlemi

### Raporlama
- ✅ Kendi yönlendirdiği rezervasyonlar
- ✅ Başarı oranı
- ✅ Aylık performans
- ❌ Komisyon detayları
- ❌ Diğer rehberlerin raporları

### Bildirimler
- ✅ Kendi bildirim tercihlerini ayarlama
- ✅ Uygulama içi bildirimler
- ✅ Email/SMS tercih seçimi

---

## 🔒 Yetkilendirme Matrisi

| Özellik | Admin | Hotel | Guide |
|---------|-------|-------|-------|
| Kullanıcı onaylama | ✅ | ❌ | ❌ |
| Otel ekleme | ✅ | ❌ | ❌ |
| Oda yönetimi | ✅* | ✅ | ❌ |
| Tüm otelleri görme | ✅ | Config | Config |
| Rezervasyon gönderme | ❌ | ✅ | ✅ |
| Rezervasyon onaylama | ✅* | ✅ | ❌ |
| Check-in işlemi | ✅* | ✅ | ❌ |
| Tüm raporlar | ✅ | ❌ | ❌ |
| Komisyon raporları | ✅ | ❌ | ❌ |
| Sistem ayarları | ✅ | ❌ | ❌ |
| Görünürlük ayarları | ✅ | ❌ | ❌ |

\* Admin tüm oteller için yapabilir

---

## 🎯 Görünürlük Konfigürasyonu

### Otel İçin Görünürlük Seçenekleri

**1. Tüm Oteller**
- Sistemdeki tüm aktif otelleri görebilir

**2. Bölgesel**
- Sadece belirli bölge/şehirdeki otelleri görebilir
- Admin tarafından tanımlanır
- Örnek: İstanbul otelleri sadece İstanbul otellerini görür

**3. Özel Grup**
- Admin tarafından oluşturulan özel otel grupları
- Örnek: "Lüks Otel Grubu", "Ekonomik Otel Grubu"

**4. Anlaşmalı Oteller**
- Manuel seçilmiş belirli oteller
- Bire bir anlaşma yapılan oteller

### Rehber İçin Görünürlük Seçenekleri

**1. Tüm Oteller**
- Sistemdeki tüm aktif otelleri görebilir

**2. Anlaşmalı Oteller**
- Sadece anlaşma yaptığı oteller
- Admin tarafından tanımlanır

**3. Bölgesel**
- Çalıştığı bölgedeki oteller
- Örnek: Antalya rehberi sadece Antalya otellerini görür

---

## 🔄 Hesap Durumları

### Pending (Beklemede)
- Yeni kayıt olmuş
- Admin onayı bekliyor
- Sisteme giriş yapamaz

### Active (Aktif)
- Admin onaylamış
- Sisteme giriş yapabilir
- Tüm yetkilerini kullanabilir

### Suspended (Askıya Alınmış)
- Admin tarafından askıya alınmış
- Sisteme giriş yapamaz
- Veriler silinmez

### Rejected (Reddedilmiş)
- Admin tarafından reddedilmiş
- Sisteme giriş yapamaz
- Tekrar başvuru yapabilir

---

## 🛡️ Güvenlik Kuralları

### Veri Erişimi
- Her kullanıcı sadece kendi verilerini görebilir
- Admin tüm verileri görebilir
- Cross-user veri erişimi engellenir

### API Güvenliği
- JWT token zorunluluğu
- Rol bazlı middleware kontrolü
- Rate limiting (DDoS koruması)
- Input validation

### Özel Durumlar
- Kişisel veri saklanmaz (KVKK/GDPR uyumu)
- Rezervasyon kodları anonim
- Loglarda kişisel veri saklanmaz

---

**Not**: Yetkiler proje ilerledikçe güncellenebilir ve yeni roller eklenebilir.
