declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetOrName: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

/** 스토어 링크가 놓인 플랫폼 */
export type StorePlatform = "ios" | "android";

/** 스토어 링크가 놓인 위치 — GA4에서 전환 기여 위치를 구분하는 용도 */
export type StoreClickPlacement = "hero" | "download_cta" | "blog_cta";

/**
 * GA4로 이벤트를 전송합니다.
 * gtag가 아직 로드되지 않았거나 SSR 중이면 조용히 무시합니다.
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/** 앱 스토어 이동 클릭 — 이 사이트의 핵심 전환 이벤트 */
export function trackStoreClick(
  store: StorePlatform,
  placement: StoreClickPlacement,
) {
  trackEvent("store_click", { store, placement });
}
