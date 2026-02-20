"use client";

import { useRef } from "react";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import {
  ClipboardList,
  MessageCircle,
  MapPin,
  Users,
  TrendingUp,
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
    title: "스마트 육아 기록",
    description: "수유, 수면, 기저귀 등 7종 기록을 한눈에",
    iconBgClass: "bg-primary-50",
    iconColorClass: "text-primary-500",
    features: [
      "수유·이유식 기록",
      "수면 패턴 분석",
      "기저귀·목욕 기록",
      "오늘의 요약 대시보드",
    ],
  },
  {
    icon: MessageCircle,
    title: "AI 육아 코치",
    description: "24시간 AI가 맞춤형 육아 상담을 제공합니다",
    iconBgClass: "bg-secondary-50",
    iconColorClass: "text-secondary-500",
    features: [
      "실시간 AI 상담",
      "아이 데이터 맞춤 답변",
      "사진으로 질문하기",
      "육아 팁 추천",
    ],
  },
  {
    icon: MapPin,
    title: "놀이지도",
    description: "우리 동네 아이와 갈 곳을 한눈에 찾아보세요",
    iconBgClass: "",
    iconColorClass: "",
    iconBgStyle: "#ecfdf5",
    iconColorStyle: "#10b981",
    features: [
      "키즈카페·놀이터 검색",
      "연령별 추천 장소",
      "실시간 리뷰",
      "즐겨찾기 저장",
    ],
  },
  {
    icon: Users,
    title: "육아 커뮤니티",
    description: "같은 또래 부모님들과 육아 이야기를 나눠요",
    iconBgClass: "",
    iconColorClass: "",
    iconBgStyle: "#faf5ff",
    iconColorStyle: "#a855f7",
    features: ["가족 피드 공유", "또래 맘카페", "육아 꿀팁 교환"],
  },
  {
    icon: TrendingUp,
    title: "성장 관리 허브",
    description: "발달 체크부터 예방접종까지 한 곳에서 관리",
    iconBgClass: "",
    iconColorClass: "",
    iconBgStyle: "#fffbeb",
    iconColorStyle: "#f59e0b",
    features: ["K-DST 발달 체크", "예방접종 스케줄", "키·몸무게 성장 차트"],
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

  const firstRow = features.slice(0, 3);
  const secondRow = features.slice(3);

  return (
    <section id="features" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4 whitespace-pre-line">
            {"맘마와 함께하는\n스마트 육아"}
          </h2>
          <p className="text-neutral-500">
            육아의 모든 순간을 더 쉽고, 더 스마트하게
          </p>
        </div>

        {/* Cards grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Row 1: 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {firstRow.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>

          {/* Row 2: 2 cards centered */}
          <div className="flex flex-col md:flex-row justify-center gap-6">
            {secondRow.map((feature) => (
              <div
                key={feature.title}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <FeatureCard feature={feature} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
