import type { Metadata } from "next";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AgentSection from "@/components/AgentSection";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import DownloadCTA from "@/components/DownloadCTA";
import Footer from "@/components/Footer";
import AppQuestions from "@/components/AppQuestions";
import { appDescription, appSchema } from "@/content/app";
import { siteConfig } from "@/config/site";
import { baseOpenGraph, defaultOgImages } from "@/lib/seo";


export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: appDescription,
  alternates: {
    canonical: siteConfig.url,
    languages: { ko: siteConfig.url },
  },
  // og:url은 루트 레이아웃에 두면 404 등에도 붙으므로 홈에서 선언합니다.
  // 검색 타이틀과 공유 제목은 모두 siteConfig.seo.title 하나에서 옵니다.
  openGraph: {
    ...baseOpenGraph,
    title: siteConfig.seo.title,
    description: appDescription,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AgentSection />
        <AppQuestions />
        <ScreenshotGallery />
        <DownloadCTA />
      </main>
      <Footer />
    </>
  );
}
