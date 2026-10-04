"use client";

import { track } from "./analytics";
import { useCopyToClipboard } from "./hooks/useCopyToClipboard";
import styles from "./OnsiteCampaign.module.css";

type Props = {
  code: string;
  bannerId: string;
  resetMs: number;
};

const LABELS = {
  idle: "KOPYALA",
  copied: "KOPYALANDI",
} as const;

export function CopyCouponButton({ code, bannerId, resetMs }: Props) {
  const { status, copy } = useCopyToClipboard(resetMs);

  const handleClick = async () => {
    const success = await copy(code);
    track({ action: "coupon_copy", banner_id: bannerId, success });
  };

  // Kopyalama başarısız olursa kullanıcı kodu en azından görebilsin.
  const label = status === "failed" ? `KOD: ${code}` : LABELS[status];

  return (
    <>
      <button
        type="button"
        className={styles.copyButton}
        data-status={status}
        onClick={handleClick}
        aria-label={status === "idle" ? `${code} kupon kodunu kopyala` : undefined}
      >
        {label}
      </button>
      <span className={styles.srOnly} role="status" aria-live="polite">
        {status === "copied" && `${code} kupon kodu panoya kopyalandı.`}
        {status === "failed" && `Kod kopyalanamadı. Kupon kodu: ${code}`}
      </span>
    </>
  );
}
