/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable caching in development to prevent file lock issues
      config.cache = false;
    }
    return config;
  },
}

module.exports = nextConfig
