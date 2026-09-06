"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  trackStoreClick,
  type StoreClickPlacement,
  type StorePlatform,
} from "@/lib/analytics";

/**
 * 서버 컴포넌트에서 스토어 링크를 렌더링하면서 클릭을 계측하기 위한 client 래퍼.
 * 이미 client 컴포넌트인 곳(HeroSection, DownloadCTA)에서는
 * trackStoreClick을 직접 호출하므로 이 래퍼가 필요 없습니다.
 */
export default function TrackedStoreLink({
  href,
  store,
  placement,
  className,
  style,
  "aria-label": ariaLabel,
  children,
}: {
  href: string;
  store: StorePlatform;
  placement: StoreClickPlacement;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      aria-label={ariaLabel}
      onClick={() => trackStoreClick(store, placement)}
    >
      {children}
    </a>
  );
}
