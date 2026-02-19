# Geliştirme Notları

## Agent / Geliştirme tercihleri

- **Adım uzunluğu:** İşler kısa adımlarla ilerlesin (token limiti nedeniyle). Her seferinde çok fazla özellik eklenmesin; mantıklı bir blok tamamlanınca durulup sıradaki adım söylensin.

- **DB / tünel hataları:** Migration veya uygulama veritabanına ulaşamazsa (Can't reach database, Connection refused) agent kullanıcıya sormalı; sessizce devam etmemeli.

- **v0.app tasarım:** Tüm sayfaların v0 ile tasarımı **Faz 5 öncesi veya Faz 5 ile** başlayacak (detay: `docs/PROJECT_PHASES.md` → “v0.app ile tasarım zamanı”).

---

## İlk admin giriş bilgileri (seed)

`npm run db:seed` çalıştırdıktan sonra uygulamaya giriş yapmak için:

| Alan    | Değer                     |
|---------|---------------------------|
| Email   | `admin@otelpartner.local` |
| Şifre   | `Admin123!`               |

Bu bilgiler `.env` içinde yorum satırı olarak da duruyor (bakmak için). Farklı bir admin isterseniz `.env`’e `ADMIN_EMAIL` ve `ADMIN_PASSWORD` tanımlayıp seed’i tekrar çalıştırabilirsiniz.

---

## Deployment

- **Hedef production:** Uygulama AWS üzerinde bir **EC2** instance’da çalışacak.
- **Şu an:** AWS’te sadece **PostgreSQL** kurulu (EC2 üzerinde); proje **lokalde** çalışıyor, DB’ye SSH tünel ile bağlanılıyor. İleride (Faz 10) aynı makineye veya ayrı bir EC2’ye **proje kurulumu** eklenecek: Node.js, proje kodu, PM2/Nginx, .env, build. Detaylar: `docs/PROJECT_PHASES.md` → Faz 10 Deployment.
- Detaylar: `docs/TECHNICAL_STACK.md` → Deployment bölümü.

---

## Faz 1 – Sizin yapacaklarınız

Aşağıdaki adımlar sizin ortamınızda yapılacak (API anahtarı, hesap, lokal kurulum vb.):

1. **Node.js kurulumu**  
   Projede Node.js 18+ kullanılıyor. Yüklü değilse: [nodejs.org](https://nodejs.org) veya `nvm` ile kurun.

2. **PostgreSQL**  
   Bilgisayarınızda PostgreSQL kurulu olmalı ve servisi çalışıyor olmalı (localhost:5432). Kurulum adımları: aşağıdaki **“PostgreSQL lokal kurulum (Windows)”** bölümü. Sonra `.env.example` → `.env` ve `DATABASE_URL` / `NEXTAUTH_*` doldurulacak.

3. **`.env` dosyası**  
   Proje ilk çalıştırmadan önce `.env` oluşturulacak (`.env.example`’dan kopyalanacak). İçinde en azından:
   - `DATABASE_URL` (PostgreSQL connection string)
   - NextAuth için `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (localhost:3010)
   - (İleride) Cloudinary, e-posta (AWS SES vb.) için gerekli anahtarlar  
   Bu dosyayı **siz** oluşturup doldurmalısınız; repo’ya commit edilmez (`.gitignore`’da).

4. **İlk migration**  
   Prisma şeması hazır olduktan sonra `npx prisma migrate dev` komutunu **sizin** ortamınızda çalıştırmanız gerekecek (DB’yi oluşturur / günceller).

5. **AWS EC2 (sonraki aşama)**  
   EC2’de çalıştırma, domain, Nginx/PM2, SSL vb. deployment adımları ileride (Faz 10 veya ayrı bir deployment dokümanında) anlatılacak; şimdilik localhost yeterli.

---

## Faz 1 – İlk çalıştırma (sizin yapacaklarınız)

1. **Node.js** kurulu olsun (18+).
2. **PostgreSQL** kurulu olsun ve servisi çalışsın (localhost:5432).
3. Proje kökünde **`.env`** oluşturun: aşağıdaki “.env nasıl doldurulur?” bölümüne bakın.
4. **İlk migration:** aşağıdaki “Prisma ve migration nedir?” bölümüne bakın; sonra `npx prisma migrate dev --name init` çalıştırın.
5. **Uygulamayı çalıştırın:** `npm run dev` → tarayıcıda http://localhost:3010.

---

## PostgreSQL lokal kurulum (Windows)

1. **İndir**  
   https://www.postgresql.org/download/windows/ → “Download the installer” (EDB’nin Windows installer’ı). Güncel sürüm (örn. 16 veya 17) yeterli.

2. **Kur**  
   - Installer’ı çalıştırın.  
   - Kurulum dizinini varsayılan bırakabilirsiniz (örn. `C:\Program Files\PostgreSQL\16`).  
   - **Components:** PostgreSQL Server, pgAdmin 4, Stack Builder isteğe bağlı; en azından **PostgreSQL Server** seçili olsun.  
   - **Data directory:** Varsayılan kalabilir.  
   - **Şifre:** `postgres` süper kullanıcısı için bir şifre belirleyin. Bu şifreyi not alın; `.env` ve DBeaver’da kullanacaksınız.  
   - **Port:** `5432` (varsayılan).  
   - **Locale:** Varsayılan kalabilir.

3. **Servisin otomatik başlaması**  
   Kurulum son adımında **“Launch PostgreSQL at system startup”** (veya benzeri) seçeneği işaretli olsun. Böylece Windows açıldığında PostgreSQL servisi çalışır.

4. **Kurulum bitince**  
   - İsterseniz **pgAdmin 4** ile bağlanıp test edin (localhost, port 5432, kullanıcı `postgres`, az önce belirlediğiniz şifre).  
   - Veya **Hizmetler**’i açın (`Win + R` → `services.msc`); listede **PostgreSQL** ile başlayan servisi bulun; durumu “Çalışıyor” olmalı. Değilse sağ tık → Başlat.

5. **OtelPartner için veritabanı ve kullanıcı**  
   - DBeaver veya pgAdmin ile `postgres` kullanıcısı ve şifrenizle bağlanın.  
   - Yeni kullanıcı: `CREATE USER otelpartner WITH PASSWORD 'BurayaGucluBirSifre';`  
   - Yeni veritabanı: `CREATE DATABASE otelpartner OWNER otelpartner;`  
   - `.env` içinde:  
     `DATABASE_URL="postgresql://otelpartner:BurayaGucluBirSifre@localhost:5432/otelpartner"`  
   (Şifreyi 2. adımda yazdığınızla değiştirin.)

Bundan sonra `npx prisma migrate dev --name init` çalıştırabilirsiniz.

---

## .env nasıl doldurulur?

Şu an `.env` içinde **placeholder** (örnek) değerler var. Bunları **kendi bilgilerinizle** değiştirmeniz gerekir.

### DATABASE_URL (PostgreSQL) – Adım adım

Bu URL’yi **siz** oluşturmuyorsunuz; sadece **PostgreSQL’e giriş bilgilerinizi** ve **veritabanı adını** bir kalıba yerleştiriyorsunuz.

**Kullanıcı adı ve şifre nereden gelir?**

- PostgreSQL’i kurduğunuzda (Windows’ta installer, Mac’te Postgres.app vb.) bir **süper kullanıcı** oluşturulur; adı çoğu kurulumda **`postgres`**.
- **Şifre:** Kurulum sırasında sizden istenen ve sizin belirlediğiniz şifre. Bunu hatırlamanız gerekir.  
  - Eğer hiç şifre sormadıysa, bazı kurulumlarda boş bırakılır veya kullanıcı adıyla aynı olur (güvenli değil, sadece test için).
- Yani: **Kullanıcı** = PostgreSQL’e bağlanırken kullandığınız isim (genelde `postgres`). **Şifre** = O kullanıcı için kurulumda veya sonradan belirlediğiniz şifre.

**URL kalıbı:**

```
postgresql://KULLANICI:SIFRE@localhost:5432/VERITABANI_ADI
```

1. **KULLANICI:** Çoğu zaman `postgres`. (Kendi oluşturduğunuz bir kullanıcı varsa onu da yazabilirsiniz.)
2. **SIFRE:** Yukarıdaki şifre. İçinde `@`, `#`, `%` gibi karakter varsa URL’de özel encode gerekir; basit bir şifre ile başlamak daha kolay.
3. **localhost:5432:** Bilgisayarınızdaki PostgreSQL; genelde bu değişmez.
4. **VERITABANI_ADI:** Proje için kullanacağınız veritabanı (örn. `otelpartner`). Bu veritabanını **siz** oluşturacaksınız (aşağıda DBeaver ile).

**Örnek:** Kullanıcı `postgres`, şifre `abc123`, veritabanı adı `otelpartner` ise:

```env
DATABASE_URL="postgresql://postgres:abc123@localhost:5432/otelpartner"
```

**Şifreyi hatırlamıyorsanız:** Windows’ta PostgreSQL kurulumunda genelde bir şifre sorulur. Unuttuysanız `pg_hba.conf` ile geçici olarak “trust” yapıp şifreyi sıfırlayabilirsiniz; gerekirse ayrı bir “PostgreSQL şifre sıfırlama” rehberine bakın.

### Sıfırdan yeni kullanıcı ve veritabanı (sadece OtelPartner için)

Bu proje için **ayrı** bir PostgreSQL kullanıcısı ve veritabanı açmak istiyorsanız:

1. **PostgreSQL’e admin olarak bağlanın**  
   Genelde varsayılan admin kullanıcı **`postgres`**; şifresi kurulumda sizin belirlediğiniz şifre. Bu bilgiyle DBeaver’da veya `psql` ile bağlanın. (postgres şifresini bilmiyorsanız önce “PostgreSQL postgres şifre sıfırlama” ile sıfırlamanız gerekir.)

2. **Yeni kullanıcı oluşturun**  
   DBeaver’da: bağlantıya bağlanın → SQL Editor açın. Aşağıdaki komutu çalıştırın (şifreyi kendiniz belirleyin):

   ```sql
   CREATE USER otelpartner WITH PASSWORD 'BurayaGucluBirSifreYazin';
   ```

3. **Yeni veritabanı oluşturun ve kullanıcıya verin**  
   Aynı SQL penceresinde:

   ```sql
   CREATE DATABASE otelpartner OWNER otelpartner;
   ```

4. **`.env` dosyasına yazın**  
   Kullanıcı adı `otelpartner`, şifre = 2. adımda yazdığınız şifre, veritabanı adı `otelpartner`:

   ```env
   DATABASE_URL="postgresql://otelpartner:BurayaGucluBirSifreYazin@localhost:5432/otelpartner"
   ```

Böylece sadece bu proje için ayrı bir kullanıcı ve veritabanı kullanmış olursunuz.

### "Connection refused" hatası (DBeaver / Prisma)

Hata: *Connection to localhost:5432 refused* veya *getsockopt*  
**Anlamı:** PostgreSQL sunucusu çalışmıyor veya 5432 portunda dinlemiyor. Kullanıcı/şifre değil, sunucu erişimi sorunu.

**Ne yapmalı:**
1. **Windows:** Hizmetler’i açın (`services.msc`) → "postgresql" veya "PostgreSQL 15" (sürüm numarası değişebilir) hizmetini bulun → Başlat / Yeniden başlat. Listede yoksa "Ad" sütununda **postgres** veya **pgsql** ile arama yapın (Ctrl+F veya listeyi kaydırın).
2. **Port:** Sunucunun 5432’de dinlediğinden emin olun. Başka bir program 5432 kullanıyorsa PostgreSQL farklı portta olabilir; `postgresql.conf` içinde `port = 5432` kontrol edin.
3. Başlattıktan sonra DBeaver’da tekrar "Test Connection" deneyin.

**PostgreSQL servisi hiç yoksa:** Bu bilgisayarda PostgreSQL sunucusu servis olarak kurulmamış demektir. PostgreSQL’i kurun ve kurulumda **"Launch at system startup"** (veya "Servisi başlat") seçeneğini işaretleyin; böylece Windows Hizmetler’de görünür ve başlatılabilir.

### NEXTAUTH_SECRET

Oturum (session) güvenliği için rastgele uzun bir metin. Boş bırakmayın.

**Üretmek için (terminalde):**
```bash
openssl rand -base64 32
```
Çıkan satırı kopyalayıp `NEXTAUTH_SECRET="..."` içine yapıştırın.

**Örnek:**
```env
NEXTAUTH_SECRET="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"
```

### NEXTAUTH_URL

Geliştirme için olduğu gibi bırakabilirsiniz:
```env
NEXTAUTH_URL="http://localhost:3010"
```

---

## "Connection refused" hatası nedir, neden çıkıyor?

- **Anlamı:** `localhost:5432` adresinde **hiçbir program dinlemiyor**. Yani bu bilgisayarda PostgreSQL sunucusu ya yüklü değil ya da çalışmıyor (servis kapalı).
- **Neden:** OtelPartner ve DBeaver, veritabanına **localhost** üzerinden bağlanmayı deniyor; localhost = kendi PC. PC’de PostgreSQL sunucusu (servis) yoksa veya kapalıysa bağlantı reddedilir.
- **Normal süreç:** Geliştirme için bu makinede **PostgreSQL kurulu olmalı** ve **Windows’ta ilgili servis çalışıyor olmalı**. Kurulumda “Launch at system startup” (veya benzeri) seçilirse servis otomatik kaydedilir; Hizmetler’de (services.msc) PostgreSQL servisini bulup Başlatmanız gerekir.

**Özet:** Hata = “Bu PC’de 5432 portunda PostgreSQL yok.” Çözüm = PostgreSQL’i kurun ve servisi başlatın; sonra .env ve DBeaver’da localhost:5432 ile bağlanın.

---

## PostgreSQL + DBeaver: Ne yapmalı? (Lokal kurulum)

1. **PostgreSQL çalışıyor olmalı** (Windows’ta servis açık; Mac/Linux’ta `pg_ctl` veya sistem servisi).
2. **DBeaver’da bağlantı:** Yeni connection → PostgreSQL seçin; host `localhost`, port `5432`, kullanıcı (örn. `postgres`) ve şifrenizi girin; “Test connection” ile deneyin.
3. **Veritabanı oluşturun:** Bağlandıktan sonra veritabanlarına sağ tık → “Create new database” → isim: `otelpartner` (veya .env’de kullanacağınız isim). Oluşturun.
4. **.env’deki DATABASE_URL** tam olarak bu bağlantı bilgileriyle dolsun: aynı kullanıcı, şifre, `localhost:5432`, veritabanı adı `otelpartner`.

Bundan sonra `npx prisma migrate dev --name init` çalıştırdığınızda Prisma bu veritabanına tabloları yazar.

---

## Prisma ve migration nedir?

- **Prisma:** Uygulama ile PostgreSQL (veya başka bir veritabanı) arasında köprü kuran bir araçtır (ORM). Kodda “kullanıcı ekle”, “oteli getir” gibi işleri Prisma ile yaparız; o da veritabanına gerekli SQL’i gönderir.
- **Şema:** Projedeki `prisma/schema.prisma` dosyası, veritabanında hangi tabloların (User, Hotel, Guide vb.) ve sütunların olacağını tanımlar. Bu dosya şu an hazır.
- **Migration (göç):** Şemadaki tanıma göre veritabanında **gerçek tabloları oluşturan** adımdır. Yani “şemada yazdığımız User, Hotel, Guide tablolarını PostgreSQL’de oluştur” komutudur.
- **`npx prisma migrate dev --name init`** ne yapar?
  - Projenizin `DATABASE_URL` ile bağlandığı veritabanına (örn. `otelpartner`) gider.
  - Orada `User`, `Hotel`, `Guide` tablolarını (ve ilişkilerini) oluşturur.
  - İlk kez çalıştırdığınızda “init” adında bir migration kaydı da oluşur; ileride şemayı değiştirip tekrar `migrate dev` dediğinizde sadece değişen kısımlar uygulanır.

**Özet:** Migration = “prisma/schema.prisma’daki tasarıma göre veritabanında tabloları oluştur veya güncelle.” İlk seferde `npx prisma migrate dev --name init` çalıştırmanız yeterli.

---

**Güncelleme:** Bu dosya ihtiyaç oldukça Project Manager veya geliştirme sırasında güncellenir.
