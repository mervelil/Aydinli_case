import { RefObject, useCallback } from "react";

/** Figma prototipi: Smart Animate · Ease out · 300ms */
const DURATION = 300;
const EASE_OUT = "cubic-bezier(0, 0, 0.58, 1)";
const EASE_IN = "cubic-bezier(0.42, 0, 1, 1)";
/** Desktop teaser'ın arka planı; CSS'teki --os-blue ile aynı olmalı. */
const TEASER_BG = "#254380";
const FULL_CLIP = "inset(0px 0px 0px 0px round 0px)";

type Options = {
  panelRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLElement | null>;
  /** Panelin "içinden genişleyeceği" eleman (teaser). */
  originRef: RefObject<HTMLElement | null>;
  isDesktop: boolean;
  reducedMotion: boolean;
};

/**
 * Panel açılış/kapanış animasyonları (Web Animations API).
 *
 * - Desktop: Tam ekran modal, sol alttaki teaser'ın konumundan clip-path
 *   ile genişleyerek açılır (expanding slide-up). Arka plan rengi de
 *   teaser renginden beyaza geçer; kapanışta aynı animasyon tersine oynar.
 * - Responsive: Panel alttan yukarı kayan bir bottom sheet'tir.
 * - prefers-reduced-motion: Hareket yerine kısa bir opacity geçişi.
 *
 * Dönen Promise animasyon bittiğinde resolve olur; kapanışta panel
 * ancak bundan sonra DOM'dan kaldırılır.
 */
export function usePanelAnimation({
  panelRef,
  contentRef,
  originRef,
  isDesktop,
  reducedMotion,
}: Options) {
  return useCallback(
    (direction: "open" | "close"): Promise<void> => {
      const panel = panelRef.current;
      if (!panel) return Promise.resolve();

      const opening = direction === "open";
      const animations: Animation[] = [];

      const run = (
        el: Element | null,
        keyframes: Keyframe[],
        options: KeyframeAnimationOptions,
      ) => {
        if (!el) return;
        animations.push(
          el.animate(opening ? keyframes : [...keyframes].reverse(), {
            // Açılışta: delay süresince başlangıç karesinde bekle.
            // Kapanışta: unmount olana kadar son karede kal.
            fill: opening ? "backwards" : "forwards",
            ...options,
          }),
        );
      };

      const easing = opening ? EASE_OUT : EASE_IN;

      if (reducedMotion) {
        run(panel, [{ opacity: 0 }, { opacity: 1 }], { duration: 150 });
      } else if (isDesktop) {
        run(
          panel,
          [
            { clipPath: getOriginClip(panel, originRef.current), backgroundColor: TEASER_BG },
            { clipPath: FULL_CLIP, backgroundColor: "#ffffff" },
          ],
          { duration: DURATION, easing },
        );
        run(
          contentRef.current,
          [
            { opacity: 0, transform: "translateY(24px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          opening
            ? { duration: 240, delay: 140, easing: EASE_OUT }
            : { duration: 120, easing: EASE_IN },
        );
      } else {
        run(panel, [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }], {
          duration: DURATION,
          easing,
        });
      }

      return Promise.all(animations.map((a) => a.finished)).then(
        () => undefined,
        () => undefined, // iptal edilen animasyonlar akışı bozmasın
      );
    },
    [panelRef, contentRef, originRef, isDesktop, reducedMotion],
  );
}

/** Teaser'ın panel içindeki konumunu clip-path inset() değerine çevirir. */
function getOriginClip(panel: HTMLElement, origin: HTMLElement | null): string {
  if (!origin) return "inset(100% 100% 0px 0px round 3px)";

  const p = panel.getBoundingClientRect();
  const t = origin.getBoundingClientRect();
  const px = (n: number) => `${Math.max(0, Math.round(n))}px`;

  return `inset(${px(t.top - p.top)} ${px(p.right - t.right)} ${px(p.bottom - t.bottom)} ${px(t.left - p.left)} round 3px)`;
}
