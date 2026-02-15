# Product Requirements Document (PRD)
## OtelPartner – B2B Otel Yönlendirme Platformu

**Sorumlu**: Project Manager (Cursor rule)  
**Versiyon**: 1.0  
**Son Güncelleme**: 15 Şubat 2026  
**Durum**: Planlama

---

## 1. Ürün Vizyonu

OtelPartner, oteller ve tur rehberleri için B2B odaklı bir yönlendirme platformudur. Dolu olan otel veya rehber, müşteriyi sistemde kayıtlı diğer otellere (doluluk ve yetki kurallarına göre) yönlendirir; rezervasyon onayı ve QR/kod ile check-in akışı platform üzerinden yönetilir. Son kullanıcılar sisteme girmemekte; sadece kayıtlı otel ve rehberler kullanmaktadır.

---

## 2. Hedefler

- Dolu otellerin müşteriyi müsait otellere güvenli ve hızlı yönlendirmesi
- Rehberlerin müşterileri uygun otellere yönlendirebilmesi
- Rezervasyon onayı, QR/kod ile check-in ve komisyon takibi
- Kişisel veri saklamadan, admin onaylı ve yetkiye dayalı çalışan bir sistem
- Yönlendirme listesinde varsayılan olarak yakın otellerin öne çıkması; kullanıcının fiyat, yıldız vb. ile sıralama yapabilmesi

---

## 3. Kullanıcı Tipleri

| Rol    | Açıklama |
|--------|----------|
| Admin  | Tüm sistemi yönetir; kullanıcı onayı, görünürlük, raporlama, ayarlar. |
| Hotel  | Oda/doluluk yönetimi, yönlendirme yapma, gelen rezervasyonları onaylama, check-in, raporlar. |
| Guide  | Müsait otellere rezervasyon gönderme, kendi yönlendirmelerini görüntüleme. |

Detaylı yetkiler: `ROLES_PERMISSIONS.md`.

---

## 4. Kapsam

### 4.1 Dahil (MVP)

- Otel ve rehber kaydı; admin onayı ile aktifleşme; admin manuel kayıt
- Otel profili: bilgiler, fotoğraflar, oda tipleri, fiyatlar (komisyon dahil), doluluk girişi
- Görünürlük: configüratif; bölgesel, özel grup veya belirli oteller
- Yönlendirme listesi: **varsayılan sıralama yakın oteller (mesafe)**; kullanıcı fiyat, yıldız, müsaitlik, tesis özellikleri vb. ile sıralama yapabilir
- Rezervasyon: oluşturma, hedef otele bildirim, onay/red, QR/rezervasyon kodu, iptal
- Rezervasyon statüleri: Pending, Approved, Rejected, Checked-in, Completed, Cancelled, No-show
- Check-in ve “konaklama tamamlandı” ile komisyon kaydı
- Bildirim: Email, SMS, uygulama, arama; kullanıcı ve admin tercihleri
- Raporlama: gönderilen/alınan rezervasyonlar, tamamlanan konaklamalar, komisyon raporu
- Admin paneli: dashboard, kullanıcı yönetimi, görünürlük, raporlar, loglar

### 4.2 Hariç (MVP)

- Son kullanıcı girişi
- Platform içi ödeme; sadece komisyon takibi ve ay sonu raporlama
- Kişisel veri toplama; anonim rezervasyon bilgisi

---

## 5. Özellik Özeti

- **Kullanıcı yönetimi**: Kayıt, admin onayı, profil (otel/rehber).
- **Otel yönetimi**: Profil, fotoğraflar, oda tipleri, fiyat (komisyon dahil), doluluk.
- **Görünürlük**: Admin tarafından bölge, grup veya belirli oteller; otel/rehber bazlı.
- **Yönlendirme listesi**: Varsayılan = mesafe (yakın oteller önce); seçenekler: fiyat, yıldız, müsaitlik, tesis vb.
- **Rezervasyon**: Oluşturma, onay/red, QR/kod, iptal, statü yönetimi, check-in, tamamlama.
- **Bildirim**: Email, SMS, push, arama; tercih ve şablon yönetimi.
- **Raporlama ve komisyon**: Tamamlanan konaklamalar, komisyon hesaplama, aylık rapor.
- **Admin**: Dashboard, kullanıcı/görünürlük/ayar yönetimi, log ve raporlar.

Detaylı özellik listesi: `FEATURES.md`.

---

## 6. Yönlendirme Listesi ve Sıralama

- **Varsayılan (default config)**: Liste, coğrafi yakınlığa göre sıralanır (dolu otel veya rehberin konumuna en yakın oteller önce). Otellerde `latitude`/`longitude` kullanılır.
- **Kullanıcı tercihi**: Otel veya rehber listeyi değiştirebilir: mesafe, fiyat (artan/azalan), yıldız, müsait oda sayısı, tesis özellikleri vb. Sektörde yaygın diğer kriterler ileride eklenebilir.
- Teknik detay: `DATA_STRUCTURE.md` içinde `listing_sort_preferences` ve ilgili açıklamalar.

---

## 7. İş Kuralları (Özet)

- Rezervasyon ancak hedef otel onayladıktan sonra kesinleşir; onay sonrası QR/rezervasyon kodu verilir.
- Komisyon, “konaklama tamamlandı” (Completed) statüsündeki rezervasyonlar için hesaplanır; ödeme platform dışında, ay sonu raporlaması ile takip edilir.
- Kişisel veri tutulmaz; rezervasyon bilgisi anonim ve anlaşılabilir düzeyde tutulur.
- Görünürlük ve sıralama tercihleri configüratif; admin tarafından yönetilir, kullanıcı kendi sıralama tercihini seçebilir.

---

## 8. Doküman Referansları

| Doküman | İçerik |
|---------|--------|
| README.md | Proje özeti, hedef kullanıcılar, gelir modeli. |
| FEATURES.md | Detaylı özellik listesi. |
| ROLES_PERMISSIONS.md | Roller ve yetkiler. |
| DATA_STRUCTURE.md | Veri modeli, tablolar, sıralama tercihleri. |
| FLOW_DIAGRAM.md | İş akışı diyagramları (Mermaid). |
| TECHNICAL_STACK.md | Teknoloji önerileri. |
| PROJECT_PHASES.md | Geliştirme fazları. |
| INDEX.md | Doküman indeksi. |

---

## 9. Versiyon ve İlerleme

- Bu PRD ve tüm `docs/` dokümanlarının güncelliği, versiyon notları ve ilerleme takibi **Project Manager** (Cursor rule) sorumluluğundadır.
- PRD veya diğer dokümanlarda değişiklik yapıldığında ilgili dosyalar ve (uygunsa) versiyon bilgisi Project Manager tarafından güncellenir.

---

**PRD son güncelleme**: 15 Şubat 2026
