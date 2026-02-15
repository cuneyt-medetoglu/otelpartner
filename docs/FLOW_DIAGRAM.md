# Akış Diyagramları

Bu doküman OtelPartner sisteminin ana iş akışlarını Mermaid diyagramları ile gösterir.

---

## 🎯 1. Genel Sistem Akışı

```mermaid
flowchart TB
    Start([Müşteri Otele Gelir])
    Check{Otel<br/>Dolu mu?}
    Welcome[Müşteri Otele Yerleşir]
    
    System[Sistem'e Giriş]
    Search[Müsait Otelleri Ara]
    Show[Otelleri Müşteriye Göster]
    Select[Müşteri Otel Seçer]
    Reserve[Rezervasyon Oluştur]
    
    Notify[Hedef Otele Bildirim]
    Approve{Otel<br/>Onaylar mı?}
    Generate[QR/Rezervasyon Kodu Oluştur]
    Send[Müşteriye Kod Verilir]
    
    GoToHotel[Müşteri Yeni Otele Gider]
    CheckIn[Check-in Yapılır]
    Stay[Konaklama]
    Complete[Konaklama Tamamlanır]
    Commission[Komisyon Kaydedilir]
    
    Reject[Red Nedeni Bildirimi]
    TryAgain[Başka Otel Dene]
    
    Start --> Check
    Check -->|Hayır| Welcome
    Check -->|Evet| System
    
    System --> Search
    Search --> Show
    Show --> Select
    Select --> Reserve
    
    Reserve --> Notify
    Notify --> Approve
    
    Approve -->|Evet| Generate
    Generate --> Send
    Send --> GoToHotel
    GoToHotel --> CheckIn
    CheckIn --> Stay
    Stay --> Complete
    Complete --> Commission
    
    Approve -->|Hayır| Reject
    Reject --> TryAgain
    TryAgain --> Search
    
    style Start fill:#e1f5ff
    style Welcome fill:#c8e6c9
    style Commission fill:#fff9c4
    style Reject fill:#ffcdd2
```

---

## 👤 2. Kullanıcı Kayıt ve Onay Akışı

```mermaid
flowchart LR
    Start([Kullanıcı])
    Register[Kayıt Formu Doldurur]
    Submit[Kayıt Gönderir]
    Pending[(Status: Pending)]
    
    AdminNotif[Admin'e Bildirim]
    AdminReview{Admin<br/>İnceleme}
    
    Approve[Onaylar]
    Active[(Status: Active)]
    NotifyApprove[Kullanıcıya<br/>Onay Bildirimi]
    Login[Giriş Yapabilir]
    
    Reject[Reddeder]
    Rejected[(Status: Rejected)]
    NotifyReject[Kullanıcıya<br/>Red Bildirimi]
    
    Start --> Register
    Register --> Submit
    Submit --> Pending
    Pending --> AdminNotif
    
    AdminNotif --> AdminReview
    
    AdminReview -->|Onay| Approve
    Approve --> Active
    Active --> NotifyApprove
    NotifyApprove --> Login
    
    AdminReview -->|Red| Reject
    Reject --> Rejected
    Rejected --> NotifyReject
    
    style Pending fill:#fff9c4
    style Active fill:#c8e6c9
    style Rejected fill:#ffcdd2
    style Login fill:#bbdefb
```

---

## 🔄 3. Rezervasyon Oluşturma Akışı (Detaylı)

```mermaid
flowchart TB
    Start([Otel/Rehber])
    Login[Sisteme Giriş]
    Dashboard[Dashboard]
    NewReserv[Yeni Rezervasyon]
    
    ViewHotels[Müsait Otelleri Görüntüle]
    Filter[Filtrele<br/>Bölge, Fiyat, Yıldız]
    SelectHotel[Otel Seç]
    ViewDetail[Otel Detayları<br/>Fotoğraflar, Bilgiler]
    
    FillForm[Rezervasyon Formu<br/>Tarih, Oda Sayısı]
    Validate{Form<br/>Geçerli mi?}
    SubmitReserv[Gönder]
    
    CreateRecord[(Reservation: Pending)]
    NotifyTarget[Hedef Otele Bildirim<br/>Email/SMS/Push]
    
    ConfirmScreen[Onay Ekranı]
    ShowCode[Rezervasyon Kodu Göster]
    
    Start --> Login
    Login --> Dashboard
    Dashboard --> NewReserv
    NewReserv --> ViewHotels
    ViewHotels --> Filter
    Filter --> SelectHotel
    SelectHotel --> ViewDetail
    ViewDetail --> FillForm
    
    FillForm --> Validate
    Validate -->|Hayır| FillForm
    Validate -->|Evet| SubmitReserv
    
    SubmitReserv --> CreateRecord
    CreateRecord --> NotifyTarget
    NotifyTarget --> ConfirmScreen
    ConfirmScreen --> ShowCode
    
    style CreateRecord fill:#fff9c4
    style ShowCode fill:#c8e6c9
```

---

## ✅ 4. Rezervasyon Onay Akışı

```mermaid
flowchart TB
    Notif[Hedef Otele<br/>Bildirim Gelir]
    Check[Otel Bildirimi Görür]
    Login[Sisteme Giriş]
    Inbox[Rezervasyon Listesi]
    
    ViewDetail[Rezervasyon Detayları<br/>Tarih, Oda, Gönderen]
    CheckAvail{Oda<br/>Müsait mi?}
    
    Decide{Karar}
    
    Approve[Onayla]
    UpdateApproved[(Status: Approved)]
    GenerateQR[QR Kod Oluştur]
    NotifySender[Gönderene Bildirim]
    WaitGuest[Müşteri Beklenir]
    
    Reject[Reddet]
    ReasonForm[Red Nedeni Gir]
    UpdateRejected[(Status: Rejected)]
    NotifyRejected[Gönderene Red Bildirimi]
    
    Notif --> Check
    Check --> Login
    Login --> Inbox
    Inbox --> ViewDetail
    ViewDetail --> CheckAvail
    
    CheckAvail -->|Evet| Decide
    CheckAvail -->|Hayır| Reject
    
    Decide -->|Onayla| Approve
    Approve --> UpdateApproved
    UpdateApproved --> GenerateQR
    GenerateQR --> NotifySender
    NotifySender --> WaitGuest
    
    Decide -->|Reddet| Reject
    Reject --> ReasonForm
    ReasonForm --> UpdateRejected
    UpdateRejected --> NotifyRejected
    
    style UpdateApproved fill:#c8e6c9
    style UpdateRejected fill:#ffcdd2
    style GenerateQR fill:#bbdefb
```

---

## 🏨 5. Check-in ve Tamamlama Akışı

```mermaid
flowchart LR
    Guest([Müşteri Yeni Otele Gelir])
    ShowCode[Rezervasyon Kodu<br/>Gösterir]
    Reception[Resepsiyon Kodu Kontrol Eder]
    
    SystemCheck{Sistem<br/>Kontrol}
    Valid[Geçerli Rezervasyon]
    
    CheckIn[Check-in İşlemi]
    UpdateCheckIn[(Status: Checked-in)]
    RoomAssign[Oda Verilir]
    
    Stay[Konaklama]
    CheckOut[Check-out]
    
    Complete[Konaklama Tamamla Butonuna Bas]
    UpdateComplete[(Status: Completed)]
    
    CreateCommission[(Komisyon Kaydı Oluştur)]
    Report[Aylık Raporda Görünür]
    
    Invalid[Geçersiz Kod]
    Error[Hata Mesajı]
    
    Guest --> ShowCode
    ShowCode --> Reception
    Reception --> SystemCheck
    
    SystemCheck -->|Geçerli| Valid
    Valid --> CheckIn
    CheckIn --> UpdateCheckIn
    UpdateCheckIn --> RoomAssign
    RoomAssign --> Stay
    
    Stay --> CheckOut
    CheckOut --> Complete
    Complete --> UpdateComplete
    UpdateComplete --> CreateCommission
    CreateCommission --> Report
    
    SystemCheck -->|Geçersiz| Invalid
    Invalid --> Error
    
    style UpdateCheckIn fill:#bbdefb
    style UpdateComplete fill:#c8e6c9
    style CreateCommission fill:#fff9c4
    style Invalid fill:#ffcdd2
```

---

## 🔔 6. Bildirim Akışı

```mermaid
flowchart TB
    Event([Sistem Eventi])
    
    CheckType{Event<br/>Tipi}
    
    NewRes[Yeni Rezervasyon]
    Approved[Rezervasyon Onayı]
    Rejected[Rezervasyon Red]
    Cancelled[Rezervasyon İptal]
    CheckedIn[Check-in]
    AccApproved[Hesap Onayı]
    
    GetUser[Hedef Kullanıcı Belirle]
    GetPrefs[(Kullanıcı<br/>Bildirım Tercihleri)]
    
    CheckEmail{Email<br/>Aktif mi?}
    SendEmail[Email Gönder]
    
    CheckSMS{SMS<br/>Aktif mi?}
    SendSMS[SMS Gönder]
    
    CheckPush{Push<br/>Aktif mi?}
    SendPush[Push Bildirimi]
    
    SaveNotif[(Notification<br/>Tablosuna Kaydet)]
    
    Done([Tamamlandı])
    
    Event --> CheckType
    
    CheckType --> NewRes
    CheckType --> Approved
    CheckType --> Rejected
    CheckType --> Cancelled
    CheckType --> CheckedIn
    CheckType --> AccApproved
    
    NewRes --> GetUser
    Approved --> GetUser
    Rejected --> GetUser
    Cancelled --> GetUser
    CheckedIn --> GetUser
    AccApproved --> GetUser
    
    GetUser --> GetPrefs
    GetPrefs --> CheckEmail
    
    CheckEmail -->|Evet| SendEmail
    CheckEmail -->|Hayır| CheckSMS
    SendEmail --> CheckSMS
    
    CheckSMS -->|Evet| SendSMS
    CheckSMS -->|Hayır| CheckPush
    SendSMS --> CheckPush
    
    CheckPush -->|Evet| SendPush
    CheckPush -->|Hayır| SaveNotif
    SendPush --> SaveNotif
    
    SaveNotif --> Done
    
    style SendEmail fill:#bbdefb
    style SendSMS fill:#c8e6c9
    style SendPush fill:#fff9c4
```

---

## 💰 7. Komisyon Hesaplama Akışı

```mermaid
flowchart LR
    Start([Ay Sonu])
    Trigger[Komisyon Raporu Oluşturma]
    
    Query[(Completed<br/>Rezervasyonları Getir)]
    Filter[Bu Ay İçindekiler]
    
    Loop{Her<br/>Rezervasyon}
    
    Calculate[Komisyon Hesapla<br/>Oda Fiyatı × Komisyon Oranı]
    
    CheckExists{Komisyon<br/>Kaydı Var mı?}
    
    Create[(Yeni Kayıt Oluştur)]
    Skip[Atla]
    
    GroupByHotel[Otele Göre Grupla]
    GenerateReport[Rapor Oluştur]
    
    AdminView[Admin Raporu Görür]
    SendInvoice[Fatura Gönder]
    
    MarkPaid[Ödeme Yapıldı İşaretle]
    UpdateRecord[(Payment Status: Paid)]
    
    Start --> Trigger
    Trigger --> Query
    Query --> Filter
    Filter --> Loop
    
    Loop -->|Var| Calculate
    Calculate --> CheckExists
    
    CheckExists -->|Hayır| Create
    CheckExists -->|Evet| Skip
    
    Create --> Loop
    Skip --> Loop
    
    Loop -->|Bitti| GroupByHotel
    GroupByHotel --> GenerateReport
    GenerateReport --> AdminView
    
    AdminView --> SendInvoice
    SendInvoice --> MarkPaid
    MarkPaid --> UpdateRecord
    
    style Calculate fill:#fff9c4
    style Create fill:#c8e6c9
    style UpdateRecord fill:#bbdefb
```

---

## 👁️ 8. Görünürlük Kontrolü Akışı

```mermaid
flowchart TB
    User([Kullanıcı<br/>Otel/Rehber])
    Action[Otelleri Listele Talebi]
    
    GetUser[Kullanıcı Bilgisi]
    GetRules[(Visibility Rules<br/>Getir)]
    
    CheckType{Görünürlük<br/>Tipi}
    
    All[Tüm Oteller]
    Regional[Bölgesel]
    Custom[Özel Grup]
    Specific[Belirli Oteller]
    
    QueryAll[(Tüm Aktif Otelleri Getir)]
    
    QueryRegion[(Aynı Bölgedeki Otelleri Getir)]
    
    QueryGroup[(Grup ID'deki Otelleri Getir)]
    
    QuerySpecific[(Belirtilen Otelleri Getir)]
    
    ApplyFilters[Kullanıcı Filtreleri Uygula<br/>Fiyat, Yıldız, vs.]
    CheckAvail[Müsaitlik Kontrolü]
    Sort[Sıralama]
    
    Return[Otel Listesi Dön]
    Display[Ekranda Göster]
    
    User --> Action
    Action --> GetUser
    GetUser --> GetRules
    GetRules --> CheckType
    
    CheckType -->|all| All
    CheckType -->|regional| Regional
    CheckType -->|custom_group| Custom
    CheckType -->|specific| Specific
    
    All --> QueryAll
    Regional --> QueryRegion
    Custom --> QueryGroup
    Specific --> QuerySpecific
    
    QueryAll --> ApplyFilters
    QueryRegion --> ApplyFilters
    QueryGroup --> ApplyFilters
    QuerySpecific --> ApplyFilters
    
    ApplyFilters --> CheckAvail
    CheckAvail --> Sort
    Sort --> Return
    Return --> Display
    
    style GetRules fill:#fff9c4
    style ApplyFilters fill:#bbdefb
    style Display fill:#c8e6c9
```

---

## 📊 9. Admin Dashboard Veri Akışı

```mermaid
flowchart LR
    Admin([Admin])
    Login[Giriş Yap]
    Dashboard[Dashboard Yükle]
    
    Query1[(Toplam Kullanıcı)]
    Query2[(Aktif Rezervasyonlar)]
    Query3[(Aylık Yönlendirmeler)]
    Query4[(Komisyon Toplamı)]
    Query5[(Sistem Logları)]
    
    Process[Verileri İşle]
    
    Chart1[Kullanıcı Grafiği]
    Chart2[Rezervasyon Grafiği]
    Chart3[Komisyon Grafiği]
    
    Stats[İstatistikler]
    Tables[Tablolar]
    
    Display[Dashboard Göster]
    
    Admin --> Login
    Login --> Dashboard
    
    Dashboard --> Query1
    Dashboard --> Query2
    Dashboard --> Query3
    Dashboard --> Query4
    Dashboard --> Query5
    
    Query1 --> Process
    Query2 --> Process
    Query3 --> Process
    Query4 --> Process
    Query5 --> Process
    
    Process --> Chart1
    Process --> Chart2
    Process --> Chart3
    Process --> Stats
    Process --> Tables
    
    Chart1 --> Display
    Chart2 --> Display
    Chart3 --> Display
    Stats --> Display
    Tables --> Display
    
    style Process fill:#fff9c4
    style Display fill:#c8e6c9
```

---

**Not**: Bu akış diyagramları geliştirme sürecinde güncellenecek ve detaylandırılacaktır.
