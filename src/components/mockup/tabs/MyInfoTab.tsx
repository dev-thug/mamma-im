export default function MyInfoTab() {
  return (
    <div className="px-3.5 pt-3 pb-4">
      <div className="flex items-center gap-3 mb-4 p-3 bg-white rounded-2xl" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white"
          style={{ background: "linear-gradient(135deg,var(--primary-300),var(--primary-500))" }}>김</div>
        <div>
          <div className="text-[11px] font-bold text-neutral-900">김민준 엄마</div>
          <div className="text-[9px] text-neutral-500">쿵쾅이 (D+41)</div>
          <div className="flex gap-1 mt-1">
            <span className="text-[8px] bg-primary-50 text-primary-600 px-1.5 py-0.5 rounded-full font-medium">프리미엄</span>
          </div>
        </div>
      </div>
      {[
        { icon: "👶", label: "아기 프로필 관리" },
        { icon: "👨‍👩‍👧", label: "가족 초대 관리" },
        { icon: "🔔", label: "알림 설정" },
        { icon: "🌙", label: "다크 모드" },
        { icon: "📊", label: "성장 리포트" },
        { icon: "🛡", label: "개인정보 보호" },
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between py-2.5 border-b border-neutral-50">
          <div className="flex items-center gap-2">
            <span className="text-[14px]">{item.icon}</span>
            <span className="text-[10px] text-neutral-700">{item.label}</span>
          </div>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      ))}
    </div>
  );
}
