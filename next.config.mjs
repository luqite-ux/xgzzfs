/** @type {import('next').NextConfig} */
const ADMIN_ORIGIN = (
  process.env.HUANQIU_ADMIN_ORIGIN ||
  process.env.NEXT_PUBLIC_ADMIN_URL ||
  'https://admin.globle-trade.com'
).replace(/\/$/, '')

const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      { source: '/admin', destination: `${ADMIN_ORIGIN}/login` },
      { source: '/admin/login', destination: `${ADMIN_ORIGIN}/login` },
      { source: '/admin/:path*', destination: `${ADMIN_ORIGIN}/:path*` },
      { source: '/login', destination: `${ADMIN_ORIGIN}/login` },
      { source: '/api/auth/:path*', destination: `${ADMIN_ORIGIN}/api/auth/:path*` },
      { source: '/api/admin/:path*', destination: `${ADMIN_ORIGIN}/api/admin/:path*` },
      { source: '/api/public/analytics.js', destination: `${ADMIN_ORIGIN}/api/public/analytics.js` },
      { source: '/api/public/analytics/:path*', destination: `${ADMIN_ORIGIN}/api/public/analytics/:path*` },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
