import { useCallback, useEffect, useRef, useState } from "react";

export type CopyStatus = "idle" | "copied" | "failed";

/**
 * Metni panoya kopyalar ve `resetMs` sonra durumu tekrar "idle" yapar.
 * Art arda tıklamada sayaç sıfırlanır; component unmount olursa
 * bekleyen timer temizlenir.
 */
export function useCopyToClipboard(resetMs: number) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const copy = useCallback(
    async (text: string) => {
      const ok = await writeToClipboard(text);
      setStatus(ok ? "copied" : "failed");

      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setStatus("idle"), resetMs);
      return ok;
    },
    [resetMs],
  );

  return { status, copy };
}

async function writeToClipboard(text: string): Promise<boolean> {
  // Modern API: HTTPS (veya localhost) gerektirir.
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // İzin reddedildiyse aşağıdaki yönteme düş.
    }
  }

  // Fallback: eski tarayıcılar, HTTP ve bazı in-app browser'lar için.
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  textarea.remove();
  return ok;
}
