import { NextResponse, type NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import crypto from 'node:crypto'
import { createClient } from '@supabase/supabase-js'
import { SESSION_COOKIE, TENANT_COOKIE } from '@/lib/admin-session'

export async function POST(request: NextRequest) {
  const form = await request.formData()
  const email = String(form.get('email') || '').trim().toLowerCase()
  const password = String(form.get('password') || '')

  const failRedirect = (msg: string) => {
    const url = new URL('/admin/login', request.url)
    url.searchParams.set('error', msg)
    return NextResponse.redirect(url, 303)
  }

  if (!email || !password) {
    return failRedirect('Email and password are required.')
  }

  const tenantId = (
    process.env.NEXT_PUBLIC_TENANT_ID ||
    '3730d1b9-f198-4ca8-a78e-3565d338d1b5'
  ).trim()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

  if (!tenantId || !supabaseUrl || !serviceKey) {
    return failRedirect('Site authentication configuration is incomplete.')
  }

  try {
    const db = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })

    const { data: user, error } = await db
      .from('admin_users')
      .select('id,email,password_hash,tenant_id,role,is_active')
      .eq('email', email)
      .eq('tenant_id', tenantId)
      .maybeSingle()

    if (error || !user || !user.is_active) {
      return failRedirect('Invalid email or password.')
    }

    const ok = await bcrypt.compare(password, user.password_hash)
    if (!ok) {
      return failRedirect('Invalid email or password.')
    }

    const token = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

    const { error: sessErr } = await db.from('admin_user_sessions').insert({
      admin_user_id: user.id,
      token,
      expires_at: expiresAt,
      ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
      user_agent: request.headers.get('user-agent') || null,
    })

    if (sessErr) {
      return failRedirect('Unable to create session. Please try again.')
    }

    await db
      .from('admin_users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', user.id)

    const res = NextResponse.redirect(new URL('/admin', request.url), 303)
    const isProd = process.env.NODE_ENV === 'production'
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProd,
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })
    res.cookies.set(TENANT_COOKIE, tenantId, {
      httpOnly: false,
      sameSite: 'lax',
      secure: isProd,
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })
    return res
  } catch {
    return failRedirect('Authentication service error. Please try again.')
  }
}
