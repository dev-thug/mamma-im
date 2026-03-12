"use client";

import { useState, useMemo } from "react";

const KO_DAYS = ["일", "월", "화", "수", "목", "금", "토"];
const KO_MONTHS = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];
type CalEntry = { grad: string; thumbs: string[]; postCount: number; photoCount: number; label: string };

const CALENDAR_GRADIENTS = [
  "linear-gradient(135deg,#6EE7B7,#5EEAD4)",
  "linear-gradient(135deg,#FDA4AF,#FB7185)",
  "linear-gradient(135deg,#FDE68A,#FDBA74)",
  "linear-gradient(135deg,#93C5FD,#60A5FA)",
  "linear-gradient(135deg,#C4B5FD,#8B5CF6)",
  "linear-gradient(135deg,#BEF264,#86EFAC)",
  "linear-gradient(135deg,#F9A8D4,#F0ABFC)",
  "linear-gradient(135deg,#A5F3FC,#67E8F9)",
];

const CALENDAR_LABELS = [
  "쿵쾅이 산책 기록",
  "이유식 잘 먹은 날",
  "목욕 후 스트레칭",
  "첫 뒤집기 성공",
  "소아과 정기검진",
  "할머니 댁 방문",
  "낮잠 푹 잔 날",
  "백일 기념 촬영",
  "외출 챌린지 성공",
  "하루 수유 패턴 안정",
];

function hashSeed(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function createRng(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function sampleDays(
  rng: () => number,
  daysInMonth: number,
  count: number,
  includeDay?: number
) {
  const picked = new Set<number>();
  if (includeDay && includeDay >= 1 && includeDay <= daysInMonth) picked.add(includeDay);
  while (picked.size < count) {
    picked.add(Math.floor(rng() * daysInMonth) + 1);
  }
  return [...picked].sort((a, b) => a - b);
}

function buildMonthCalendarData(year: number, month: number, sessionSeed: number, includeDay?: number) {
  const rng = createRng(hashSeed(`${sessionSeed}-${year}-${month}`));
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const count = Math.min(daysInMonth, 6 + Math.floor(rng() * 4));
  const days = sampleDays(rng, daysInMonth, count, includeDay);
  const data: Record<number, CalEntry> = {};

  days.forEach((d) => {
    const photoCount = 1 + Math.floor(rng() * 4);
    const postCount = 1 + Math.floor(rng() * 2);
    const thumbs = Array.from({ length: photoCount }, () => {
      const gi = Math.floor(rng() * CALENDAR_GRADIENTS.length);
      return CALENDAR_GRADIENTS[gi];
    });
    const label = `${CALENDAR_LABELS[Math.floor(rng() * CALENDAR_LABELS.length)]} (${month + 1}월 ${d}일)`;
    data[d] = {
      grad: thumbs[0] ?? CALENDAR_GRADIENTS[0],
      thumbs,
      postCount,
      photoCount,
      label,
    };
  });

  return data;
}

export default function CommunityTab() {
  const [feedTab, setFeedTab] = useState<"home" | "mammatalk">("home");
  const [homeView, setHomeView] = useState<"calendar" | "feed">("calendar");
  const [calYear,  setCalYear]  = useState(2026);
  const [calMonth, setCalMonth] = useState(2); // 0-indexed: 2 = March
  const [selDate,  setSelDate]  = useState<number | null>(12);
  const [sessionSeed] = useState(() => Math.floor(Math.random() * 1_000_000_000));
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) =>
    setLikedPosts(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  /* ── 캘린더 helpers ── */
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDow    = new Date(calYear, calMonth, 1).getDay(); // 0=Sun
  const today       = { y: 2026, m: 2, d: 12 };
  const isToday     = (d: number) => calYear === today.y && calMonth === today.m && d === today.d;
  const monthData = useMemo(
    () => buildMonthCalendarData(
      calYear,
      calMonth,
      sessionSeed,
      calYear === today.y && calMonth === today.m ? today.d : undefined
    ),
    [calYear, calMonth, sessionSeed]
  );
  const entry = selDate ? monthData[selDate] ?? null : null;

  /* ── 캘린더 grid cells ── */
  const totalCells = Math.ceil((firstDow + daysInMonth) / 7) * 7;
  const cells: (number | null)[] = Array.from({ length: totalCells }, (_, i) => {
    const d = i - firstDow + 1;
    return d >= 1 && d <= daysInMonth ? d : null;
  });

  type Post = { id: number; feed: "home" | "mammatalk" | "both"; user: string; avatar: string; badge?: string; time: string; hasImg: boolean; imgCount: number; imgGrad: string; imgLabel: string; text: string; likes: number; comments: number; featured?: boolean };

  const ALL_POSTS: Post[] = [
    {
      id: 1, feed: "home",
      user: "박정수", avatar: "#FB7185", badge: "쿵쾅이 아빠",
      time: "방금",
      hasImg: true, imgCount: 3,
      imgGrad: "linear-gradient(135deg,#f9a8d4,#fb7185)",
      imgLabel: "쿵쾅이 D+112 💕",
      text: "",
      likes: 34, comments: 12,
    },
    {
      id: 2, feed: "home",
      user: "박정수", avatar: "#FB7185", badge: "쿵쾅이 아빠",
      time: "2시간 전",
      hasImg: false, imgCount: 0, imgGrad: "", imgLabel: "",
      text: "맘마 앱 쓰고 나서 쿵쾅이 수유 패턴이 완전히 잡혔어요 🍼\n지금은 4시간 간격으로 규칙적으로 잘 먹는답니다. 이 앱 없었으면 진짜 몰랐을 것 같아요!",
      likes: 27, comments: 9, featured: true,
    },
    {
      id: 3, feed: "mammatalk",
      user: "박정수", avatar: "#FB7185", badge: "쿵쾅이 아빠",
      time: "1일 전",
      hasImg: true, imgCount: 2,
      imgGrad: "linear-gradient(135deg,#fdba74,#fb923c)",
      imgLabel: "쿵쾅이 성장 기록 📈",
      text: "",
      likes: 89, comments: 31, featured: true,
    },
    {
      id: 4, feed: "mammatalk",
      user: "박정수", avatar: "#FB7185", badge: "쿵쾅이 아빠",
      time: "3일 전",
      hasImg: false, imgCount: 0, imgGrad: "", imgLabel: "",
      text: "맘마 앱 덕분에 쿵쾅이가 또래보다 성장이 빠르다는 걸 알게 됐어요 😭💕\nAI가 \"이번 주 수유량이 평균보다 15% 높아요\"라고 알려줬는데 전문의 상담까지 연결해줘서 정말 도움됐습니다. 이런 앱이 있어서 다행이에요!",
      likes: 156, comments: 47, featured: true,
    },
    {
      id: 5, feed: "mammatalk",
      user: "민준맘", avatar: "#818CF8", time: "5분 전",
      hasImg: false, imgCount: 0, imgGrad: "", imgLabel: "",
      text: "수면 교육 중인데 너무 힘드네요 😭 다들 어떻게 하셨나요?",
      likes: 8, comments: 14,
    },
    {
      id: 6, feed: "both",
      user: "콩이아빠", avatar: "#34D399", time: "23분 전",
      hasImg: true, imgCount: 2,
      imgGrad: "linear-gradient(135deg,#86efac,#22c55e)",
      imgLabel: "오늘의 이유식 🥕",
      text: "",
      likes: 21, comments: 7,
    },
    {
      id: 7, feed: "mammatalk",
      user: "별이엄마", avatar: "#A78BFA", time: "1시간 전",
      hasImg: false, imgCount: 0, imgGrad: "", imgLabel: "",
      text: "맘마 커뮤니티에서 박정수님 글 보고 저도 맘마 시작했는데 진짜 신세계에요 ✨ 기저귀 교체 주기가 한눈에 보이니까 남편이랑 육아 분담도 훨씬 수월해졌어요!",
      likes: 44, comments: 18,
    },
  ];

  const filtered = ALL_POSTS.filter(p => p.feed === feedTab || p.feed === "both");

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2.5">
        <span className="text-[14px] font-bold text-neutral-900">육아톡</span>
        <div className="flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <div className="relative">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 border border-white" />
          </div>
        </div>
      </div>

      {/* 피드 탭 */}
      <div className="flex items-center gap-2 px-4 pb-2.5">
        <button onClick={() => setFeedTab("home")}
          className="px-3 py-1.5 rounded-full text-[10px] font-bold transition-all"
          style={{ background: feedTab === "home" ? "#1F2937" : "transparent", color: feedTab === "home" ? "white" : "#6B7280", border: feedTab === "home" ? "none" : "1px solid #E5E7EB" }}>
          우리집 피드
        </button>
        <div className="relative">
          <button onClick={() => setFeedTab("mammatalk")}
            className="px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all"
            style={{ background: feedTab === "mammatalk" ? "#1F2937" : "transparent", color: feedTab === "mammatalk" ? "white" : "#6B7280", border: feedTab === "mammatalk" ? "none" : "1px solid #E5E7EB" }}>
            맘마 피드
          </button>
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" } as React.CSSProperties}>

        {/* ── 우리집 피드: 캘린더 or 피드 뷰 ── */}
        {feedTab === "home" && homeView === "calendar" ? (
          <div className="px-4 pb-4">
            {/* 캘린더 헤더 */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-bold text-neutral-900">추억 캘린더</span>
              <button onClick={() => setHomeView("feed")}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-neutral-200 bg-white">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                  <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
                <span className="text-[8px] font-semibold text-neutral-600">피드</span>
              </button>
            </div>

            {/* 월 네비게이션 */}
            <div className="flex items-center justify-center gap-1 mb-3">
              <button onClick={() => { setCalYear(y => y-1); setSelDate(null); }}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors text-neutral-500">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></svg>
              </button>
              <button onClick={() => { const nm = calMonth-1; if(nm<0){setCalMonth(11);setCalYear(y=>y-1);}else{setCalMonth(nm);} setSelDate(null); }}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors text-neutral-500">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <span className="text-[12px] font-bold text-neutral-900 w-20 text-center">
                {calYear}년 {KO_MONTHS[calMonth]}
              </span>
              <button onClick={() => { const nm = calMonth+1; if(nm>11){setCalMonth(0);setCalYear(y=>y+1);}else{setCalMonth(nm);} setSelDate(null); }}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors text-neutral-500">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
              <button onClick={() => { setCalYear(y => y+1); setSelDate(null); }}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors text-neutral-500">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>
              </button>
            </div>

            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 mb-1">
              {KO_DAYS.map((d, i) => (
                <div key={d} className="text-center text-[9px] font-bold py-0.5"
                  style={{ color: i === 0 ? "#EF4444" : i === 6 ? "#6B7280" : "#374151" }}>
                  {d}
                </div>
              ))}
            </div>

            {/* 날짜 그리드 */}
            <div className="grid grid-cols-7 gap-x-1 gap-y-2">
              {cells.map((d, i) => {
                if (d === null) return <div key={i} />;
                const e = monthData[d];
                const dow = (firstDow + d - 1) % 7;
                const sel = selDate === d;
                const tod = isToday(d);
                return (
                  <div key={i} onClick={() => setSelDate(sel ? null : d)}
                    className="flex flex-col items-center cursor-pointer select-none">
                    {e ? (
                      /* 사진 있는 날 - 스크린샷처럼 큰 그라디언트 셀 */
                      <div className="relative w-full rounded-xl overflow-hidden flex-shrink-0"
                        style={{
                          aspectRatio: "1/1",
                          background: e.grad,
                          border: tod ? "2.5px solid #FB7185" : sel ? "2.5px solid #6366F1" : "2.5px solid transparent",
                          boxShadow: (tod || sel) ? "0 0 0 1px rgba(255,255,255,0.8)" : undefined,
                        }}>
                        {/* 카메라 아이콘 */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                            <circle cx="12" cy="13" r="4"/>
                          </svg>
                        </div>
                        {/* 날짜 숫자 */}
                        <div className="absolute bottom-0.5 right-1">
                          <span className="text-[7px] font-bold text-white/90"
                            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}>{d}</span>
                        </div>
                      </div>
                    ) : (
                      /* 사진 없는 날 */
                      <div className="w-full flex items-center justify-center rounded-xl py-1.5"
                        style={{ background: sel ? "#EEF2FF" : tod ? "#FFF1F2" : "transparent" }}>
                        <span className="text-[9.5px] font-medium"
                          style={{ color: tod ? "#FB7185" : dow === 0 ? "#EF4444" : dow === 6 ? "#9CA3AF" : "#374151", fontWeight: tod ? "700" : "400" }}>
                          {d}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 선택된 날짜 상세 */}
            {selDate && (
              <div className="mt-4 pt-3 border-t border-neutral-100">
                <div className="flex items-center gap-1 mb-0.5">
                  <div className="w-0.5 h-4 rounded-full flex-shrink-0" style={{ background: "var(--primary-500)" }} />
                  <span className="text-[12px] font-bold text-neutral-900">
                    {KO_MONTHS[calMonth].replace("월","월 ")}{selDate}일 {KO_DAYS[(firstDow + selDate - 1) % 7]}요일
                  </span>
                </div>
                {entry ? (
                  <>
                    <p className="text-[8.5px] text-neutral-500 mb-2 ml-1.5">
                      게시물 {entry.postCount}개 · 사진 {entry.photoCount}장
                    </p>
                    <div className="flex gap-2 mb-3">
                      {entry.thumbs.map((t, ci) => (
                        <div key={ci} className="rounded-xl overflow-hidden flex-shrink-0 relative"
                          style={{ width: 68, height: 68, background: t }}>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                              <circle cx="12" cy="13" r="4"/>
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-neutral-50 rounded-xl p-2.5">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                          style={{ background: "#FB7185" }}>박</div>
                        <span className="text-[9px] font-semibold text-neutral-800">박정수</span>
                        <span className="text-[7.5px] text-neutral-400">쿵쾅이 아빠</span>
                      </div>
                      <p className="text-[8.5px] text-neutral-700 leading-relaxed">{entry.label}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-[9px] text-neutral-400 ml-1.5">이 날은 기록이 없어요.</p>
                )}
              </div>
            )}
          </div>
        ) : feedTab === "home" && homeView === "feed" ? (
          /* ── 우리집 피드 뷰 ── */
          <div>
            <div className="flex items-center justify-between px-3.5 mb-2">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold text-neutral-900">우리집 이야기</span>
                <span className="text-[11px]">🏠</span>
                <span className="text-[8px] text-neutral-400 ml-1">{ALL_POSTS.filter(p=>p.feed==="home").length}개</span>
              </div>
              <button onClick={() => setHomeView("calendar")}
                className="flex items-center gap-1 bg-neutral-50 rounded-lg px-2 py-1 border border-neutral-100">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span className="text-[8px] font-medium text-neutral-500">캘린더</span>
              </button>
            </div>
            {ALL_POSTS.filter(p => p.feed === "home").map((p) => (
              <div key={p.id} className="mb-2.5">
                <div className="flex items-center justify-between px-3.5 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ background: p.avatar }}>{p.user[0]}</div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-semibold text-neutral-800">{p.user}</span>
                      {p.badge && <span className="text-[7px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "#FFF1F2", color: "var(--primary-500)" }}>{p.badge}</span>}
                    </div>
                  </div>
                  <span className="text-[8px] text-neutral-400">{p.time}</span>
                </div>
                {p.hasImg ? (
                  <div className="relative" style={{ height: 118, background: p.imgGrad }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[9px] text-white/90 font-semibold">{p.imgLabel}</span>
                    </div>
                    {p.imgCount > 1 && <div className="absolute top-2 right-2 bg-black/60 rounded-full px-1.5 py-0.5"><span className="text-[8px] text-white font-semibold">1/{p.imgCount}</span></div>}
                  </div>
                ) : (
                  <div className="px-3.5 py-1"><p className="text-[9px] text-neutral-700 leading-relaxed whitespace-pre-line">{p.text}</p></div>
                )}
                <div className="flex items-center gap-3 px-3.5 py-2 border-b border-neutral-50">
                  <button onClick={() => toggleLike(p.id)} className="flex items-center gap-1 text-[8px] transition-all"
                    style={{ color: likedPosts.has(p.id) ? "var(--primary-500)" : "#9CA3AF" }}>
                    {likedPosts.has(p.id) ? "❤️" : "🤍"} {p.likes + (likedPosts.has(p.id) ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1 text-[8px] text-neutral-400">💬 {p.comments}</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ── 맘마 피드 ── */
          <div>
            {/* 게시글 입력 */}
            <div className="mx-3.5 mb-3 bg-white rounded-xl px-3 py-2.5 flex items-center gap-2"
              style={{ border: "1px solid #F3F4F6", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <div className="w-6 h-6 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </div>
              <span className="text-[9px] text-neutral-400">오늘 여러분에게 무슨 일이 있었나요?</span>
            </div>
            <div className="flex items-center px-3.5 mb-2">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold text-neutral-900">최신 이야기</span>
                <span className="text-[11px]">🔥</span>
                <span className="text-[8px] text-neutral-400 ml-1">{filtered.length}개</span>
              </div>
            </div>
        {filtered.map((p) => (
          <div key={p.id} className="mb-2.5">
            {/* featured 마케팅 배지 */}
            {p.featured && feedTab === "mammatalk" && (
              <div className="mx-3.5 mb-1.5 flex items-center gap-1">
                <span className="text-[7.5px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: "var(--primary-50)", color: "var(--primary-600)" }}>
                  ✦ 맘마 유저 후기
                </span>
              </div>
            )}
            <div className="flex items-center justify-between px-3.5 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                  style={{ background: p.avatar }}>{p.user[0]}</div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-semibold text-neutral-800">{p.user}</span>
                    {p.badge && (
                      <span className="text-[7px] font-semibold px-1.5 py-0.5 rounded-full"
                        style={{ background: "#FFF1F2", color: "var(--primary-500)" }}>{p.badge}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] text-neutral-400">{p.time}</span>
                <div className="flex gap-0.5 items-center">
                  {[0,1,2].map(d => <div key={d} className="w-[3px] h-[3px] rounded-full bg-neutral-300" />)}
                </div>
              </div>
            </div>

            {p.hasImg ? (
              <div className="relative" style={{ height: 128, background: p.imgGrad }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[9px] text-white/90 font-semibold">{p.imgLabel}</span>
                </div>
                {p.imgCount > 1 && (
                  <div className="absolute top-2 right-2 bg-black/60 rounded-full px-1.5 py-0.5">
                    <span className="text-[8px] text-white font-semibold">1/{p.imgCount}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="px-3.5 py-1">
                <p className="text-[9px] text-neutral-700 leading-relaxed whitespace-pre-line">{p.text}</p>
              </div>
            )}

            <div className="flex items-center gap-3 px-3.5 py-2 border-b border-neutral-50">
              <button onClick={() => toggleLike(p.id)}
                className="flex items-center gap-1 text-[8px] transition-all"
                style={{ color: likedPosts.has(p.id) ? "var(--primary-500)" : "#9CA3AF" }}>
                {likedPosts.has(p.id) ? "❤️" : "🤍"} {p.likes + (likedPosts.has(p.id) ? 1 : 0)}
              </button>
              <button className="flex items-center gap-1 text-[8px] text-neutral-400">💬 {p.comments}</button>
            </div>
          </div>
        ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <div className="absolute bottom-12 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg cursor-pointer z-10"
        style={{ background: "var(--primary-500)" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
          <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}
