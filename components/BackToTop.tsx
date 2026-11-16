"use client";

import { useEffect, useState } from "react";

// Distance scrolled (px) before the button appears
const SHOW_AFTER = 400;

// Floating "back to top" arrow. It is only rendered after scrolling down, so it is
// neither visible nor focusable at the top of the page.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => {
        // Respect reduced-motion preferences when scrolling back up
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        // Move focus to the top of the page so keyboard users don't lose their place
        document.getElementById("top")?.focus({ preventScroll: true });
      }}
      className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-300 bg-slate-950/90 text-white shadow-lg hover:bg-blue-400 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
      <span className="sr-only">Back to top</span>
    </button>
  );
}
