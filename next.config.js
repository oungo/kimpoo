/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
        port: '',
        pathname: '/coins/images/**',
      },
      {
        protocol: 'https',
        hostname: 'static.upbit.com',
        port: '',
        pathname: '/logos/**',
      },
    ],
  },
};

module.exports = nextConfig;
