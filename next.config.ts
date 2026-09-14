import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "",
  images: {
    unoptimized: true,
  },
  pageExtensions: ["ts", "tsx"],
};

export default nextConfig;
