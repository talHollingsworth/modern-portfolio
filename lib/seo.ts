import { profile } from "@/lib/profile";

// Public origin used for canonical URLs, the sitemap and social cards.
// Override with SITE_URL when the site moves to a custom domain.
export const SITE_ORIGIN = process.env.SITE_URL ?? "https://talhollingsworth.github.io";

// Full site URL including the optional sub-path (BASE_PATH), with a trailing slash
export const SITE_URL = `${SITE_ORIGIN}${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`;

export const SITE_TITLE = `${profile.name} | Senior Web Developer & Frontend Engineer`;

// Kept under ~160 characters so search engines don't truncate the snippet
export const SITE_DESCRIPTION =
  "Portfolio of Tal Hollingsworth, a senior frontend engineer building accessible, high-performing Next.js and React experiences for fintech and enterprise teams.";

// 1200x630 social preview image (see public/img/og-image.jpg)
export const OG_IMAGE = "img/og-image.jpg";

// schema.org Person data so search engines can connect the site to the LinkedIn/GitHub profiles
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  jobTitle: "Senior Web Developer",
  description: SITE_DESCRIPTION,
  image: `${SITE_URL}${OG_IMAGE}`,
  sameAs: [profile.linkedin, profile.github],
  knowsAbout: profile.skills,
};
