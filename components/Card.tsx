import type { ReactNode } from "react";

type Props = {
  as?: "li" | "article" | "div";
  className?: string;
  children: ReactNode;
  labelledBy?: string;
};

// Shared surface for content blocks (currently the experience entries).
// Case study and project cards are intentionally separate components.
// `as` picks the HTML tag (use "li" inside lists); `labelledBy` should be the id
// of the card's heading so screen readers announce it.
export default function Card({ as: Tag = "div", className = "", labelledBy, children }: Props) {
  return (
    <Tag
      role={Tag === "div" && labelledBy ? "group" : undefined}
      aria-labelledby={labelledBy}
      className={`rounded-2xl border border-white/10 bg-slate-950/80 p-6 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-8 ${className}`}
    >
      {children}
    </Tag>
  );
}
