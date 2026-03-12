"use client";

import { useState } from "react";

export default function AIChatTab() {
  const [input, setInput] = useState("");
  type ChatMsg = { role: "ai" | "user"; text: string; time?: string };
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    {
      role: "ai",
      text: "배고픔, 포만감의 신호를 잘 관찰해 주세요. 아기가 보채거나 주먹을 빨면 배고픔의 신호일 수 있습니다.\n\n5. 체중 변화 모니터링:\n정기적으로 아기의 체중을 확인하여 적절한 성장이 이루어지고 있는지 확인해 주세요.\n\n수유 패턴은 아기마다 다를 수 있으며, 현재의 데이터만으로는 정확한 판단이 어려울 수 있습니다. 따라서 지속적인 관찰과 기록이 중요합니다. 수유나 아기의 성장에 대해 우려되는 점이 있다면, 반드시 소아과 전문의와 상담해 주시기 바랍니다.\n\n추가적인 질문이나 궁금한 점이 있으시면 언제든지 말씀해 주세요.",
      time: "오후 1:52",
    },
  ]);

  const suggestedQuestions = [
    { icon: "👥", text: "또래 사회성 발달 방법" },
    { icon: "🏫", text: "유치원 적응 도움 방법" },
    { icon: "⭐", text: "올바른 생활 습관 만들기" },
  ];

  const aiResponses = [
    "아이의 사회성 발달을 위해서는 또래와의 자연스러운 상호작용이 중요해요. 놀이 모임이나 공원에서 자유롭게 놀 수 있는 환경을 만들어 주세요. 부모가 먼저 긍정적인 사회적 행동의 모델이 되어주는 것도 매우 효과적입니다 💕",
    "유치원 적응을 위해서는 미리 유치원 일과와 비슷한 루틴을 만들어 보세요. 단기 방문부터 시작해 점차 시간을 늘려가는 것이 좋습니다. 헤어질 때는 짧고 명확하게 인사하고, 반드시 돌아온다는 것을 알려주세요 🌟",
    "좋은 생활 습관은 일관된 루틴에서 시작돼요. 정해진 시간에 자고 일어나기, 식사 전 손 씻기, 취침 전 양치하기 등 작은 것부터 꾸준히 실천하세요. 칭찬과 격려로 긍정적인 강화를 해주면 더욱 효과적입니다 ✨",
  ];

  const sendMsg = (text?: string) => {
    const q = (text ?? input).trim();
    if (!q) return;
    setInput("");
    const now = new Date();
    const timeStr = `오후 ${now.getHours() > 12 ? now.getHours() - 12 : now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    const aiText = aiResponses[Math.floor(Math.random() * aiResponses.length)];
    setMsgs(p => [...p, { role: "user", text: q }, { role: "ai", text: aiText, time: timeStr }]);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2.5 border-b border-neutral-100">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--primary-500)" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <span className="text-[10px] font-bold text-neutral-900 truncate">우리 아이 성장 발달 체...</span>
          <span className="text-[7px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
            style={{ background: "#7C3AED", color: "white" }}>✦ BETA</span>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto px-3 py-2" style={{ scrollbarWidth: "none" } as React.CSSProperties}>
        {msgs.map((m, i) => (
          <div key={i} className={`mb-2 flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
            {m.role === "ai" ? (
              <>
                <div className="bg-white rounded-2xl p-3 max-w-full"
                  style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.08)", border: "1px solid #F3F4F6" }}>
                  <p className="text-[8.5px] text-neutral-700 leading-relaxed whitespace-pre-line">{m.text}</p>
                </div>
                {m.time && <div className="text-[7.5px] text-neutral-400 ml-1 mt-0.5">{m.time}</div>}

                {/* 추천 질문 (마지막 AI 메시지에만) */}
                {i === msgs.length - 1 && (
                  <div className="w-full mt-2.5">
                    <div className="text-[7.5px] text-neutral-400 text-center mb-1.5">추천 질문</div>
                    <div className="flex flex-col gap-1.5">
                      {suggestedQuestions.map((q, qi) => (
                        <button key={qi} onClick={() => sendMsg(q.text)}
                          className="text-left rounded-full px-3 py-1.5 text-[8.5px] font-medium border transition-all cursor-pointer"
                          style={{ borderColor: "var(--primary-200)", color: "var(--primary-600)", background: "var(--primary-50)" }}>
                          {q.icon} {q.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-2xl px-3 py-2 max-w-[75%]" style={{ background: "var(--primary-500)" }}>
                <p className="text-[9px] text-white leading-relaxed">{m.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div className="px-3 py-2 border-t border-neutral-100 flex items-center gap-1.5">
        <button className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMsg()}
          placeholder="궁금한 것을 물어보세요..."
          className="flex-1 bg-neutral-100 rounded-full px-3 py-1.5 text-[9px] outline-none"
          style={{ color: "#374151" }} />
        <button onClick={() => sendMsg()}
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--primary-500)" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
        </button>
      </div>
    </div>
  );
}
