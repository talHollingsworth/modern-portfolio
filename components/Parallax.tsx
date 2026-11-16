"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = { speed?: number; className?: string; children?: ReactNode };

// Moves content at a fraction of scroll speed. Disabled for reduced-motion users.
// The offset is measured from the parent's center to the viewport center, so the
// parent must be `relative overflow-hidden` and the child needs extra height
// (e.g. negative top/inset) so its edges never show while it moves.
// `speed` is the fraction of scroll distance (0.2 = subtle, 0.5 = strong).
export default function Parallax({ speed = 0.2, className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (mq.matches) {
        el.style.transform = "";
        return;
      }
      const rect = el.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    // Batch scroll events into one update per animation frame.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className ?? ""}`}>
      {children}
    </div>
  );
}
