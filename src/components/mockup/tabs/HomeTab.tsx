"use client";

import { useState, useEffect } from "react";
import type { FeedKind, DiaperKind, ModalType, FeedRec, SleepRec, DiaperRec, GrowthRec, TempRec, MedRec, ActRec } from "../types";
import { uid, seed, timeAgo, fmt, todayOf, calcSleepMins } from "../helpers";
import { QUICK_BTNS, TIPS } from "../data";
import { GrowthChart } from "../GrowthChart";
import { Sheet } from "../Sheet";

export default function HomeTab({ now }: { now: Date }) {
  /* ── State ── */
  const [feedings,    setFeedings]    = useState<FeedRec[]>([
    { id: uid(), time: seed(65), kind: "breast", amount: 120 },
  ]);
  const [sleeps,      setSleeps]      = useState<SleepRec[]>([
    { id: uid(), start: seed(245), end: seed(65) },
  ]);
  const [diapers,     setDiapers]     = useState<DiaperRec[]>([
    { id: uid(), time: seed(70), kind: "wet" },
  ]);
  const [growths,     setGrowths]     = useState<GrowthRec[]>([
    { id: uid(), time: seed(60 * 24 * 7), weight: 1.5 },
  ]);
  const [temps,       setTemps]       = useState<TempRec[]>([]);
  const [meds,        setMeds]        = useState<MedRec[]>([]);
  const [acts,        setActs]        = useState<ActRec[]>([]);
  const [activeSleep, setActiveSleep] = useState<{ start: Date } | null>(null);
  const [modal,       setModal]       = useState<ModalType>(null);
  const [histFor,     setHistFor]     = useState<"feeding" | "sleep" | "diaper">("feeding");
  const [toast,       setToast]       = useState<string | null>(null);

  /* ── Form State ── */
  const [feedKind,   setFeedKind]   = useState<FeedKind>("breast");
  const [feedAmt,    setFeedAmt]    = useState("120");
  const [diaperKind, setDiaperKind] = useState<DiaperKind>("wet");
  const [weightVal,  setWeightVal]  = useState("");
  const [tempVal,    setTempVal]    = useState("36.5");
  const [medVal,     setMedVal]     = useState("");
  const [actVal,     setActVal]     = useState("");

  /* ── Pressed State (for tactile button feedback) ── */
  const [pressedBtn,  setPressedBtn]  = useState<string | null>(null);
  const [pressedCard, setPressedCard] = useState<number | null>(null);

  /* ── Effects ── */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  /* ── Computed ── */
  const todayFeeds   = todayOf(feedings, now);
  const todayDiapers = todayOf(diapers, now);
  const sleepMins    = calcSleepMins(sleeps, activeSleep, now);
  const lastFeed     = feedings.at(-1);
  const lastDiaper   = diapers.at(-1);

  /* ── Handlers ── */
  const toast$ = (m: string) => setToast(m);
  const close  = () => setModal(null);

  const doFeeding = () => {
    setFeedings(p => [...p, { id: uid(), time: new Date(), kind: feedKind, amount: parseInt(feedAmt) || 0 }]);
    close(); toast$("수유를 기록했어요 🍼");
  };
  const startSleep = () => { setActiveSleep({ start: new Date() }); toast$("수면 기록 시작 😴"); };
  const endSleep   = () => {
    if (!activeSleep) return;
    setSleeps(p => [...p, { id: uid(), start: activeSleep.start, end: new Date() }]);
    setActiveSleep(null); close(); toast$("수면을 기록했어요 😴");
  };
  const doDiaper = () => {
    setDiapers(p => [...p, { id: uid(), time: new Date(), kind: diaperKind }]);
    close(); toast$("기저귀를 기록했어요 👶");
  };
  const doGrowth = () => {
    const w = parseFloat(weightVal);
    if (isNaN(w) || w <= 0) return;
    setGrowths(p => [...p, { id: uid(), time: new Date(), weight: w }]);
    setWeightVal(""); close(); toast$(`체중 ${w}kg 기록 📈`);
  };
  const doTemp = () => {
    const t = parseFloat(tempVal);
    if (!isNaN(t)) {
      setTemps(p => [...p, { id: uid(), time: new Date(), celsius: t }]);
      close(); toast$(`체온 ${t}°C 기록 🌡`);
    }
  };
  const doMed = () => {
    if (!medVal.trim()) return;
    setMeds(p => [...p, { id: uid(), time: new Date(), name: medVal.trim() }]);
    setMedVal(""); close(); toast$("투약을 기록했어요 💊");
  };
  const doAct = () => {
    if (!actVal.trim()) return;
    setActs(p => [...p, { id: uid(), time: new Date(), desc: actVal.trim() }]);
    setActVal(""); close(); toast$("활동을 기록했어요 🚶");
  };

  const onQuick = (label: string) => {
    switch (label) {
      case "수유":   setModal("feeding"); break;
      case "수면":   activeSleep ? setModal("sleep-end") : startSleep(); break;
      case "기저귀": setModal("diaper"); break;
      case "성장":   setWeightVal(""); setModal("growth"); break;
      case "체온":   setModal("temp"); break;
      case "투약":   setModal("med"); break;
      case "활동":   setModal("activity"); break;
    }
  };
  const openHistory = (type: "feeding" | "sleep" | "diaper") => {
    setHistFor(type); setModal("history");
  };

  /* ── Modal Renderer ── */
  const renderModal = () => {
    if (!modal) return null;

    /* History full-screen */
    if (modal === "history") {
      type AnyRec = FeedRec | SleepRec | DiaperRec;
      const recs: AnyRec[] = histFor === "feeding" ? feedings : histFor === "sleep" ? sleeps : diapers;
      const title = histFor === "feeding" ? "수유 기록" : histFor === "sleep" ? "수면 기록" : "기저귀 기록";
      return (
        <div className="absolute inset-0 z-50 bg-white flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
            <span className="text-[12px] font-bold text-neutral-900">{title}</span>
            <button onClick={close} className="text-neutral-400 text-xl leading-none">×</button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-2" style={{ scrollbarWidth: "none" }}>
            {recs.length === 0 ? (
              <div className="flex items-center justify-center h-full text-[10px] text-neutral-400">기록이 없어요</div>
            ) : (
              [...recs].reverse().slice(0, 10).map((rec) => (
                <div key={(rec as FeedRec).id} className="flex items-start py-2.5 border-b border-neutral-50 last:border-0">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 mr-2 flex-shrink-0" style={{ background: "var(--primary-400)" }} />
                  <div className="flex-1">
                    {histFor === "feeding" && (() => {
                      const r = rec as FeedRec;
                      return <>
                        <div className="text-[10px] font-semibold text-neutral-800">
                          {r.kind === "breast" ? "🤱 모유" : "🍼 분유"} {r.amount > 0 ? `${r.amount}mL` : ""}
                        </div>
                        <div className="text-[8px] text-neutral-400">{timeAgo(r.time, now)}</div>
                      </>;
                    })()}
                    {histFor === "sleep" && (() => {
                      const r = rec as SleepRec;
                      const dur = r.end ? Math.floor((r.end.getTime() - r.start.getTime()) / 60000) : null;
                      return <>
                        <div className="text-[10px] font-semibold text-neutral-800">
                          😴 {dur ? `${dur}분` : "진행 중"}
                        </div>
                        <div className="text-[8px] text-neutral-400">{timeAgo(r.start, now)} 시작</div>
                      </>;
                    })()}
                    {histFor === "diaper" && (() => {
                      const r = rec as DiaperRec;
                      return <>
                        <div className="text-[10px] font-semibold text-neutral-800">
                          {r.kind === "wet" ? "💧 소변" : r.kind === "dirty" ? "💩 대변" : "💧💩 소+대변"}
                        </div>
                        <div className="text-[8px] text-neutral-400">{timeAgo(r.time, now)}</div>
                      </>;
                    })()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    /* Bottom sheet modals */
    if (modal === "feeding") return (
      <Sheet title="수유 기록" onClose={close} onOk={doFeeding}>
        <div className="flex gap-2 mb-3">
          {(["breast", "bottle"] as FeedKind[]).map(k => (
            <button key={k} onClick={() => setFeedKind(k)}
              className="flex-1 py-2 rounded-xl text-[10px] font-semibold border transition-all"
              style={{ background: feedKind === k ? "var(--primary-50)" : "white", borderColor: feedKind === k ? "var(--primary-400)" : "#E5E7EB", color: feedKind === k ? "var(--primary-600)" : "#6B7280" }}>
              {k === "breast" ? "🤱 모유" : "🍼 분유"}
            </button>
          ))}
        </div>
        <label className="text-[9px] text-neutral-500 block mb-1">양 (mL)</label>
        <input type="number" value={feedAmt} onChange={e => setFeedAmt(e.target.value)}
          className="w-full border rounded-xl px-3 py-2 text-[11px] outline-none"
          style={{ borderColor: "#E5E7EB" }} placeholder="120" />
      </Sheet>
    );

    if (modal === "sleep-end") return (
      <Sheet title="수면 종료" onClose={close} onOk={endSleep} okLabel="수면 종료">
        <div className="text-center py-3">
          <div className="text-[10px] text-neutral-500 mb-1">😴 수면 중</div>
          <div className="text-[24px] font-bold" style={{ color: "var(--primary-500)" }}>
            {activeSleep ? fmt(now.getTime() - activeSleep.start.getTime()) : "0분"}
          </div>
          <div className="text-[9px] text-neutral-400 mt-1">
            {activeSleep ? `${activeSleep.start.getHours()}:${String(activeSleep.start.getMinutes()).padStart(2, "0")} 시작` : ""}
          </div>
        </div>
      </Sheet>
    );

    if (modal === "diaper") return (
      <Sheet title="기저귀 기록" onClose={close} onOk={doDiaper}>
        <div className="flex gap-1.5">
          {([["wet", "💧 소변"], ["dirty", "💩 대변"], ["both", "💧💩 둘다"]] as [DiaperKind, string][]).map(([k, label]) => (
            <button key={k} onClick={() => setDiaperKind(k)}
              className="flex-1 py-2 rounded-xl text-[9px] font-semibold border transition-all"
              style={{ background: diaperKind === k ? "var(--primary-50)" : "white", borderColor: diaperKind === k ? "var(--primary-400)" : "#E5E7EB", color: diaperKind === k ? "var(--primary-600)" : "#6B7280" }}>
              {label}
            </button>
          ))}
        </div>
      </Sheet>
    );

    if (modal === "growth") return (
      <Sheet title="성장 기록" onClose={close} onOk={doGrowth}>
        <label className="text-[9px] text-neutral-500 block mb-1">체중 (kg)</label>
        <input type="number" value={weightVal} onChange={e => setWeightVal(e.target.value)}
          className="w-full border rounded-xl px-3 py-2 text-[11px] outline-none"
          style={{ borderColor: "#E5E7EB" }} placeholder="예: 1.8" step="0.1" />
      </Sheet>
    );

    if (modal === "temp") return (
      <Sheet title="체온 기록" onClose={close} onOk={doTemp}>
        <label className="text-[9px] text-neutral-500 block mb-1">체온 (°C)</label>
        <input type="number" value={tempVal} onChange={e => setTempVal(e.target.value)}
          className="w-full border rounded-xl px-3 py-2 text-[11px] outline-none"
          style={{ borderColor: "#E5E7EB" }} placeholder="36.5" step="0.1" />
      </Sheet>
    );

    if (modal === "med") return (
      <Sheet title="투약 기록" onClose={close} onOk={doMed}>
        <label className="text-[9px] text-neutral-500 block mb-1">약 이름</label>
        <input type="text" value={medVal} onChange={e => setMedVal(e.target.value)}
          className="w-full border rounded-xl px-3 py-2 text-[11px] outline-none"
          style={{ borderColor: "#E5E7EB" }} placeholder="예: 타이레놀" />
      </Sheet>
    );

    if (modal === "activity") return (
      <Sheet title="활동 기록" onClose={close} onOk={doAct}>
        <label className="text-[9px] text-neutral-500 block mb-1">활동 내용</label>
        <input type="text" value={actVal} onChange={e => setActVal(e.target.value)}
          className="w-full border rounded-xl px-3 py-2 text-[11px] outline-none"
          style={{ borderColor: "#E5E7EB" }} placeholder="예: 산책 30분" />
      </Sheet>
    );

    return null;
  };

  /* ── Render ── */
  return (
    <>
      {/* Scrollable home content */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" } as React.CSSProperties}>
        {/* Active Sleep Banner */}
        {activeSleep && (
          <div className="mx-3.5 mt-2 rounded-xl px-3 py-2 flex items-center justify-between"
            style={{ background: "#EEF2FF" }}>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px]">😴</span>
              <span className="text-[9px] font-semibold text-indigo-700">수면 중</span>
              <span className="text-[9px] text-indigo-500 font-mono">
                {fmt(now.getTime() - activeSleep.start.getTime())}
              </span>
            </div>
            <button onClick={() => setModal("sleep-end")}
              className="text-[8px] font-semibold text-white px-2 py-0.5 rounded-full cursor-pointer"
              style={{ background: "#6366F1" }}>
              종료
            </button>
          </div>
        )}

        {/* Baby Profile Header */}
        <div className="px-4 pt-3 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                style={{ background: "linear-gradient(135deg,var(--primary-300),var(--primary-500))" }}>
                쿵쾅
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[12px] font-bold text-neutral-900">쿵쾅이</span>
                  <span className="text-[10px] text-neutral-400">▾</span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                    style={{ background: "var(--primary-50)", color: "var(--primary-500)" }}>D+41</span>
                </div>
                <div className="text-[9px] text-neutral-500">D+40</div>
                <div className="text-[9px] text-neutral-400">오늘도 사랑해, 우리 아가 🐣</div>
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>
        </div>

        <div className="h-px mx-4 bg-neutral-100" />

        {/* 오늘의 요약 */}
        <div className="px-3.5 pt-3 pb-2.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-neutral-900">오늘의 요약</span>
            <span className="text-[9px] flex items-center gap-0.5" style={{ color: "var(--primary-500)" }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: "var(--primary-500)" }} />
              방금
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: "수유", value: todayFeeds.length, unit: "회", bg: "var(--primary-50)", color: "var(--primary-600)", sub: lastFeed ? timeAgo(lastFeed.time, now) : "기록 없음", type: "feeding" as const },
              { label: "수면", value: sleepMins >= 60 ? `${Math.floor(sleepMins / 60)}` : sleepMins, unit: sleepMins >= 60 ? "시간" : "분", bg: "#EEF2FF", color: "#4F46E5", sub: activeSleep ? "진행 중" : "오늘 누적", type: "sleep" as const },
              { label: "기저귀", value: todayDiapers.length, unit: "회", bg: "#FEF9C3", color: "#854D0E", sub: lastDiaper ? timeAgo(lastDiaper.time, now) : "기록 없음", type: "diaper" as const },
            ].map(card => (
              <button key={card.label} onClick={() => openHistory(card.type)}
                className="rounded-xl p-2 text-center transition-transform active:scale-95 cursor-pointer"
                style={{ background: card.bg }}>
                <div className="text-[9px] mb-0.5" style={{ color: card.color }}>{card.label}</div>
                <div className="text-[13px] font-bold text-neutral-900">
                  {card.value} <span className="text-[9px] font-normal">{card.unit}</span>
                </div>
                <div className="text-[7.5px] text-neutral-400 mt-0.5 truncate">{card.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 빠른 기록 */}
        <div className="px-3.5 pb-3">
          <div className="text-[11px] font-bold text-neutral-900 mb-2">빠른 기록</div>
          <div className="grid grid-cols-4 gap-x-2 gap-y-2">
            {QUICK_BTNS.map(btn => {
              const isSleepActive = btn.label === "수면" && !!activeSleep;
              return (
                <div key={btn.label} className="flex flex-col items-center gap-1">
                  <button
                    onMouseDown={() => setPressedBtn(btn.label)}
                    onMouseUp={() => { setPressedBtn(null); onQuick(btn.label); }}
                    onMouseLeave={() => setPressedBtn(null)}
                    onTouchStart={() => setPressedBtn(btn.label)}
                    onTouchEnd={() => { setPressedBtn(null); onQuick(btn.label); }}
                    className="w-11 h-11 rounded-2xl flex items-center justify-center relative cursor-pointer"
                    style={{
                      background: pressedBtn === btn.label ? btn.activeBg : btn.bg,
                      border: btn.border ? "1.5px dashed #D1D5DB" : "none",
                      transform: pressedBtn === btn.label ? "scale(0.88)" : "scale(1)",
                      transition: "transform 0.1s, background 0.1s",
                    }}>
                    {btn.icon}
                    {isSleepActive && (
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white animate-pulse"
                        style={{ background: "#6366F1" }} />
                    )}
                  </button>
                  <span className="text-[8px] text-neutral-500">{btn.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 성장 기록 */}
        <div className="px-3.5 pb-2">
          <div className="text-[11px] font-bold text-neutral-900 mb-2">성장 기록</div>
          <div className="rounded-2xl p-3" style={{ background: "white", boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}>
            <div className="text-[10px] font-semibold text-neutral-800 mb-1">성장 추이</div>
            <GrowthChart records={growths} />
            <div className="flex items-center justify-between mt-1.5">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full inline-block" style={{ background: "var(--primary-500)" }} />
                <span className="text-[8px] text-neutral-500">체중 (kg)</span>
              </div>
              <span className="text-[8px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "var(--primary-50)", color: "var(--primary-500)" }}>
                현재 {growths.at(-1)?.weight ?? 1.5}kg
              </span>
            </div>
          </div>
        </div>

        {/* 육아 팁 */}
        <div className="px-3.5 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-neutral-900">육아 팁</span>
            <span className="text-[9px] cursor-pointer" style={{ color: "var(--primary-500)" }}>더보기</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {TIPS.map((card, i) => (
              <button key={card.title}
                onMouseDown={() => setPressedCard(i)}
                onMouseUp={() => setPressedCard(null)}
                onMouseLeave={() => setPressedCard(null)}
                className="w-full text-left rounded-xl p-2.5 flex items-start gap-2 cursor-pointer"
                style={{
                  background: "white",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                  border: "1px solid #F3F4F6",
                  transform: pressedCard === i ? "scale(0.97)" : "scale(1)",
                  transition: "transform 0.1s",
                }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: card.iconBg }}>{card.icon}</div>
                <div className="flex-1 min-w-0">
                  {card.isAi && (
                    <span className="inline-flex items-center gap-0.5 text-white text-[7px] font-bold px-1.5 py-0.5 rounded mb-0.5"
                      style={{ background: "var(--primary-500)" }}>✦ AI 추천</span>
                  )}
                  <div className="text-[10px] font-semibold text-neutral-900 leading-tight">{card.title}</div>
                  <div className="text-[8px] text-neutral-400 leading-tight mt-0.5 line-clamp-2">{card.desc}</div>
                </div>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" className="mt-1 flex-shrink-0">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal overlay - absolute positioned within the relative parent */}
      {renderModal()}

      {/* Toast - absolute positioned */}
      {toast && (
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 text-white text-[9px] font-semibold px-3 py-1.5 rounded-full z-50 whitespace-nowrap pointer-events-none"
          style={{ background: "rgba(31,41,55,0.92)" }}>
          {toast}
        </div>
      )}
    </>
  );
}
