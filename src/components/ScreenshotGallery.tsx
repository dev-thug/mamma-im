"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const tabs = [
  { id: "home", label: "홈" },
  { id: "ai", label: "AI채팅" },
  { id: "map", label: "놀이지도" },
  { id: "community", label: "커뮤니티" },
  { id: "profile", label: "나의정보" },
] as const;

/* ── Individual screen UIs ── */

function HomeScreen() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-primary-50 to-white overflow-hidden">
      {/* Status bar placeholder */}
      <div className="h-8" />

      {/* Header */}
      <div className="px-4 pt-2 pb-3">
        <p className="text-[11px] text-neutral-400 font-medium">2024년 3월 15일 금요일</p>
        <h2 className="text-[15px] font-bold text-neutral-900 mt-0.5">좋은 아침이에요! ☀️</h2>
      </div>

      {/* Stats cards */}
      <div className="px-4 grid grid-cols-3 gap-2 mb-4">
        <div className="bg-primary-100 rounded-2xl p-2.5 flex flex-col gap-0.5">
          <span className="text-[9px] text-primary-500 font-semibold uppercase tracking-wide">수유</span>
          <span className="text-[13px] font-bold text-neutral-900">3회</span>
        </div>
        <div className="bg-secondary-50 rounded-2xl p-2.5 flex flex-col gap-0.5">
          <span className="text-[9px] text-secondary-500 font-semibold uppercase tracking-wide">수면</span>
          <span className="text-[13px] font-bold text-neutral-900">8h</span>
        </div>
        <div className="bg-amber-50 rounded-2xl p-2.5 flex flex-col gap-0.5">
          <span className="text-[9px] text-amber-500 font-semibold uppercase tracking-wide">기저귀</span>
          <span className="text-[13px] font-bold text-neutral-900">5회</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-4 flex-1">
        <p className="text-[11px] font-bold text-neutral-700 mb-2">오늘의 타임라인</p>
        <div className="flex flex-col gap-2.5">
          {[
            { dot: "bg-primary-400", time: "07:30", text: "모유 수유 15분" },
            { dot: "bg-secondary-400", time: "09:00", text: "낮잠 시작" },
            { dot: "bg-amber-400", time: "10:30", text: "기저귀 교체" },
            { dot: "bg-emerald-400", time: "11:00", text: "산책 30분" },
            { dot: "bg-purple-400", time: "12:30", text: "이유식 섭취" },
          ].map((item) => (
            <div key={item.time} className="flex items-center gap-2.5">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.dot}`} />
              <span className="text-[9px] text-neutral-400 w-8 flex-shrink-0">{item.time}</span>
              <span className="text-[10px] text-neutral-700">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AIChatScreen() {
  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <div className="h-8" />
      <div className="px-4 py-3 border-b border-neutral-100 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center">
          <span className="text-[12px]">🤖</span>
        </div>
        <div>
          <p className="text-[12px] font-bold text-neutral-900">AI 육아 코치</p>
          <p className="text-[9px] text-emerald-500 font-medium">온라인</p>
        </div>
      </div>

      {/* Chat bubbles */}
      <div className="flex-1 px-3 py-3 flex flex-col gap-2.5 overflow-hidden">
        {/* User message */}
        <div className="flex justify-end">
          <div className="bg-primary-100 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[80%]">
            <p className="text-[10px] text-neutral-800 leading-relaxed">아기가 밤에 자주 깨는데 어떻게 해야 하나요?</p>
          </div>
        </div>

        {/* AI response */}
        <div className="flex justify-start">
          <div className="bg-neutral-100 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%]">
            <p className="text-[10px] text-neutral-800 leading-relaxed">
              4-6개월 아기는 수면 패턴이 변화하는 시기예요. 일정한 취침 루틴을 만들어 주세요 🌙
            </p>
          </div>
        </div>

        {/* User */}
        <div className="flex justify-end">
          <div className="bg-primary-100 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%]">
            <p className="text-[10px] text-neutral-800 leading-relaxed">루틴은 어떻게 만들면 좋을까요?</p>
          </div>
        </div>

        {/* AI */}
        <div className="flex justify-start">
          <div className="bg-neutral-100 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%]">
            <p className="text-[10px] text-neutral-800 leading-relaxed">
              목욕 → 마사지 → 수유 → 자장가 순으로 매일 같은 시간에 해보세요 ✨
            </p>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="px-3 pb-4 pt-2 border-t border-neutral-100">
        <div className="bg-neutral-100 rounded-full px-3 py-2 flex items-center gap-2">
          <p className="text-[9px] text-neutral-400 flex-1">궁금한 것을 물어보세요...</p>
          <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <path d="M2 8L8 5L2 2V4.5L6 5L2 5.5V8Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapScreen() {
  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#f0fdf4" }}>
      <div className="h-8" />

      {/* Search bar */}
      <div className="px-3 pb-2">
        <div className="bg-white rounded-full px-3 py-2 flex items-center gap-2 shadow-sm">
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="#a3a3a3" strokeWidth="1.5" />
            <path d="M10 10L12.5 12.5" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p className="text-[9px] text-neutral-400">근처 놀이터, 문화센터 검색</p>
        </div>
      </div>

      {/* Map area */}
      <div className="flex-1 relative mx-3 rounded-2xl overflow-hidden bg-emerald-50 border border-emerald-100">
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#10b981" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Roads */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#d1fae5" strokeWidth="6" />
          <line x1="35%" y1="0" x2="35%" y2="100%" stroke="#d1fae5" strokeWidth="4" />
          <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#d1fae5" strokeWidth="3" />
        </svg>
        {/* Location pins */}
        <div className="absolute top-[28%] left-[30%] w-4 h-4 rounded-full bg-primary-500 border-2 border-white shadow-md" />
        <div className="absolute top-[50%] left-[62%] w-3.5 h-3.5 rounded-full bg-secondary-500 border-2 border-white shadow-md" />
        <div className="absolute top-[65%] left-[20%] w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white shadow-md" />
        <div className="absolute top-[38%] left-[72%] w-3 h-3 rounded-full bg-purple-500 border-2 border-white shadow-md" />
        {/* Current location */}
        <div className="absolute top-[48%] left-[42%] w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm">
          <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-60" />
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="px-3 pt-2 pb-3">
        <div className="flex gap-2 overflow-x-hidden">
          {[
            { icon: "🛝", name: "한강 놀이터", dist: "0.3km" },
            { icon: "🎨", name: "문화센터", dist: "0.8km" },
          ].map((place) => (
            <div key={place.name} className="bg-white rounded-2xl px-3 py-2 flex items-center gap-2 shadow-sm flex-shrink-0">
              <span className="text-[14px]">{place.icon}</span>
              <div>
                <p className="text-[9px] font-bold text-neutral-800">{place.name}</p>
                <p className="text-[8px] text-neutral-400">{place.dist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommunityScreen() {
  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      <div className="h-8" />

      {/* Header */}
      <div className="px-4 py-2 border-b border-neutral-100">
        <p className="text-[13px] font-bold text-neutral-900">커뮤니티</p>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-2 pb-1 flex gap-3 border-b border-neutral-100">
        <button className="text-[10px] font-bold text-primary-500 pb-1 border-b-2 border-primary-500">
          가족피드
        </button>
        <button className="text-[10px] font-medium text-neutral-400 pb-1">
          맘카페
        </button>
      </div>

      {/* Posts */}
      <div className="flex-1 overflow-hidden px-3 py-3 flex flex-col gap-3">
        {[
          {
            avatar: "bg-primary-100",
            emoji: "👩",
            name: "김민지 맘",
            time: "10분 전",
            text: "아기 첫 뒤집기 성공했어요! 정말 감동이에요 🥹",
            likes: 24,
            comments: 8,
          },
          {
            avatar: "bg-secondary-100",
            emoji: "👨",
            name: "이준호 아빠",
            time: "32분 전",
            text: "이유식 레시피 공유해요. 고구마 사과 퓨레 만들기!",
            likes: 41,
            comments: 15,
          },
          {
            avatar: "bg-amber-50",
            emoji: "👩",
            name: "박서연 맘",
            time: "1시간 전",
            text: "수면 교육 2주차... 드디어 통잠 성공했어요 ✨",
            likes: 67,
            comments: 23,
          },
        ].map((post) => (
          <div key={post.name} className="flex gap-2">
            <div className={`w-7 h-7 rounded-full ${post.avatar} flex items-center justify-center flex-shrink-0 text-[13px]`}>
              {post.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-bold text-neutral-900">{post.name}</span>
                <span className="text-[8px] text-neutral-400">{post.time}</span>
              </div>
              <p className="text-[9px] text-neutral-700 leading-relaxed mb-1.5">{post.text}</p>
              <div className="flex gap-3">
                <span className="text-[8px] text-neutral-400">❤️ {post.likes}</span>
                <span className="text-[8px] text-neutral-400">💬 {post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="flex flex-col h-full bg-neutral-50 overflow-hidden">
      <div className="h-8" />

      {/* Profile header */}
      <div className="flex flex-col items-center py-5 bg-white border-b border-neutral-100">
        <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-2xl mb-2">
          👩
        </div>
        <p className="text-[13px] font-bold text-neutral-900">김민지 맘</p>
        <p className="text-[9px] text-neutral-400 mt-0.5">아이 6개월 · 서울 마포구</p>
      </div>

      {/* Menu items */}
      <div className="flex-1 px-3 pt-3 flex flex-col gap-1.5">
        {[
          { icon: "👶", label: "아이 정보" },
          { icon: "📊", label: "발달 체크" },
          { icon: "💉", label: "예방접종" },
          { icon: "📈", label: "성장 차트" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-2xl px-3 py-3 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-[15px]">{item.icon}</span>
              <span className="text-[11px] font-medium text-neutral-800">{item.label}</span>
            </div>
            {/* Chevron right */}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M3.5 2L6.5 5L3.5 8" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

const SCREEN_COMPONENTS = [
  HomeScreen,
  AIChatScreen,
  MapScreen,
  CommunityScreen,
  ProfileScreen,
];

/* ── Phone Mockup Wrapper ── */

function PhoneMockup({ index, label }: { index: number; label: string }) {
  const ScreenComponent = SCREEN_COMPONENTS[index];

  return (
    <div className="snap-center flex-shrink-0 flex flex-col items-center gap-3">
      {/* Tab label badge */}
      <div className="bg-white border border-neutral-200 rounded-full px-3 py-1 shadow-sm">
        <span className="text-sm font-medium text-neutral-700">{label}</span>
      </div>

      {/* Phone frame */}
      <div aria-hidden="true" className="w-[260px] h-[520px] bg-white rounded-[36px] border-[6px] border-neutral-800 overflow-hidden shadow-xl relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-24 h-6 bg-neutral-800 rounded-b-2xl" />
        {/* Screen content */}
        <div className="absolute inset-0">
          <ScreenComponent />
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ── */

export default function ScreenshotGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const CARD_WIDTH = 260 + 32; // w-[260px] + gap-8 (32px)

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    // Each card is 260px wide + 32px gap, plus 16px initial px-4 padding
    container.scrollTo({
      left: index * CARD_WIDTH,
      behavior: "smooth",
    });
  }, [CARD_WIDTH]);

  const handlePrev = () => {
    const next = Math.max(0, activeIndex - 1);
    setActiveIndex(next);
    scrollToIndex(next);
  };

  const handleNext = () => {
    const next = Math.min(tabs.length - 1, activeIndex + 1);
    setActiveIndex(next);
    scrollToIndex(next);
  };

  // Track active index on scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const index = Math.round(scrollLeft / CARD_WIDTH);
      setActiveIndex(Math.min(Math.max(index, 0), tabs.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [CARD_WIDTH]);

  return (
    <section id="screenshots" className="bg-neutral-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
            앱 미리보기
          </h2>
          <p className="mt-3 text-neutral-500">
            직관적이고 아름다운 인터페이스로 육아를 더 쉽게
          </p>
        </motion.div>

        {/* Carousel wrapper */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={handlePrev}
            aria-label="이전 화면"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-10 h-10 bg-white rounded-full shadow-md items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors duration-200 disabled:opacity-40"
            disabled={activeIndex === 0}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right arrow */}
          <button
            onClick={handleNext}
            aria-label="다음 화면"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-10 h-10 bg-white rounded-full shadow-md items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors duration-200 disabled:opacity-40"
            disabled={activeIndex === tabs.length - 1}
          >
            <ChevronRight size={20} />
          </button>

          {/* Scrollable carousel */}
          <div
            ref={scrollRef}
            className="flex gap-8 px-4 pb-4 overflow-x-auto snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch" as never,
            }}
          >
            {tabs.map((tab, i) => (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              >
                <PhoneMockup index={i} label={tab.label} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              aria-label={`${tab.label} 화면으로 이동`}
              onClick={() => {
                setActiveIndex(i);
                scrollToIndex(i);
              }}
              className="h-2 rounded-full transition-all duration-300 ease-out"
              style={{
                width: activeIndex === i ? "32px" : "8px",
                backgroundColor: activeIndex === i
                  ? "var(--color-primary-500)"
                  : "var(--color-neutral-300)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
