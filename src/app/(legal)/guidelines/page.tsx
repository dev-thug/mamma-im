import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `커뮤니티 가이드라인 | ${siteConfig.name}`,
  description: `${siteConfig.nameWithEn} 커뮤니티 이용 규칙 및 콘텐츠 관리 정책을 안내합니다.`,
};

export default function GuidelinesPage() {
  const { name, nameWithEn, email, legal } = siteConfig;

  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-neutral-900">커뮤니티 가이드라인</h1>
        <p className="mt-2 text-sm text-neutral-500">시행일자: {legal.effectiveDate}</p>
      </div>

      <div className="space-y-10 text-neutral-700">
        {/* 소개 */}
        <section>
          <p className="leading-relaxed">
            {nameWithEn} 커뮤니티는 부모님들이 서로 육아 경험을 나누고 응원하는 따뜻한 공간입니다.
            모든 이용자가 안전하고 쾌적하게 서비스를 이용할 수 있도록 아래 가이드라인을 준수해 주세요.
          </p>
        </section>

        {/* 1. 콘텐츠 기준 */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-neutral-900">
            1. 콘텐츠 기준
          </h2>
          <p className="mb-3 leading-relaxed">
            {name} 커뮤니티에서는 다음과 같은 콘텐츠를 금지합니다.
          </p>
          <ol className="space-y-2 list-decimal list-inside">
            <li className="leading-relaxed">
              <strong>폭력적·위협적 콘텐츠</strong>: 타인에 대한 폭력, 위협, 협박, 괴롭힘을 조장하거나 포함하는 게시물
            </li>
            <li className="leading-relaxed">
              <strong>혐오·차별 콘텐츠</strong>: 인종, 성별, 종교, 국적, 장애 등을 이유로 특정 집단이나 개인을 비하·차별하는 게시물
            </li>
            <li className="leading-relaxed">
              <strong>음란·선정적 콘텐츠</strong>: 성적으로 노골적이거나 선정적인 이미지, 영상, 텍스트
            </li>
            <li className="leading-relaxed">
              <strong>스팸·광고</strong>: 상업적 광고, 홍보, 스팸성 게시물 (사전 승인 없는 외부 링크 포함)
            </li>
            <li className="leading-relaxed">
              <strong>허위 정보</strong>: 의학적·과학적 근거 없이 아동 건강이나 안전에 관한 잘못된 정보를 유포하는 게시물
            </li>
            <li className="leading-relaxed">
              <strong>개인정보 침해</strong>: 본인 또는 타인(특히 아동)의 민감한 개인정보를 무단으로 공개하는 게시물
            </li>
            <li className="leading-relaxed">
              <strong>불법 콘텐츠</strong>: 관련 법령에 위반되는 콘텐츠
            </li>
          </ol>
        </section>

        {/* 2. 콘텐츠 필터링 */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-neutral-900">
            2. 콘텐츠 필터링
          </h2>
          <p className="leading-relaxed">
            {name}는 건전한 커뮤니티 환경을 유지하기 위해 다음과 같은 콘텐츠 필터링 시스템을 운영합니다.
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li className="leading-relaxed">
              게시물 및 댓글 작성 시 자동 필터링 시스템을 통해 부적절한 표현(욕설, 비속어, 혐오 표현 등)을 사전에 감지하고 차단합니다.
            </li>
            <li className="leading-relaxed">
              이미지 및 미디어 콘텐츠에 대해 자동화된 검수 시스템을 통해 부적절한 콘텐츠를 필터링합니다.
            </li>
            <li className="leading-relaxed">
              운영팀이 정기적으로 게시물을 모니터링하여 가이드라인 위반 콘텐츠를 검토하고 조치합니다.
            </li>
          </ul>
        </section>

        {/* 3. 신고 기능 */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-neutral-900">
            3. 부적절한 콘텐츠 신고
          </h2>
          <p className="mb-3 leading-relaxed">
            커뮤니티 가이드라인에 위반되는 게시물이나 댓글을 발견하면, 누구나 신고할 수 있습니다.
          </p>
          <ol className="space-y-2 list-decimal list-inside">
            <li className="leading-relaxed">
              해당 게시물 또는 댓글의 <strong>&quot;신고&quot;</strong> 버튼을 탭합니다.
            </li>
            <li className="leading-relaxed">
              신고 사유를 선택합니다 (폭력/위협, 혐오/차별, 음란/선정, 스팸/광고, 허위정보, 기타).
            </li>
            <li className="leading-relaxed">
              필요 시 추가 설명을 입력한 후 신고를 제출합니다.
            </li>
          </ol>
          <p className="mt-3 leading-relaxed">
            접수된 신고는 운영팀에 즉시 전달되며, <strong>24시간 이내에 검토 및 조치</strong>됩니다.
          </p>
        </section>

        {/* 4. 사용자 차단 */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-neutral-900">
            4. 사용자 차단
          </h2>
          <p className="mb-3 leading-relaxed">
            불쾌하거나 부적절한 행동을 하는 사용자를 차단할 수 있습니다.
          </p>
          <ol className="space-y-2 list-decimal list-inside">
            <li className="leading-relaxed">
              해당 사용자의 프로필 또는 게시물에서 <strong>&quot;차단&quot;</strong> 버튼을 탭합니다.
            </li>
            <li className="leading-relaxed">
              차단된 사용자의 모든 게시물과 댓글은 <strong>즉시 내 피드에서 제거</strong>됩니다.
            </li>
            <li className="leading-relaxed">
              차단된 사용자는 나의 게시물에 댓글을 작성하거나 메시지를 보낼 수 없습니다.
            </li>
            <li className="leading-relaxed">
              차단 시 해당 사용자의 부적절한 콘텐츠가 <strong>운영팀에 자동 통보</strong>되어 추가 검토가 이루어집니다.
            </li>
          </ol>
          <p className="mt-3 leading-relaxed">
            차단은 설정 &gt; 차단 관리에서 언제든지 해제할 수 있습니다.
          </p>
        </section>

        {/* 5. 위반 시 조치 */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-neutral-900">
            5. 위반 시 조치
          </h2>
          <p className="mb-3 leading-relaxed">
            커뮤니티 가이드라인을 위반한 경우, {name} 운영팀은 다음과 같은 조치를 취합니다.
          </p>
          <ol className="space-y-2 list-decimal list-inside">
            <li className="leading-relaxed">
              <strong>콘텐츠 삭제</strong>: 가이드라인을 위반한 게시물, 댓글, 이미지 등은 즉시 삭제됩니다.
            </li>
            <li className="leading-relaxed">
              <strong>경고</strong>: 최초 위반 시 경고 알림을 발송합니다.
            </li>
            <li className="leading-relaxed">
              <strong>일시 이용 정지</strong>: 반복적인 위반 또는 심각한 위반의 경우 커뮤니티 이용이 일시적으로 정지됩니다.
            </li>
            <li className="leading-relaxed">
              <strong>영구 이용 정지</strong>: 지속적인 위반 또는 중대한 위반(폭력, 아동 관련 부적절 콘텐츠 등)의 경우 계정이 영구적으로 정지됩니다.
            </li>
          </ol>
          <p className="mt-3 leading-relaxed">
            모든 신고에 대해 <strong>24시간 이내에 검토</strong>하며, 위반이 확인되면 해당 콘텐츠를 삭제하고 위반 사용자에게 적절한 조치를 취합니다.
          </p>
        </section>

        {/* 6. 이의 제기 */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-neutral-900">
            6. 이의 제기
          </h2>
          <p className="leading-relaxed">
            운영팀의 조치에 이의가 있는 경우, 아래 이메일로 문의하실 수 있습니다.
            이의 제기는 접수 후 영업일 기준 3일 이내에 검토하여 결과를 안내드립니다.
          </p>
          <p className="mt-2 leading-relaxed">
            문의:{" "}
            <a
              href={`mailto:${email}`}
              className="text-primary-600 underline hover:text-primary-800"
            >
              {email}
            </a>
          </p>
        </section>

        {/* 7. 가이드라인 변경 */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-neutral-900">
            7. 가이드라인 변경
          </h2>
          <p className="leading-relaxed">
            {name}는 서비스 운영 상황 및 관련 법령 변경에 따라 본 가이드라인을 수정할 수 있습니다.
            변경 시 앱 내 공지사항 또는 서비스 화면을 통해 사전에 안내합니다.
          </p>
        </section>

        {/* 부칙 */}
        <section className="border-t border-neutral-200 pt-8">
          <h2 className="mb-3 text-xl font-semibold text-neutral-900">부칙</h2>
          <p className="leading-relaxed">
            이 가이드라인은 <strong>{legal.effectiveDate}</strong>부터 시행합니다.
          </p>
          <div className="mt-6 rounded-lg bg-neutral-50 p-4">
            <p className="text-sm text-neutral-600">
              서비스명: {nameWithEn}
              <br />
              문의: {email}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
