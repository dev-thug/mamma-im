import type { Metadata } from "next";
import Link from "next/link";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import { siteConfig } from "@/config/site";
import { baseOpenGraph, defaultOgImages } from "@/lib/seo";

const pageUrl = `${siteConfig.url}/screenshots`;

export const metadata: Metadata = {
  title: "앱 스크린샷 | 맘마 육아 기록·AI 상담 앱",
  description:
    "맘마 앱의 수유·수면 기록, 성장 리포트, 발달 체크, 맘마톡 AI 상담 화면을 스크린샷으로 미리 확인하세요.",
  alternates: {
    canonical: pageUrl,
    languages: { ko: pageUrl },
  },
  openGraph: {
    ...baseOpenGraph,
    title: "앱 스크린샷 | 맘마 육아 기록·AI 상담 앱",
    description:
      "맘마 앱의 수유·수면 기록, 성장 리포트, 발달 체크, 맘마톡 AI 상담 화면을 스크린샷으로 미리 확인하세요.",
    url: pageUrl,
    type: "website",
    images: defaultOgImages,
  },
};

export default function ScreenshotsPage() {
  return (
    <>
      <section
        data-ga-section="screenshots_intro"
        className="relative overflow-hidden bg-gradient-to-b from-secondary-50 via-white to-white"
      >
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary-100/70" aria-hidden="true" />
        <div className="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-primary-100/50" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-16 text-center sm:px-6 lg:px-8">
          <span className="mb-5 inline-flex rounded-full border border-secondary-100 bg-white/80 px-4 py-1.5 text-sm font-semibold text-secondary-600 shadow-sm">
            맘마 앱 스크린샷
          </span>
          <h1 className="text-3xl font-bold leading-tight text-neutral-900 [word-break:keep-all] sm:text-5xl">
            육아 기록과 AI 상담을
            <br />
            <span className="gradient-text">앱 화면으로 먼저 확인하세요</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 [word-break:keep-all] sm:text-lg">
            홈 기록, 수유·수면 타이머, 성장 리포트, 발달 체크, 맘마톡까지 부모가 자주 쓰는 화면을 한곳에 모았습니다.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/features"
              data-ga-event="nav_click"
              data-ga-p-link_label="기능 소개"
              data-ga-p-link_location="screenshots_intro"
              className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-3 font-semibold text-neutral-700 transition-colors hover:border-primary-200 hover:text-primary-600"
            >
              기능 소개 보기
            </Link>
            <Link
              href="/download"
              data-ga-event="nav_click"
              data-ga-p-link_label="앱 다운로드"
              data-ga-p-link_location="screenshots_intro"
              className="inline-flex items-center justify-center rounded-full bg-primary-500 px-6 py-3 font-semibold text-white shadow-lg shadow-primary-500/20 transition-colors hover:bg-primary-600"
            >
              앱 다운로드
            </Link>
          </div>
        </div>
      </section>

      <ScreenshotGallery />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8" aria-label="앱 시작하기">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-primary-500">직접 시작해보세요</p>
          <h2 className="mt-2 text-2xl font-bold text-neutral-900 [word-break:keep-all] sm:text-3xl">
            오늘의 기록부터 맘마에 남겨보세요
          </h2>
          <p className="mt-3 text-neutral-500 [word-break:keep-all]">
            기본 기록 기능과 맘마톡 AI 상담을 무료로 시작할 수 있습니다.
          </p>
          <Link
            href="/download"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-neutral-900 px-7 py-3 font-semibold text-white transition-colors hover:bg-neutral-700"
          >
            다운로드 페이지로 이동
          </Link>
        </div>
      </section>
    </>
  );
}
