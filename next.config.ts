import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [55, 75, 90, 100],
  },
};

export default nextConfig;
