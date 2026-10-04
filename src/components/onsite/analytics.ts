/**
 * GA4 / GTM uyumlu event katmanı.
 * Sayfada GTM varsa event'ler window.dataLayer'a gider; yoksa geliştirme
 * ortamında konsola yazılır. Böylece kampanyanın performansı
 * (gösterim → açılma → kupon kopyalama hunisi) ölçülebilir.
 */

export type OnsiteEvent =
  | { action: "teaser_impression" }
  | { action: "teaser_dismiss" }
  | { action: "panel_open" }
  | { action: "panel_close"; method: CloseMethod }
  | { action: "coupon_copy"; banner_id: string; success: boolean };

export type CloseMethod = "close_icon" | "logo" | "collapse" | "escape";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: OnsiteEvent): void {
  if (typeof window === "undefined") return;

  const payload = { event: "onsite_campaign", campaign_id: "uspa_expanding_modal", ...event };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  } else if (process.env.NODE_ENV !== "production") {
    console.debug("[onsite]", payload);
  }
}
