import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "**.ufs.sh",
      },
    ],
  },
  webpack(config, { isServer }) {
    // Skip system paths that cause permission issues
    config.module.rules.push({
      test: /\.(js|ts|tsx)$/,
      exclude: [
        /node_modules/,
        path.resolve("C:/Users/Home/Application Data"),
        path.resolve("C:/Users/Home/Cookies"),
      ],
    });

    return config;
  },
};

export default nextConfig;
