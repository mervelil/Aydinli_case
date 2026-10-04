# USPA On-Site Kampanya — Expanding Modal

U.S. Polo Assn. e-ticaret sitesi için desktop ve responsive ekranlarda çalışan on-site kampanya modülü.

**Canlı demo:** _<Vercel linki>_

## Kurulum

Gereksinim: Node.js 20.9+

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build: `npm run build && npm start`

> Demo sayfası açıldıktan **5 saniye sonra** kampanya görünür. Tekrar izlemek için sayfayı yenileyin.
> Responsive görünüm için tarayıcı genişliğini 768px'in altına indirin veya DevTools'ta mobil cihaz modunu açın.

## Teknoloji

- **Next.js (App Router) + React + TypeScript** — USPA storefront'unun altyapısıyla uyumlu olması için
- **CSS Modules** — widget stilleri. On-site çalışmalar mevcut sayfanın üzerine eklendiği için stiller izole tutuldu; host sitenin CSS'i widget'ı, widget'ın CSS'i de siteyi etkilemez
- **Tailwind CSS** — yalnızca demo sayfası (header, ürün listesi) için
- **Web Animations API** — panel açılış/kapanış animasyonları
- Harici UI / animasyon / carousel kütüphanesi **yok**

## Proje yapısı

```
src/
├── app/                       # Demo sayfası (layout, page)
├── components/demo/           # Demo amaçlı header ve ürün listesi
└── components/onsite/         # ▶ Asıl çalışma
    ├── config.ts              # Metinler, banner'lar, kupon kodu, süreler (tek kaynak)
    ├── OnsiteCampaign.tsx     # Giriş noktası, durum yönetimi
    ├── Teaser.tsx             # Kapalı durum (desktop bar / mobil bant)
    ├── VerticalTicker.tsx     # 5 sn'de bir değişen dikey kampanya metni
    ├── CampaignPanel.tsx      # Genişleyen modal / bottom sheet
    ├── BannerCard.tsx
    ├── CopyCouponButton.tsx   # KOPYALA → KOPYALANDI → (5 sn) → KOPYALA
    ├── analytics.ts           # GA4 / GTM event'leri
    ├── hooks/                 # media query, clipboard, focus trap, animasyon
    └── OnsiteCampaign.module.css
```

Kampanya metnini, banner'ları veya kupon kodunu değiştirmek için yalnızca `config.ts` düzenlenir.

## Davranış

| | Desktop (≥768px) | Responsive (<768px) |
|---|---|---|
| Konum | Sol alt köşede fixed bar | Ekranın en altında fixed bant |
| Giriş | 5 sn sonra slide-up | 5 sn sonra slide-up |
| Metinler | 3 metin, 5 sn'de bir yukarıdan aşağı geçiş | Aynı |
| Açılış | Bar, sol alt köşeden genişleyerek tam ekran modala dönüşür | Alttan kayan bottom sheet |
| İçerik | Logo + 2×2 banner grid | Yatay swipe edilebilir banner'lar |
| Kapatma | X, logo, ESC | X, ⌄ ikonu, ESC |

**Teaser'daki X** kampanyayı tamamen kapatır. **Paneldeki kapatma** aksiyonları paneli küçültüp teaser'a geri döndürür.

## Geliştirme yaklaşımı

- **Genişleyen modal:** Tam ekran modal, teaser'ın ölçülerinden başlayan bir `clip-path` animasyonuyla açılır; arka plan rengi de teaser renginden beyaza geçer. Böylece ayrı bir pop-up açılması yerine bar'ın kendisi büyüyormuş gibi görünür. Kapanışta aynı animasyon tersine oynar. Süre ve easing Figma prototipiyle aynıdır (Smart Animate, ease-out, 300ms).
- **Dikey carousel:** Metinler aynı grid hücresinde üst üste durur; kapsayıcı en uzun metne göre boyutlanır ve geçişlerde layout kayması olmaz.
- **Swipe:** Native `scroll-snap` kullanıldı. Momentum kaydırma, dokunmatik ve trackpad desteği tarayıcıdan gelir; ek JS gerekmez.
- **Kupon kopyalama:** Clipboard API, desteklenmeyen ortamlar için `execCommand` fallback'i. Kopyalama başarısız olursa butonda kod gösterilir. Art arda tıklamada 5 sn'lik sayaç sıfırlanır.
- **Performans:** Sekme arka plandayken ve panel açıkken metin döngüsü durur. Modal açıkken scroll kilitlenir; scrollbar kaybolduğunda sayfa kaymasın diye genişliği kadar boşluk eklenir.
- **Erişilebilirlik:** Dialog rolü, ESC ile kapatma, desktop'ta focus trap, kapanışta odağın teaser'a dönmesi, ekran okuyucuya "kopyalandı" bildirimi, görünür klavye odağı, `prefers-reduced-motion` desteği.

## Ölçümleme

Tüm etkileşimler `window.dataLayer`'a `onsite_campaign` event'i olarak gönderilir (GTM üzerinden GA4'e aktarılabilir). GTM yoksa geliştirme ortamında konsola yazılır.

| action | Ne zaman |
|---|---|
| `teaser_impression` | Teaser göründüğünde |
| `teaser_dismiss` | Teaser X ile kapatıldığında |
| `panel_open` | Panel açıldığında |
| `panel_close` | Panel kapandığında (`method`: close_icon / logo / collapse / escape) |
| `coupon_copy` | Kupon kopyalandığında (`banner_id`, `success`) |

Bu yapı ile gösterim → açılma → kupon kopyalama hunisi ve kampanyanın dönüşüme etkisi ölçülebilir.

## Tasarım değerleri (Figma)

| Öğe | Desktop | Responsive |
|---|---|---|
| Teaser | 277×50, `#254380`, radius 3px, 1.5px beyaz kenarlık, sol/alt 30px | 428×50, beyaz, üstte 1px `#1A2A4A` çizgi, üst köşeler 3px |
| Teaser metni | Jost 14px / 28px — Regular + SemiBold | Jost 15px / 28px — Regular + SemiBold |
| Panel | Tam ekran; logo 250×60 (üstten 90px), X 16px / 2px stroke | Başlık Jost Medium 15px, "Tümünü Gör" 15px altı çizili |
| Banner | 600×270, 20px boşluk, radius 3px | 175×175, 12.5px boşluk, radius 3px |
| KOPYALA | 100×30, beyaz, radius 3px, Jost SemiBold 12px `#1A2A4A`; alttan 20px | Aynı |
| Renkler | Metin/ikon `#1A2A4A`, yeşil `#8DA349`, bordo `#A82F64` | Aynı |
| Animasyon | Smart Animate, ease-out, 300ms | Aynı |

## Insider'a uyarlama

Tasarım dosyası bu çalışmanın Insider on-site kampanyası olarak yayınlanacağını belirtiyor. Insider'da kampanyalar sayfaya eklenen HTML/CSS/JS ile kurulur. Bu projede kampanya mantığı framework'ten bağımsız parçalara ayrıldı (zamanlama ve durum akışı, Web Animations API ile animasyon, Clipboard API, native scroll-snap, CSS değişkenleriyle tema). Bu nedenle aynı yapı, Insider'ın HTML / CSS / JS alanlarına vanilla JavaScript olarak birebir taşınabilir. Event'ler zaten `dataLayer` üzerinden gönderildiği için ölçümleme tarafında değişiklik gerekmez.

## Notlar

- `public/logo.svg` bir yer tutucudur; Figma > Design sayfasındaki `Layer_1` (250×60) katmanı SVG olarak export edilip bu dosyanın yerine konmalıdır.
- Figma'daki desktop banner'lar görsel alanı olarak tasarlanmıştır. `config.ts`'te bir banner'a `imageSrc` verildiğinde görsel kullanılır; verilmezse kart, mobil tasarımdaki renk ve metinlerle çizilir.
- Mobil tasarımda 3 kart bulunuyor; desktop'taki 4. banner alanı için `YENİ SEZON` kartı eklendi.
- Production'da teaser kapatıldığında aynı oturumda tekrar gösterilmemesi (frequency capping) için `sessionStorage` kontrolü eklenebilir; demo'da test kolaylığı için eklenmedi.
