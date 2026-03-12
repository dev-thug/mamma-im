"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "기능 소개", href: "#features" },
  { label: "스크린샷", href: "#screenshots" },
  { label: "다운로드", href: "#download" },
];

function LogoIcon({ compact = false, uid = "a" }: { compact?: boolean; uid?: string }) {
  const brandId = `brandGradient-${uid}`;
  const milkId = `milkGradient-${uid}`;
  const shadowId = `dropShadow-${uid}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={compact ? "0 0 130 120" : "0 0 400 120"}
      width={compact ? "52" : "160"}
      height="48"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={brandId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#FF4757" />
        </linearGradient>
        <linearGradient id={milkId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF0F0" />
          <stop offset="100%" stopColor="#FFE4E4" />
        </linearGradient>
        <filter id={shadowId} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#FF4757" floodOpacity="0.15" />
        </filter>
      </defs>

      <g transform="translate(35, 8) rotate(12, 45, 45)" filter={`url(#${shadowId})`}>
        <path d="M35 30 C35 5, 55 5, 55 30" fill="#FFA502" />
        <rect x="20" y="45" width="50" height="60" rx="15" fill="#FFFFFF" stroke="#2F3542" strokeWidth="4" />
        <path d="M22 70 Q 32 65, 45 72 T 68 70 L 68 90 A 13 13 0 0 1 55 103 L 35 103 A 13 13 0 0 1 22 90 Z" fill={`url(#${milkId})`} />
        <rect x="15" y="30" width="60" height="15" rx="6" fill={`url(#${brandId})`} stroke="#2F3542" strokeWidth="4" />
        <line x1="28" y1="55" x2="38" y2="55" stroke="#2F3542" strokeWidth="3" strokeLinecap="round" />
        <line x1="28" y1="65" x2="35" y2="65" stroke="#2F3542" strokeWidth="3" strokeLinecap="round" />
        <line x1="28" y1="75" x2="38" y2="75" stroke="#2F3542" strokeWidth="3" strokeLinecap="round" />
        <path d="M41 82 C 41 82, 38 79, 41 77 C 44 75, 48 78, 45 82 C 43 85, 41 82, 41 82 Z" fill="#FF4757" />
      </g>

      {!compact && <circle cx="25" cy="13" r="4" fill="#FF4757" opacity="0.6" />}
      <path d="M105 18 L108 25 L115 28 L108 31 L105 38 L102 31 L95 28 L102 25 Z" fill="#FFA502" opacity="0.8" />

      {!compact && (
        <g transform="translate(128, 62)">
          <text
            x="0"
            y="20"
            fontFamily="'Nunito', 'Arial Rounded MT Bold', sans-serif"
            fontSize="52"
            fontWeight="900"
            fill="#2F3542"
            letterSpacing="-1.5"
          >
            mamma
          </text>
          <circle cx="209" cy="28" r="6" fill="#FF4757" />
        </g>
      )}
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-neutral-200/60 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2 group"
              aria-label="맘마 홈으로 이동"
            >
              <span className="md:hidden"><LogoIcon compact uid="mobile" /></span>
              <span className="hidden md:inline"><LogoIcon uid="desktop" /></span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="주요 메뉴">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-neutral-600 hover:text-neutral-900 font-medium transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => handleNavClick("#download")}
                className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-2.5 rounded-full transition-colors duration-200 cursor-pointer"
              >
                앱 다운로드
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 text-neutral-900 hover:text-primary-500 transition-colors duration-200"
              aria-label="메뉴 열기"
              aria-expanded={mobileOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-white flex flex-col"
          >
            {/* Mobile menu header */}
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-neutral-100">
              <a
                href="#"
                className="flex items-center gap-2"
                onClick={() => setMobileOpen(false)}
                aria-label="맘마 홈으로 이동"
              >
                <LogoIcon compact uid="menu" />
              </a>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-10 h-10 text-neutral-900 hover:text-primary-500 transition-colors duration-200"
                aria-label="메뉴 닫기"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile nav links (centered, stagger) */}
            <nav
              className="flex flex-col items-center justify-center flex-1 gap-8"
              aria-label="모바일 메뉴"
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.08 * (i + 1), duration: 0.25, ease: "easeOut" }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-2xl font-semibold text-neutral-900 hover:text-primary-500 transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.08 * (navLinks.length + 1), duration: 0.25, ease: "easeOut" }}
                onClick={() => handleNavClick("#download")}
                className="mt-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold text-lg px-10 py-3.5 rounded-full transition-colors duration-200 cursor-pointer"
              >
                앱 다운로드
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
