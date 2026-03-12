import type { SleepRec } from "./types";

export const uid  = () => Math.random().toString(36).slice(2);
export const seed = (m: number) => new Date(Date.now() - m * 60000);

export function timeAgo(d: Date, now: Date) {
  const m = Math.floor((now.getTime() - d.getTime()) / 60000);
  if (m < 1) return "방금";
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  return h < 24 ? `${h}시간 전` : `${Math.floor(h / 24)}일 전`;
}

export function fmt(ms: number) {
  const t = Math.floor(ms / 60000);
  const h = Math.floor(t / 60), m = t % 60;
  return h > 0 ? `${h}시간 ${m}분` : `${m}분`;
}

export function todayOf<T extends { time: Date }>(recs: T[], now: Date) {
  const d = new Date(now); d.setHours(0, 0, 0, 0);
  return recs.filter(r => r.time >= d);
}

export function calcSleepMins(sleeps: SleepRec[], active: { start: Date } | null, now: Date) {
  const d = new Date(now); d.setHours(0, 0, 0, 0);
  const base = sleeps.filter(s => s.start >= d)
    .reduce((acc, s) => acc + Math.floor(((s.end ?? now).getTime() - s.start.getTime()) / 60000), 0);
  return base + (active ? Math.floor((now.getTime() - active.start.getTime()) / 60000) : 0);
}
