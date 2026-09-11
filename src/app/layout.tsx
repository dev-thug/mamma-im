import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import "./globals.css";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.description,
    type: "website",
    locale: "ko_KR",
    siteName: `${siteConfig.name} (${siteConfig.nameEn})`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - 스마트 육아 앱`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.description,
    images: ["/og-image.png"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
