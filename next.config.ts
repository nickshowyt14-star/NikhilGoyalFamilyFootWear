import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Local images live in /public/images. No remote hosts are required at runtime,
    // which keeps the site fast, self-contained and privacy-friendly.
  },
};

export default nextConfig;
