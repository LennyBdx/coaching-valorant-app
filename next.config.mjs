/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'media.valorant-api.com' },
    ],
  },
  webpack: (config) => {
    // Konva looks for the `canvas` package in Node.js — we only run it client-side
    config.externals = [...(config.externals ?? []), { canvas: 'canvas' }];
    return config;
  },
};

export default nextConfig;
