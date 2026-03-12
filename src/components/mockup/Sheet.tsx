"use client";

import React from "react";

export function Sheet({ title, onClose, onOk, okLabel = "기록하기", children }: {
  title: string; onClose: () => void; onOk: () => void; okLabel?: string; children: React.ReactNode;
}) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end" style={{ background: "rgba(0,0,0,0.35)" }}
      onClick={onClose}>
      <div className="bg-white rounded-t-2xl px-4 pt-3 pb-5" onClick={e => e.stopPropagation()}>
        <div className="w-8 h-1 bg-neutral-200 rounded-full mx-auto mb-3" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-bold text-neutral-900">{title}</span>
          <button onClick={onClose} className="text-neutral-400 text-xl leading-none w-6 h-6 flex items-center justify-center">×</button>
        </div>
        {children}
        <button onClick={onOk}
          className="w-full mt-3 py-2.5 rounded-xl text-white text-[11px] font-bold transition-opacity active:opacity-80"
          style={{ background: "var(--primary-500)" }}>
          {okLabel}
        </button>
      </div>
    </div>
  );
}
