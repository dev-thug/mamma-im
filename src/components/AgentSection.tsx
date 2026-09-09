import Link from "next/link";
import { siteConfig } from "@/config/site";

/**
 * "육아 에이전트"라는 카테고리를 정의하고 맘마를 그 자리에 놓는 섹션.
 *
 * 첫 문단은 40~60단어의 자립형 정의문입니다. 검색엔진 스니펫과 AI 답변이
 * 문맥 없이 그대로 인용할 수 있어야 해서, 앞뒤 문장에 의존하지 않게 썼습니다.
 */

const comparison = {
  headers: ["", "육아 기록 앱", "일반 AI 챗봇", `${siteConfig.name} (육아 에이전트)`],
  rows: [
    ["아이 기록 저장", "가능", "불가", "가능"],
    ["기록을 읽고 답변", "불가", "불가", "가능"],
    ["월령·발달 단계 반영", "일부", "질문에 직접 써야 함", "자동 반영"],
    ["다음 할 일 제안", "불가", "일반론 수준", "우리 아이 기록 기준"],
  ],
};

const capabilities = [
  {
    title: "기록을 읽습니다",
    body: "수유 간격, 수면 패턴, 기저귀 횟수, 성장 곡선을 누적해 아이의 최근 상태를 스스로 파악합니다.",
  },
  {
    title: "근거를 대고 답합니다",
    body: "\"요즘 밤중 수유가 잦아요\" 같은 질문에 지난 2주 기록을 근거로 답합니다. 일반론이 아니라 우리 아이 이야기입니다.",
  },
  {
    title: "다음 행동을 제안합니다",
    body: "월령별 발달 체크 시점, 예방접종 일정, 이유식 단계 전환처럼 지금 챙길 일을 먼저 알려줍니다.",
  },
];

export default function AgentSection() {
  return (
    <section id="agent" data-ga-section="agent" className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6 text-center [word-break:keep-all]">
          AI 육아 에이전트란?
        </h2>

        <p className="text-lg text-neutral-700 leading-relaxed [word-break:keep-all] mb-4">
          육아 에이전트는 부모가 남긴 수유·수면·기저귀·성장 기록을 스스로 읽고, 그 데이터를 근거로
          다음에 무엇을 하면 좋을지 제안하는 AI입니다. 기록만 쌓아두는 육아 기록 앱과도, 일반론만
          말하는 AI 챗봇과도 다릅니다. {siteConfig.nameWithEn}는 기록·분석·상담을 하나의 앱에서
          잇는 AI 육아 에이전트입니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-12">
          {capabilities.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-neutral-100 p-6"
              style={{ background: "var(--primary-50)" }}
            >
              <h3 className="font-bold text-neutral-900 mb-2">{item.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed [word-break:keep-all]">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-bold text-neutral-900 mb-4 [word-break:keep-all]">
          육아 기록 앱·AI 챗봇과 무엇이 다른가요?
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-neutral-700 border border-neutral-200 rounded-lg overflow-hidden">
            <thead className="bg-neutral-50">
              <tr>
                {comparison.headers.map((header, index) => (
                  <th
                    key={header || index}
                    scope="col"
                    className="text-left px-4 py-3 font-semibold border-b border-neutral-200"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row[0]} className="border-b border-neutral-100 last:border-b-0">
                  <th
                    scope="row"
                    className="text-left px-4 py-3 font-medium text-neutral-900"
                  >
                    {row[0]}
                  </th>
                  {row.slice(1).map((cell, index) => (
                    <td key={index} className="px-4 py-3">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm text-neutral-500">
          더 자세한 비교와 고를 때 확인할 기준은{" "}
          <Link
            href="/blog/ai-parenting-agent"
            data-ga-event="nav_click"
            data-ga-p-link_label="AI 육아 에이전트 가이드"
            data-ga-p-link_location="home_agent"
            className="text-primary-500 underline underline-offset-2 hover:text-primary-600 transition-colors"
          >
            AI 육아 에이전트란? 가이드
          </Link>
          에서 이어집니다.
        </p>
      </div>
    </section>
  );
}
