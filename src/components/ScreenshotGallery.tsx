"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const screens = [
  { id: "home", label: "홈", image: "/preview/home.png", alt: "맘마 앱 홈 화면 - 수유, 수면, 기저귀 기록 대시보드" },
  { id: "talk", label: "맘마톡", image: "/preview/mamma-talk.png", alt: "맘마 앱 맘마톡 화면 - 아이 기록을 바탕으로 답하는 AI 상담" },
  { id: "profile", label: "나의정보", image: "/preview/my-info.png", alt: "맘마 앱 나의정보 화면 - 아이 성장 기록 및 프로필 관리" },
] as const;

const CARD_W = 260;
const GAP = 32; // gap-8
const STEP = CARD_W + GAP;

export default function ScreenshotGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = useCallback((index: number) => {
    scrollRef.current?.scrollTo({ left: index * STEP, behavior: "smooth" });
  }, []);

  const go = (dir: -1 | 1) => {
    const next = Math.min(Math.max(activeIndex + dir, 0), screens.length - 1);
    setActiveIndex(next);
    scrollToIndex(next);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / STEP);
      setActiveIndex(Math.min(Math.max(idx, 0), screens.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="screenshots" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
            앱 미리보기
          </h2>
          <p className="mt-3 text-neutral-500">
            수유, 수면, 기저귀부터 맘마톡 AI 상담까지 한눈에
          </p>
        </motion.div>

        {/* Tab pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="flex justify-center flex-wrap gap-2 mb-12"
        >
          {screens.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveIndex(i);
                scrollToIndex(i);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeIndex === i
                  ? "bg-primary-500 text-white"
                  : "bg-white text-neutral-500 hover:text-neutral-700"
              }`}
              style={{
                boxShadow:
                  activeIndex === i
                    ? "0 4px 14px -2px rgba(244, 63, 94, 0.4)"
                    : "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              {s.label}
            </button>
          ))}
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Arrows */}
          <button
            onClick={() => go(-1)}
            aria-label="이전 화면"
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full shadow-lg items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-white transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
            disabled={activeIndex === 0}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="다음 화면"
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full shadow-lg items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-white transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
            disabled={activeIndex === screens.length - 1}
          >
            <ChevronRight size={20} />
          </button>

          {/* Scroll container */}
          <div
            ref={scrollRef}
            className="flex gap-8 px-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar"
          >
            {screens.map((screen, i) => (
              <motion.div
                key={screen.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: "easeOut",
                }}
                className="snap-start flex-shrink-0"
              >
                <div
                  className="w-[260px] rounded-[2.5rem] overflow-hidden bg-white transition-all duration-500 ease-out"
                  style={{
                    boxShadow:
                      activeIndex === i
                        ? "0 25px 60px -12px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.03)"
                        : "0 8px 24px -8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.02)",
                  }}
                >
                  <Image
                    src={screen.image}
                    alt={screen.alt}
                    width={390}
                    height={844}
                    sizes="260px"
                    className="w-full h-auto block"
                    priority={i === 0}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
