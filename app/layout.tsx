import type { Metadata, Viewport } from "next";
import "./globals.css";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_TITLE, SITE_URL, personJsonLd } from "@/lib/seo";

// Title, description, canonical URL and social cards used by search engines and link previews.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Tal Hollingsworth",
    "senior web developer",
    "frontend engineer",
    "Next.js",
    "React",
    "TypeScript",
    "web accessibility",
    "WCAG",
  ],
  authors: [{ name: "Tal Hollingsworth", url: SITE_URL }],
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Tal Hollingsworth",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Tal Hollingsworth, Senior Web Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

// Browser UI color on mobile
export const viewport: Viewport = { themeColor: "#020617" };

// GitHub Pages can't send response headers, so the CSP is delivered as a <meta> tag. Inline
// scripts/styles are required by Next's static export; everything else is locked to this origin.
// Production only: the dev server needs eval for hot reload.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join("; ");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <head>
        {process.env.NODE_ENV === "production" && (
          <meta httpEquiv="Content-Security-Policy" content={csp} />
        )}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body className="bg-slate-950 text-slate-100">
        {/* Structured data: tells search engines who the site is about. "<" is escaped so
            profile text can never close the script tag. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
