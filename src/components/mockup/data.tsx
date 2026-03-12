"use client";

import React from "react";

export const QUICK_BTNS = [
  { label: "수유",   bg: "#FEE2E2", activeBg: "#FECACA",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#EF4444"><path d="M17 8C8 10 5.9 16.17 3.82 19.77A2 2 0 0 0 5.5 22.5h.09a2 2 0 0 0 1.88-1.32C8 19.5 9.5 17 12 17c2.5 0 4 2.5 4.53 4.18A2 2 0 0 0 18.41 22.5h.09a2 2 0 0 0 1.68-2.23C19.5 15 16 10 17 8z"/><path d="M12 3C10.34 3 9 4.34 9 6s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg> },
  { label: "수면",   bg: "#E0E7FF", activeBg: "#C7D2FE",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#6366F1"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> },
  { label: "기저귀", bg: "#DBEAFE", activeBg: "#BFDBFE",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"><path d="M4 8h16l-2 9H6L4 8z"/><path d="M4 8l2-3h12l2 3"/></svg> },
  { label: "성장",   bg: "#D1FAE5", activeBg: "#A7F3D0",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
  { label: "체온",   bg: "#FFEDD5", activeBg: "#FED7AA",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg> },
  { label: "투약",   bg: "#F3E8FF", activeBg: "#E9D5FF",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#A855F7"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/></svg> },
  { label: "활동",   bg: "#E0F2FE", activeBg: "#BAE6FD",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1"/><path d="M9 20l3-9 3 9M6 10l6 2 6-2"/></svg> },
  { label: "더보기", bg: "transparent", activeBg: "#F3F4F6", border: true,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> },
];

export const TIPS = [
  { title: "신생아 수면 패턴", desc: "신생아는 하루 14-17시간 수면이 필요해요. 2-3시간마다 깨서 수유하는 것이 정상이에요.", iconBg: "#E0E7FF", isAi: true,
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="#6366F1"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> },
  { title: "수유 시간 기록의 중요성", desc: "수유 간격과 양을 기록하면 아기의 성장 패턴을 파악하는데 도움이 돼요.", iconBg: "#FEE2E2", isAi: false,
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="#EF4444"><path d="M17 8C8 10 5.9 16.17 3.82 19.77A2 2 0 0 0 5.5 22.5h.09a2 2 0 0 0 1.88-1.32C8 19.5 9.5 17 12 17c2.5 0 4 2.5 4.53 4.18A2 2 0 0 0 18.41 22.5h.09a2 2 0 0 0 1.68-2.23C19.5 15 16 10 17 8z"/><path d="M12 3C10.34 3 9 4.34 9 6s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg> },
  { title: "신생아 목욕 가이드", desc: "신생아 목욕은 주 2-3회가 적당해요. 탯줄이 떨어지기 전까지는 스펀지 목욕을 해주세요.", iconBg: "#E0F2FE", isAi: false,
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round"><path d="M2 12h20M2 12C2 6.5 6.5 2 12 2s10 4.5 10 10"/><path d="M12 22v-4M8 22h8"/></svg> },
];
