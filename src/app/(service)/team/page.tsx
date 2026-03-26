import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const teamUrl = `${siteConfig.url}/team`;

export const metadata: Metadata = {
  title: `팀 소개 | ${siteConfig.name}`,
  description: `${siteConfig.nameWithEn}를 만드는 팀과 서비스 철학을 소개합니다.`,
  alternates: {
    canonical: teamUrl,
    languages: { ko: teamUrl },
  },
  openGraph: {
    title: `팀 소개 | ${siteConfig.name}`,
    description: `${siteConfig.nameWithEn}를 만드는 팀과 서비스 철학을 소개합니다.`,
    url: teamUrl,
    locale: "ko_KR",
    type: "website",
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
