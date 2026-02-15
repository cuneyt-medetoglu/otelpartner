# OtelPartner - B2B Otel Yönlendirme Platformu

## 🎯 Proje Özeti

OtelPartner, oteller ve tur rehberleri için geliştirilmiş bir B2B yönlendirme platformudur. Otel dolu olduğunda müşterilerin diğer otellere yönlendirilmesini sağlar.

## 🏨 Hedef Kullanıcılar

- **Oteller**: Doluluk durumunu yönetir, müşteri yönlendirir ve yönlendirme alır
- **Tur Rehberleri**: Müşterileri uygun otellere yönlendirir
- **Admin**: Tüm sistemi yönetir, kullanıcıları onaylar

## 💡 Ana Fikir

Bir otel dolduğunda, ön büro personeli sistem üzerinden:
1. Müsait otelleri görür (fiyat, fotoğraf, bilgilerle)
2. Müşteriye seçenekleri sunar
3. Rezervasyon oluşturur
4. Karşı otel onaylar
5. QR kod/rezervasyon kodu ile müşteri yeni otele gider

## 💰 Gelir Modeli

Platform, yönlendirilen ve konaklanan her müşteriden komisyon alır. Ödeme sistemi dışında, ay sonu raporlaması ile takip edilir.

## 🔐 Güvenlik

- Kişisel veri saklanmaz
- Admin onaylı üyelik sistemi
- Rol bazlı yetkilendirme
- Configüratif görünürlük kontrolleri

## 📊 İş Akışı

```
Müşteri → Otel (Dolu) → Sistem (Müsait Oteller) → Rezervasyon 
→ Onay → QR/Kod → Yeni Otel → Check-in → Komisyon Kaydı
```

## 📁 Doküman Yapısı

- `PRD.md` - Product Requirements Document (tek referans; Project Manager sorumluluğunda)
- `FEATURES.md` - Detaylı özellik listesi
- `TECHNICAL_STACK.md` - Teknoloji seçimleri
- `PROJECT_PHASES.md` - Geliştirme aşamaları
- `ROLES_PERMISSIONS.md` - Kullanıcı rolleri ve yetkileri
- `DATA_STRUCTURE.md` - Veri modeli
- `FLOW_DIAGRAM.md` - Akış diyagramları
- `INDEX.md` - Doküman indeksi

Tüm dokümanların güncelliği ve versiyon takibi **Project Manager** (`.cursor/rules/project-manager.mdc`) sorumluluğundadır.

---

**Versiyon**: 1.0  
**Tarih**: 15 Şubat 2026  
**Durum**: Planlama Aşaması
