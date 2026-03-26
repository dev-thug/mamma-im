import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "1:1 문의 | 맘마",
  description: "맘마 앱 관련 문의사항을 보내주세요.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
    languages: { ko: `${siteConfig.url}/contact` },
  },
};

const checklistItems = [
  "사용 기기 (예: iPhone 15, Galaxy S24 등)",
  "앱 버전 (설정 > 앱 정보에서 확인)",
  "문의 내용 상세 (문제 발생 상황, 오류 메시지 등)",
];

export default function ContactPage() {
  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-neutral-900">1:1 문의</h1>
        <p className="mt-2 text-sm text-neutral-500">
          궁금한 점이 있으시면 언제든지 문의해 주세요.
        </p>
      </div>

      <div className="space-y-8">
        {/* 문의 전 확인 */}
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="mb-3 text-lg font-semibold text-neutral-900">
            문의 전 확인해주세요
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-neutral-600">
            문의하시기 전에 자주 묻는 질문(FAQ)을 먼저 확인해 보시면 더 빠르게
            답변을 얻으실 수 있습니다.
          </p>
          <Link
            href="/faq"
            className="inline-flex items-center gap-1 rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
          >
            자주 묻는 질문 보기 →
          </Link>
        </div>

        {/* 이메일 문의 */}
        <div className="rounded-lg border border-neutral-200 bg-white p-6">
          <h2 className="mb-3 text-lg font-semibold text-neutral-900">
            이메일 문의
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-neutral-600">
            아래 이메일로 문의사항을 보내주시면 빠르게 답변 드리겠습니다.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-lg font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-800"
          >
            {siteConfig.email}
          </a>
          <p className="mt-3 text-sm text-neutral-500">
            답변 기간: 영업일 기준 1~2일 이내
          </p>
        </div>

        {/* 문의 시 포함 사항 */}
        <div className="rounded-lg border border-neutral-200 bg-white p-6">
          <h2 className="mb-3 text-lg font-semibold text-neutral-900">
            문의 시 포함해주세요
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-neutral-600">
            원활한 문의 처리를 위해 아래 내용을 포함해 주시면 더욱 빠른 답변이
            가능합니다.
          </p>
          <ul className="space-y-2">
            {checklistItems.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                <span className="mt-0.5 text-neutral-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
