"use client";

import { useState, useEffect } from "react";
import HomeTab from "./tabs/HomeTab";
import CommunityTab from "./tabs/CommunityTab";
import PlayMapTab from "./tabs/PlayMapTab";
import AIChatTab from "./tabs/AIChatTab";
import MyInfoTab from "./tabs/MyInfoTab";

const TAB_ICONS = [
  (a: boolean) => <svg width="18" height="18" viewBox="0 0 24 24" fill={a ? "var(--primary-500)" : "#9CA3AF"}><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>,
  (a: boolean) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={a ? "var(--primary-500)" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  (a: boolean) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={a ? "var(--primary-500)" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></svg>,
  (a: boolean) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={a ? "var(--primary-500)" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  (a: boolean) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={a ? "var(--primary-500)" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>,
];
const TAB_LABELS = ["홈", "커뮤니티", "놀이지도", "맘마톡", "나의정보"];

interface AppMockupProps {
  activeTab?: number;
  onTabChange?: (tab: number) => void;
}

export default function AppMockup({ activeTab: controlledTab, onTabChange }: AppMockupProps) {
  const [internalTab, setInternalTab] = useState(0);
  const activeTab = controlledTab ?? internalTab;
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <div aria-hidden="true"
      className="phone-frame w-[280px] h-[560px] lg:w-[300px] lg:h-[600px] flex flex-col select-none"
      style={{ background: "white" }}>

      {/* 상태바 */}
      <div className="h-11 flex items-center justify-between px-5 flex-shrink-0 bg-white">
        <span className="text-[12px] font-semibold text-neutral-800">
          {now.getHours()}:{String(now.getMinutes()).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-[5px]">
          {/* 셀룰러 신호 */}
          <svg width="16" height="12" viewBox="0 0 16 12" fill="#1C1C1E">
            <rect x="0" y="9" width="3" height="3" rx="0.5" opacity="0.3" />
            <rect x="4" y="6" width="3" height="6" rx="0.5" opacity="0.3" />
            <rect x="8" y="3" width="3" height="9" rx="0.5" />
            <rect x="12" y="0" width="3" height="12" rx="0.5" />
          </svg>
          {/* 와이파이 */}
          <svg width="14" height="10" viewBox="0 0 24 18" fill="none">
            <path d="M1.5 5.9A16.3 16.3 0 0 1 22.5 5.9" stroke="#1C1C1E" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M5.5 10A11 11 0 0 1 18.5 10" stroke="#1C1C1E" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M9.5 14A5.5 5.5 0 0 1 14.5 14" stroke="#1C1C1E" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="12" cy="17.5" r="1.3" fill="#1C1C1E" />
          </svg>
          {/* 배터리 */}
          <div className="flex items-center">
            <div className="w-[22px] h-[11px] rounded-[2.5px] border-[1.5px] border-[#1C1C1E]/30 flex items-center p-[1.5px] relative">
              <div className="h-full rounded-[1px] bg-[#1C1C1E]" style={{ width: "75%" }} />
            </div>
            <div className="w-[1.5px] h-[5px] rounded-r-full bg-[#1C1C1E]/30 ml-[0.5px]" />
          </div>
        </div>
      </div>

      {/* 콘텐츠 + 탭바 */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {activeTab === 0 ? (
          <HomeTab now={now} />
        ) : (
          <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" } as React.CSSProperties}>
            {activeTab === 1 && <CommunityTab />}
            {activeTab === 2 && <PlayMapTab />}
            {activeTab === 3 && <AIChatTab />}
            {activeTab === 4 && <MyInfoTab />}
          </div>
        )}

        {/* 하단 탭바 */}
        <div className="flex items-center justify-around px-1 pt-1.5 pb-2 border-t border-neutral-100 bg-white flex-shrink-0">
          {TAB_LABELS.map((label, i) => {
            const active = activeTab === i;
            return (
              <button key={label} onClick={() => {
                if (onTabChange) onTabChange(i);
                else setInternalTab(i);
              }}
                className="flex flex-col items-center gap-0.5 cursor-pointer">
                {TAB_ICONS[i](active)}
                <span className="text-[7px]" style={{ color: active ? "var(--primary-500)" : "#9CA3AF" }}>{label}</span>
                {active && <div className="w-1 h-1 rounded-full" style={{ background: "var(--primary-500)" }} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
