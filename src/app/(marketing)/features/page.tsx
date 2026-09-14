import type { Metadata } from "next";
import Link from "next/link";
import FeaturesSection from "@/components/FeaturesSection";
import AgentSection from "@/components/AgentSection";
import { siteConfig } from "@/config/site";
import { baseOpenGraph, defaultOgImages } from "@/lib/seo";

const pageUrl = `${siteConfig.url}/features`;

export const metadata: Metadata = {
  title: "기능 소개 | 기록부터 AI 육아 에이전트까지 | 맘마",
  description:
    "맘마의 수유·수면·기저귀 기록, 성장 리포트, 발달 체크, 맘마톡 AI 상담 기능을 한눈에 확인하세요.",
  alternates: {
    canonical: pageUrl,
    languages: { ko: pageUrl },
  },
  openGraph: {
    ...baseOpenGraph,
    title: "기능 소개 | 기록부터 AI 육아 에이전트까지 | 맘마",
    description:
      "맘마의 수유·수면·기저귀 기록, 성장 리포트, 발달 체크, 맘마톡 AI 상담 기능을 한눈에 확인하세요.",
    url: pageUrl,
    type: "website",
    images: defaultOgImages,
  },
};

export default function FeaturesPage() {
  return (
    <>
      <section
        data-ga-section="features_intro"
        className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white"
      >
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary-100/60" aria-hidden="true" />
        <div className="absolute -right-20 top-16 h-56 w-56 rounded-full bg-secondary-100/60" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 text-center sm:px-6 lg:px-8">
          <span className="mb-5 inline-flex rounded-full border border-primary-100 bg-white/80 px-4 py-1.5 text-sm font-semibold text-primary-600 shadow-sm">
            맘마 기능 소개
          </span>
          <h1 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-neutral-900 [word-break:keep-all] sm:text-5xl">
            기록을 넘어,
            <br />
            <span className="gradient-text">우리 아이를 이해하는</span> 육아 에이전트
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 [word-break:keep-all] sm:text-lg">
            터치 한 번으로 하루를 기록하고, 쌓인 기록은 맘마톡 AI가 읽습니다. 수유와 수면부터 성장과 발달까지, 부모가 매번 다시 설명하지 않아도 되는 육아를 시작하세요.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/screenshots"
              data-ga-event="nav_click"
              data-ga-p-link_label="스크린샷 보기"
              data-ga-p-link_location="features_intro"
              className="inline-flex items-center justify-center rounded-full bg-primary-500 px-6 py-3 font-semibold text-white shadow-lg shadow-primary-500/20 transition-colors hover:bg-primary-600"
            >
              앱 화면 보기
            </Link>
            <Link
              href="/download"
              data-ga-event="nav_click"
              data-ga-p-link_label="앱 다운로드"
              data-ga-p-link_location="features_intro"
              className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-3 font-semibold text-neutral-700 transition-colors hover:border-primary-200 hover:text-primary-600"
            >
              무료로 시작하기
            </Link>
          </div>
        </div>
      </section>

      <FeaturesSection />
      <AgentSection />

      <section className="bg-neutral-50 px-4 py-16 sm:px-6 lg:px-8" aria-label="다음 단계">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-5 rounded-3xl border border-neutral-100 bg-white p-8 text-center shadow-sm sm:flex-row sm:p-10 sm:text-left">
          <div>
            <p className="text-sm font-semibold text-primary-500">다음으로 확인해보세요</p>
            <h2 className="mt-2 text-2xl font-bold text-neutral-900 [word-break:keep-all]">
              실제 앱 화면이 궁금하다면
            </h2>
            <p className="mt-2 text-sm text-neutral-500 [word-break:keep-all]">
              기록과 AI 상담이 앱 안에서 어떻게 이어지는지 직접 확인할 수 있어요.
            </p>
          </div>
          <Link
            href="/screenshots"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-neutral-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-neutral-700"
          >
            스크린샷 보기
          </Link>
        </div>
      </section>
    </>
  );
}
