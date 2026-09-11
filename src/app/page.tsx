import type { Metadata } from "next";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import DownloadCTA from "@/components/DownloadCTA";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";
import { baseOpenGraph, defaultOgImages } from "@/lib/seo";

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  operatingSystem: "iOS, Android",
  applicationCategory: "LifestyleApplication",
  description: siteConfig.description,
  url: siteConfig.url,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KRW",
  },
};

// Google 검색 결과의 사이트 이름을 정하는 가장 강한 신호입니다. 홈에만 두면 됩니다.
// name은 모든 페이지의 og:site_name(src/lib/seo.ts의 baseOpenGraph)과 같은 값을 씁니다.
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  alternateName: siteConfig.nameEn,
  url: siteConfig.url,
};

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description:
    "신생아부터 초등학생까지, 수유·수면·기저귀·성장·발달 체크를 한 곳에 기록하고, 아이의 실제 기록을 바탕으로 답하는 AI 맘마톡과 함께하는 육아 앱 맘마.",
  alternates: {
    canonical: siteConfig.url,
    languages: { ko: siteConfig.url },
  },
  // og:url은 루트 레이아웃에 두면 404 등에도 붙으므로 홈에서 선언합니다.
  // 검색 타이틀과 공유 제목은 모두 siteConfig.seo.title 하나에서 옵니다.
  openGraph: {
    ...baseOpenGraph,
    title: siteConfig.seo.title,
    description: siteConfig.description,
    url: siteConfig.url,
    type: "website",
    images: defaultOgImages,
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ScreenshotGallery />
        <DownloadCTA />
      </main>
      <Footer />
    </>
  );
}
