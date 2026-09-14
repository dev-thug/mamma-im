import type { Metadata } from "next";
import Link from "next/link";
import DownloadCTA from "@/components/DownloadCTA";
import { siteConfig } from "@/config/site";
import { baseOpenGraph, defaultOgImages } from "@/lib/seo";

const pageUrl = `${siteConfig.url}/download`;

export const metadata: Metadata = {
  title: "맘마 앱 다운로드 | 무료 육아 기록·AI 상담 앱",
  description:
    "맘마 앱을 App Store와 Google Play에서 무료로 다운로드하세요. 수유·수면·기저귀 기록과 맘마톡 AI 상담을 바로 시작할 수 있습니다.",
  alternates: {
    canonical: pageUrl,
    languages: { ko: pageUrl },
  },
  openGraph: {
    ...baseOpenGraph,
    title: "맘마 앱 다운로드 | 무료 육아 기록·AI 상담 앱",
    description:
      "맘마 앱을 App Store와 Google Play에서 무료로 다운로드하세요. 수유·수면·기저귀 기록과 맘마톡 AI 상담을 바로 시작할 수 있습니다.",
    url: pageUrl,
    type: "website",
    images: defaultOgImages,
  },
};

const steps = [
  {
    number: "01",
    title: "앱을 설치하세요",
    description: "App Store 또는 Google Play에서 맘마를 무료로 설치합니다.",
  },
  {
    number: "02",
    title: "아이 프로필을 만들어요",
    description: "생년월일과 기본 정보를 입력하면 월령에 맞는 화면이 준비됩니다.",
  },
  {
    number: "03",
    title: "오늘의 기록을 시작해요",
    description: "수유·수면·기저귀를 터치 한 번으로 남기고 맘마톡에 물어보세요.",
  },
];

export default function DownloadPage() {
  return (
    <>
      <section
        data-ga-section="download_intro"
        className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white"
      >
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary-100/60" aria-hidden="true" />
        <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-secondary-100/60" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-16 text-center sm:px-6 lg:px-8">
          <span className="mb-5 inline-flex rounded-full border border-primary-100 bg-white/80 px-4 py-1.5 text-sm font-semibold text-primary-600 shadow-sm">
            맘마 앱 다운로드
          </span>
          <h1 className="text-3xl font-bold leading-tight text-neutral-900 [word-break:keep-all] sm:text-5xl">
            기록은 가볍게,
            <br />
            <span className="gradient-text">육아의 다음 순간은 더 선명하게</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 [word-break:keep-all] sm:text-lg">
            맘마는 iOS와 Android에서 사용할 수 있습니다. 기본 기록 기능과 우리 아이 기록을 읽는 맘마톡 AI 상담을 지금 무료로 시작하세요.
          </p>
          <p className="mt-4 text-sm text-neutral-400">iOS 15+ / Android 10+ 지원</p>
        </div>
      </section>

      <DownloadCTA />

      <section className="bg-neutral-50 px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="getting-started-title">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-semibold text-primary-500">설치 후 3분이면 충분해요</p>
            <h2 id="getting-started-title" className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">
              맘마를 처음 시작하는 방법
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
                <span className="text-sm font-bold text-primary-500">{step.number}</span>
                <h3 className="mt-4 text-lg font-bold text-neutral-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500 [word-break:keep-all]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/features"
              className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-3 font-semibold text-neutral-700 transition-colors hover:border-primary-200 hover:text-primary-600"
            >
              기능 자세히 보기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
