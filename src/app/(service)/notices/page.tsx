import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "공지사항 | 맘마",
  description: "맘마 앱의 공지사항과 업데이트 소식을 확인하세요.",
  alternates: {
    canonical: `${siteConfig.url}/notices`,
    languages: { ko: `${siteConfig.url}/notices` },
  },
};

const notices = [
  {
    id: 1,
    date: "2026.03.01",
    title: "맘마 서비스 정식 오픈 안내",
    description:
      "안녕하세요, 맘마입니다. 오랜 준비 끝에 맘마 서비스가 정식으로 오픈되었습니다. 태어나는 순간부터 초등학교 졸업까지, 아이의 모든 성장을 함께하는 스마트 육아 앱을 이제 만나보세요.",
    isNew: true,
  },
  {
    id: 2,
    date: "2026.03.01",
    title: "개인정보처리방침 시행 안내",
    description:
      "2026년 3월 1일부터 개인정보처리방침이 시행됩니다. 회원의 개인정보 보호를 위해 최선을 다하고 있으니 내용을 확인해 주시기 바랍니다.",
    isNew: true,
  },
  {
    id: 3,
    date: "2026.02.15",
    title: "맘마 베타 테스트 참여자 모집 (마감)",
    description:
      "맘마 베타 테스트에 참여해 주신 모든 분들께 감사드립니다. 베타 테스트는 마감되었으며, 소중한 피드백을 바탕으로 더 나은 서비스로 찾아뵙겠습니다.",
    isNew: false,
  },
];

export default function NoticesPage() {
  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-neutral-900">공지사항</h1>
        <p className="mt-2 text-sm text-neutral-500">
          맘마 앱의 공지사항과 업데이트 소식을 확인하세요.
        </p>
      </div>

      <div className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="rounded-lg border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-2 pt-0.5">
                <span className="whitespace-nowrap rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-500">
                  {notice.date}
                </span>
                {notice.isNew && (
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                    NEW
                  </span>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-base font-semibold text-neutral-900">
                  {notice.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                  {notice.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
