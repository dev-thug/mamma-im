import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { baseOpenGraph, defaultOgImages } from "@/lib/seo";

const guidelinesUrl = `${siteConfig.url}/guidelines`;

const TITLE = `서비스 이용 가이드라인 | ${siteConfig.name}`;
const DESCRIPTION = `${siteConfig.nameWithEn}를 안전하게 이용하기 위한 기록 입력 기준, 맘마톡 유의사항, 금지 행위를 안내합니다.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: guidelinesUrl,
    languages: { ko: guidelinesUrl },
  },
  openGraph: {
    ...baseOpenGraph,
    title: TITLE,
    description: DESCRIPTION,
    url: guidelinesUrl,
    type: "website",
    images: defaultOgImages,
  },
};

export default function GuidelinesPage() {
  const { nameWithEn, email, legal } = siteConfig;

  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-neutral-900">
          서비스 이용 가이드라인
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          시행일자: {legal.effectiveDate} (최종 개정: {legal.revisedDate})
        </p>
      </div>

      <div className="space-y-10 text-neutral-700">
        {/* 소개 */}
        <section>
          <p className="leading-relaxed">
            {nameWithEn}는 아이의 일상을 기록하고 인공지능 육아 상담을 받는{" "}
            <strong>개인용 육아 기록 서비스</strong>입니다. 지금은 내 기록이나
            대화가 다른 이용자에게 공개되는 기능이 없습니다. 아래는 서비스를
            안전하게 이용하기 위한 안내입니다.
          </p>
        </section>

        {/* 1. 기록 입력 기준 */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-neutral-900">
            1. 기록 입력 기준
          </h2>
          <ul className="space-y-2 list-disc list-inside">
            <li className="leading-relaxed">
              기록과 메모에는{" "}
              <strong>본인 또는 양육 권한이 있는 아동</strong>에 관한 정보만
              입력해 주세요.
            </li>
            <li className="leading-relaxed">
              다른 사람(다른 아동을 포함합니다)의 민감한 개인정보를 동의 없이
              입력하지 않습니다.
            </li>
            <li className="leading-relaxed">
              주민등록번호, 카드번호, 계좌번호처럼 서비스 제공에 필요하지 않은
              정보는 입력하지 마세요. 회사는 이러한 정보를 요구하지 않습니다.
            </li>
          </ul>
        </section>

        {/* 2. 맘마톡 유의사항 */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-neutral-900">
            2. 맘마톡 이용 시 유의사항
          </h2>
          <ul className="space-y-2 list-disc list-inside">
            <li className="leading-relaxed">
              맘마톡은{" "}
              <strong>
                일반적인 육아 정보를 제공하며, 의학적 진단이나 처방이 아닙니다.
              </strong>{" "}
              아이의 건강이 우려되면 소아과 진료를 받아 주세요.
            </li>
            <li className="leading-relaxed">
              응급 상황에서는 맘마톡에 묻지 마시고{" "}
              <strong>119 또는 의료기관에 즉시 연락</strong>해 주세요.
            </li>
            <li className="leading-relaxed">
              입력한 대화 내용은 답변을 생성하기 위해 인공지능 모델에
              전달됩니다. 민감한 개인정보는 입력하지 마세요.
            </li>
            <li className="leading-relaxed">
              아동학대, 타인에 대한 위해, 불법행위를 위한 정보 요청에는 답변하지
              않습니다.
            </li>
          </ul>
        </section>

        {/* 3. 금지되는 이용 행위 */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-neutral-900">
            3. 금지되는 이용 행위
          </h2>
          <ul className="space-y-2 list-disc list-inside">
            <li className="leading-relaxed">
              타인의 계정을 도용하거나 타인의 정보로 가입하는 행위
            </li>
            <li className="leading-relaxed">
              자동화된 수단으로 서비스를 비정상적으로 대량 호출하는 행위
            </li>
            <li className="leading-relaxed">
              서비스의 설비, 서버, 네트워크를 방해하거나 취약점을 악용하는 행위
            </li>
            <li className="leading-relaxed">
              서비스를 통해 얻은 정보를 회사의 사전 승낙 없이 복제·유통하거나
              상업적으로 이용하는 행위
            </li>
            <li className="leading-relaxed">
              관련 법령에 위반되는 목적으로 서비스를 이용하는 행위
            </li>
          </ul>
        </section>

        {/* 4. 문의 및 신고 */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-neutral-900">
            4. 문의 및 신고
          </h2>
          <p className="leading-relaxed">
            서비스 이용 중 문제나 부적절한 이용을 발견하셨다면 아래 이메일로
            알려 주세요. 접수된 내용은 확인 후 필요한 조치를 취하고 결과를
            회신합니다. 개인정보의 열람·정정·삭제 요청도 같은 주소로 접수합니다.
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

        {/* 5. 위반 시 조치 */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-neutral-900">
            5. 위반 시 조치
          </h2>
          <p className="leading-relaxed">
            이 가이드라인 또는 이용약관을 위반한 경우 회사는 서비스 이용을
            제한하거나 이용계약을 해지할 수 있습니다. 조치 전 회원에게 사유를
            안내하며, 회원은 이에 대해 소명할 수 있습니다. 구체적인 절차는
            이용약관 제10조(서비스 이용제한)를 따릅니다.
          </p>
        </section>

        {/* 6. 가이드라인의 개정 */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-neutral-900">
            6. 가이드라인의 개정
          </h2>
          <p className="leading-relaxed">
            서비스에 새로운 기능이 추가되거나 관련 법령이 변경되면 이
            가이드라인을 개정할 수 있습니다. 개정하는 경우 변경 내용과 시행일자를
            시행 7일 전부터 서비스 내 공지사항을 통해 안내합니다.
          </p>
        </section>

        {/* 부칙 */}
        <section className="border-t border-neutral-200 pt-8">
          <h2 className="mb-3 text-xl font-semibold text-neutral-900">부칙</h2>
          <p className="leading-relaxed">
            이 가이드라인은 <strong>{legal.effectiveDate}</strong>부터 시행하며,{" "}
            <strong>{legal.revisedDate}</strong> 개정 내용을 반영하고 있습니다.
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
