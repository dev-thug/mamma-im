import type { Metadata } from "next";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AgentSection from "@/components/AgentSection";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import DownloadCTA from "@/components/DownloadCTA";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";
import { baseOpenGraph, defaultOgImages } from "@/lib/seo";

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  alternateName: ["Mamma", "맘마 AI 육아 에이전트"],
  operatingSystem: "iOS, Android",
  applicationCategory: "LifestyleApplication",
  applicationSubCategory: "AI 육아 에이전트",
  description: siteConfig.description,
  url: siteConfig.url,
  featureList: [
    "수유·수면·기저귀 기록",
    "성장 곡선 및 발달 체크",
    "아이의 실제 기록을 근거로 답하는 AI 상담(맘마톡)",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KRW",
  },
};

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description:
    "맘마는 수유·수면·기저귀·성장 기록을 스스로 읽고 다음 할 일을 제안하는 AI 육아 에이전트입니다. 신생아부터 초등학생까지, 기록과 AI 상담을 한 앱에서.",
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
      {/* WebSite 노드는 루트 레이아웃의 @graph에 하나만 둡니다. 여기 추가하지 마세요. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AgentSection />
        <ScreenshotGallery />
        <DownloadCTA />
      </main>
      <Footer />
    </>
  );
}
