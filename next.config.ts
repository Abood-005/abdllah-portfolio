import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export -> deploys anywhere (Vercel, Netlify, GitHub Pages, S3).
  // Remove `output` if you later add server-side features (API routes, ISR).
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
