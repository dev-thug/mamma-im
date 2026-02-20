import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import DownloadCTA from "@/components/DownloadCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
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
