import type { NextConfig } from "next";

// Set BASE_PATH (e.g. "/modern-portfolio") when hosting under a repo sub-path.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
