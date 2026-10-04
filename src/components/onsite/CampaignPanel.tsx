"use client";

import Image from "next/image";
import { RefObject, useEffect, useEffectEvent, useLayoutEffect, useRef } from "react";
import type { CloseMethod } from "./analytics";
import { BannerCard } from "./BannerCard";
import type { OnsiteConfig } from "./config";
import { useFocusTrap } from "./hooks/useFocusTrap";
import { usePanelAnimation } from "./hooks/usePanelAnimation";
import { ChevronDownIcon, CloseIcon } from "./icons";
import styles from "./OnsiteCampaign.module.css";

type Props = {
  config: OnsiteConfig;
  isDesktop: boolean;
  reducedMotion: boolean;
  originRef: RefObject<HTMLElement | null>;
  onClosed: (method: CloseMethod) => void;
};

/**
 * Genişleyen kampanya paneli.
 * Desktop: tam ekran modal — 1 logo + 2x2 banner grid (focus trap, scroll lock).
 * Responsive: bottom sheet, banner'lar yatay swipe ile kaydırılır.
 */
export function CampaignPanel({ config, isDesktop, reducedMotion, originRef, onClosed }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isClosingRef = useRef(false);

  const animate = usePanelAnimation({
    panelRef,
    contentRef,
    originRef,
    isDesktop,
    reducedMotion,
  });

  const requestClose = async (method: CloseMethod) => {
    if (isClosingRef.current) return; // çift tıklamada animasyon tekrar başlamasın
    isClosingRef.current = true;
    await animate("close");
    onClosed(method);
  };

  // Mount anında açılış animasyonu + odağı panele taşı.
  const onMount = useEffectEvent(() => {
    animate("open");
    closeButtonRef.current?.focus({ preventScroll: true });
  });
  useLayoutEffect(() => onMount(), []);

  // ESC ile kapatma
  const onKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === "Escape") requestClose("escape");
  });
  useEffect(() => {
    const handler = (e: KeyboardEvent) => onKeyDown(e);
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useFocusTrap(panelRef, isDesktop);
  useScrollLock(isDesktop);

  return (
    <div
      ref={panelRef}
      id="onsite-panel"
      className={styles.panel}
      role="dialog"
      aria-modal={isDesktop || undefined}
      aria-labelledby="onsite-panel-title"
    >
      <div ref={contentRef} className={styles.panelContent}>
        <header className={styles.panelHeader}>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.panelClose}
            aria-label="Kampanyaları kapat"
            onClick={() => requestClose("close_icon")}
          >
            <CloseIcon className={styles.iconMobile} />
            <CloseIcon className={styles.iconDesktop} size={16} stroke={2} />
          </button>

          <h2 id="onsite-panel-title" className={styles.panelTitle}>
            Kampanyalar
          </h2>

          {/* Desktop: logoya tıklamak da modalı kapatır (brief gereği). */}
          <button
            type="button"
            className={styles.panelLogo}
            aria-label="Kapat"
            onClick={() => requestClose("logo")}
          >
            <Image src="/logo.svg" alt="" width={250} height={60} priority />
          </button>

          <a className={styles.panelAll} href="#kampanyalar">
            Tümünü Gör
          </a>

          <button
            type="button"
            className={styles.panelCollapse}
            aria-label="Paneli küçült"
            onClick={() => requestClose("collapse")}
          >
            <ChevronDownIcon />
          </button>
        </header>

        <ul className={styles.banners} aria-label="Kampanya bannerları">
          {config.banners.map((banner) => (
            <li key={banner.id} className={styles.bannerItem}>
              <BannerCard
                banner={banner}
                couponCode={config.couponCode}
                copiedResetMs={config.copiedResetMs}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Desktop modal açıkken sayfa kaydırmasını kilitler.
 * Scrollbar kaybolduğunda sayfanın sağa kaymaması (layout shift)
 * için scrollbar genişliği kadar padding eklenir.
 */
function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    const prev = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };

    root.style.overflow = "hidden";
    if (scrollbarWidth > 0) root.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      root.style.overflow = prev.overflow;
      root.style.paddingRight = prev.paddingRight;
    };
  }, [active]);
}
