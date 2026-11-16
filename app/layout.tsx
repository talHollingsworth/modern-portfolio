import type { Metadata } from "next";
import "./globals.css";

// Page title and description used by browsers and search engines.
export const metadata: Metadata = {
  title: "Tal Hollingsworth | Web Developer",
  description:
    "Portfolio of Tal Hollingsworth, a front end web developer with 5+ years of enterprise experience.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <body className="bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
