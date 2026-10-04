"use client";

import { useEffect, useRef, useState } from "react";
import { CloseMethod, track } from "./analytics";
import { CampaignPanel } from "./CampaignPanel";
import { ONSITE_CONFIG, type OnsiteConfig } from "./config";
import { useDocumentVisible } from "./hooks/useDocumentVisible";
import { useMediaQuery, usePrefersReducedMotion } from "./hooks/useMediaQuery";
import { Teaser } from "./Teaser";
import styles from "./OnsiteCampaign.module.css";

type Phase = "waiting" | "visible" | "dismissed";

/**
 * USPA on-site kampanya widget'ı — giriş noktası.
 *
 * Akış:
 *   waiting ──(5 sn)──▶ visible (teaser) ──(X)──▶ dismissed
 *                           │  ▲
 *                     tıkla │  │ X / logo / ESC / ⌄
 *                           ▼  │
 *                      panel açık
 */
export default function OnsiteCampaign({ config = ONSITE_CONFIG }: { config?: OnsiteConfig }) {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [isTeaserLeaving, setTeaserLeaving] = useState(false);
  const [isPanelOpen, setPanelOpen] = useState(false);

  const isDesktop = useMediaQuery(config.desktopQuery);
  const reducedMotion = usePrefersReducedMotion();
  const isPageVisible = useDocumentVisible();

  const teaserRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const shouldRestoreFocusRef = useRef(false);

  // Sayfa açılışından X sn sonra teaser'ı göster.
  useEffect(() => {
    const id = window.setTimeout(() => {
      setPhase("visible");
      track({ action: "teaser_impression" });
    }, config.openDelayMs);
    return () => window.clearTimeout(id);
  }, [config.openDelayMs]);

  const openPanel = () => {
    setPanelOpen(true);
    track({ action: "panel_open" });
  };

  const handlePanelClosed = (method: CloseMethod) => {
    shouldRestoreFocusRef.current = true;
    setPanelOpen(false);
    track({ action: "panel_close", method });
  };

  // Panel kapandıktan sonra odağı teaser'a geri ver (klavye/ekran okuyucu kullanıcıları için).
  // Effect commit'ten sonra çalıştığı için teaser'ın `inert` durumu kalkmış olur.
  useEffect(() => {
    if (!isPanelOpen && shouldRestoreFocusRef.current) {
      shouldRestoreFocusRef.current = false;
      triggerRef.current?.focus({ preventScroll: true });
    }
  }, [isPanelOpen]);

  const dismissTeaser = () => {
    setTeaserLeaving(true);
    track({ action: "teaser_dismiss" });
  };

  if (phase !== "visible") return null;

  return (
    <div className={styles.root}>
      <Teaser
        ref={teaserRef}
        triggerRef={triggerRef}
        messages={config.teaserMessages}
        intervalMs={config.rotateIntervalMs}
        concealed={isPanelOpen}
        leaving={isTeaserLeaving}
        tickerPaused={isPanelOpen || !isPageVisible}
        onOpen={openPanel}
        onDismiss={dismissTeaser}
        onLeaveEnd={() => setPhase("dismissed")}
      />

      {isPanelOpen && (
        <CampaignPanel
          config={config}
          isDesktop={isDesktop}
          reducedMotion={reducedMotion}
          originRef={teaserRef}
          onClosed={handlePanelClosed}
        />
      )}
    </div>
  );
}
