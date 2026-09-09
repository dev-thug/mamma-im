"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { siteConfig } from "@/config/site";

const PROD_HOST = new URL(siteConfig.url).hostname;

type Mode = "off" | "on" | "debug";

/** 호스트 판정은 한 번 정해지면 바뀌지 않으므로 구독할 외부 스토어가 없습니다. */
const noopSubscribe = () => () => {};
const serverSnapshot = (): Mode => "off";

/**
 * 계측 대상 호스트인지 판정합니다.
 *
 * 측정 ID가 코드에 하드코딩되어 있어서, 가드가 없으면 `next dev`와
 * Vercel 프리뷰 배포(NODE_ENV=production)까지 운영 속성으로 히트를 보냅니다.
 * localStorage에 ga_debug=1을 넣으면 어느 호스트에서든 debug_mode로 켜지므로
 * DebugView로 이벤트를 검증할 때 사용하세요.
 */
function resolveMode(): Mode {
  try {
    if (window.localStorage.getItem("ga_debug") === "1") return "debug";
  } catch {
    // 프라이빗 모드 등 localStorage 접근이 막힌 환경 — 무시하고 호스트로 판정
  }

  const host = window.location.hostname;
  return host === PROD_HOST || host === `www.${PROD_HOST}` ? "on" : "off";
}

export default function GoogleAnalytics() {
  const measurementId = siteConfig.gaMeasurementId;
  const mode = useSyncExternalStore(noopSubscribe, resolveMode, serverSnapshot);

  if (!measurementId || mode === "off") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}'${mode === "debug" ? ", { debug_mode: true }" : ""});
        `}
      </Script>
    </>
  );
}
