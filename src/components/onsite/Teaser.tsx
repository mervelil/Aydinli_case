"use client";

import { Ref } from "react";
import type { TeaserMessage } from "./config";
import { ChevronUpIcon, CloseIcon } from "./icons";
import { VerticalTicker } from "./VerticalTicker";
import styles from "./OnsiteCampaign.module.css";

type Props = {
  ref: Ref<HTMLDivElement>;
  triggerRef: Ref<HTMLButtonElement>;
  messages: TeaserMessage[];
  intervalMs: number;
  /** Panel açıkken teaser görünmez olur ama ölçüm için DOM'da kalır. */
  concealed: boolean;
  leaving: boolean;
  tickerPaused: boolean;
  onOpen: () => void;
  onDismiss: () => void;
  onLeaveEnd: () => void;
};

/**
 * Kapalı durum: desktop'ta sol altta sabit küçük bar,
 * responsive'de ekranın en altında sabit bant.
 */
export function Teaser({
  ref,
  triggerRef,
  messages,
  intervalMs,
  concealed,
  leaving,
  tickerPaused,
  onOpen,
  onDismiss,
  onLeaveEnd,
}: Props) {
  return (
    <div
      ref={ref}
      className={`${styles.teaser} ${leaving ? styles.teaserLeaving : ""}`}
      data-concealed={concealed}
      inert={concealed}
      role="region"
      aria-label="Kampanya duyurusu"
      onAnimationEnd={(e) => {
        if (leaving && e.target === e.currentTarget) onLeaveEnd();
      }}
    >
      <button
        type="button"
        className={styles.teaserClose}
        aria-label="Kampanya bandını kapat"
        onClick={onDismiss}
      >
        <CloseIcon />
      </button>

      <button
        ref={triggerRef}
        type="button"
        className={styles.teaserTrigger}
        aria-haspopup="dialog"
        aria-expanded={concealed}
        aria-controls="onsite-panel"
        onClick={onOpen}
      >
        <span className={styles.srOnly}>Kampanyaları aç: </span>
        <VerticalTicker
          items={messages}
          intervalMs={intervalMs}
          paused={tickerPaused}
          renderItem={(m) => (
            <>
              <span className={styles.tickerLead}>{m.lead}</span>{" "}
              <strong className={styles.tickerHighlight}>{m.highlight}</strong>
            </>
          )}
        />
        <ChevronUpIcon className={styles.teaserChevron} />
      </button>
    </div>
  );
}
