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

function LogoIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Heart shape */}
      <path
        d="M10 17s-7-5.333-7-9.5C3 5.015 5.015 3 7.5 3c1.38 0 2.607.62 3.5 1.607A4.496 4.496 0 0 1 12.5 3C14.985 3 17 5.015 17 7.5 17 11.667 10 17 10 17z"
        fill="#f43f5e"
      />
      {/* Baby face dots */}
      <circle cx="8" cy="8" r="0.8" fill="white" />
      <circle cx="12" cy="8" r="0.8" fill="white" />
      <path
        d="M8.5 10.5 Q10 11.8 11.5 10.5"
        stroke="white"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />
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
              <LogoIcon />
              <span className="text-2xl font-bold text-primary-500 tracking-tight">
                맘마
              </span>
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
                <LogoIcon />
                <span className="text-2xl font-bold text-primary-500 tracking-tight">
                  맘마
                </span>
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
