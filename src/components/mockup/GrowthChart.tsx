"use client";

import React from "react";
import type { GrowthRec } from "./types";
import { seed } from "./helpers";

export function GrowthChart({ records }: { records: GrowthRec[] }) {
  const W = 218, H = 90, ml = 28, mr = 8, mt = 8, mb = 22;
  const pw = W - ml - mr, ph = H - mt - mb;

  const data = records.length > 0 ? records : [{ id: "init", time: seed(60 * 24 * 7), weight: 1.5 }];
  const weights = data.map(d => d.weight);
  const minW = Math.max(0, Math.floor(Math.min(...weights) - 0.5));
  const maxW = Math.ceil(Math.max(...weights) + 0.5);
  const yTicks: number[] = [];
  for (let i = minW; i <= maxW; i++) yTicks.push(i);

  const toX = (i: number) => ml + (data.length > 1 ? pw * (i / (data.length - 1)) : pw * 0.55);
  const toY = (w: number) => mt + ph * (1 - (w - minW) / (maxW - minW));

  const pts = data.map((d, i) => ({ x: toX(i), y: toY(d.weight), d }));
  const linePath = pts.length > 1
    ? "M " + pts.map(p => `${p.x} ${p.y}`).join(" L ")
    : "";
  const areaPath = pts.length > 1
    ? `M ${pts[0].x} ${mt + ph} ` + pts.map(p => `L ${p.x} ${p.y}`).join(" ") + ` L ${pts.at(-1)!.x} ${mt + ph} Z`
    : "";

  const lastPt = pts.at(-1)!;
  const labelIdxs = pts.length <= 3 ? pts.map((_, i) => i)
    : [0, pts.length - 1];

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <linearGradient id="mcGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FB7185" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FB7185" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {yTicks.map(t => {
        const y = toY(t);
        return (
          <g key={t}>
            <line x1={ml} y1={y} x2={W - mr} y2={y} stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
            <text x={ml - 4} y={y + 3} fontSize="8" fill="#9CA3AF" textAnchor="end">{t}</text>
          </g>
        );
      })}
      {labelIdxs.map(i => (
        <text key={i} x={pts[i].x} y={H - 4} fontSize="7.5" fill="#9CA3AF" textAnchor="middle">
          {`${data[i].time.getMonth() + 1}/${data[i].time.getDate()}`}
        </text>
      ))}
      {areaPath && <path d={areaPath} fill="url(#mcGrad)" />}
      {linePath  && <path d={linePath} fill="none" stroke="#FB7185" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
      {pts.map((p, i) => {
        const isLast = i === pts.length - 1;
        return (
          <g key={i}>
            {isLast && <circle cx={p.x} cy={p.y} r="7" fill="rgba(244,63,94,0.12)" />}
            <circle cx={p.x} cy={p.y} r={isLast ? 4.5 : 3.5} fill="white" />
            <circle cx={p.x} cy={p.y} r={isLast ? 3 : 2.5} fill="#F43F5E" />
          </g>
        );
      })}
    </svg>
  );
}
