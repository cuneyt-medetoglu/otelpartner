# Geliştirme Logu

Kronolojik geliştirme kaydı. Yeni satırlar en üste eklenir.

**Sorumlu:** Project Manager (güncellemeleri bu dosyaya işler).

---

## 2026-02-15

- Faz 6 onay/red: PATCH `/api/reservations/[id]` (sadece otel, status: approved | rejected, opsiyonel rejectionReason); `/dashboard/reservations` sayfasında otel rolü için “İşlem” sütunu, pending satırlarda Onayla/Reddet butonları (ReservationActions client component). STATE, ROADMAP, PROJECT_PHASES güncellendi.

- Faz 6 (rezervasyon) ilk dilim: Reservation modeli (reservationCode, guideId, hotelId, roomId, checkIn/Out, roomCount, guestCount, totalPrice, status), migration; GET/POST /api/reservations; katalog otel detayda Rezervasyon yap formu; /dashboard/reservations (rehber + otel listesi); Dashboard linkleri. Dokümanlar (STATE, ROADMAP, PROJECT_PHASES) güncellendi.

- Faz 5 müsaitlik: GET /api/catalog/hotels/[id]/availability?date=, otel detay sayfasında Müsaitlik sorgula (tarih + tablo).

- Faz 5 (otel katalog): GET /api/catalog/hotels (listed, region, city, starRating), GET /api/catalog/hotels/[id], /dashboard/catalog (liste + filtre), /dashboard/catalog/[id] (detay), middleware katalog guide/admin, Dashboard rehber “Otel kataloğu” linki.

- Faz 4 (görünürlük) ilk dilim: Hotel.listed, migration hotel_listed, GET/PATCH /api/admin/hotels, /dashboard/admin/visibility (Evet/Hayır), Admin’de “Otel görünürlük” linki. NOTES: DB/tünel hatalarında kullanıcıya sor.

- Faz 3 doluluk: RoomAvailability (roomId, date, availableCount), migration, GET/POST `/api/hotel/availability`, `/dashboard/otel/availability` (oda seç, tarih, müsait adet, Kaydet), Dashboard’da “Doluluk” linki.

- Faz 3 oda tipleri: Room modeli (roomType, totalCount, basePrice), migration add_rooms, GET/POST `/api/hotel/rooms`, `/dashboard/otel/rooms` (liste + Ekle formu), Dashboard’da “Oda tipleri” linki. NOTES’a “Agent tercihi: adımlar kısa tutulsun” notu eklendi.

- Faz 3 otel profili: GET/PATCH `/api/hotel/profile` (sadece otel rolü, kendi kaydı), `/dashboard/otel/profile` sayfası (form: ad, açıklama, adres, şehir, bölge, ülke, yıldız, telefon, web, olanaklar, enlem/boylam), middleware’de `/dashboard/otel` ve `/api/hotel` otel rolü koruması, Dashboard’da “Otel profilim” linki.

- Durum özeti ve dokümantasyon güncellemesi: STATE, ROADMAP, PROJECT_PHASES (Faz 1 ve Faz 2 checkbox’ları tamamlananlara göre işaretlendi); sıradaki adım Faz 3 (Otel profili ve oda yönetimi) olarak netleştirildi. Port 3010 kullanımı notlarda.

- Faz 2 genişletildi: GET /api/admin/users (rol/durum filtreli), PATCH kullanıcı için askıya al/aktifleştir (suspended/active); admin sayfasında istatistik kartları (bekleyen, aktif otel, aktif rehber, askıda), “Tüm kullanıcılar” bölümü (Listele + Askıya al / Aktifleştir). Faz 10’a “AWS EC2’de uygulama kurulumu” maddesi eklendi; NOTES’ta mevcut durum (sadece DB sunucuda, proje lokalde) notu güncellendi.

- Faz 2 Admin paneli (temel): Middleware’de `/dashboard/admin` ve `/api/admin` sadece admin; Admin sayfası (bekleyen kayıtlar tablosu, Onayla/Reddet); PATCH `/api/admin/users/[id]` (status: active | rejected); seed script (`npm run db:seed`, varsayılan admin@otelpartner.local / Admin123!); Dashboard’da admin linki. .env.example’a ADMIN_EMAIL/ADMIN_PASSWORD notu eklendi.

- Faz 1 Auth tamamlandı: NextAuth.js (Credentials, JWT, session’da role), middleware (public: /, /login, /register; /dashboard korumalı), SessionProvider, Auth layout, Login ve Register sayfaları (Zod, register API ile User+Hotel/Guide oluşturma), Dashboard layout ve sayfa (/dashboard). Ana sayfaya Giriş/Kayıt ol linkleri eklendi. Sıradaki: NEXTAUTH_SECRET doldurulması, giriş testi, Faz 2 Admin paneli.

- Geliştirme takip yapısı oluşturuldu: `docs/dev/` (README, STATE, ROADMAP, LOG).
- Project Manager kuralına dev takip sorumluluğu eklendi.
- Başlangıç durumu: Faz 1, ilk görev "Proje kurulumu" olarak işlendi.
- Faz 0 güncellendi: GitHub repo tamamlandı olarak işaretlendi (kontrol edildi). "Veri modeli şemaları" tanımlandı (ER diyagramı; Faz 1’de yapılacak). Tasarım ve hazırlık maddeleri ilgili fazlara taşındı: Admin dashboard tasarımı → Faz 2, Otel katalog tasarımı → Faz 5, Rezervasyon akış tasarımı → Faz 6, mobil responsive → Faz 10; development ortamı ve proje yapısı → Faz 1.

- Faz 1 başlatıldı: AWS EC2 / localhost ve sizin yapacaklarınız notları eklendi (docs/dev/NOTES.md). Next.js 14 + TypeScript + Tailwind + Prisma kuruldu; User, Hotel, Guide şeması; .env.example, lib/db.ts; app layout ve page; build başarılı. Sıradaki: .env + migration (sizin), sonra NextAuth ve Login/Register.

- Faz 1 ilerleme: AWS EC2’de PostgreSQL kuruldu; SSH tünel (npm run ssh:tunnel) ile lokal bağlantı; otelpartner kullanıcı/veritabanı oluşturuldu; ilk migration (init) uygulandı; npm run dev çalışıyor, localhost:3010 açıldı. Sıradaki: NextAuth.js, Layout, Login/Register.

---

*(Yeni tamamlanan görevler için buraya tarih + kısa açıklama eklenecek.)*
