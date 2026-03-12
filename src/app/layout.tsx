import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mamma.im"),
  title: "맘마 - 우리 가족의 육아 파트너",
  description:
    "태어나는 순간부터 초등학교 졸업까지, 아이의 모든 성장을 함께하는 스마트 육아 앱. AI 육아 코치, 성장 기록, 놀이지도, 커뮤니티까지.",
  keywords: [
    "육아",
    "육아앱",
    "맘마",
    "아기",
    "성장기록",
    "AI육아",
    "육아일기",
    "수유기록",
  ],
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
  openGraph: {
    title: "맘마 - 우리 가족의 육아 파트너",
    description:
      "태어나는 순간부터 초등학교 졸업까지, 아이의 모든 성장을 함께하는 스마트 육아 앱",
    type: "website",
    locale: "ko_KR",
    siteName: "맘마 (Mamma)",
  },
  twitter: {
    card: "summary_large_image",
    title: "맘마 - 우리 가족의 육아 파트너",
    description:
      "태어나는 순간부터 초등학교 졸업까지, 아이의 모든 성장을 함께하는 스마트 육아 앱",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
