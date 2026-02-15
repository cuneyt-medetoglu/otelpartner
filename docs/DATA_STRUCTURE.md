# Veri Yapısı

## 📊 Veritabanı Tabloları (Genel Bakış)

### Core Tables (Çekirdek Tablolar)
1. **users** - Tüm kullanıcılar
2. **hotels** - Otel bilgileri
3. **guides** - Rehber bilgileri
4. **rooms** - Oda tipleri ve detayları
5. **reservations** - Rezervasyonlar
6. **hotel_photos** - Otel fotoğrafları
7. **visibility_rules** - Görünürlük kuralları
8. **listing_sort_preferences** - Yönlendirme listesi sıralama tercihleri (varsayılan: yakın oteller)
9. **notifications** - Bildirimler
10. **commission_records** - Komisyon kayıtları

---

## 👤 Users Tablosu

Tüm kullanıcılar için temel tablo.

```typescript
users {
  id: UUID (PK)
  email: String (Unique)
  password: String (Hashed)
  role: Enum ['admin', 'hotel', 'guide']
  status: Enum ['pending', 'active', 'suspended', 'rejected']
  email_verified: Boolean
  created_at: DateTime
  updated_at: DateTime
}
```

---

## 🏨 Hotels Tablosu

Otel detay bilgileri.

```typescript
hotels {
  id: UUID (PK)
  user_id: UUID (FK -> users.id)
  name: String
  description: Text
  address: String
  city: String
  region: String
  country: String (Default: 'Türkiye')
  star_rating: Integer (1-5)
  phone: String
  website: String (Nullable)
  amenities: JSON // [wifi, pool, spa, ...]
  latitude: Decimal (Nullable)
  longitude: Decimal (Nullable)
  created_at: DateTime
  updated_at: DateTime
}
```

---

## 🧳 Guides Tablosu

Rehber detay bilgileri.

```typescript
guides {
  id: UUID (PK)
  user_id: UUID (FK -> users.id)
  first_name: String
  last_name: String
  phone: String
  license_number: String
  company_name: String (Nullable)
  city: String
  region: String
  created_at: DateTime
  updated_at: DateTime
}
```

---

## 🛏️ Rooms Tablosu

Oda tipleri ve fiyatları.

```typescript
rooms {
  id: UUID (PK)
  hotel_id: UUID (FK -> hotels.id)
  room_type: String // 'Single', 'Double', 'Suite', ...
  total_count: Integer
  base_price: Decimal
  platform_commission: Decimal // %10, %15 vs.
  final_price: Decimal (Calculated)
  amenities: JSON // [balcony, sea_view, ...]
  max_occupancy: Integer
  created_at: DateTime
  updated_at: DateTime
}
```

---

## 📅 Room Availability Tablosu

Günlük oda müsaitliği.

```typescript
room_availability {
  id: UUID (PK)
  room_id: UUID (FK -> rooms.id)
  date: Date
  available_count: Integer
  blocked_count: Integer // Manuel bloke
  reserved_count: Integer // Rezervasyonlar
  created_at: DateTime
  updated_at: DateTime
  
  // Unique Constraint: (room_id, date)
}
```

---

## 🔄 Reservations Tablosu

Rezervasyon kayıtları.

```typescript
reservations {
  id: UUID (PK)
  reservation_code: String (Unique, Generated)
  sender_type: Enum ['hotel', 'guide']
  sender_id: UUID // hotel.id veya guide.id
  target_hotel_id: UUID (FK -> hotels.id)
  room_id: UUID (FK -> rooms.id)
  
  check_in_date: Date
  check_out_date: Date
  room_count: Integer
  guest_count: Integer
  total_price: Decimal
  
  status: Enum [
    'pending',
    'approved', 
    'rejected',
    'checked_in',
    'completed',
    'cancelled',
    'no_show'
  ]
  
  rejection_reason: Text (Nullable)
  qr_code_url: String (Nullable)
  
  approved_at: DateTime (Nullable)
  approved_by: UUID (FK -> users.id, Nullable)
  
  checked_in_at: DateTime (Nullable)
  completed_at: DateTime (Nullable)
  cancelled_at: DateTime (Nullable)
  
  created_at: DateTime
  updated_at: DateTime
}
```

### Rezervasyon Statüleri

| Status | Açıklama | Sonraki Durumlar |
|--------|----------|------------------|
| **pending** | Onay bekliyor | approved, rejected, cancelled |
| **approved** | Onaylandı | checked_in, cancelled, no_show |
| **rejected** | Reddedildi | - (son durum) |
| **checked_in** | Müşteri geldi | completed |
| **completed** | Konaklama tamamlandı | - (komisyon hesaplanır) |
| **cancelled** | İptal edildi | - (son durum) |
| **no_show** | Müşteri gelmedi | - (son durum) |

---

## 📸 Hotel Photos Tablosu

Otel fotoğrafları.

```typescript
hotel_photos {
  id: UUID (PK)
  hotel_id: UUID (FK -> hotels.id)
  url: String // Cloudinary URL
  public_id: String // Cloudinary public_id
  caption: String (Nullable)
  is_primary: Boolean (Default: false)
  order: Integer (Default: 0)
  created_at: DateTime
}
```

---

## 👁️ Visibility Rules Tablosu

Otel ve rehber görünürlük kuralları.

```typescript
visibility_rules {
  id: UUID (PK)
  entity_type: Enum ['hotel', 'guide']
  entity_id: UUID // hotel.id veya guide.id
  
  visibility_type: Enum [
    'all',           // Tüm oteller
    'regional',      // Bölgesel
    'custom_group',  // Özel grup
    'specific'       // Belirli oteller
  ]
  
  allowed_regions: JSON (Nullable) // ['Istanbul', 'Ankara']
  allowed_hotel_ids: JSON (Nullable) // [uuid1, uuid2, ...]
  custom_group_name: String (Nullable)
  
  created_by: UUID (FK -> users.id) // Admin
  created_at: DateTime
  updated_at: DateTime
}
```

---

## 🔔 Notifications Tablosu

Kullanıcı bildirimleri.

```typescript
notifications {
  id: UUID (PK)
  user_id: UUID (FK -> users.id)
  type: Enum [
    'reservation_received',
    'reservation_approved',
    'reservation_rejected',
    'reservation_cancelled',
    'account_approved',
    'account_rejected',
    'check_in_reminder'
  ]
  
  title: String
  message: Text
  related_entity_type: String (Nullable) // 'reservation', 'user'
  related_entity_id: UUID (Nullable)
  
  is_read: Boolean (Default: false)
  read_at: DateTime (Nullable)
  
  created_at: DateTime
}
```

---

## 🔔 Notification Preferences Tablosu

Kullanıcı bildirim tercihleri.

```typescript
notification_preferences {
  id: UUID (PK)
  user_id: UUID (FK -> users.id, Unique)
  
  email_enabled: Boolean (Default: true)
  sms_enabled: Boolean (Default: false)
  push_enabled: Boolean (Default: true)
  phone_call_enabled: Boolean (Default: false)
  
  // Bildirim tipleri için özel ayarlar
  new_reservation_channels: JSON // ['email', 'sms', 'push']
  approval_channels: JSON
  cancellation_channels: JSON
  
  created_at: DateTime
  updated_at: DateTime
}
```

---

## 💰 Commission Records Tablosu

Komisyon takibi.

```typescript
commission_records {
  id: UUID (PK)
  reservation_id: UUID (FK -> reservations.id, Unique)
  hotel_id: UUID (FK -> hotels.id)
  
  room_price: Decimal
  commission_rate: Decimal // %10, %15
  commission_amount: Decimal (Calculated)
  
  month: String // '2026-02'
  year: Integer // 2026
  
  payment_status: Enum ['pending', 'paid']
  paid_at: DateTime (Nullable)
  
  created_at: DateTime
  updated_at: DateTime
}
```

---

## 📐 Yönlendirme Listesi Sıralama

**Varsayılan (default config)**: Liste, coğrafi yakınlığa göre sıralanır (dolu otel veya rehberin konumuna en yakın oteller önce). Bunun için otellerde `latitude` ve `longitude` alanları kullanılır.

**Kullanıcı tercihi**: Otel veya rehber listeyi farklı kriterlere göre sıralayabilir. Bu tercih kullanıcı/hotel/guide bazında saklanır.

```typescript
listing_sort_preferences {
  id: UUID (PK)
  entity_type: Enum ['hotel', 'guide']
  entity_id: UUID // hotel.id veya guide.id
  
  default_sort: Enum [
    'distance',      // Yakınlık (sistem varsayılanı)
    'price_asc',
    'price_desc',
    'star_rating',
    'availability',
    'amenities'      // Tesis özellikleri vb.
  ]
  // İleride sektörde yaygın diğer kriterler eklenebilir
  
  created_at: DateTime
  updated_at: DateTime
}
```

Sıralama seçenekleri: mesafe (varsayılan), fiyat (artan/azalan), yıldız, müsait oda sayısı, tesis özellikleri ve ihtiyaç halinde diğer kriterler.

---

## 📝 Activity Logs Tablosu

Sistem aktivite logları.

```typescript
activity_logs {
  id: UUID (PK)
  user_id: UUID (FK -> users.id, Nullable)
  action: String // 'created_reservation', 'approved_user', ...
  entity_type: String // 'reservation', 'user', 'hotel'
  entity_id: UUID (Nullable)
  
  description: Text
  metadata: JSON (Nullable) // Extra bilgiler
  ip_address: String (Nullable)
  user_agent: String (Nullable)
  
  created_at: DateTime
}
```

---

## 🔗 İlişkiler (Relations)

```
users (1) -> (1) hotels
users (1) -> (1) guides
users (1) -> (N) notifications
users (1) -> (1) notification_preferences

hotels (1) -> (N) rooms
hotels (1) -> (N) hotel_photos
hotels (1) -> (N) reservations (as target)
hotels (1) -> (N) visibility_rules
hotels (1) -> (0..1) listing_sort_preferences

guides (1) -> (N) reservations (as sender)
guides (1) -> (N) visibility_rules
guides (1) -> (0..1) listing_sort_preferences

rooms (1) -> (N) room_availability
rooms (1) -> (N) reservations

reservations (1) -> (1) commission_records
reservations (1) -> (N) notifications
```

---

## 📋 İndeks Stratejisi

### Performans için Önerilen İndeksler

```sql
-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);

-- Hotels
CREATE INDEX idx_hotels_city ON hotels(city);
CREATE INDEX idx_hotels_region ON hotels(region);
CREATE INDEX idx_hotels_user_id ON hotels(user_id);

-- Reservations
CREATE INDEX idx_reservations_code ON reservations(reservation_code);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reservations_target_hotel ON reservations(target_hotel_id);
CREATE INDEX idx_reservations_dates ON reservations(check_in_date, check_out_date);

-- Room Availability
CREATE UNIQUE INDEX idx_room_availability_unique ON room_availability(room_id, date);
CREATE INDEX idx_room_availability_date ON room_availability(date);

-- Notifications
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);

-- Commission Records
CREATE INDEX idx_commission_month_year ON commission_records(month, year);
CREATE INDEX idx_commission_payment_status ON commission_records(payment_status);
```

---

## 🔢 Örnek Rezervasyon Kodu Formatı

```
Format: OTP-YYYYMMDD-XXXXX

OTP: OtelPartner
YYYYMMDD: Tarih
XXXXX: Random 5 karakter (alfanumerik)

Örnek: OTP-20260215-A7K9M
```

---

**Not**: Bu veri yapısı Prisma ORM ile implement edilecektir. Detaylar geliştirme aşamasında güncellenecektir.
