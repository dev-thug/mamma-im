import type { Metadata } from "next";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import DownloadCTA from "@/components/DownloadCTA";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";

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

export const metadata: Metadata = {
  title: "맘마 - 육아 기록부터 AI 상담까지 | 스마트 육아 앱",
  description:
    "신생아부터 초등학생까지, 수유·수면·기저귀·성장·발달 체크를 한 곳에 기록하고, 아이의 실제 기록을 바탕으로 답하는 AI 맘마톡과 함께하는 육아 앱 맘마.",
  alternates: {
    canonical: siteConfig.url,
    languages: { ko: siteConfig.url },
  },
};

export default function Home() {
  return (
    <>
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
