"use client";

import { useEffect } from "react";

// Lets keyboard/screen-magnifier users dismiss icon tooltips with Escape (WCAG 1.4.13).
// Tooltips return as soon as focus or the pointer moves to a different control.
export default function TooltipDismiss() {
  useEffect(() => {
    const root = document.documentElement;
    // Control the pointer is currently over; tips re-enable when it changes
    let hovered: Element | null = null;
    const show = () => root.removeAttribute("data-tips-off");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") root.setAttribute("data-tips-off", "");
    };
    const onOver = (e: PointerEvent) => {
      const host = (e.target as Element | null)?.closest?.(".tip-host") ?? null;
      if (host !== hovered) show();
      hovered = host;
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("focusin", show);
    document.addEventListener("pointerover", onOver);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", show);
      document.removeEventListener("pointerover", onOver);
    };
  }, []);
  return null;
}
