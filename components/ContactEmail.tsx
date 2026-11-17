"use client";

import { useState } from "react";

// The address is never written into the HTML or the JSON-LD, and it is stored reversed and
// base64-encoded here, so scrapers that harvest "mailto:" links or email-shaped text from the
// page source don't find it. It is only decoded in the browser after a real click/keypress.
const ENCODED = "dGVuLmxpYW1zc2FwQDhpMGUyLm9pbG9mdHJvcA==";
const decode = () => [...atob(ENCODED)].reverse().join("");

// "Email me" button. Click opens the visitor's mail app and also reveals the address as text,
// so people without a configured mail client can still copy it.
export default function ContactEmail({ className }: { className: string }) {
  const [address, setAddress] = useState<string | null>(null);

  return (
    <>
      <button
        type="button"
        className={`tip-host ${className}`}
        onClick={() => {
          const email = decode();
          setAddress(email);
          window.location.href = `mailto:${email}?subject=${encodeURIComponent("Hello from your portfolio")}`;
        }}
      >
        {/* Envelope icon; the sr-only text provides the accessible name */}
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
        <span className="sr-only">Email me</span>
        <span className="tip" aria-hidden="true">Email me</span>
      </button>
      {/* Announced to screen readers when it appears after the click */}
      {/* order-last keeps the revealed address below the icon row */}
      <span role="status" className={address ? "order-last w-full text-slate-200" : "sr-only"}>
        {address ? `Or copy: ${address}` : ""}
      </span>
    </>
  );
}
