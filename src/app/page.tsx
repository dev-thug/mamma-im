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
  title: "맘마 - 육아 기록, AI 분석, 놀이지도까지 | 스마트 육아 앱 No.1",
  description:
    "신생아부터 초등학생까지, 수유기록·수면기록·기저귀기록·성장발달 체크를 AI가 분석하고 맞춤 놀이지도까지 제공하는 스마트 육아 앱 맘마.",
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
