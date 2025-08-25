import type { NextConfig } from "next";
import fs from "fs";
import path from "path";
function isDevToolsEnabled(): boolean {
  const root = process.cwd();
  const enabled = fs.existsSync(path.join(root, ".devtools.enabled"));
  const disabled = fs.existsSync(path.join(root, ".devtools.disabled"));

  if (enabled && !disabled) return true;
  if (disabled && !enabled) return false;

  // Default → disabled in production, enabled in dev
  return process.env.NODE_ENV !== "production";
}
const devToolsEnabled = isDevToolsEnabled();

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (!dev && !devToolsEnabled) {
      // Replace dev-tools imports with empty module in production
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        "@/components/dev-tools": path.resolve(__dirname, "empty.js"),
      };
    }
    return config;
  },
  /* config options here */
    images: {
    domains: ["picsum.photos"], // ✅ allow external images
  },
};

export default nextConfig;
