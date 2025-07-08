import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      hostname: "**.ufs.sh"
    }]
  }
};  

export default nextConfig;
