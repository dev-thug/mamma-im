"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";
import {
  pageTypeFromPath,
  trackEvent,
  trackScrollDepth,
  trackSectionView,
} from "@/lib/analytics";

/** 스크롤 도달 깊이를 끊어 보는 구간 */
const SCROLL_BUCKETS = [25, 50, 75, 100] as const;

/**
 * 선언형 계측을 위한 접두사.
 * `data-ga-event="이벤트명"`이 붙은 요소를 클릭하면 그 이벤트가 전송되고,
 * `data-ga-p-<파라미터명>="값"` 속성이 그대로 이벤트 파라미터가 됩니다.
 * 서버 컴포넌트를 client로 바꾸지 않고도 링크를 계측하기 위한 장치입니다.
 */
const PARAM_PREFIX = "data-ga-p-";

function readParams(el: Element) {
  const params: Record<string, unknown> = {};
  for (const attr of Array.from(el.attributes)) {
    if (!attr.name.startsWith(PARAM_PREFIX)) continue;
    const key = attr.name.slice(PARAM_PREFIX.length);
    // 숫자로 보내야 GA4에서 지표(측정항목)로 집계할 수 있습니다.
    params[key] =
      attr.value !== "" && !Number.isNaN(Number(attr.value))
        ? Number(attr.value)
        : attr.value;
  }
  return params;
}

/**
 * 페이지 단위 계측을 한곳에서 담당합니다.
 *
 * page_view는 GA4 향상된 측정의 "브라우저 기록 이벤트 기반 페이지 변경"이
 * 이미 클라이언트 라우팅까지 잡고 있으므로 여기서 따로 보내지 않습니다.
 * (직접 보내면 page_view가 이중 집계됩니다.)
 */
export default function AnalyticsProvider() {
  const pathname = usePathname();
  const pageType = pageTypeFromPath(pathname);

  useReportWebVitals((metric) => {
    trackEvent("web_vitals", {
      metric_name: metric.name,
      // CLS는 0~1 소수라 1000배로 보내야 GA4 지표에서 유효 자릿수가 남습니다.
      metric_value: Math.round(
        metric.name === "CLS" ? metric.value * 1000 : metric.value,
      ),
      metric_rating: metric.rating,
      metric_id: metric.id,
      page_type: pageTypeFromPath(window.location.pathname),
    });
  });

  // 스크롤 도달 깊이 — 구간마다 1회, 경로가 바뀌면 초기화
  useEffect(() => {
    const fired = new Set<number>();

    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const percent =
        scrollable <= 0
          ? 100
          : ((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100;

      for (const bucket of SCROLL_BUCKETS) {
        if (percent >= bucket && !fired.has(bucket)) {
          fired.add(bucket);
          trackScrollDepth(bucket, pageType);
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, pageType]);

  // 섹션 도달률 — data-ga-section이 붙은 블록이 화면에 절반 이상 들어오면 1회
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-ga-section]");
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.getAttribute("data-ga-section");
          if (id) trackSectionView(id, pageType);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname, pageType]);

  // 선언형 노출 계측 — data-ga-view="이벤트명"이 붙은 요소가 화면에 들어오면 1회.
  // 블로그 본문 끝 도달, 404 노출처럼 서버 컴포넌트에서 "보였다"를 잴 때 씁니다.
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-ga-view]");
    if (targets.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const name = entry.target.getAttribute("data-ga-view");
        if (name) {
          trackEvent(name, { ...readParams(entry.target), page_type: pageType });
        }
        observer.unobserve(entry.target);
      }
    });

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname, pageType]);

  // 선언형 클릭 계측 + mailto 클릭
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const mailto = target.closest<HTMLAnchorElement>('a[href^="mailto:"]');
      if (mailto) {
        trackEvent("contact_click", {
          contact_channel: "email",
          page_type: pageType,
        });
        return;
      }

      const tagged = target.closest("[data-ga-event]");
      if (tagged) {
        const name = tagged.getAttribute("data-ga-event");
        if (name) {
          trackEvent(name, { ...readParams(tagged), page_type: pageType });
        }
        return;
      }

      // 링크를 하나씩 태깅하지 않고 컨테이너째 계측합니다 (예: 푸터 전체)
      const link = target.closest<HTMLAnchorElement>("a");
      const navContainer = link?.closest("[data-ga-nav]");
      if (link && navContainer) {
        // 로고처럼 텍스트가 없는 링크는 aria-label, 그것도 없으면 경로로 구분합니다
        const label =
          link.textContent?.trim() ||
          link.getAttribute("aria-label") ||
          link.getAttribute("href") ||
          "";
        trackEvent("nav_click", {
          link_label: label.slice(0, 60),
          link_location: navContainer.getAttribute("data-ga-nav") ?? "",
          page_type: pageType,
        });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pageType]);

  // FAQ 등 <details> 아코디언 열림 — toggle 이벤트는 버블링하지 않아 캡처 단계로 듣습니다
  useEffect(() => {
    const handleToggle = (event: Event) => {
      const el = event.target;
      if (!(el instanceof HTMLDetailsElement) || !el.open) return;
      const question = el.querySelector("summary")?.textContent?.trim();
      trackEvent("faq_open", {
        faq_question: question?.slice(0, 100) ?? "",
        page_type: pageType,
      });
    };

    document.addEventListener("toggle", handleToggle, true);
    return () => document.removeEventListener("toggle", handleToggle, true);
  }, [pageType]);

  return null;
}
