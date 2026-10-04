# USPA On-Site Kampanya — Expanding Modal

U.S. Polo Assn. e-ticaret sitesi için desktop ve responsive ekranlarda çalışan on-site kampanya çalışması.

| | |
|---|---|
| **Canlı demo** | https://BURAYA-VERCEL-LINKI.vercel.app |
| **Repository** | https://github.com/BURAYA-KULLANICI-ADI/uspa-onsite-case |
| **Teknoloji** | Next.js (App Router) · React · TypeScript · CSS Modules · Web Animations API |
| **Ek kütüphane** | Yok (yalnızca `next`, `react`, `react-dom`) |

---

## İçindekiler

1. [Kurulum](#1-kurulum)
2. [Demo nasıl incelenir?](#2-demo-nasıl-incelenir)
3. [Brief karşılığı](#3-brief-karşılığı)
4. [Teknoloji ve neden seçildi](#4-teknoloji-ve-neden-seçildi)
5. [Frontend yaklaşımı](#5-frontend-yaklaşımı)
6. [Kullanıcı etkileşimleri](#6-kullanıcı-etkileşimleri)
7. [Responsive yapı](#7-responsive-yapı)
8. [Animasyonlar](#8-animasyonlar)
9. [Kod kalitesi](#9-kod-kalitesi)
10. [Erişilebilirlik ve performans](#10-erişilebilirlik-ve-performans)
11. [Ölçümleme](#11-ölçümleme)
12. [Tasarım değerleri (Figma)](#12-tasarım-değerleri-figma)
13. [Bilinçli tercihler ve sonraki adımlar](#13-bilinçli-tercihler-ve-sonraki-adımlar)

---

## 1. Kurulum

Gereksinim: **Node.js 20.9 veya üzeri**

```bash
npm install
npm run dev
```

Tarayıcıda http://localhost:3000 adresini açılmalı.

| Komut | Açıklama |
|---|---|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Production build |
| `npm start` | Production build'i çalıştırır |
| `npm run lint` | ESLint kontrolü |

> Windows PowerShell'de `npm` komutu güvenlik ayarı nedeniyle engellenirse `npm.cmd install` ve `npm.cmd run dev` kullanılabilir.

## 2. Demo nasıl incelenir?

1. Sayfayı açın ve **5 saniye** bekleyin. Sol altta kampanya barı yukarı kayarak gelir.
2. Bar üzerindeki metin 5 saniyede bir yukarıdan aşağı değişir (3 kampanya).
3. Bara tıklayın. Bar, bulunduğu köşeden genişleyerek tam ekran modala dönüşür.
4. İlk banner'daki **KOPYALA** butonuna basın. Kupon kodu (`USPA200`) panoya kopyalanır, buton 5 saniye boyunca **KOPYALANDI** olarak kalır.
5. Modalı **X ikonu**, **logo** veya **ESC** tuşu ile kapatın. Modal küçülerek bara geri döner.
6. Bardaki **X** ikonu kampanyayı tamamen kapatır.
7. Responsive görünüm için tarayıcıyı 768px'in altına daraltın veya DevTools'ta mobil cihaz modunu açın. Kampanya ekranın altında sabit bir banda dönüşür; açılan paneldeki kartlar parmakla yatay kaydırılır.

Akışı baştan izlemek için sayfayı yenilemek yeterlidir.

## 3. Brief karşılığı

| Brief'teki beklenti | Uygulama |
|---|---|
| Sayfa açılışından 5 sn sonra sol altta Slide Up ile açılma | Sol alt köşede `position: fixed` bar; slide-up animasyonu ile girer |
| X ile kapatma | Bardaki X kampanyayı tamamen kapatır |
| 3 kampanya metni, 5 sn'de bir otomatik değişim | Dikey carousel; süre `config.ts` içinden yönetilir |
| Vertical carousel, yukarıdan aşağıya slide | Yeni metin yukarıdan girer, eski metin aşağı çıkar |
| Tıklayınca genişleyen Slide Up Modal | Bar, ekrandaki konumundan tam ekran modala genişler (Figma: Smart Animate, ease-out, 300ms) |
| 1 logo, 4 banner, 1 KOPYALA butonu, X ikonu | Logo + 2×2 banner grid; ilk banner'da KOPYALA |
| KOPYALA → KOPYALANDI → 5 sn sonra KOPYALA | Clipboard API; desteklenmeyen ortamlar için yedek yöntem |
| Modalı X ve logo ile kapatma | X ve logo; ek olarak ESC |
| Responsive: ekranın altında fixed bant | Tam genişlikte sabit bant; iPhone alt güvenli alanına uyumlu |
| Responsive: X ile kapatma, 3 başlık 5 sn'de bir | Desktop ile aynı bileşen ve mantık |
| Responsive: banda tıklayınca modal | Alttan kayan panel; ⌄ ikonu ile küçültme |
| Responsive: görsellerde yatay swipe | Native scroll-snap ile dokunmatik kaydırma |
| Responsive: KOPYALA aynı mantıkta | Aynı bileşen kullanılıyor |

## 4. Teknoloji ve neden seçildi

| Teknoloji | Neden |
|---|---|
| **Next.js (App Router) + React** | Pozisyonun teknoloji yığınıyla uyumlu. Bileşen tabanlı yapı, kampanyanın parçalarını (bar, carousel, modal, kopyalama butonu) ayrı ayrı geliştirip test etmeyi kolaylaştırır. Vercel'e ek ayar olmadan deploy edilir.USPA altyapısıyla uyumlu |
| **TypeScript** | Kampanya verisi (`config.ts`) tiplendirildiği için yanlış veya eksik bir alan derleme aşamasında yakalanır. |
| **CSS Modules** (kampanya için) | On-site çalışmalar mevcut bir sitenin üzerine eklenir. Sınıf isimleri otomatik olarak benzersizleştirildiği için sitenin CSS'i kampanyayı, kampanyanın CSS'i de siteyi etkilemez. Durum ve animasyon kuralları uzun Tailwind sınıf dizileri yerine okunaklı CSS olarak kalır. |
| **Tailwind CSS** (yalnızca demo sayfası) | Header ve ürün listesi gibi demo amaçlı, kampanyadan bağımsız alanlar hızlıca kuruldu. |
| **Web Animations API** | Modal animasyonu çalışma anında barın ekrandaki konumu ölçülerek hesaplanıyor; bu dinamik değerler CSS ile tanımlanamaz. API, animasyonun bitişini Promise olarak verdiği için modal ancak kapanış animasyonu tamamlandıktan sonra DOM'dan kaldırılır. Animasyon kütüphanesi eklemeye gerek kalmadı. |
| **Native scroll-snap** | Mobil swipe için Swiper gibi bir carousel kütüphanesi yerine tarayıcının kendi kaydırması kullanıldı. Dokunmatik ekran, trackpad ve momentum kaydırma ek JavaScript olmadan çalışır; paket boyutu artmaz. |
| **next/font (Jost)** | Font build sırasında projeye dahil edilir; Google Fonts'a ayrıca istek atılmaz, font yüklenirken sayfa kayması azalır. |

**Neden ek kütüphane yok?** Brief'teki her etkileşim tarayıcının kendi API'leriyle karşılanabiliyor. Ek kütüphane, kampanya gibi her sayfada yüklenen bir bileşen için gereksiz paket boyutu ve bakım yükü demek.

## 5. Frontend yaklaşımı

**Tek bileşen, iki düzen.** Desktop ve responsive için ayrı bileşenler yazmak yerine aynı bileşen iki farklı düzen ve davranışla çalışır. Böylece kampanya metni, banner'lar ve kopyalama mantığı tek yerde tutulur; bir değişiklik iki görünümde ayrı ayrı yapılmaz.

- **Görünüm CSS'ten gelir.** Desktop/mobil düzen media query ile değişir. Bu sayede sayfa ilk yüklendiğinde yanlış düzenin bir an görünüp sonra değişmesi (flash) yaşanmaz.
- **Davranış JavaScript'ten gelir.** Ekran boyutunu bilmesi gereken davranışlar (hangi animasyonun oynayacağı, modal içinde odak kilidi, sayfa kaydırma kilidi) `useMediaQuery` hook'u ile belirlenir.

**Durum akışı.** Kampanya üç aşamadan geçer; modal açık/kapalı durumu bunun üzerinde ayrı tutulur:

```
bekliyor ──(5 sn)──▶ görünür (bar) ──(bar üzerindeki X)──▶ kapatıldı
                          │  ▲
                   tıklama│  │ X / logo / ESC / ⌄
                          ▼  │
                       modal açık
```

**Bar, modal açıkken DOM'da kalır.** Modal açıldığında bar görünmez yapılır ama kaldırılmaz. İki nedeni var: genişleme animasyonu barın ekrandaki konumunu ölçerek başlar ve modal kapanınca klavye odağı bara geri verilir.

**Tek kaynaktan yönetim.** Kampanya metinleri, banner'lar, kupon kodu ve tüm süreler `src/components/onsite/config.ts` dosyasındadır. Pazarlama ekibinin yeni bir kampanya için component koduna dokunması gerekmez.

## 6. Kullanıcı etkileşimleri

| Etkileşim | Davranış | Neden |
|---|---|---|
| Bardaki **X** | Kampanyayı tamamen kapatır | Bu X'e basan kullanıcı kampanyayla ilgilenmediğini söylüyor. |
| Modaldaki **X**, **logo**, **ESC**, mobilde **⌄** | Modalı kapatıp bara geri döner | Kullanıcı modalı kapatsa da kampanyayı daha sonra tekrar açabilir. |
| **KOPYALA** | Kodu kopyalar, 5 sn **KOPYALANDI** gösterir | Art arda tıklanırsa 5 saniyelik süre yeniden başlar. |
| Kopyalama başarısız olursa | Buton **KOD: USPA200** gösterir | Tarayıcı panoya erişime izin vermezse kullanıcı kodu en azından görüp elle yazabilir. |
| Çift tıklama | Kapanış animasyonu iki kez başlamaz | Kapanış sırasında yeni kapatma isteği yok sayılır. |

**Kopyalama nasıl çalışıyor?** Önce modern Clipboard API denenir. Bu API yalnızca HTTPS'te çalışır ve bazı uygulama içi tarayıcılarda engellidir. Bu durumda görünmez bir metin alanı üzerinden eski yöntemle kopyalanır. İkisi de başarısız olursa kod butonda gösterilir.

## 7. Responsive yapı

| | Desktop (≥ 768px) | Responsive (< 768px) |
|---|---|---|
| Bar | Sol altta, kenarlardan 30px içeride, 277×50 | Ekranın en altında, tam genişlikte, 50px yükseklik |
| Açılan alan | Tam ekran modal | Alttan kayan panel; sayfanın üst kısmı görünür kalır |
| Banner'lar | 2×2 grid (600×270) | Yatay kaydırılan kartlar (175×175) |
| Kapatma | X, logo, ESC | X, ⌄, ESC |

- **Mobile-first CSS.** Temel kurallar mobil için yazıldı, desktop kuralları `min-width: 768px` altında eklendi.
- **Akışkan genişlikler.** Desktop banner grid'i `min(1220px, 100%)` genişliğinde; 768px ile 1440px arasındaki ekranlarda oranını (600/270) koruyarak küçülür. Modal ekran yüksekliğine sığmazsa kendi içinde kaydırılır.
- **Swipe.** Kartlar `scroll-snap` ile her kaydırmada bir kartın başına oturur. Son kartın sağ kenarından bir kısmın görünmesi kullanıcıya kaydırılabilir bir alan olduğunu gösterir (Figma'daki tasarımla aynı).
- **Telefon güvenli alanı.** `env(safe-area-inset-bottom)` ile bant ve panel, iPhone'ların alt çubuğunun altında kalmaz.
- **Dokunma alanları.** İkonlar 10px olsa da tıklanabilir alanları 44×44px; mobilde küçük ikonlara isabet ettirme sorunu yaşanmaz.

## 8. Animasyonlar

| Animasyon | Yöntem | Süre / easing |
|---|---|---|
| Barın girişi (slide-up) | CSS `@keyframes` | 300ms, ease-out |
| Metin döngüsü (vertical carousel) | CSS `transition` | 500ms |
| Desktop: bar → tam ekran modal | Web Animations API, `clip-path` | 300ms, ease-out (Figma prototipiyle aynı) |
| Mobil: panelin açılması | Web Animations API, `transform` | 300ms, ease-out |
| Kapanışlar | Aynı animasyonların tersi | 300ms, ease-in |

**Genişleyen modal nasıl çalışıyor?**
1. Tıklama anında barın ekrandaki konumu ölçülür.
2. Tam ekran modal, yalnızca barın kapladığı alan görünecek şekilde `clip-path` ile kırpılarak başlar.
3. Kırpma 300ms içinde tüm ekrana açılır; arka plan rengi de barın lacivertinden (`#254380`) beyaza geçer.
4. Logo ve banner'lar, genişleme büyük ölçüde tamamlandıktan sonra hafifçe yukarı kayarak belirir.
5. Kapanışta aynı adımlar tersine oynar ve modal tam olarak barın içine küçülür.

Böylece ayrı bir pop-up açılması yerine barın kendisi büyüyormuş gibi görünür. Bu, brief'teki "genişleyen modal" ifadesinin ve Figma'daki Smart Animate geçişinin karşılığıdır.

**Neden `transform: scale` değil de `clip-path`?** Ölçekleme içindeki metin ve görselleri de büyütüp bozar. `clip-path` içeriği gerçek boyutunda tutar, yalnızca görünen alanı genişletir.

**Metin döngüsü nasıl çalışıyor?** Üç metin aynı grid hücresinde üst üste durur. Bekleyen metin hücrenin üstünde, aktif metin ortada, çıkan metin altta konumlanır. Bu yöntemle kapsayıcı en uzun metne göre boyutlanır; metin değişirken bar genişleyip daralmaz.

**Hareket azaltma tercihi.** İşletim sisteminde "hareketi azalt" ayarı açık olan kullanıcılarda kayma ve genişleme animasyonları yerine kısa bir saydamlık geçişi kullanılır.

## 9. Kod kalitesi

**Proje yapısı**

```
src/
├── app/                        # Demo sayfası (layout, page, global stiller)
├── components/demo/            # Demo amaçlı header ve ürün listesi
└── components/onsite/          # Kampanya çalışması
    ├── config.ts               # Metinler, banner'lar, kupon kodu, süreler
    ├── OnsiteCampaign.tsx      # Giriş noktası; durum akışı
    ├── Teaser.tsx              # Kapalı durum (desktop bar / mobil bant)
    ├── VerticalTicker.tsx      # Dönen kampanya metinleri
    ├── CampaignPanel.tsx       # Tam ekran modal / alttan açılan panel
    ├── BannerCard.tsx          # Tek banner
    ├── CopyCouponButton.tsx    # Kupon kopyalama butonu
    ├── analytics.ts            # Ölçümleme event'leri
    ├── icons.tsx               # Figma ölçülerinde SVG ikonlar
    ├── OnsiteCampaign.module.css
    └── hooks/
        ├── usePanelAnimation.ts    # Açılış/kapanış animasyonları
        ├── useCopyToClipboard.ts   # Kopyalama + 5 sn sayaç
        ├── useMediaQuery.ts        # Ekran boyutu ve hareket tercihi
        ├── useDocumentVisible.ts   # Sekme görünürlüğü
        └── useFocusTrap.ts         # Modal içinde klavye odağı
```

**Prensipler**

- **Her dosyanın tek bir görevi var.** Görsel bileşenler ile davranış (animasyon, kopyalama, ekran boyutu) ayrı dosyalarda. Örneğin kopyalama mantığı `useCopyToClipboard` içinde; buton yalnızca sonucu gösterir.
- **Tip güvenliği.** Kampanya verisi, event isimleri ve kapatma yöntemleri TypeScript tipleriyle tanımlı; olmayan bir event veya alan kullanılırsa proje derlenmez.
- **Sihirli sayı yok.** Renkler ve ölçüler CSS değişkenlerinde, süreler `config.ts`'te. CSS'teki değerlerin yanına Figma'daki karşılıkları not edildi.
- **Temizlik.** Tüm zamanlayıcılar ve event dinleyicileri bileşen kaldırıldığında temizlenir; bellek sızıntısı veya kapanmış bir bileşende çalışan zamanlayıcı kalmaz.
- **Sunucu tarafı uyumu.** Ekran boyutu ve sekme görünürlüğü `useSyncExternalStore` ile okunur; Next.js'in sunucu tarafında render ettiği HTML ile tarayıcıdaki ilk görünüm uyuşmazlık yaratmaz.
- **Kontroller.** Proje TypeScript ve ESLint kontrollerinden hatasız geçer.

## 10. Erişilebilirlik ve performans

**Erişilebilirlik**
- Modal `role="dialog"` olarak tanımlı; ekran okuyucular açılan alanı "Kampanyalar" penceresi olarak duyurur.
- Modal açılınca klavye odağı kapatma butonuna geçer, kapanınca bara geri döner.
- Desktop'ta Tab tuşu modalın dışına çıkmaz; arkadaki sayfada kaybolunmaz.
- KOPYALA'ya basıldığında ekran okuyucuya "USPA200 kupon kodu panoya kopyalandı" bildirimi yapılır.
- Dönen metinlerden yalnızca aktif olan ekran okuyucuya okunur; her 5 saniyede bir sesli duyuru yapılmaz.
- Klavye ile gezinirken odaklanan eleman belirgin bir çerçeveyle gösterilir.

**Performans**
- Sekme arka plandayken ve modal açıkken metin döngüsü durur; görünmeyen bir animasyon için işlemci kullanılmaz.
- Animasyonlar layout'u yeniden hesaplatmayan özelliklerle (`transform`, `opacity`, `clip-path`) yapılır.
- KOPYALA butonunun genişliği sabit; KOPYALA ↔ KOPYALANDI geçişinde buton büyüyüp küçülmez.
- Desktop modal açıkken arka sayfa kaydırması kilitlenir. Kaydırma çubuğu kaybolduğunda sayfanın yana kaymaması için çubuğun genişliği kadar boşluk eklenir.
- Kampanya, sayfanın ilk yüklenmesini etkilemez; yalnızca 5 saniye sonra render edilir.

## 11. Ölçümleme

On-site kampanyanın başarısı ölçülebilir olmalı. Tüm etkileşimler `window.dataLayer`'a `onsite_campaign` event'i olarak gönderilir ve Google Tag Manager üzerinden GA4'e aktarılabilir. Sayfada GTM yoksa event'ler geliştirme ortamında tarayıcı konsoluna yazılır (DevTools > Console'da görülebilir).

| `action` | Ne zaman | Ek bilgi |
|---|---|---|
| `teaser_impression` | Bar göründüğünde | |
| `teaser_dismiss` | Bar X ile kapatıldığında | |
| `panel_open` | Modal açıldığında | |
| `panel_close` | Modal kapandığında | `method`: close_icon / logo / collapse / escape |
| `coupon_copy` | Kupon kopyalandığında | `banner_id`, `success` |

Bu yapıyla gösterim → açılma → kupon kopyalama hunisi kurulabilir; örneğin bara tıklama oranı veya modalı açanların ne kadarının kupon kopyaladığı izlenebilir.

## 12. Tasarım değerleri (Figma)

| Öğe | Desktop | Responsive |
|---|---|---|
| Bar | 277×50, `#254380`, radius 3px, 1.5px beyaz kenarlık, sol/alt 30px | 428×50, beyaz, üstte 1px `#1A2A4A` çizgi, üst köşeler 3px |
| Bar metni | Jost 14px / 28px — Regular + SemiBold | Jost 15px / 28px — Regular + SemiBold |
| İkonlar | Bar X: 10px, 1.5px · Modal X: 16px, 2px | X: 10px · Chevron: 10×5px, 1.5px |
| Modal / panel | Tam ekran; logo 250×60, üstten 90px | Başlık Jost Medium 15px; "Tümünü Gör" 15px, altı çizili |
| Banner | 600×270, 20px boşluk, radius 3px | 175×175, 12.5px boşluk, radius 3px |
| KOPYALA | 100×30, beyaz, radius 3px, Jost SemiBold 12px `#1A2A4A`; alttan 20px | Aynı |
| Renkler | Metin/ikon `#1A2A4A` · Yeşil `#8DA349` · Bordo `#A82F64` | Aynı |
| Animasyon | Smart Animate · ease-out · 300ms | Aynı |

## 13. Bilinçli tercihler ve sonraki adımlar

**Bilinçli tercihler**
- **Banner içerikleri:** Figma'daki desktop banner'lar görsel alanı olarak tasarlanmış. Görsel verilmediğinde kartlar, mobil tasarımdaki renk ve metinlerle çiziliyor; `config.ts`'te bir banner'a `imageSrc` eklendiğinde görsel kullanılıyor.
- **4. banner:** Mobil tasarımda 3 kart bulunuyor; desktop'taki 4. alan için ek bir kart tanımlandı.
- **Tekrar gösterim:** Demo'da bar kapatıldıktan sonra sayfa yenilenince tekrar görünür; incelemeyi kolaylaştırmak için bilinçli olarak böyle bırakıldı.

**Production'a geçerken**
- **Gösterim sınırı:** Bar kapatıldığında aynı oturumda tekrar gösterilmemesi için `sessionStorage` kontrolü eklenmeli.
- **Insider entegrasyonu:** Tasarım dosyası, çalışmanın Insider on-site kampanyası olarak yayınlanacağını belirtiyor. Kampanya mantığı framework'e bağlı olmayan tarayıcı API'leriyle (Web Animations, Clipboard, scroll-snap, CSS değişkenleri) kurulduğu için aynı yapı Insider'ın HTML / CSS / JS alanlarına vanilla JavaScript olarak taşınabilir. Ölçümleme `dataLayer` üzerinden yapıldığı için değişiklik gerektirmez.
- **Otomatik testler:** Kopyalama ve durum akışı için birim testleri (Vitest + Testing Library), kullanıcı akışı için uçtan uca testler (Playwright) eklenebilir.
- **Gerçek görseller:** Banner görselleri `next/image` ile otomatik boyutlandırılıp optimize edilir.
