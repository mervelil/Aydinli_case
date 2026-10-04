import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-güvenli media query hook'u.
 * Sunucuda `false` döner; widget zaten client'ta, 5 sn sonra render
 * olduğu için hydration uyuşmazlığı oluşmaz.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
