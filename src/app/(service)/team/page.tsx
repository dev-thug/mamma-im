import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { baseOpenGraph, defaultOgImages } from "@/lib/seo";

const teamUrl = `${siteConfig.url}/team`;

export const metadata: Metadata = {
  title: `팀 소개 | ${siteConfig.name}`,
  description: `${siteConfig.nameWithEn}를 만드는 팀과 서비스 철학을 소개합니다.`,
  alternates: {
    canonical: teamUrl,
    languages: { ko: teamUrl },
  },
  openGraph: {
    ...baseOpenGraph,
    title: `팀 소개 | ${siteConfig.name}`,
    description: `${siteConfig.nameWithEn}를 만드는 팀과 서비스 철학을 소개합니다.`,
    url: teamUrl,
    type: "website",
    images: defaultOgImages,
  },
};

export default function TeamPage() {
  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-neutral-900">팀 소개</h1>
        <p className="mt-2 text-sm text-neutral-500">
          육아 가족의 일상을 더 편하고 따뜻하게 만드는 일에 집중하고 있습니다.
        </p>
      </div>

      <div className="space-y-8">
        <section id="editorial-policy" className="scroll-mt-24 rounded-lg border border-neutral-200 bg-white p-6">
          <h2 className="mb-3 text-lg font-semibold text-neutral-900">맘마 편집팀과 콘텐츠 안내</h2>
          <p className="text-sm leading-relaxed text-neutral-600">
            맘마 블로그는 {siteConfig.company}가 운영하고 맘마 편집팀이 작성·편집합니다. 서비스 책임자는 {siteConfig.business.representative}입니다.
            앱 사용 안내와 육아 정보를 제공하며, 의료기관이나 의료진의 진료 서비스가 아닙니다.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-600">
            <li>글의 게시일과 실제 내용이 수정된 날짜를 구분해 표시합니다.</li>
            <li>자료를 인용한 경우 본문에 원문 링크를 표시합니다. 출처 표시는 해당 글의 참고 자료이며 의료진의 검수를 의미하지 않습니다.</li>
            <li>맘마 기능과 요금은 공식 기능 소개·다운로드·FAQ에서 확인할 수 있습니다. 다른 앱과 비교할 때는 각 서비스의 최신 안내도 확인해 주세요.</li>
            <li>건강 관련 정보와 AI 답변은 진단·처방을 대신하지 않습니다. 아이의 상태와 치료에 관한 판단은 의료진에게 상담해 주세요.</li>
          </ul>
          <Link href="/contact" className="mt-4 inline-block text-sm text-primary-600 underline underline-offset-4">콘텐츠 오류·수정 요청하기 →</Link>
        </section>
        <section className="rounded-lg border border-neutral-200 bg-white p-6">
          <h2 className="mb-3 text-lg font-semibold text-neutral-900">맘마를 만드는 사람들</h2>
          <p className="text-sm leading-relaxed text-neutral-600">
            {siteConfig.nameWithEn} 팀은 부모와 아이의 성장 기록을 소중히 다루며, AI와 커뮤니티로
            육아의 순간을 더 의미 있게 연결하는 제품을 만들고 있습니다. 기술과 디자인, 고객
            경험을 아우르며 작은 기능 하나까지도 가족의 관점에서 다듬습니다.
          </p>
        </section>

        <section className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="mb-3 text-lg font-semibold text-neutral-900">우리가 믿는 것</h2>
          <ul className="space-y-2 text-sm text-neutral-700">
            <li className="flex gap-2">
              <span className="text-neutral-400">•</span>
              <span>아이의 기록과 데이터는 가족의 것이며, 투명하고 안전하게 다뤄져야 합니다.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-neutral-400">•</span>
              <span>육아는 정답이 없으므로, 판단을 대신하기보다 부모를 돕는 도구가 되고자 합니다.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-neutral-400">•</span>
              <span>피드백과 커뮤니티의 목소리를 통해 서비스를 지속적으로 개선합니다.</span>
            </li>
          </ul>
        </section>

        <section className="rounded-lg border border-neutral-200 bg-white p-6">
          <h2 className="mb-3 text-lg font-semibold text-neutral-900">함께 이야기해요</h2>
          <p className="mb-4 text-sm leading-relaxed text-neutral-600">
            제휴·협업·채용 등 문의는 아래 경로로 연락 주시면 담당자가 확인 후 답변 드립니다.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
          >
            1:1 문의하기 →
          </Link>
        </section>
      </div>
    </>
  );
}
