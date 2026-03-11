# Özellikler Listesi

## 👤 Kullanıcı Yönetimi

### Otel Kaydı
- [ ] Oteller sisteme kayıt olabilir
- [ ] Admin onayı ile aktif olur
- [ ] Admin manuel otel ekleyebilir
- [ ] Otel profili (isim, adres, yıldız, tesisler)
- [ ] Otel fotoğrafları (galeri)
- [ ] Otel açıklaması ve özellikleri

### Rehber Kaydı
- [ ] Rehberler sisteme kayıt olabilir
- [ ] Admin onayı ile aktif olur
- [ ] Admin manuel rehber ekleyebilir
- [ ] Rehber profili (isim, firma, lisans no)

### Admin Onay Sistemi
- [ ] Bekleyen kayıtları görüntüleme
- [ ] Kayıtları onaylama/reddetme
- [ ] Red nedeni girişi

---

## 🏨 Otel Oda Yönetimi

### Oda Tanımlama
- [ ] Oda tipleri (Single, Double, Suite, vb.)
- [ ] Oda sayıları belirleme
- [ ] Oda fiyatları (Platform komisyonu dahil)
- [ ] Oda özellikleri (manzara, büyüklük)

### Doluluk Yönetimi
- [ ] Günlük doluluk girişi
- [ ] Otomatik stok takibi (rezervasyon ile)
- [ ] Manuel oda bloke/açma
- [ ] Takvim görünümü

---

## 👁️ Görünürlük ve Yetkilendirme

### Otel Görünürlüğü
- [ ] Tüm otelleri görme yetkisi
- [ ] Bölgesel görünürlük ayarı
- [ ] Şehir bazlı filtreleme
- [ ] Özel otel grupları
- [ ] Admin tarafından configürasyon

### Rehber Yetkileri
- [ ] Görebileceği oteller belirleme
- [ ] Bölge kısıtlaması
- [ ] Anlaşmalı oteller listesi

---

## 🔄 Rezervasyon Sistemi

### Rezervasyon Oluşturma
- [ ] Müsait otelleri listeleme
- [ ] Otel detaylarını görüntüleme (fiyat, fotoğraf, bilgi)
- [ ] Oda sayısı ve tipi seçimi
- [ ] Giriş-çıkış tarihi
- [ ] Anonim rezervasyon kodu oluşturma

### Rezervasyon Onay
- [ ] Hedef otele bildirim gönderme
- [ ] Otel rezervasyonu onaylama/reddetme
- [ ] Onaylandıktan sonra QR kod/rezervasyon kodu
- [ ] Red nedeni girişi

### Rezervasyon Statüleri
- [ ] **Pending**: Onay bekliyor
- [ ] **Approved**: Onaylandı
- [ ] **Rejected**: Reddedildi
- [ ] **Checked-in**: Müşteri geldi
- [ ] **Completed**: Konaklama tamamlandı (komisyon hesabı için)
- [ ] **Cancelled**: İptal edildi
- [ ] **No-show**: Müşteri gelmedi

### Rezervasyon İptali
- [ ] Yönlendiren iptal edebilir
- [ ] Hedef otel iptal edebilir
- [ ] İptal bildirimleri

---

## 🔔 Bildirim Sistemi

### Bildirim Kanalları
- [ ] Email bildirimleri
- [ ] SMS bildirimleri
- [ ] Uygulama içi bildirimler
- [ ] Telefon araması (opsiyonel)

### Bildirim Tercihleri
- [ ] Kullanıcı kendi tercihini seçer
- [ ] Admin kullanıcıya zorla bildirim ayarı
- [ ] Bildirim zamanlama (anında, toplu)

### Bildirim Senaryoları
- [ ] Yeni rezervasyon geldiğinde
- [ ] Rezervasyon onaylandığında
- [ ] Rezervasyon iptal edildiğinde
- [ ] Müşteri check-in yaptığında
- [ ] Hesap onaylandığında

---

## 📊 Raporlama ve Komisyon

### Otel Raporları
- [ ] Gönderilen rezervasyonlar
- [ ] Alınan rezervasyonlar
- [ ] Tamamlanan konaklamalar
- [ ] Aylık özet raporu

### Komisyon Takibi
- [ ] Tamamlanan rezervasyonlar listesi
- [ ] Komisyon tutarı hesaplama
- [ ] Aylık komisyon raporu
- [ ] Ödeme durumu (ödendi/ödenmedi)
- [ ] Fatura oluşturma

### Rehber Raporları
- [ ] Yönlendirilen müşteri sayısı
- [ ] Başarı oranı
- [ ] Aylık performans

---

## 🎛️ Admin Paneli

### Dashboard
- [ ] Toplam kullanıcı sayısı
- [ ] Aktif rezervasyonlar
- [ ] Aylık yönlendirme istatistikleri
- [ ] Komisyon grafiği
- [ ] Sistem sağlığı

### Kullanıcı Yönetimi
- [ ] Tüm kullanıcıları listeleme
- [ ] Kullanıcı detayları
- [ ] Hesap askıya alma/silme
- [ ] Yetki düzenleme

### Sistem Ayarları
- [ ] Platform komisyon oranı
- [ ] Görünürlük kuralları
- [ ] Bildirim şablonları
- [ ] Genel ayarlar

### Log ve Takip
- [ ] Kullanıcı aktiviteleri
- [ ] Sistem logları
- [ ] Hata raporları

---

## 🎨 Kullanıcı Arayüzü

### Otel/Rehber Paneli
- [ ] Dashboard (özet bilgiler)
- [ ] Profil yönetimi
- [ ] Oda/doluluk yönetimi (sadece otel)
- [ ] Rezervasyon oluşturma
- [ ] Rezervasyon listesi
- [ ] Bildirim merkezi

### Otel Katalog ve Yönlendirme Listesi
- [ ] **Katalog erişimi**: Hem **Otel** hem **Rehber** rolü otel kataloğunu görüntüleyebilir ve (yetki kurallarına göre) diğer otellere rezervasyon gönderebilir.
- [ ] Otel kartları (fotoğraf, isim, fiyat)
- [ ] **Varsayılan sıralama**: Yakın oteller önce (mesafe / coğrafi yakınlık). Bu bir default config’tir; otel veya rehber listeyi farklı kriterlere göre de sıralayabilir.
- [ ] **Sıralama seçenekleri** (kullanıcı tarafından seçilebilir): Mesafe (varsayılan), fiyat (artan/azalan), yıldız, tesis özellikleri, müsait oda sayısı vb. Sektörde yaygın kullanılan tüm kriterler listeye eklenebilir.
- [ ] Filtreleme (fiyat, bölge, yıldız, müsaitlik)
- [ ] Detay modal/sayfa
- [ ] Müsait oda görüntüleme

---

## 🔐 Güvenlik

### Kimlik Doğrulama
- [ ] Email/Şifre girişi
- [ ] JWT token sistemi
- [ ] Şifre sıfırlama
- [ ] 2FA (opsiyonel - sonraki faz)

### Veri Güvenliği
- [ ] Kişisel veri saklanmaz
- [ ] Anonim rezervasyon kodları
- [ ] API rate limiting
- [ ] HTTPS zorunluluğu

---

**Not**: Bu liste Faz 1 için temel özelliklerdir. İlerleyen fazlarda eklemeler yapılacaktır.
