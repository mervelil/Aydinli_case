/**
 * On-site kampanya konfigürasyonu.
 * Metin, banner, kupon kodu ve zamanlamalar yalnızca buradan yönetilir;
 * yeni kampanya eklemek için component koduna dokunmaya gerek yoktur.
 */

export type TeaserMessage = {
  /** Normal ağırlıkta gösterilen ön metin (ör. "ÜYE OL") */
  lead: string;
  /** Kalın gösterilen vurgu metni (ör. "200 TL İNDİRİM KAZAN!") */
  highlight: string;
};

export type BannerTheme = "olive" | "ink" | "berry" | "blue";

export type Banner = {
  id: string;
  title: string;
  description?: string;
  /** Opsiyonel görsel; verilmezse tema renginde metinli kart çizilir. */
  imageSrc?: string;
  imageAlt?: string;
  theme: BannerTheme;
  /** true ise kart üzerinde KOPYALA butonu gösterilir. */
  hasCoupon?: boolean;
};

export type OnsiteConfig = {
  openDelayMs: number;
  rotateIntervalMs: number;
  copiedResetMs: number;
  /** Desktop/responsive ayrımı bu media query ile yapılır. */
  desktopQuery: string;
  couponCode: string;
  teaserMessages: TeaserMessage[];
  banners: Banner[];
};

export const ONSITE_CONFIG: OnsiteConfig = {
  openDelayMs: 5000,
  rotateIntervalMs: 5000,
  copiedResetMs: 5000,
  desktopQuery: "(min-width: 768px)",
  couponCode: "USPA200",
  // Metinler Figma'daki kampanya kartlarıyla eşleştirildi.
  teaserMessages: [
    { lead: "ÜYE OL", highlight: "200 TL İNDİRİM KAZAN!" },
    { lead: "BABALAR GÜNÜ", highlight: "HEDİYELERİ" },
    { lead: "APPTE", highlight: "100 TL İNDİRİM" },
  ],
  banners: [
    {
      id: "babalar-gunu",
      title: "BABALAR GÜNÜ HEDİYELERİ",
      description: "%50'ye varan + Sepette Sürpriz İndirimler",
      theme: "olive",
      hasCoupon: true,
    },
    {
      id: "uye-ol",
      title: "200 TL İNDİRİM KAZAN!",
      description: "Üye ol, ilk alışverişe özel 2.000 TL ve üzeri alışverişlerde",
      theme: "ink",
    },
    {
      id: "appte",
      title: "APPTE 100 TL İNDİRİM",
      description: "2.000 TL ve üzeri alışverişlerde geçerli.",
      theme: "berry",
    },
    {
      // Figma'nın mobil tasarımında 3 kart var; desktop'taki 4. alan için eklendi.
      id: "yeni-sezon",
      title: "YENİ SEZON",
      description: "Sonbahar - Kış koleksiyonu yayında",
      theme: "blue",
    },
  ],
};
