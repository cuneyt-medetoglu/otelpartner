# Geliştirme Takip ve İlerleme

Bu klasör, geliştirme ilerlemesini takip etmek ve **birden fazla sohbet (thread)** açılsa bile tek kaynaktan güncel kalmak için kullanılır.

## Hangi sırayla başlanır?

Sıra **PROJECT_PHASES.md** ile aynıdır:

1. **Faz 0** – Planlama ve Tasarım (kalan işler: veri modeli şemaları, tasarım, hazırlık)
2. **Faz 1** – Temel altyapı ve kullanıcı yönetimi (proje kurulumu, auth, kayıt)
3. **Faz 2** – Admin paneli
4. **Faz 3** – Otel profili ve oda yönetimi
5. … devamı `docs/PROJECT_PHASES.md` içinde

Geliştirmeye **Faz 1** ile başlamak mantıklıdır (Faz 0’daki dokümantasyon büyük ölçüde tamamlandı).

## Hangi dokümandan takip edilir?

| Doküman | Amaç |
|--------|------|
| **STATE.md** | Tek kaynak: şu anki faz, şu anki görev, devam eden, sıradaki. Her thread önce bunu okusun. |
| **ROADMAP.md** | Özet yol haritası; mevcut faz/görev + PROJECT_PHASES ile senkron durumu. |
| **LOG.md** | Kronolojik geliştirme logu; ne zaman ne yapıldı. |
| **docs/PROJECT_PHASES.md** | Tüm fazların ve görevlerin tam listesi (checkbox’lar burada veya ROADMAP’te güncellenir). |

**Özet:** İlerlemeyi takip etmek için önce `STATE.md`, genel plan için `ROADMAP.md` ve `PROJECT_PHASES.md` kullanın.

## Çoklu thread (birden fazla sohbet) nasıl kullanılır?

- Tüm ilerleme durumu **dosyalarda** tutulur (STATE, ROADMAP, LOG, PROJECT_PHASES). Konuşma geçmişi tek kaynak değildir.
- **Yeni bir thread açtığınızda:** "Şu an neredeyiz?" derseniz veya doğrudan işe başlarsanız, agent `docs/dev/STATE.md` ve gerekirse `ROADMAP.md` / `PROJECT_PHASES.md` okuyup güncel bağlamı alır.
- **Bir görev bitirdiğinizde:** "X tamamlandı" veya "Faz 1’deki Y’yi yaptım" deyin; **Project Manager** STATE, LOG, ROADMAP ve PROJECT_PHASES’taki checkbox’ları günceller.
- **Aynı anda iki thread farklı görevde çalışıyorsa:** Mümkünse farklı fazlarda veya farklı alt görevlerde ilerleyin; biten her görev için "X tamamlandı" diyerek STATE/LOG güncellemesi isteyin. Çakışmayı azaltmak için STATE’te "Şu an üzerinde çalışılan" alanı tek tutulur; ikinci thread "ben Y’ye başlıyorum" derse STATE buna göre güncellenir.

## Önerilen ilerleme yöntemi

1. **Başlamadan önce** (ister bu thread ister yeni thread): `docs/dev/STATE.md` okuyun; "Şu anki görev" ne ise ona odaklanın.
2. **Görev yaparken:** Sadece o görevle ilgili kod/doküman değişikliği yapın.
3. **Görev bitince:** "Faz X / Y görevi tamamlandı" deyin; Project Manager STATE, LOG, ROADMAP ve PROJECT_PHASES’ı günceller.
4. **Yeni thread’de:** "Geliştirme nerede kaldı?" veya "Sıradaki görev ne?" derseniz agent STATE ve ROADMAP’e bakarak cevap verir.

Böylece konuşma kaydı kaybolsa bile ilerleme `docs/dev/` ve `PROJECT_PHASES.md` üzerinden takip edilir.

## Sorumluluk

**Project Manager** (`.cursor/rules/project-manager.mdc`):

- `docs/dev/STATE.md`, `docs/dev/ROADMAP.md`, `docs/dev/LOG.md` ve `docs/PROJECT_PHASES.md` güncellemelerinden sorumludur.
- "X tamamlandı" / "Y’ye geçiyoruz" gibi taleplerde bu dosyaları günceller; ROADMAP ile ana roadmap (PROJECT_PHASES) tutarlı kalır.
