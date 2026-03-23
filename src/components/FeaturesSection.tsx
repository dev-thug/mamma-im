"use client";

import { useRef } from "react";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import {
  ClipboardList,
  Sparkles,
  MapPin,
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
    title: "터치 한 번, 빠른 기록",
    description: "수유, 수면, 기저귀? 한눈에 쏙! 잊지 말고 꼼꼼하게",
    iconBgClass: "bg-primary-50",
    iconColorClass: "text-primary-500",
    features: [
      "수유·수면·기저귀 빠른 기록",
      "체온·투약·활동 기록",
      "오늘의 요약 대시보드",
      "동기화팀 실시간 공유",
    ],
  },
  {
    icon: Sparkles,
    title: "AI 스마트 분석",
    description: "모든 데이터를 기반으로 맞춤 육아 가이드 제공",
    iconBgClass: "",
    iconColorClass: "",
    iconBgStyle: "#eef2ff",
    iconColorStyle: "#6366f1",
    features: [
      "수유 패턴 분석",
      "수면 습관 분석",
      "발달 과정 체크",
      "활동량·위생 데이터 분석",
    ],
  },
  {
    icon: TrendingUp,
    title: "AI 성장 관리",
    description: "발달 체크부터 AI 맞춤 분석까지, 완벽한 성장 관리",
    iconBgClass: "",
    iconColorClass: "",
    iconBgStyle: "#fffbeb",
    iconColorStyle: "#f59e0b",
    features: [
      "AI 종합 분석 점수",
      "대근육·소근육 발달 체크",
      "인지·언어 발달 추적",
      "월령별 맞춤 체크리스트",
    ],
  },
  {
    icon: MapPin,
    title: "놀이지도",
    description: "우리 동네 키즈카페, 놀이터를 한눈에 찾아보세요",
    iconBgClass: "",
    iconColorClass: "",
    iconBgStyle: "#ecfdf5",
    iconColorStyle: "#10b981",
    features: [
      "키즈카페·놀이터 검색",
      "박물관·문화센터 찾기",
      "거리순 정렬·지도 보기",
      "즐겨찾기 저장",
    ],
  },
  {
    icon: Users,
    title: "육아 커뮤니티",
    description: "육아 동지들과 나누는 따뜻한 소통",
    iconBgClass: "",
    iconColorClass: "",
    iconBgStyle: "#faf5ff",
    iconColorStyle: "#a855f7",
    features: [
      "동네 육아 커뮤니티",
      "가족 피드 공유",
      "육아 꿀팁 교환",
    ],
  },
  {
    icon: MessageCircle,
    title: "맘마톡 AI 코치",
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
            기록부터 AI 분석까지, 육아의 모든 순간을 더 스마트하게
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
