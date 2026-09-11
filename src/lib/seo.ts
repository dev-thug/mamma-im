import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * 모든 `metadata.openGraph`의 맨 앞에 펼쳐 넣는 공통값입니다: `{ ...baseOpenGraph, title, ... }`
 *
 * 페이지가 openGraph를 선언하면 Next.js는 레이아웃의 openGraph를 필드 단위로 합치지 않고 통째로
 * 바꿉니다. 이 값을 빠뜨리면 그 페이지에서 og:site_name·og:locale이 사라져 사이트 이름 신호가
 * 페이지마다 달라집니다. 새 페이지에 openGraph를 추가할 때도 꼭 넣으세요.
 * og:url은 페이지마다 달라야 하므로 여기 두지 않습니다.
 */
export const baseOpenGraph = {
  siteName: siteConfig.name,
  locale: "ko_KR",
} satisfies NonNullable<Metadata["openGraph"]>;

/**
 * 파일 기반 `opengraph-image`가 없는 페이지의 공유 이미지(public/og-image.png)입니다.
 * 루트 레이아웃의 이미지는 페이지가 openGraph를 선언하는 순간 함께 사라지므로 `images: defaultOgImages`로
 * 다시 넣습니다. 같은 폴더에 opengraph-image가 있는 페이지(블로그)에는 images 키를 쓰지 마세요 —
 * 키가 있으면 Next.js가 생성 이미지를 적용하지 않습니다.
 */
export const defaultOgImages = [
  {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: `${siteConfig.name} - 스마트 육아 앱`,
  },
];
