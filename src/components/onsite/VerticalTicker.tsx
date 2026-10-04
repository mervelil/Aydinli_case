"use client";

import { ReactNode, useEffect, useState } from "react";
import styles from "./OnsiteCampaign.module.css";

type Props<T> = {
  items: T[];
  intervalMs: number;
  paused: boolean;
  renderItem: (item: T) => ReactNode;
};

/**
 * Dikey carousel: aktif metin aşağı doğru çıkar, sıradaki yukarıdan girer.
 * Tüm öğeler aynı grid hücresinde üst üste durur; böylece kapsayıcı en
 * uzun metne göre boyutlanır ve geçişlerde layout kayması (CLS) olmaz.
 */
export function VerticalTicker<T>({ items, intervalMs, paused, renderItem }: Props<T>) {
  const [{ index, prev }, setState] = useState<{ index: number; prev: number | null }>({
    index: 0,
    prev: null,
  });

  useEffect(() => {
    if (paused || items.length < 2) return;

    const id = window.setInterval(() => {
      setState((s) => ({ prev: s.index, index: (s.index + 1) % items.length }));
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [paused, intervalMs, items.length]);

  return (
    <span className={styles.ticker}>
      {items.map((item, i) => (
        <span
          key={i}
          className={[
            styles.tickerItem,
            i === index && styles.isActive,
            i === prev && styles.isLeaving,
          ]
            .filter(Boolean)
            .join(" ")}
          aria-hidden={i !== index}
        >
          {renderItem(item)}
        </span>
      ))}
    </span>
  );
}
