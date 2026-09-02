import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "자주 묻는 질문 | 맘마",
  description: "맘마 앱에 대해 자주 묻는 질문과 답변을 확인하세요.",
  alternates: {
    canonical: `${siteConfig.url}/faq`,
    languages: { ko: `${siteConfig.url}/faq` },
  },
};

const faqs: { question: string; answerText: string; answer?: React.ReactNode }[] = [
  {
    question: "맘마 앱은 어떤 앱인가요?",
    answerText:
      "맘마는 태어나는 순간부터 초등학교 졸업까지, 아이의 모든 성장을 함께하는 스마트 육아 앱입니다. 수유·수면·성장 기록부터 AI 육아 조언, 육아 일기까지 한 곳에서 관리할 수 있습니다.",
  },
  {
    question: "맘마 앱은 무료로 사용할 수 있나요?",
    answerText:
      "네, 맘마는 수유·수면·기저귀 등 기록 기능과 맘마톡 AI 상담을 포함한 기본 기능을 무료로 제공합니다.",
  },
  {
    question: "어떤 기기에서 사용할 수 있나요?",
    answerText:
      "맘마는 iOS(iPhone)와 Android 스마트폰에서 모두 사용 가능합니다. 앱스토어 또는 구글 플레이스토어에서 '맘마'를 검색하여 다운로드하세요.",
  },
  {
    question: "여러 아이의 정보를 한 계정에서 관리할 수 있나요?",
    answerText:
      "네, 가능합니다. 맘마는 여러 아이의 프로필을 하나의 계정에서 관리할 수 있습니다. 각 아이별로 성장 기록, 육아 일기 등을 독립적으로 기록하고 확인할 수 있습니다.",
  },
  {
    question: "가족 구성원과 육아 기록을 공유할 수 있나요?",
    answerText:
      "현재는 계정 하나로 한 명이 기록을 관리하는 구조라 배우자나 조부모와의 실시간 공유는 지원하지 않습니다. 다만 여러 아이(형제자매)는 한 계정에서 각각 독립적으로 등록하고 관리할 수 있습니다.",
  },
  {
    question: "AI 육아 조언 기능은 어떻게 사용하나요?",
    answerText:
      "앱 내 AI 상담 기능을 통해 아이의 발달, 수면, 식이 등 다양한 육아 고민을 질문하실 수 있습니다. AI가 아이의 월령과 기록된 데이터를 바탕으로 맞춤형 답변을 제공합니다.",
  },
  {
    question: "아이의 개인정보는 안전하게 보호되나요?",
    answerText:
      "맘마는 아이와 가족의 개인정보 보호를 최우선으로 합니다. 모든 데이터는 암호화되어 안전하게 저장되며, 제3자에게 판매하거나 무단으로 공유하지 않습니다. 자세한 내용은 개인정보처리방침을 확인해 주세요.",
  },
  {
    question: "앱 사용 중 문제가 발생하면 어떻게 하나요?",
    answerText: `앱 내 고객지원 메뉴를 통해 문의하시거나, 문의하기 페이지를 통해 연락해 주세요. 이메일(${siteConfig.email})로도 문의하실 수 있습니다. 빠르게 도움을 드리겠습니다.`,
    answer: (
      <>
        앱 내 고객지원 메뉴를 통해 문의하시거나,{" "}
        <Link
          href="/contact"
          className="text-rose-500 underline underline-offset-2 hover:text-rose-600 transition-colors"
        >
          문의하기
        </Link>{" "}
        페이지를 통해 연락해 주세요. 이메일({siteConfig.email})로도 문의하실 수 있습니다. 빠르게 도움을 드리겠습니다.
      </>
    ),
  },
  {
    question: "계정을 삭제하면 데이터는 어떻게 되나요?",
    answerText:
      "계정 삭제 시 아이의 성장 기록, 육아 일기 등 모든 개인 데이터는 관련 법령에 따른 보존 기간 경과 후 완전히 삭제됩니다. 삭제 전 앱 내 데이터 내보내기 기능을 통해 기록을 백업하실 것을 권장합니다.",
  },
  {
    question: "알림 설정은 어떻게 변경하나요?",
    answerText:
      "앱 내 설정 > 알림 메뉴에서 기록 리마인더, 공지사항 등 각종 알림을 개별적으로 켜거나 끌 수 있습니다. 스마트폰 설정에서도 맘마 앱의 알림 권한을 관리하실 수 있습니다.",
  },
];

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answerText,
    },
  })),
};

export default function FaqPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-neutral-900 mb-3">자주 묻는 질문</h1>
        <p className="text-neutral-500">
          맘마 앱 사용에 관해 자주 묻는 질문을 모았습니다. 원하시는 답변을 찾지 못하셨다면{" "}
          <Link
            href="/contact"
            className="text-rose-500 underline underline-offset-2 hover:text-rose-600 transition-colors"
          >
            문의하기
          </Link>
          를 이용해 주세요.
        </p>
      </div>

      <div className="divide-y divide-neutral-200 border-t border-neutral-200">
        {faqs.map((faq, index) => (
          <details key={index} className="group py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-medium text-neutral-800 hover:text-neutral-900 transition-colors">
              <span>{faq.question}</span>
              <span className="flex-shrink-0 text-neutral-400 transition-transform duration-200 group-open:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </summary>
            <div className="pb-5 pt-1 text-neutral-600 leading-relaxed text-sm">
              {faq.answer ?? faq.answerText}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
