import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: '/silver-crystal-horoscope',
  assetPrefix: '/silver-crystal-horoscope'
};

export default nextConfig;
