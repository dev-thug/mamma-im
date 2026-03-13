"use client";

import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import AppMockup from "./mockup/AppMockup";

const AUTO_CYCLE_TABS = [0, 1, 2, 3];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const staggerChildren: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function HeroSection() {
  const [userInteracted, setUserInteracted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleInteraction = () => setUserInteracted(true);
  const handleTabChange = (tab: number) => {
    setUserInteracted(true);
    setActiveTab(tab);
  };

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (userInteracted || prefersReducedMotion) return;
    let idx = 0;
    const intervalId = setInterval(() => {
      idx = (idx + 1) % AUTO_CYCLE_TABS.length;
      setActiveTab(AUTO_CYCLE_TABS[idx]);
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, [userInteracted, prefersReducedMotion]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white">
      <div aria-hidden="true" className="absolute top-[-80px] left-[-80px] w-[360px] h-[360px] rounded-full opacity-30" style={{ background: "var(--primary-100)" }} />
      <div aria-hidden="true" className="absolute top-[20%] right-[-60px] w-[260px] h-[260px] rounded-full opacity-20" style={{ background: "var(--primary-200)" }} />
      <div aria-hidden="true" className="absolute bottom-[15%] left-[10%] w-[180px] h-[180px] rounded-full opacity-20" style={{ background: "var(--secondary-100)" }} />
      <div aria-hidden="true" className="absolute top-[55%] left-[40%] w-[120px] h-[120px] rounded-full opacity-15" style={{ background: "var(--primary-100)" }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left"
            variants={staggerChildren} initial="hidden" animate="visible">
            <motion.div variants={fadeInUp}>
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
                style={{ background: "var(--primary-50)", color: "var(--primary-500)", border: "1px solid var(--primary-100)" }}>
                No.1 스마트 육아 앱
              </span>
            </motion.div>
            <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight whitespace-pre-line mb-5"
              variants={fadeInUp}>
              {"우리 가족의\n육아 파트너, "}
              <span className="gradient-text">맘마</span>
            </motion.h1>
            <motion.p className="text-lg text-neutral-600 whitespace-pre-line mb-10 max-w-lg" variants={fadeInUp}>
              {"태어나는 순간부터 초등학교 졸업까지,\n아이의 모든 성장을 함께합니다"}
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-3 mb-10 w-full sm:w-auto" variants={fadeInUp}>
              <button className="flex items-center justify-center gap-3 px-6 py-3 rounded-2xl text-white font-semibold text-sm transition-opacity hover:opacity-85 active:opacity-70"
                style={{ background: "#000" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on the</div>
                  <div>App Store에서 다운로드</div>
                </div>
              </button>
              <button className="flex items-center justify-center gap-3 px-6 py-3 rounded-2xl text-white font-semibold text-sm transition-opacity hover:opacity-85 active:opacity-70"
                style={{ background: "#000" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3.18 23.76C3.06 23.83 2.94 23.87 2.82 23.87C2.59 23.87 2.36 23.78 2.18 23.6L2.11 23.53L13.06 12L2.11 0.47L2.18 0.4C2.52 0.06 3.06 0 3.46 0.22L3.53 0.26L20.47 9.63L20.41 9.69L3.18 23.76ZM3.53 1.48L3.35 1.38V22.62L3.53 22.52L19.23 13.56L13.8 12L3.53 1.48Z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">GET IT ON</div>
                  <div>Google Play에서 다운로드</div>
                </div>
              </button>
            </motion.div>
            <motion.div className="flex items-center gap-0 divide-x divide-neutral-200" variants={fadeInUp}>
              {[{ value: "10만+", label: "가족" }, { value: "4.8★", label: "평점" }, { value: "24시간", label: "AI 코치" }].map(stat => (
                <div key={stat.label} className="px-5 first:pl-0 last:pr-0 text-center lg:text-left">
                  <div className="text-xl font-bold text-neutral-900">{stat.value}</div>
                  <div className="text-xs text-neutral-600 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-shrink-0"
            style={{ position: "relative" }}
            onPointerDown={handleInteraction}
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            {/* 글로우 펄스 wrapper */}
            <div
              style={{
                borderRadius: 30,
                padding: 2,
                animation: userInteracted
                  ? "none"
                  : "glowPulse 2.5s ease-in-out infinite",
                transition: "box-shadow 0.3s",
              }}
            >
              <AppMockup activeTab={activeTab} onTabChange={handleTabChange} />
            </div>

            {/* CTA 배지 */}
            <div
              style={{
                position: "absolute",
                bottom: -32,
                left: "50%",
                transform: "translateX(-50%)",
                background: "var(--primary-500)",
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                padding: "8px 20px",
                borderRadius: 20,
                whiteSpace: "nowrap",
                boxShadow: "0 4px 16px rgba(244, 63, 94, 0.3)",
                zIndex: 30,
                animation: userInteracted
                  ? "none"
                  : "badgeBounce 2s ease-in-out infinite",
                opacity: userInteracted ? 0 : 1,
                transition: "opacity 0.3s",
                pointerEvents: "none",
              }}
            >
            직접 체험해보세요
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
          className="w-full h-[60px] lg:h-[80px]">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
