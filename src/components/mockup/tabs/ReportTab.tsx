"use client";

import type { GrowthRec } from "../types";
import { seed } from "../helpers";
import { GrowthChart } from "../GrowthChart";

const GROWTH_DATA: GrowthRec[] = [
  { id: "g1", time: seed(60 * 24 * 90), weight: 4.2 },
  { id: "g2", time: seed(60 * 24 * 60), weight: 5.6 },
  { id: "g3", time: seed(60 * 24 * 30), weight: 6.4 },
  { id: "g4", time: seed(60 * 24 * 3), weight: 7.1 },
];

const SUMMARY = [
  { label: "이번 주 수유", value: "42회" },
  { label: "이번 주 수면", value: "68시간" },
  { label: "이번 주 기저귀", value: "35회" },
];

const BREAKDOWN: { label: string; pct: number; color: string }[] = [
  { label: "수유", pct: 45, color: "#F43F5E" },
  { label: "수면", pct: 30, color: "#6366F1" },
  { label: "기저귀", pct: 20, color: "#3B82F6" },
  { label: "기타", pct: 5, color: "#F59E0B" },
];

export default function ReportTab() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-3.5 pt-3 pb-2">
        <div className="text-[12px] font-bold text-neutral-900">이번 주 리포트</div>
        <div className="text-[9px] text-neutral-400 mt-0.5">쿵쾅이 · 지난 7일 기준</div>
      </div>

      <div className="flex-1 overflow-y-auto px-3.5 pb-4" style={{ scrollbarWidth: "none" } as React.CSSProperties}>
        {/* 요약 카드 */}
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {SUMMARY.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl px-2 py-2.5 text-center"
              style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}
            >
              <div className="text-[10.5px] font-bold text-neutral-900">{s.value}</div>
              <div className="text-[7.5px] text-neutral-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* 성장 그래프 */}
        <div className="bg-white rounded-2xl p-3 mb-3" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] font-semibold text-neutral-600">체중 변화</span>
            <span className="text-[8px] text-neutral-400">최근 7.1kg</span>
          </div>
          <GrowthChart records={GROWTH_DATA} />
        </div>

        {/* 기록 비중 */}
        <div className="bg-white rounded-2xl p-3" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
          <div className="text-[9px] font-semibold text-neutral-600 mb-2">기록 종류 비중</div>
          <div className="flex h-2.5 rounded-full overflow-hidden mb-2">
            {BREAKDOWN.map((b) => (
              <div key={b.label} style={{ width: `${b.pct}%`, background: b.color }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {BREAKDOWN.map((b) => (
              <div key={b.label} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: b.color }} />
                <span className="text-[8px] text-neutral-500">{b.label} {b.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
