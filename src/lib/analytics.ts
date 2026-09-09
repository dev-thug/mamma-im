declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js" | "set" | "consent",
      targetOrName: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

/** 스토어 링크가 놓인 플랫폼 */
export type StorePlatform = "ios" | "android";

/** 스토어 링크가 놓인 위치 — GA4에서 전환 기여 위치를 구분하는 용도 */
export type StoreClickPlacement = "hero" | "download_cta" | "blog_cta";

/** 내부 링크·버튼이 놓인 영역 */
export type LinkLocation =
  | "header"
  | "header_mobile"
  | "footer"
  | "blog_index"
  | "blog_post"
  | "faq";

/**
 * GA4로 이벤트를 전송합니다.
 * gtag가 아직 로드되지 않았거나 SSR 중이면 조용히 무시합니다.
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/**
 * 경로를 GA4에서 묶어 보기 좋은 페이지 유형으로 환산합니다.
 * 모든 커스텀 이벤트에 page_type을 실어 보내 페이지군 단위 비교를 가능하게 합니다.
 */
export function pageTypeFromPath(pathname: string) {
  if (pathname === "/") return "home";
  if (pathname === "/blog") return "blog_index";
  if (pathname.startsWith("/blog/")) return "blog_post";
  if (["/privacy", "/terms", "/licenses", "/guidelines"].includes(pathname)) {
    return "legal";
  }
  if (["/faq", "/notices", "/contact", "/team"].includes(pathname)) {
    return "service";
  }
  return "other";
}

/** 앱 스토어 이동 클릭 — 이 사이트의 핵심 전환 이벤트 */
export function trackStoreClick(
  store: StorePlatform,
  placement: StoreClickPlacement,
) {
  trackEvent("store_click", { store, placement });
}

/** 헤더·푸터 등 내비게이션 클릭 */
export function trackNavClick(label: string, location: LinkLocation) {
  trackEvent("nav_click", { link_label: label, link_location: location });
}

/** 스크롤 도달 깊이 — 25/50/75/100 구간마다 1회 */
export function trackScrollDepth(percent: number, pageType: string) {
  trackEvent("scroll_depth", {
    percent_scrolled: percent,
    page_type: pageType,
  });
}

/** 랜딩 섹션이 화면에 들어온 시점 — 섹션별 도달률 측정 */
export function trackSectionView(sectionId: string, pageType: string) {
  trackEvent("section_view", { section_id: sectionId, page_type: pageType });
}

/** 스크린샷 갤러리 조작 */
export function trackGalleryInteract(
  method: "dot" | "arrow" | "swipe",
  screenName: string,
) {
  trackEvent("gallery_interact", { method, screen_name: screenName });
}

/** 히어로 목업(가짜 앱 화면) 조작 — 세션당 1회만 전송 */
export function trackDemoInteract(demoTab: string) {
  trackEvent("demo_interact", { demo_tab: demoTab });
}
