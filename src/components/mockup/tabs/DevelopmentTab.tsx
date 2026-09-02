"use client";

import { useState } from "react";

type ChecklistItem = { label: string; done: boolean };

const STAGES = ["3개월", "4개월", "5개월", "6개월", "8개월", "12개월"];

const DOMAINS: { label: string; pct: number; color: string }[] = [
  { label: "대근육", pct: 80, color: "#F43F5E" },
  { label: "소근육", pct: 60, color: "#F59E0B" },
  { label: "인지", pct: 70, color: "#6366F1" },
  { label: "언어", pct: 50, color: "#10B981" },
  { label: "사회성", pct: 90, color: "#A855F7" },
];

const CHECKLIST: Record<string, ChecklistItem[]> = {
  "5개월": [
    { label: "엎드린 자세에서 목을 잘 가눈다", done: true },
    { label: "손을 눈앞으로 가져와 바라본다", done: true },
    { label: "소리 나는 쪽으로 고개를 돌린다", done: true },
    { label: "뒤집기를 시도한다", done: false },
    { label: "옹알이로 여러 음절을 낸다", done: false },
  ],
};

export default function DevelopmentTab() {
  const [activeStage, setActiveStage] = useState("5개월");
  const items = CHECKLIST[activeStage] ?? CHECKLIST["5개월"];
  const doneCount = items.filter((i) => i.done).length;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 헤더 */}
      <div className="px-3.5 pt-3 pb-2">
        <div className="text-[12px] font-bold text-neutral-900">발달 체크리스트</div>
        <div className="text-[9px] text-neutral-400 mt-0.5">쿵쾅이 · 5개월 12일</div>
      </div>

      {/* 영역별 점수 */}
      <div className="px-3.5 pb-3">
        <div className="bg-white rounded-2xl p-3" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
          <div className="text-[9px] font-semibold text-neutral-600 mb-2">영역별 발달 점수</div>
          <div className="space-y-1.5">
            {DOMAINS.map((d) => (
              <div key={d.label} className="flex items-center gap-2">
                <span className="text-[8.5px] text-neutral-500 w-9 shrink-0">{d.label}</span>
                <div className="flex-1 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${d.pct}%`, background: d.color }}
                  />
                </div>
                <span className="text-[8px] text-neutral-400 w-6 text-right">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 월령 선택 */}
      <div className="px-3.5 pb-2 flex gap-1.5 overflow-x-auto" style={{ scrollbarWidth: "none" } as React.CSSProperties}>
        {STAGES.map((s) => {
          const active = s === activeStage;
          return (
            <button
              key={s}
              onClick={() => setActiveStage(s)}
              className="px-2.5 py-1 rounded-full text-[8.5px] font-medium whitespace-nowrap shrink-0 transition-colors"
              style={{
                background: active ? "var(--primary-500)" : "#F3F4F6",
                color: active ? "#fff" : "#6B7280",
              }}
            >
              {s}
            </button>
          );
        })}
      </div>

      {/* 체크리스트 */}
      <div className="flex-1 overflow-y-auto px-3.5 pb-4" style={{ scrollbarWidth: "none" } as React.CSSProperties}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-semibold text-neutral-600">{activeStage} 체크 항목</span>
          <span className="text-[8px] text-neutral-400">{doneCount}/{items.length} 완료</span>
        </div>
        <div className="space-y-2">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 bg-white rounded-xl px-3 py-2.5"
              style={{ border: "1px solid #F3F4F6" }}
            >
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: item.done ? "var(--primary-500)" : "#F3F4F6",
                  border: item.done ? "none" : "1.5px solid #E5E7EB",
                }}
              >
                {item.done && (
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span
                className="text-[9.5px] leading-tight"
                style={{ color: item.done ? "#374151" : "#9CA3AF" }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
