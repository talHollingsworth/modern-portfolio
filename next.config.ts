import type { NextConfig } from "next";

// Static export for GitHub Pages. Leave BASE_PATH unset for the root site
// (talhollingsworth.github.io); set it (e.g. "/modern-portfolio") only when
// hosting under a repo sub-path. It's exposed to code as NEXT_PUBLIC_BASE_PATH.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
