import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `이용약관 | ${siteConfig.name}`,
  description: `${siteConfig.nameWithEn} 서비스 이용약관입니다. 서비스 이용에 관한 제반 사항을 규정합니다.`,
  alternates: {
    canonical: `${siteConfig.url}/terms`,
    languages: { ko: `${siteConfig.url}/terms` },
  },
};

export default function TermsPage() {
  const { name, nameEn, nameWithEn, email, company, business, legal } = siteConfig;

  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-neutral-900">이용약관</h1>
        <p className="mt-2 text-sm text-neutral-500">시행일자: {legal.effectiveDate}</p>
      </div>

      <div className="space-y-10 text-neutral-700">
          {/* 제1조 */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-neutral-900">
              제1조 (목적)
            </h2>
            <p className="leading-relaxed">
              이 약관은 {name}(이하 &quot;회사&quot;)가 운영하는 {nameWithEn} 서비스(이하
              &quot;서비스&quot;)의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및
              책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          {/* 제2조 */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-neutral-900">
              제2조 (용어의 정의)
            </h2>
            <p className="mb-3 leading-relaxed">
              이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
            </p>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="leading-relaxed">
                <strong>&quot;서비스&quot;</strong>란 회사가 제공하는 {nameWithEn} 모바일 앱 및
                관련 웹 서비스를 의미합니다.
              </li>
              <li className="leading-relaxed">
                <strong>&quot;회원&quot;</strong>이란 이 약관에 동의하고 서비스에 가입하여
                서비스를 이용하는 자를 말합니다.
              </li>
              <li className="leading-relaxed">
                <strong>&quot;비회원&quot;</strong>이란 회원으로 가입하지 않고 서비스를
                이용하는 자를 말합니다.
              </li>
              <li className="leading-relaxed">
                <strong>&quot;게시물&quot;</strong>이란 회원이 서비스를 이용하면서 게시한
                부호, 문자, 음성, 음향, 화상, 동영상 등의 정보 형태의 글, 사진,
                동영상 및 각종 파일과 링크 등을 의미합니다.
              </li>
              <li className="leading-relaxed">
                <strong>&quot;아이디(ID)&quot;</strong>란 회원 식별 및 서비스 이용을 위해
                회원이 설정하고 회사가 승인한 문자, 숫자 또는 소셜 계정 정보를
                의미합니다.
              </li>
            </ol>
          </section>

          {/* 제3조 */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-neutral-900">
              제3조 (약관의 효력 및 변경)
            </h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="leading-relaxed">
                이 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게
                공지함으로써 효력을 발생합니다.
              </li>
              <li className="leading-relaxed">
                회사는 「약관의 규제에 관한 법률」, 「정보통신망 이용촉진 및
                정보보호 등에 관한 법률」 등 관련 법령을 위배하지 않는 범위에서
                이 약관을 개정할 수 있습니다.
              </li>
              <li className="leading-relaxed">
                회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여
                현행 약관과 함께 서비스 초기화면 또는 공지사항 화면에 그
                적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 회원에게
                불리한 약관의 개정의 경우에는 30일 이전부터 공지합니다.
              </li>
              <li className="leading-relaxed">
                회원이 개정 약관의 적용에 동의하지 않는 경우 회원은 서비스
                이용을 중단하고 이용계약을 해지할 수 있습니다.
              </li>
            </ol>
          </section>

          {/* 제4조 */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-neutral-900">
              제4조 (서비스의 제공 및 변경)
            </h2>
            <p className="mb-3 leading-relaxed">
              회사는 다음과 같은 서비스를 제공합니다.
            </p>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="leading-relaxed">
                <strong>육아 기록</strong>: 아이의 성장, 식사, 수면, 활동 등
                일상을 기록하고 관리하는 기능
              </li>
              <li className="leading-relaxed">
                <strong>AI 코치</strong>: 인공지능 기반 육아 정보 제공 및 맞춤형
                조언 서비스
              </li>
              <li className="leading-relaxed">
                <strong>커뮤니티</strong>: 부모들이 육아 경험을 공유하고 소통할
                수 있는 온라인 커뮤니티
              </li>
              <li className="leading-relaxed">
                <strong>놀이지도</strong>: 아이의 연령과 발달 단계에 맞춘 놀이
                활동 추천 및 가이드
              </li>
              <li className="leading-relaxed">
                기타 회사가 추가로 개발하거나 제휴를 통해 제공하는 서비스
              </li>
            </ol>
            <p className="mt-3 leading-relaxed">
              회사는 서비스의 품질 향상 또는 운영상 필요에 따라 서비스의 내용을
              변경할 수 있으며, 이 경우 변경 내용과 적용 일자를 사전에 공지합니다.
            </p>
          </section>

          {/* 제5조 */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-neutral-900">
              제5조 (서비스 이용)
            </h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="leading-relaxed">
                서비스 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한
                연중무휴, 1일 24시간을 원칙으로 합니다.
              </li>
              <li className="leading-relaxed">
                회원가입은 소셜 로그인을 통해 진행되며, 지원하는 소셜 로그인은
                다음과 같습니다.
                <ul className="mt-2 ml-4 space-y-1 list-disc list-inside">
                  <li>카카오 계정</li>
                  <li>네이버 계정</li>
                  <li>구글(Google) 계정</li>
                  <li>애플(Apple) 계정</li>
                </ul>
              </li>
              <li className="leading-relaxed">
                회원가입 시 이용자는 이 약관 및 개인정보처리방침에 동의하여야
                합니다.
              </li>
              <li className="leading-relaxed">
                회사는 다음 각 호에 해당하는 경우 이용 신청을 거부하거나 이용을
                제한할 수 있습니다.
                <ul className="mt-2 ml-4 space-y-1 list-disc list-inside">
                  <li>실명이 아니거나 타인의 정보를 이용한 경우</li>
                  <li>허위 정보를 기재하거나 누락한 경우</li>
                  <li>관련 법령에 위반되는 경우</li>
                  <li>기타 회사가 정한 이용 신청 요건을 충족하지 못한 경우</li>
                </ul>
              </li>
            </ol>
          </section>

          {/* 제6조 */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-neutral-900">
              제6조 (회원의 의무)
            </h2>
            <p className="mb-3 leading-relaxed">회원은 다음 행위를 하여서는 안 됩니다.</p>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="leading-relaxed">
                타인의 정보 도용 또는 허위 정보 기재
              </li>
              <li className="leading-relaxed">
                회사가 게시한 정보의 변경
              </li>
              <li className="leading-relaxed">
                회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 송신 또는 게시
              </li>
              <li className="leading-relaxed">
                회사 및 제3자의 저작권 등 지적재산권 침해
              </li>
              <li className="leading-relaxed">
                회사 및 제3자의 명예를 손상시키거나 업무를 방해하는 행위
              </li>
              <li className="leading-relaxed">
                음란 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는
                정보를 서비스에 공개 또는 게시하는 행위
              </li>
              <li className="leading-relaxed">
                회사의 동의 없이 영리를 목적으로 서비스를 이용하는 행위
              </li>
              <li className="leading-relaxed">
                기타 불법적이거나 부당한 행위
              </li>
            </ol>
            <p className="mt-3 leading-relaxed">
              회원은 자신의 계정 정보(소셜 로그인 계정 포함)를 타인과 공유하거나
              양도할 수 없으며, 계정의 부정 사용으로 인해 발생하는 모든 책임은
              회원 본인에게 있습니다.
            </p>
          </section>

          {/* 제7조 */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-neutral-900">
              제7조 (서비스 제공자의 의무)
            </h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="leading-relaxed">
                회사는 관련 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를
                하지 않으며, 계속적이고 안정적으로 서비스를 제공하기 위하여
                최선을 다합니다.
              </li>
              <li className="leading-relaxed">
                회사는 회원의 개인정보를 안전하게 관리하기 위하여 보안 시스템을
                갖추며, 개인정보처리방침을 공시하고 준수합니다.
              </li>
              <li className="leading-relaxed">
                회사는 서비스 이용과 관련하여 회원으로부터 제기된 의견이나
                불만이 정당하다고 인정할 경우에는 이를 처리하여야 합니다. 처리
                과정 및 결과는 서비스 내 공지 또는 이메일 등의 방법으로 회원에게
                전달합니다.
              </li>
              <li className="leading-relaxed">
                회사는 서비스의 제공과 관련하여 알게 된 회원의 개인정보를
                본인의 승낙 없이 제3자에게 누설 또는 배포할 수 없습니다.
              </li>
            </ol>
          </section>

          {/* 제8조 */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-neutral-900">
              제8조 (개인정보보호)
            </h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="leading-relaxed">
                회사는 「개인정보 보호법」 등 관련 법령이 정하는 바에 따라
                회원의 개인정보를 보호하기 위해 노력합니다.
              </li>
              <li className="leading-relaxed">
                개인정보의 보호 및 사용에 대해서는 관련 법령 및 회사의
                개인정보처리방침이 적용됩니다. 단, 회사의 공식 서비스 이외의
                링크된 사이트에서는 회사의 개인정보처리방침이 적용되지 않습니다.
              </li>
              <li className="leading-relaxed">
                개인정보처리방침의 자세한 내용은{" "}
                <a
                  href="/privacy"
                  className="text-primary-600 underline hover:text-primary-800"
                >
                  개인정보처리방침
                </a>
                에서 확인하실 수 있습니다.
              </li>
            </ol>
          </section>

          {/* 제9조 */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-neutral-900">
              제9조 (게시물의 관리)
            </h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="leading-relaxed">
                회원의 게시물이 「정보통신망 이용촉진 및 정보보호 등에 관한
                법률」 및 「저작권법」 등 관련 법령에 위반되는 내용을 포함하는
                경우, 권리자는 관련 법령이 정한 절차에 따라 해당 게시물의
                게시 중단 및 삭제 등을 요청할 수 있으며, 회사는 관련 법령에 따라
                조치를 취하여야 합니다.
              </li>
              <li className="leading-relaxed">
                회사는 전항에 따른 권리자의 요청이 없는 경우라도 권리침해가
                인정될 만한 사유가 있거나 기타 회사 정책 및 관련 법령에 위반되는
                경우에는 관련 법령에 따라 해당 게시물에 대해 임시조치 등을 취할
                수 있습니다.
              </li>
              <li className="leading-relaxed">
                회원이 서비스 내에 게시한 게시물에 대한 저작권은 해당 회원에게
                있습니다. 단, 회사는 서비스의 운영, 전시, 전송, 배포, 홍보의
                목적으로 해당 게시물을 비상업적으로 이용할 수 있으며, 이 경우
                회사는 저작권법 규정을 준수합니다.
              </li>
            </ol>
          </section>

          {/* 제10조 */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-neutral-900">
              제10조 (서비스 이용제한)
            </h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="leading-relaxed">
                회사는 회원이 이 약관의 의무를 위반하거나 서비스의 정상적인
                운영을 방해한 경우, 경고, 일시정지, 영구이용정지 등으로 서비스
                이용을 단계적으로 제한할 수 있습니다.
              </li>
              <li className="leading-relaxed">
                회사는 전항에도 불구하고, 주민등록법을 위반한 명의도용 및
                결제도용, 저작권법 및 컴퓨터프로그램보호법을 위반한 불법 프로그램
                제공, 정보통신망법을 위반한 불법통신 및 해킹, 악성프로그램 배포,
                접속권한 초과행위 등과 같이 관련 법령을 위반한 경우에는 즉시
                영구이용정지를 할 수 있습니다.
              </li>
              <li className="leading-relaxed">
                회사는 서비스 이용을 제한하는 경우 회원에게 그 사유, 일시 및
                기간을 서비스 내 공지 또는 이메일 등의 방법으로 사전에
                통보합니다. 다만, 긴급한 조치가 필요한 경우 사후 통보할 수
                있습니다.
              </li>
            </ol>
          </section>

          {/* 제11조 */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-neutral-900">
              제11조 (손해배상)
            </h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="leading-relaxed">
                회사는 무료로 제공되는 서비스와 관련하여 회원에게 어떠한 손해가
                발생하더라도, 회사의 고의 또는 중과실이 없는 한 이에 대하여
                책임을 지지 않습니다.
              </li>
              <li className="leading-relaxed">
                회원이 이 약관을 위반하거나 관련 법령을 위반하여 회사에
                손해를 끼친 경우, 해당 회원은 회사에 발생한 모든 손해를
                배상하여야 합니다.
              </li>
            </ol>
          </section>

          {/* 제12조 */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-neutral-900">
              제12조 (면책조항)
            </h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="leading-relaxed">
                회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를
                제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
              </li>
              <li className="leading-relaxed">
                회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는
                책임을 지지 않습니다.
              </li>
              <li className="leading-relaxed">
                회사는 회원이 서비스를 이용하여 기대하는 수익을 상실한 것에
                대하여 책임을 지지 않으며, 그 밖에 서비스를 통하여 얻은 자료로
                인한 손해에 관하여 책임을 지지 않습니다.
              </li>
              <li className="leading-relaxed">
                회사는 회원이 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성
                등의 내용에 관하여는 책임을 지지 않습니다.
              </li>
              <li className="leading-relaxed">
                회사는 서비스 이용과 관련하여 회원에게 발생한 손해 가운데 회원의
                고의, 과실에 의한 손해에 대하여 책임을 지지 않습니다.
              </li>
            </ol>
          </section>

          {/* 제13조 */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-neutral-900">
              제13조 (분쟁해결 및 관할법원)
            </h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="leading-relaxed">
                회사와 회원 간에 발생한 분쟁에 관하여는 대한민국 법을 준거법으로
                합니다.
              </li>
              <li className="leading-relaxed">
                서비스 이용으로 발생한 분쟁에 대해 소송이 제기되는 경우, 민사소송법상의
                관할 법원을 관할 법원으로 합니다.
              </li>
            </ol>
          </section>

          {/* 부칙 */}
          <section className="border-t border-neutral-200 pt-8">
            <h2 className="mb-3 text-xl font-semibold text-neutral-900">부칙</h2>
            <p className="leading-relaxed">
              이 약관은 <strong>{legal.effectiveDate}</strong>부터 시행합니다.
            </p>
            <div className="mt-6 rounded-lg bg-neutral-50 p-4">
              <p className="text-sm text-neutral-600">
                서비스명: {name} ({nameEn})
                <br />
                운영사(상호): {company}
                <br />
                대표자: {business.representative}
                <br />
                사업자등록번호: {business.registrationNumber}
                <br />
                사업장 소재지: {business.address}
                <br />
                문의: {email}
              </p>
            </div>
          </section>
        </div>
    </>
  );
}
