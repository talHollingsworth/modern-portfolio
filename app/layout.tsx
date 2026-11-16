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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <body className="bg-slate-950 text-slate-100">
        {/* Structured data: tells search engines who the site is about */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
