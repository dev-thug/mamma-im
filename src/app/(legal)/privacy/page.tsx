import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `개인정보처리방침 | ${siteConfig.name}`,
  description: `${siteConfig.nameWithEn} 앱의 개인정보처리방침을 안내합니다.`,
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
    languages: { ko: `${siteConfig.url}/privacy` },
  },
};

export default function PrivacyPage() {
  const { name, nameWithEn, email, url, legal } = siteConfig;

  return (
    <article className="max-w-none">
      <h1 className="text-3xl font-bold text-neutral-900 mb-2">개인정보처리방침</h1>
      <p className="text-sm text-neutral-500 mb-10">시행일자: {legal.effectiveDate}</p>

      <p className="text-neutral-700 leading-relaxed mb-8">
        {name}(이하 &quot;회사&quot;)는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」 등 관련 법령을 준수하기 위하여
        다음과 같이 개인정보처리방침을 수립·공개합니다.
      </p>

      {/* 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">1. 수집하는 개인정보 항목</h2>
        <p className="text-neutral-700 leading-relaxed mb-3">
          회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.
        </p>
        <h3 className="text-base font-semibold text-neutral-800 mb-2">가. 소셜 로그인 시 수집 항목</h3>
        <ul className="list-disc list-inside text-neutral-700 space-y-1 mb-4">
          <li>카카오 로그인: 이름(닉네임), 이메일 주소, 프로필 사진</li>
          <li>네이버 로그인: 이름(닉네임), 이메일 주소, 프로필 사진</li>
          <li>애플 로그인: 이름, 이메일 주소</li>
          <li>구글 로그인: 이름, 이메일 주소, 프로필 사진</li>
        </ul>
        <h3 className="text-base font-semibold text-neutral-800 mb-2">나. 서비스 이용 과정에서 자동 수집되는 항목</h3>
        <ul className="list-disc list-inside text-neutral-700 space-y-1">
          <li>기기 정보(OS 종류 및 버전, 기기 고유 식별자)</li>
          <li>앱 사용 기록, 접속 로그, 서비스 이용 기록</li>
          <li>IP 주소, 쿠키</li>
        </ul>
      </section>

      {/* 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">2. 개인정보 수집 및 이용 목적</h2>
        <p className="text-neutral-700 leading-relaxed mb-3">
          회사는 수집한 개인정보를 다음의 목적에 한해 이용합니다.
        </p>
        <ol className="list-decimal list-inside text-neutral-700 space-y-2">
          <li>회원 가입 및 본인 확인, 이용자 식별</li>
          <li>서비스 제공 및 개인화된 육아 정보 제공</li>
          <li>고객 상담, 민원 처리, 공지 사항 전달</li>
          <li>서비스 개선 및 신규 서비스 개발을 위한 통계 분석</li>
          <li>불법·부정 이용 방지 및 보안 유지</li>
        </ol>
      </section>

      {/* 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">3. 개인정보 보유 및 이용기간</h2>
        <p className="text-neutral-700 leading-relaxed mb-3">
          회사는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
          단, 관계 법령에 따라 보존이 필요한 경우 아래와 같이 보관합니다.
        </p>
        <ul className="list-disc list-inside text-neutral-700 space-y-2">
          <li>계약 또는 청약 철회에 관한 기록: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
          <li>대금결제 및 재화 등의 공급에 관한 기록: 5년 (동법)</li>
          <li>소비자 불만 또는 분쟁처리에 관한 기록: 3년 (동법)</li>
          <li>접속 로그 기록: 3개월 (통신비밀보호법)</li>
        </ul>
      </section>

      {/* 4 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">4. 개인정보 제3자 제공</h2>
        <p className="text-neutral-700 leading-relaxed">
          회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.
          다만, 이용자의 사전 동의가 있거나 법령에 의해 요구되는 경우에는 예외로 합니다.
        </p>
      </section>

      {/* 5 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">5. 개인정보 처리 위탁</h2>
        <p className="text-neutral-700 leading-relaxed mb-3">
          회사는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리 업무를 위탁하고 있습니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-neutral-700 border border-neutral-200 rounded-lg overflow-hidden">
            <thead className="bg-neutral-50">
              <tr>
                <th className="text-left px-4 py-3 font-semibold border-b border-neutral-200">수탁자</th>
                <th className="text-left px-4 py-3 font-semibold border-b border-neutral-200">위탁 업무 내용</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-100">
                <td className="px-4 py-3">Amazon Web Services (AWS)</td>
                <td className="px-4 py-3">서버 인프라 운영 및 데이터 저장</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Google Firebase</td>
                <td className="px-4 py-3">푸시 알림 발송, 앱 분석</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">6. 정보주체의 권리와 의무</h2>
        <p className="text-neutral-700 leading-relaxed mb-3">
          이용자는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
        </p>
        <ol className="list-decimal list-inside text-neutral-700 space-y-2">
          <li>개인정보 열람 요구</li>
          <li>오류 등이 있을 경우 정정 요구</li>
          <li>삭제 요구</li>
          <li>처리 정지 요구</li>
        </ol>
        <p className="text-neutral-700 leading-relaxed mt-4">
          위 권리 행사는 개인정보 보호책임자에게 서면, 전화, 전자우편 등을 통해 요청하실 수 있으며, 회사는
          이에 대해 지체 없이 조치하겠습니다.
        </p>
      </section>

      {/* 7 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">7. 개인정보 파기절차 및 방법</h2>
        <p className="text-neutral-700 leading-relaxed mb-3">
          회사는 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는
          지체 없이 해당 개인정보를 파기합니다.
        </p>
        <h3 className="text-base font-semibold text-neutral-800 mb-2">파기절차</h3>
        <p className="text-neutral-700 leading-relaxed mb-3">
          이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및
          기타 관련 법령에 따라 일정 기간 저장된 후 혹은 즉시 파기됩니다.
        </p>
        <h3 className="text-base font-semibold text-neutral-800 mb-2">파기방법</h3>
        <ul className="list-disc list-inside text-neutral-700 space-y-1">
          <li>전자적 파일 형태: 복원이 불가능한 방법으로 영구 삭제</li>
          <li>종이 문서: 분쇄기로 분쇄하거나 소각</li>
        </ul>
      </section>

      {/* 8 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">8. 개인정보 보호책임자</h2>
        <p className="text-neutral-700 leading-relaxed mb-3">
          회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만 처리 및
          피해 구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
        </p>
        <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
          <dl className="space-y-2 text-neutral-700 text-sm">
            <div className="flex gap-4">
              <dt className="font-semibold w-28 shrink-0">성명</dt>
              <dd>{legal.privacyOfficer}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="font-semibold w-28 shrink-0">직책</dt>
              <dd>{legal.privacyOfficerTitle}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="font-semibold w-28 shrink-0">이메일</dt>
              <dd>
                <a href={`mailto:${email}`} className="text-primary-500 hover:text-primary-600 transition-colors">
                  {email}
                </a>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="font-semibold w-28 shrink-0">서비스 URL</dt>
              <dd>
                <a href={url} className="text-primary-500 hover:text-primary-600 transition-colors">
                  {url}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <p className="text-neutral-700 leading-relaxed mt-4 text-sm">
          개인정보 침해에 대한 신고나 상담이 필요하신 경우 아래 기관에 문의하실 수 있습니다.
        </p>
        <ul className="list-disc list-inside text-neutral-600 text-sm space-y-1 mt-2">
          <li>개인정보 침해신고센터: privacy.kisa.or.kr / 118</li>
          <li>개인정보 분쟁조정위원회: www.kopico.go.kr / 1833-6972</li>
          <li>대검찰청 사이버범죄수사단: www.spo.go.kr / 1301</li>
          <li>경찰청 사이버안전국: cyberbureau.police.go.kr / 182</li>
        </ul>
      </section>

      {/* 9 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">9. 쿠키 사용에 관한 사항</h2>
        <p className="text-neutral-700 leading-relaxed mb-3">
          회사는 이용자에게 개인화된 서비스를 제공하기 위해 쿠키(cookie)를 사용합니다.
        </p>
        <h3 className="text-base font-semibold text-neutral-800 mb-2">쿠키란?</h3>
        <p className="text-neutral-700 leading-relaxed mb-3">
          쿠키는 웹사이트를 운영하는 데 이용되는 서버가 이용자의 브라우저에 보내는 아주 작은 텍스트 파일로서
          이용자 컴퓨터의 하드 디스크에 저장됩니다.
        </p>
        <h3 className="text-base font-semibold text-neutral-800 mb-2">쿠키 사용 목적</h3>
        <ul className="list-disc list-inside text-neutral-700 space-y-1 mb-3">
          <li>로그인 상태 유지 및 세션 관리</li>
          <li>이용자의 서비스 이용 패턴 분석 및 서비스 개선</li>
          <li>맞춤형 서비스 제공</li>
        </ul>
        <h3 className="text-base font-semibold text-neutral-800 mb-2">쿠키 거부 방법</h3>
        <p className="text-neutral-700 leading-relaxed">
          이용자는 웹 브라우저의 옵션 설정을 통해 쿠키를 허용하거나 거부할 수 있습니다.
          단, 쿠키 설치를 거부할 경우 일부 서비스 이용에 불편이 있을 수 있습니다.
        </p>
      </section>

      {/* 10 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">10. 개인정보처리방침의 변경</h2>
        <p className="text-neutral-700 leading-relaxed">
          이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경 내용의 추가, 삭제 및 정정이 있는 경우에는
          변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
        </p>
      </section>

      <div className="pt-8 border-t border-neutral-200">
        <p className="text-sm text-neutral-500">
          본 방침은 <strong>{legal.effectiveDate}</strong>부터 시행됩니다.
        </p>
        <p className="text-sm text-neutral-500 mt-1">운영사: {siteConfig.company} &nbsp;|&nbsp; 서비스: {nameWithEn} &nbsp;|&nbsp; URL: {url}</p>
      </div>
    </article>
  );
}
