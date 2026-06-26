import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Turbopack doesn't pick up a
  // stray lockfile from a parent directory (e.g. C:\Users\itsha).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
