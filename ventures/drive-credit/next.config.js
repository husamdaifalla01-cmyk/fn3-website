/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return [
      {
        source: '/yendo-review',
        destination: '/yendo-credit-card-review',
        permanent: true,
      },
      {
        source: '/tiktok',
        destination: '/links',
        permanent: false,
      },
    ]
  },
}
module.exports = nextConfig
