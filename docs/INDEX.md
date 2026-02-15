# OtelPartner Projesi

## 📚 Doküman İndeksi

Projenizin tüm dokümantasyonu aşağıda listelenmiştir:

### 1. [README.md](./README.md)
Projenin genel tanıtımı, ana fikir, hedef kullanıcılar ve gelir modeli.

### 2. [FEATURES.md](./FEATURES.md)
Sistemde olması planlanan tüm özeliklerin detaylı listesi:
- Kullanıcı yönetimi
- Otel ve oda yönetimi
- Rezervasyon sistemi
- Bildirim sistemi
- Raporlama ve komisyon
- Admin paneli

### 3. [TECHNICAL_STACK.md](./TECHNICAL_STACK.md)
Önerilen teknoloji altyapısı:
- Frontend: Next.js 14 + TypeScript + Tailwind + shadcn/ui
- Backend: Next.js API Routes / NestJS
- Database: PostgreSQL + Prisma
- Deploy: Vercel + Neon.tech

### 4. [PROJECT_PHASES.md](./PROJECT_PHASES.md)
12 fazlı geliştirme planı (3 aylık MVP süreci):
- Faz 0-1: Planlama ve altyapı
- Faz 2-4: Admin ve otel yönetimi
- Faz 5-6: Katalog ve rezervasyon
- Faz 7-9: Bildirim ve raporlama
- Faz 10-11: Test ve MVP launch

### 5. [ROLES_PERMISSIONS.md](./ROLES_PERMISSIONS.md)
3 ana rol ve yetkileri:
- **Admin**: Sistem yöneticisi (tüm yetkiler)
- **Hotel**: Otel kullanıcıları (oda yönetimi, rezervasyon)
- **Guide**: Tur rehberleri (rezervasyon gönderme)

### 6. [DATA_STRUCTURE.md](./DATA_STRUCTURE.md)
Veritabanı şeması ve veri modeli:
- 9 ana tablo (users, hotels, guides, rooms, reservations, vb.)
- Rezervasyon statüleri ve akışı
- İlişkiler ve indeksler

### 7. [FLOW_DIAGRAM.md](./FLOW_DIAGRAM.md)
9 farklı iş akışı diyagramı (Mermaid):
- Genel sistem akışı
- Kullanıcı kayıt ve onay
- Rezervasyon oluşturma
- Rezervasyon onay
- Check-in ve tamamlama
- Bildirim sistemi
- Komisyon hesaplama
- Görünürlük kontrolü
- Admin dashboard

---

## 🎯 Proje Durumu

**Faz**: Planlama (Faz 0)  
**Durum**: Dokümentasyon tamamlandı ✅  
**Sonraki Adım**: Tasarım (v0.app / bolt.new)

---

## 🚀 Hızlı Başlangıç

### Sıradaki Adımlar:

1. **Tasarım Oluşturma** (v0.app / bolt.new)
   - Otel katalog sayfası
   - Dashboard tasarımı
   - Rezervasyon akış tasarımı
   - Mobil responsive

2. **Development Ortamı Kurulumu**
   - GitHub repo oluşturma
   - Next.js kurulumu
   - PostgreSQL + Prisma setup
   - Temel klasör yapısı

3. **Geliştirmeye Başlama**
   - Authentication sistemi
   - Database schema
   - İlk sayfalar (Login/Register)

---

## 📞 İletişim

**Proje Adı**: OtelPartner  
**Tarih**: 15 Şubat 2026  
**Versiyon**: 1.0 (Planlama)

---

## 📝 Notlar

- Kişisel veri saklanmaz (KVKK uyumlu)
- Admin onaylı üyelik sistemi
- Configüratif yetkilendirme
- Komisyon tabanlı gelir modeli
- B2B odaklı platform
