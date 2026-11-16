"use client";

import { useState } from "react";

// Label + section id for each nav entry; ids must match the <section id> in app/page.tsx.
const links = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Case Studies", "#case-studies"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Education", "#education"],
  ["Contact", "#contact"],
] as const;

// Fixed top bar. Below the md breakpoint the links collapse behind a Menu button
// (aria-expanded/aria-controls keep it screen-reader friendly).
export default function Nav({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const link =
    "block rounded px-3 py-2 text-slate-100 hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#top" className={`${link} font-semibold`}>
          {name}
        </a>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-white/30 text-slate-100 md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen(!open)}
        >
          {/* Hamburger when closed, X when open; the text label stays for screen readers */}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
          <span className="sr-only">{open ? "Close menu" : "Menu"}</span>
        </button>
        <ul
          id="nav-links"
          className={`${open ? "block" : "hidden"} absolute inset-x-0 top-full bg-slate-950 p-2 md:static md:flex md:bg-transparent md:p-0`}
        >
          {/* Selecting a link also closes the mobile menu */}
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className={link} onClick={() => setOpen(false)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
