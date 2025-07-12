// next.config.ts
import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "**.ufs.sh"
      }
    ]
  },
  webpack(config) {
    config.snapshot = {
      ...config.snapshot,
      managedPaths: [
        path.resolve("C:/Users/Home/Application Data"),
        path.resolve("C:/Users/Home/Cookies"),
      ],
    };
    config.watchOptions = {
      ignored: [
        "**/node_modules",
        "**/.next",
        path.resolve("C:/Users/Home/Application Data"),
        path.resolve("C:/Users/Home/Cookies"),
      ]
    };
    return config;
  }
};

export default nextConfig;
