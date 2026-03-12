export type FeedKind = "breast" | "bottle";
export type DiaperKind = "wet" | "dirty" | "both";
export type ModalType =
  | "feeding" | "sleep-end" | "diaper" | "growth"
  | "temp" | "med" | "activity" | "history" | null;

export interface FeedRec  { id: string; time: Date; kind: FeedKind; amount: number; }
export interface SleepRec { id: string; start: Date; end: Date | null; }
export interface DiaperRec{ id: string; time: Date; kind: DiaperKind; }
export interface GrowthRec{ id: string; time: Date; weight: number; }
export interface TempRec  { id: string; time: Date; celsius: number; }
export interface MedRec   { id: string; time: Date; name: string; }
export interface ActRec   { id: string; time: Date; desc: string; }
