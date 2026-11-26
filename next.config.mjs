/** @type {import('next').NextConfig} */
const ADMIN_ORIGIN = (
  process.env.NEXT_PUBLIC_ADMIN_URL ||
  process.env.HUANQIU_ADMIN_ORIGIN ||
  'https://admin.globle-trade.com'
)
  .trim()
  .replace(/[\r\n]/g, '')
  .replace(/\/$/, '')

const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    if (!ADMIN_ORIGIN) return []
    return {
      afterFiles: [
        { source: '/admin', destination: `${ADMIN_ORIGIN}/admin` },
        { source: '/admin/:path*', destination: `${ADMIN_ORIGIN}/admin/:path*` },
        { source: '/api/admin/:path*', destination: `${ADMIN_ORIGIN}/api/admin/:path*` },
        { source: '/api/public/analytics.js', destination: `${ADMIN_ORIGIN}/api/public/analytics.js` },
        { source: '/api/public/analytics/:path*', destination: `${ADMIN_ORIGIN}/api/public/analytics/:path*` },
      ],
    }
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
