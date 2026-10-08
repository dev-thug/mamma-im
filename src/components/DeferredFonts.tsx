"use client";

import { useEffect } from "react";

/** Typography is optional; product text must paint before any font requests. */
export default function DeferredFonts() {
  useEffect(() => {
    let frame: number | undefined;
    const load = () => {
      frame = window.requestAnimationFrame(() => {
        if (document.querySelector('link[data-mamma-fonts]')) return;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/fonts/pretendard/1.3.9/pretendard.css';
        link.dataset.mammaFonts = 'true';
        document.head.appendChild(link);
      });
    };
    if (document.readyState === 'complete') load();
    else window.addEventListener('load', load, { once: true });
    return () => {
      window.removeEventListener('load', load);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
