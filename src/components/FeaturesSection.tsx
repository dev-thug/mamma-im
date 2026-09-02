"use client";

import { useRef } from "react";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import {
  ClipboardList,
  Timer,
  ListChecks,
  Users,
  TrendingUp,
  MessageCircle,
  Check,
} from "lucide-react";

const ease: Easing = "easeOut";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  /** Tailwind class for icon container bg (empty string for inline style) */
  iconBgClass: string;
  /** Tailwind class for icon color (empty string for inline style) */
  iconColorClass: string;
  /** Inline hex color for icon container bg when not using Tailwind class */
  iconBgStyle?: string;
  /** Inline hex color for icon when not using Tailwind class */
  iconColorStyle?: string;
  features: string[];
}

const features: Feature[] = [
  {
    icon: ClipboardList,
    title: "터치 한 번, 세밀한 기록",
    description: "수유부터 활동까지, 필요한 만큼 자세하게",
    iconBgClass: "bg-primary-50",
    iconColorClass: "text-primary-500",
    features: [
      "수유·수면·기저귀 빠른 기록",
      "체온·투약·목욕·유축 기록",
      "활동·터미타임·메모까지",
      "12종 이상 기록 항목",
    ],
  },
  {
    icon: Timer,
    title: "실시간 타이머",
    description: "시작 버튼만 누르면 자동으로 기록돼요",
    iconBgClass: "",
    iconColorClass: "",
    iconBgStyle: "#eef2ff",
    iconColorStyle: "#6366f1",
    features: [
      "수유 타이머",
      "수면 타이머",
      "종료 시 자동 시간 계산",
      "진행 중 기록 위젯",
    ],
  },
  {
    icon: TrendingUp,
    title: "성장 그래프 & 리포트",
    description: "체중·키 변화와 기록 통계를 차트로 확인하세요",
    iconBgClass: "",
    iconColorClass: "",
    iconBgStyle: "#fffbeb",
    iconColorStyle: "#f59e0b",
    features: [
      "성장 기록 & 트렌드 차트",
      "기간별 기록 통계 리포트",
      "수유·수면·기저귀 요약",
      "한눈에 보는 오늘 리포트",
    ],
  },
  {
    icon: ListChecks,
    title: "발달 체크리스트",
    description: "월령별 항목으로 확인하는 우리 아이 발달",
    iconBgClass: "",
    iconColorClass: "",
    iconBgStyle: "#ecfdf5",
    iconColorStyle: "#10b981",
    features: [
      "대근육·소근육 발달 체크",
      "인지·언어 발달 추적",
      "영역별 점수로 한눈에",
      "월령별 맞춤 체크리스트",
    ],
  },
  {
    icon: Users,
    title: "다중 아기 관리",
    description: "형제자매도 한 계정에서 각각 관리하세요",
    iconBgClass: "",
    iconColorClass: "",
    iconBgStyle: "#faf5ff",
    iconColorStyle: "#a855f7",
    features: [
      "여러 아이 등록",
      "아이별 독립적인 기록",
      "프로필 간편 전환",
      "성장 후 기록 보관(졸업)",
    ],
  },
  {
    icon: MessageCircle,
    title: "맘마톡 AI 상담",
    description: "24시간, 우리 아이 기록을 바탕으로 답하는 AI",
    iconBgClass: "bg-secondary-50",
    iconColorClass: "text-secondary-500",
    features: [
      "실시간 AI 상담",
      "아이의 실제 기록을 조회해 답변",
      "수면·수유·이유식 등 카테고리별 대화",
      "대화 기록 보관",
    ],
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <motion.div
      variants={cardVariants}
      className="group bg-white rounded-2xl p-6 sm:p-8 border border-neutral-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Icon container */}
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${feature.iconBgClass}`}
        style={feature.iconBgStyle ? { backgroundColor: feature.iconBgStyle } : undefined}
      >
        <Icon
          size={28}
          className={feature.iconColorClass}
          style={feature.iconColorStyle ? { color: feature.iconColorStyle } : undefined}
        />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-neutral-900 mb-2">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-neutral-500 mb-4 text-sm">{feature.description}</p>

      {/* Feature list */}
      <ul className="space-y-2">
        {feature.features.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <Check size={16} className="text-primary-500 shrink-0" />
            <span className="text-sm text-neutral-600">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4 whitespace-pre-line">
            {"맘마와 함께하는\n스마트 육아"}
          </h2>
          <p className="text-neutral-500">
            기록부터 AI 상담까지, 육아의 모든 순간을 더 스마트하게
          </p>
        </div>

        {/* Cards grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
