"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { Recommendation } from "@/lib/profile";

// `image` must already include any base path (resolved by the page with asset()).
type Props = { items: Recommendation[]; headingId: string };

// First letters of the first and last name, used when a recommender has no portrait.
const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400";

// Slow on purpose: the quotes are long and need time to read.
const ROTATE_MS = 12000;

// Accessible carousel of recommendations (WAI-ARIA carousel pattern). It rotates
// slowly on its own, and meets WCAG 2.2.2 by: starting paused for users who prefer
// reduced motion, pausing while the pointer or keyboard focus is inside, and offering
// a Pause/Play button. Every slide stays in the DOM and inactive slides are `hidden`,
// so only the current one is exposed to assistive tech. With a single
// recommendation the controls and rotation are omitted.
export default function RecommendationCarousel({ items, headingId }: Props) {
  const [index, setIndex] = useState(0);
  // null = follow the user's motion preference until they press Pause/Play
  const [choice, setChoice] = useState<boolean | null>(null);
  // True while the pointer or keyboard focus is inside the carousel.
  const [engaged, setEngaged] = useState(false);
  const count = items.length;

  // Respect prefers-reduced-motion: those users start paused (server renders as playing).
  const reducedMotion = useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const playing = choice ?? !reducedMotion;

  const rotating = playing && !engaged && count > 1;
  useEffect(() => {
    if (!rotating) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % count),
      ROTATE_MS,
    );
    return () => clearInterval(timer);
  }, [rotating, count]);

  if (count === 0) return null;

  const go = (i: number) => setIndex((i + count) % count);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-labelledby={headingId}
      className="mt-8"
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      onFocus={() => setEngaged(true)}
      onBlur={(e) => {
        // Only resume when focus leaves the carousel entirely
        if (!e.currentTarget.contains(e.relatedTarget)) setEngaged(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
    >
      <div className="group relative">
        {items.map((t, i) => (
          <div
            key={t.name}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            hidden={i !== index}
          >
            <figure>
              {t.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={t.image}
                  alt={`Portrait of ${t.name}`}
                  width={144}
                  height={144}
                  loading="lazy"
                  className="mx-auto h-36 w-36 rounded-full object-cover"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-blue-900 text-4xl font-semibold text-blue-100"
                >
                  {initials(t.name)}
                </div>
              )}
              <blockquote className="mt-6 text-left text-lg leading-relaxed text-slate-200">
                <p>“{t.quote}”</p>
              </blockquote>
              <figcaption className="mt-4">
                <span className="block text-xl font-semibold text-white">
                  {t.name}
                </span>
                <span className="text-blue-300">
                  {t.role}
                  {t.company ? `, ${t.company}` : ""}
                </span>
              </figcaption>
            </figure>
          </div>
        ))}
        {count > 1 && (
          // Icon-only pause/play, centered over the slide. Revealed on hover (a tap on touch
          // screens) or keyboard focus, so it never covers the quote unless asked for.
          <button
            type="button"
            onClick={() => setChoice(!playing)}
            className={`absolute left-1/2 top-1/2 z-10 inline-flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-blue-300 bg-slate-950/85 text-white pointer-events-none opacity-0 transition-opacity hover:bg-blue-400 hover:text-slate-950 focus-visible:pointer-events-auto focus-visible:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100 motion-reduce:transition-none ${focus}`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-14 w-14"
              fill="currentColor"
            >
              {playing ? (
                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
              ) : (
                <path d="M8 5v14l11-7z" />
              )}
            </svg>
            <span className="sr-only">
              {playing ? "Pause" : "Play"} automatic rotation
            </span>
          </button>
        )}
      </div>

      {count > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(index - 1)}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-blue-400/60 text-blue-200 hover:bg-blue-400 hover:text-slate-950 ${focus}`}
          >
            <span aria-hidden="true">←</span>
            <span className="sr-only">Previous recommendation</span>
          </button>
          <div className="flex items-center gap-1">
            {items.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => go(i)}
                aria-current={i === index ? "true" : undefined}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${focus}`}
              >
                <span
                  aria-hidden="true"
                  className={`block h-3 w-3 rounded-full ${i === index ? "bg-blue-300" : "bg-slate-600"}`}
                />
                <span className="sr-only">
                  Show recommendation from {t.name}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-blue-400/60 text-blue-200 hover:bg-blue-400 hover:text-slate-950 ${focus}`}
          >
            <span aria-hidden="true">→</span>
            <span className="sr-only">Next recommendation</span>
          </button>
        </div>
      )}
      {/* Announces slide changes only when the user is in control; stays quiet during auto-rotation */}
      <p className="sr-only" aria-live={rotating ? "off" : "polite"}>
        {count > 1
          ? `Recommendation ${index + 1} of ${count}: ${items[index].name}`
          : ""}
      </p>
    </div>
  );
}
