export const SERVICE_GUARD_VERSION = '2026.10.1'
export const SERVICE_EXPIRY_PROTOCOL_VERSION = 1

const EXCLUDED_PREFIXES = [
  '/admin',
  '/admin/login',
  '/admin/logout',
  '/login',
  '/api',
  '/_next',
  '/service-expired',
  '/favicon.ico',
  '/icon.svg',
  '/brand-logo.svg',
  '/robots.txt',
  '/sitemap.xml',
]

export function isServiceGuardExcludedPath(pathname: string): boolean {
  const clean = pathname || '/'
  if (EXCLUDED_PREFIXES.some((prefix) => clean === prefix || clean.startsWith(`${prefix}/`))) {
    return true
  }
  return /\.(?:svg|png|jpe?g|webp|ico|css|js|map|txt|xml|woff2?)$/i.test(clean)
}

export async function isWebsiteServiceAvailable(options?: {
  tenantId?: string
  adminOrigin?: string
  timeoutMs?: number
  fetchImpl?: typeof fetch
}): Promise<boolean> {
  const tenantId = (
    options?.tenantId ||
    process.env.NEXT_PUBLIC_TENANT_ID ||
    '3730d1b9-f198-4ca8-a78e-3565d338d1b5'
  ).trim()
  const adminOrigin = (
    options?.adminOrigin ||
    process.env.HUANQIU_ADMIN_ORIGIN ||
    process.env.NEXT_PUBLIC_ADMIN_URL ||
    'https://admin.globle-trade.com'
  ).replace(/\/$/, '')
  const timeoutMs = options?.timeoutMs ?? 1500
  const fetchFn = options?.fetchImpl ?? fetch

  if (!tenantId || !adminOrigin) return true

  try {
    const res = await fetchFn(
      `${adminOrigin}/api/public/service-status/${encodeURIComponent(tenantId)}`,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
        cache: 'no-store',
        signal: AbortSignal.timeout(timeoutMs),
      },
    )
    if (!res.ok) return true
    const data = await res.json().catch(() => null)
    if (!data || typeof data !== 'object') return true
    if (data.version !== SERVICE_EXPIRY_PROTOCOL_VERSION) return true
    if (data.available === false && data.status === 'expired') {
      return false
    }
    return true
  } catch {
    return true
  }
}
