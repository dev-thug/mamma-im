"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/config/site";

function HeartIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 34S6 24.667 6 15C6 10.03 10.03 6 15 6c2.76 0 5.214 1.24 7 3.214A9 9 0 0 1 25 6c4.97 0 9 4.03 9 9 0 9.667-14 19-14 19z"
        fill="#f43f5e"
      />
      <circle cx="16" cy="16" r="1.6" fill="white" />
      <circle cx="24" cy="16" r="1.6" fill="white" />
      <path
        d="M17 21 Q20 23.5 23 21"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M15.387 2c.163 1.07-.29 2.128-.9 2.886-.636.79-1.683 1.4-2.7 1.324-.185-1.004.31-2.054.899-2.76C13.34 2.66 14.46 2.08 15.387 2z"
        fill="#111827"
      />
      <path
        d="M18.95 14.928c-.36.835-.535 1.208-1.002 1.944-.65 1.005-1.566 2.257-2.703 2.266-1.01.009-1.27-.666-2.64-.658-1.369.007-1.657.67-2.669.661-1.136-.01-2.003-1.14-2.653-2.145-1.82-2.81-2.012-6.105-.888-7.853.8-1.25 2.06-1.984 3.247-1.984 1.207 0 1.966.664 2.964.664.967 0 1.556-.666 2.95-.666 1.056 0 2.173.58 2.97 1.58-2.608 1.444-2.186 5.213.424 6.19z"
        fill="#111827"
      />
    </svg>
  );
}

function PlayStoreIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3.5 2.3a1.1 1.1 0 0 0-.5.94v15.52c0 .4.18.75.5.94l.08.05 8.69-8.69v-.2L3.58 2.25l-.08.05z"
        fill="#4285F4"
      />
      <path
        d="M15.17 14.02l-2.9-2.9v-.2l2.9-2.9.07.04 3.44 1.95c.98.56.98 1.47 0 2.03l-3.44 1.96-.07.02z"
        fill="#FBBC04"
      />
      <path
        d="M15.24 13.99L12.27 11 3.5 19.77c.32.34.85.38 1.45.04l10.29-5.82"
        fill="#EA4335"
      />
      <path
        d="M15.24 8.01L4.95 2.19C4.35 1.85 3.82 1.9 3.5 2.23L12.27 11l2.97-2.99z"
        fill="#34A853"
      />
    </svg>
  );
}

const ease = "easeOut" as const;

export default function DownloadCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const visible = isInView ? 1 : 0;
  const visibleY = isInView ? 0 : 40;

  return (
    <section id="download" ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: visible, y: visibleY }}
          transition={{ duration: 0.7, ease }}
          className="relative overflow-hidden rounded-3xl shadow-2xl p-12 sm:p-16"
          style={{
            background: "linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)",
          }}
        >
          {/* Decorative circles */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-8 w-32 h-32 rounded-full bg-white/5"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-6 left-1/4 w-16 h-16 rounded-full bg-white/5"
          />

          {/* Dot grid pattern */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* App icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: visible, scale: isInView ? 1 : 0.7 }}
              transition={{ duration: 0.5, ease, delay: 0.2 }}
              className="w-20 h-20 bg-white rounded-[22px] shadow-lg mx-auto mb-8 flex items-center justify-center"
            >
              <HeartIcon />
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: visible, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, ease, delay: 0.35 }}
              className="text-3xl sm:text-4xl font-bold text-white text-center whitespace-pre-line leading-tight"
            >
              {"오늘도 사랑해,\n우리 아가"}
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: visible, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, ease, delay: 0.45 }}
              className="text-white/80 text-center mt-4 text-base sm:text-lg"
            >
              하루하루 쌓여가는 기록이 우리 아이의 소중한 성장 일기가 됩니다
            </motion.p>

            {/* Download buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href={siteConfig.appStoreUrl}
                title="App Store로 이동"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: visible, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.45, ease, delay: 0.55 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-neutral-900 rounded-2xl px-8 py-4 flex items-center gap-3 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                aria-label="App Store에서 맘마 다운로드"
              >
                <AppleIcon />
                <div className="flex flex-col items-start">
                  <span className="text-xs text-neutral-500 leading-none mb-0.5">
                    App Store
                  </span>
                  <span className="font-semibold text-sm leading-none">
                    무료 다운로드
                  </span>
                </div>
              </motion.a>

              <motion.a
                href="#"
                title="준비 중"
                onClick={(e) => e.preventDefault()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: visible, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.45, ease, delay: 0.65 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-neutral-900 rounded-2xl px-8 py-4 flex items-center gap-3 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                aria-label="Google Play에서 맘마 다운로드"
              >
                <PlayStoreIcon />
                <div className="flex flex-col items-start">
                  <span className="text-xs text-neutral-500 leading-none mb-0.5">
                    Google Play
                  </span>
                  <span className="font-semibold text-sm leading-none">
                    무료 다운로드
                  </span>
                </div>
              </motion.a>
            </div>

            {/* Support note */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: visible, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, ease, delay: 0.75 }}
              className="text-white/60 text-sm text-center mt-6"
            >
              iOS 15+ / Android 10+ 지원
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
