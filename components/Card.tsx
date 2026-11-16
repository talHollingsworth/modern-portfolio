import type { ReactNode } from "react";

type Props = {
  as?: "li" | "article" | "div";
  className?: string;
  children: ReactNode;
  labelledBy?: string;
};

// Shared surface for content blocks (jobs, case studies, etc.).
export default function Card({ as: Tag = "div", className = "", labelledBy, children }: Props) {
  return (
    <Tag
      aria-labelledby={labelledBy}
      className={`rounded-2xl border border-white/10 bg-slate-950/80 p-6 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-8 ${className}`}
    >
      {children}
    </Tag>
  );
}
