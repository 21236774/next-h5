/** @type {import('next').NextConfig} */
import path from 'path';

const currentDir = new URL(import.meta.url).pathname;
const resolvedCurrentDir = path.dirname(currentDir)
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(resolvedCurrentDir, 'styles')],
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  pretter: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      }
    ]
  }
};

export default nextConfig;
