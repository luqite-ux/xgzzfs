import { NextResponse, type NextRequest } from 'next/server'
import {
  isServiceGuardExcludedPath,
  isWebsiteServiceAvailable,
} from '@/lib/service-status'

const SESSION_COOKIE = 'hq_admin_session'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isPublicAdmin =
    pathname === '/admin/login' ||
    pathname.startsWith('/admin/login/') ||
    pathname === '/admin/logout' ||
    pathname.startsWith('/admin/logout/')

  if (!isPublicAdmin && (pathname === '/admin' || pathname.startsWith('/admin/'))) {
    if (!request.cookies.get(SESSION_COOKIE)?.value) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = '/admin/login'
      loginUrl.searchParams.set('reason', 'unauthorized')
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

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
