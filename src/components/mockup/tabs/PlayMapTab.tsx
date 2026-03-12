"use client";

import { useState } from "react";

export default function PlayMapTab() {
  const [activeFilter, setActiveFilter] = useState("전체");
  const filters = [
    { label: "전체",   icon: "⊞" },
    { label: "키즈카페", icon: "☕" },
    { label: "놀이터",  icon: "🎡" },
    { label: "박물관",  icon: "🏛" },
  ];

  type Place = { name: string; dist: string; category: string; bg: string };
  const ALL_PLACES: Place[] = [
    { name: "메디아이여성병원",          dist: "519m",  category: "병원",    bg: "#DBEAFE" },
    { name: "점핑몬스터 상계백병원점",    dist: "656m",  category: "놀이터",  bg: "#FEF3C7" },
    { name: "초안산 어린이공원",          dist: "820m",  category: "놀이터",  bg: "#D1FAE5" },
    { name: "뽀로로파크 노원점",          dist: "1.0km", category: "키즈카페", bg: "#FCE7F3" },
    { name: "키즈카페 몽글몽글",          dist: "1.2km", category: "키즈카페", bg: "#FDE68A" },
    { name: "노원어린이박물관",           dist: "1.1km", category: "박물관",  bg: "#EDE9FE" },
    { name: "서울과학기술대 어린이박물관", dist: "1.3km", category: "박물관",  bg: "#CFFAFE" },
    { name: "상계 키즈 플레이파크",       dist: "1.5km", category: "키즈카페", bg: "#FEE2E2" },
    { name: "월계 어린이놀이터",          dist: "0.9km", category: "놀이터",  bg: "#D1FAE5" },
  ];

  const CLUSTER_MAP: Record<string, Array<{x:string;y:string;n:number}>> = {
    "전체":    [{ x:"13%",y:"32%",n:8},{ x:"36%",y:"58%",n:3},{ x:"53%",y:"26%",n:10},{ x:"64%",y:"64%",n:6},{ x:"81%",y:"44%",n:5},{ x:"8%",y:"70%",n:2}],
    "키즈카페":[{ x:"36%",y:"40%",n:3},{ x:"70%",y:"60%",n:2},{ x:"20%",y:"55%",n:1}],
    "놀이터":  [{ x:"53%",y:"35%",n:5},{ x:"18%",y:"65%",n:2},{ x:"75%",y:"45%",n:3}],
    "박물관":  [{ x:"60%",y:"50%",n:2},{ x:"30%",y:"30%",n:1}],
  };

  const places = activeFilter === "전체"
    ? ALL_PLACES
    : ALL_PLACES.filter(p => p.category === activeFilter);
  const clusters = CLUSTER_MAP[activeFilter] ?? CLUSTER_MAP["전체"];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 검색창 */}
      <div className="px-3 pt-3 pb-2">
        <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2"
          style={{ border: "1.5px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--primary-500)" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <span className="text-[9px] text-neutral-400">장소 검색</span>
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex items-center gap-1.5 px-3 pb-2 overflow-x-auto" style={{ scrollbarWidth: "none" } as React.CSSProperties}>
        {filters.map(f => (
          <button key={f.label} onClick={() => setActiveFilter(f.label)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[9px] font-semibold flex-shrink-0 transition-all"
            style={{
              background: activeFilter === f.label ? "#1F2937" : "white",
              color: activeFilter === f.label ? "white" : "#6B7280",
              border: activeFilter === f.label ? "none" : "1px solid #E5E7EB",
            }}>
            {f.icon} {f.label}
          </button>
        ))}
      </div>

      {/* 지도 */}
      <div className="relative flex-shrink-0 overflow-hidden" style={{ height: 178 }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 260 178" preserveAspectRatio="xMidYMid slice">
          <rect width="260" height="178" fill="#E8F0DC"/>
          {/* 큰 도로 */}
          <path d="M0 82 Q65 76 130 90 Q195 102 260 97" stroke="white" strokeWidth="9" fill="none"/>
          <path d="M0 82 Q65 76 130 90 Q195 102 260 97" stroke="#F0F0F0" strokeWidth="5" fill="none"/>
          {/* 세로 도로 */}
          <path d="M132 0 L130 90 L138 178" stroke="#4FC3F7" strokeWidth="8" fill="none"/>
          <path d="M132 0 L130 90 L138 178" stroke="white" strokeWidth="4" fill="none" strokeDasharray="6 4"/>
          {/* 좌상 도로 */}
          <path d="M58 0 L56 58 L0 60" stroke="white" strokeWidth="7" fill="none"/>
          <path d="M58 0 L56 58 L0 60" stroke="#F5F5F5" strokeWidth="4" fill="none"/>
          {/* 우측 도로 */}
          <path d="M202 0 L212 92 L260 102" stroke="white" strokeWidth="7" fill="none"/>
          <path d="M202 0 L212 92 L260 102" stroke="#F5F5F5" strokeWidth="4" fill="none"/>
          {/* 공원 */}
          <ellipse cx="43" cy="44" rx="27" ry="19" fill="#C8E6C9" opacity="0.8"/>
          <text x="43" y="41" textAnchor="middle" fontSize="6" fill="#388E3C" fontWeight="700">초안산</text>
          <text x="43" y="50" textAnchor="middle" fontSize="5" fill="#388E3C">(115.5m)</text>
          {/* 지하철역 */}
          <circle cx="130" cy="90" r="4.5" fill="white" stroke="#1565C0" strokeWidth="1.5"/>
          <text x="130" y="105" textAnchor="middle" fontSize="5.5" fill="#374151" fontWeight="500">광운대역</text>
          <circle cx="201" cy="94" r="4.5" fill="white" stroke="#1565C0" strokeWidth="1.5"/>
          <text x="201" y="109" textAnchor="middle" fontSize="5.5" fill="#374151" fontWeight="500">공릉역</text>
          <circle cx="155" cy="148" r="4.5" fill="white" stroke="#1565C0" strokeWidth="1.5"/>
          <text x="155" y="163" textAnchor="middle" fontSize="5.5" fill="#374151" fontWeight="500">석계역</text>
          {/* 강북구민운동장 */}
          <text x="14" y="78" fontSize="4.5" fill="#6B7280">강북구민</text>
          <text x="14" y="84" fontSize="4.5" fill="#6B7280">운동장</text>
        </svg>

        {/* 클러스터 마커 */}
        {clusters.map((c, i) => (
          <div key={i} className="absolute flex items-center justify-center rounded-full font-bold shadow-md cursor-pointer select-none"
            style={{
              left: c.x, top: c.y,
              width: c.n >= 10 ? 24 : 20, height: c.n >= 10 ? 24 : 20,
              background: "#F97316", color: "white", fontSize: 8,
              transform: "translate(-50%,-50%)",
              boxShadow: "0 2px 6px rgba(249,115,22,0.5)",
            }}>
            {c.n}
          </div>
        ))}

        {/* 현재 위치 버튼 */}
        <div className="absolute right-2 top-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border border-neutral-200 cursor-pointer">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/>
          </svg>
        </div>

        {/* 스크롤 핸들 */}
        <div className="absolute bottom-1 left-0 right-0 flex justify-center">
          <div className="w-8 h-1 bg-neutral-300 rounded-full opacity-70" />
        </div>
      </div>

      {/* 장소 목록 */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" } as React.CSSProperties}>
        <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-neutral-100">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-neutral-900">
              {activeFilter === "전체" ? "주변 장소" : activeFilter}
            </span>
            <span className="text-[9px] font-bold" style={{ color: "var(--primary-500)" }}>
              {activeFilter === "전체" ? "208" : places.length}개
            </span>
          </div>
          <div className="flex items-center gap-0.5 cursor-pointer">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--primary-500)" strokeWidth="2.5" strokeLinecap="round">
              <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
            </svg>
            <span className="text-[9px] font-semibold" style={{ color: "var(--primary-500)" }}>가까운순</span>
          </div>
        </div>
        {places.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-neutral-400">
            <span className="text-2xl mb-1">🔍</span>
            <span className="text-[9px]">주변에 해당 장소가 없어요</span>
          </div>
        ) : places.map((p, i) => (
          <div key={i} className="flex items-center justify-between px-3.5 py-3 border-b border-neutral-50 cursor-pointer hover:bg-neutral-50 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl flex-shrink-0" style={{ background: p.bg }} />
              <div>
                <div className="text-[9.5px] font-semibold text-neutral-800">{p.name}</div>
                <div className="mt-0.5">
                  <span className="text-[7.5px] bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded-full">⊞ {p.category}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[8px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: "#FFF1F2", color: "var(--primary-500)" }}>{p.dist}</span>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
