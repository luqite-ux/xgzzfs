import { NextResponse, type NextRequest } from 'next/server'
import {
  isServiceGuardExcludedPath,
  isWebsiteServiceAvailable,
} from '@/lib/service-expiry-guard'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (isServiceGuardExcludedPath(pathname)) {
    return NextResponse.next()
  }

  const available = await isWebsiteServiceAvailable()
  if (!available) {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = '/service-expired'
    return NextResponse.rewrite(rewriteUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
