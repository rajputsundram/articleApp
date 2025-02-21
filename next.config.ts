/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeFonts: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all external domains
      },
    ],
  },
};

module.exports = nextConfig;
