"use client";

import { useState } from "react";

const links = [
  ["About", "#about"],
  ["Case Studies", "#case-studies"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Education", "#education"],
  ["Contact", "#contact"],
] as const;

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
          className="rounded border border-white/30 px-3 py-2 text-slate-100 md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close menu" : "Menu"}
        </button>
        <ul
          id="nav-links"
          className={`${open ? "block" : "hidden"} absolute inset-x-0 top-full bg-slate-950 p-2 md:static md:flex md:bg-transparent md:p-0`}
        >
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
