/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.icons8.com", "ssl.gstatic.com"],
  },
  experimental: {
    transpilePackages: ["@next-auth/firebase-adapter"],
  },
};

module.exports = nextConfig;
