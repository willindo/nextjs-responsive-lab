import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: ["picsum.photos", "images.unsplash.com"], // <- list multiple domains here
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos", // <- only one string
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net", // <- only one string
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // <- second one as a new object
        pathname: "**",
      },
    ],
  },
};
export default nextConfig;
