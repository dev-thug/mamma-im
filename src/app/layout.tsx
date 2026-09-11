import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { baseOpenGraph, defaultOgImages } from "@/lib/seo";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import "./globals.css";

const websiteId = `${siteConfig.url}/#website`;
const organizationId = `${siteConfig.url}/#organization`;

/**
 * Google 검색결과의 사이트 이름은 홈페이지의 WebSite 구조화 데이터를 가장 우선합니다.
 * `og:site_name`·`<title>`·제목 요소와 이름이 어긋나면 Google이 확신하지 못하고 도메인(mamma.im)을
 * 대신 보여주므로, 사이트 이름을 바꿀 때는 `siteConfig.name`만 고치세요.
 * WebSite 노드는 페이지당 하나여야 하므로 다른 곳에 WebSite 블록을 추가하지 마세요.
 * https://developers.google.com/search/docs/appearance/site-names
 */
const websiteSchema = {
  "@type": "WebSite",
  "@id": websiteId,
  name: siteConfig.name,
  alternateName: siteConfig.siteNameAlternates,
  url: `${siteConfig.url}/`,
  inLanguage: "ko",
  publisher: { "@id": organizationId },
};

const organizationSchema = {
  "@type": "Organization",
  "@id": organizationId,
  name: siteConfig.company,
  legalName: siteConfig.company,
  url: siteConfig.url,
  email: siteConfig.email,
  logo: `${siteConfig.url}/logo.png`,
  sameAs: [siteConfig.social.x],
  taxID: siteConfig.business.registrationNumber,
  founder: {
    "@type": "Person",
    name: siteConfig.business.representative,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.business.address,
    addressCountry: "KR",
  },
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [websiteSchema, organizationSchema],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.seo.title,
  description: "수유부터 수면, 기저귀, 발달 체크까지 세세하게 기록하고, 아이의 실제 기록을 바탕으로 답하는 AI 맘마톡과 함께하는 육아 앱",
  keywords: [...siteConfig.seo.keywords],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#FF4757" },
    ],
  },
  manifest: "/site.webmanifest",
  // Safari 스마트 앱 배너: 랜딩을 연 iPhone 사용자에게 App Store 설치 배너를 띄운다.
  itunes: {
    appId: "6760751452",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "naver-site-verification": siteConfig.naverSiteVerification,
    },
  },
  // openGraph를 선언하는 페이지는 이 값을 통째로 덮으므로 baseOpenGraph를 펼쳐 넣어야 합니다(src/lib/seo.ts).
  openGraph: {
    ...baseOpenGraph,
    title: siteConfig.seo.title,
    description: siteConfig.description,
    type: "website",
    images: defaultOgImages,
  },
  // title·description·images를 두지 않아야 Next.js가 페이지마다 최종 openGraph 값으로 채웁니다.
  // 여기 title을 두면 openGraph를 선언한 페이지에서도 twitter:title이 홈 제목으로 남습니다.
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-scroll-behavior: globals.css의 smooth 스크롤을 라우트 전환 때만 끕니다.
    // 없으면 페이지 이동 시 맨 위로 1초가량 애니메이션되고, 그동안 새 페이지의
    // scroll_depth·article_complete가 이전 페이지 스크롤 위치로 잘못 기록됩니다.
    <html lang="ko" data-scroll-behavior="smooth">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          integrity="sha384-GIdEBaqGN9mNkDkMkzMHW8EKUqtpPIe/sLj1X7DIrnc9uPtLROJgmuDlh+3rBw0j"
        />
        {/* metadata.alternates는 페이지의 canonical 설정에 통째로 덮이므로 피드 링크는 직접 둡니다 */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${siteConfig.name} 블로그`}
          href={`${siteConfig.url}/rss.xml`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <GoogleAnalytics />
        <AnalyticsProvider />
      </body>
    </html>
  );
}
