import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, TENANT_COOKIE } from '@/lib/admin-session'

export async function GET(request: NextRequest) {
  const res = NextResponse.redirect(new URL('/admin/login', request.url), 303)
  res.cookies.delete(SESSION_COOKIE)
  res.cookies.delete(TENANT_COOKIE)
  return res
}

export async function POST(request: NextRequest) {
  return GET(request)
}
