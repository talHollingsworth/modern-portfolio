import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Required so the route is written out at build time (the site is a static export)
export const dynamic = "force-static";

// Single-page site: one URL
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, changeFrequency: "monthly", priority: 1 }];
}
