import { createHmac, randomBytes } from 'node:crypto'
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { TENANT_ID } from '@/lib/site'

const CHARS = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
const SECRET = process.env.CAPTCHA_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || 'xgzzfs-captcha-signing-key-2026'

function generateCode(len = 4) {
  const bytes = randomBytes(len)
  let out = ''
  for (let i = 0; i < len; i++) {
    out += CHARS[bytes[i] % CHARS.length]
  }
  return out
}

export function signCaptchaPayload(payload: string) {
  return createHmac('sha256', SECRET).update(payload).digest('hex')
}

function renderCaptchaSvg(code: string) {
  const bg = '#FAF9F7'
  const colors = ['#14171F', '#B83B5E', '#1D4ED8', '#2C3545']
  const letters = code
    .split('')
    .map((ch, idx) => {
      const x = 18 + idx * 28
      const y = 30 + ((idx % 2 === 0 ? -2 : 3))
      const rot = (idx % 2 === 0 ? -1 : 1) * (6 + (idx * 3) % 7)
      const fill = colors[idx % colors.length]
      return `<text x="${x}" y="${y}" fill="${fill}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="24" font-weight="700" transform="rotate(${rot} ${x} ${y})">${ch}</text>`
    })
    .join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="132" height="42" viewBox="0 0 132 42" role="img" aria-label="Verification code">
  <rect width="132" height="42" rx="6" fill="${bg}" stroke="#E5E0D8" />
  <path d="M8 14 Q 66 28, 124 12" stroke="#D6CFC4" stroke-width="1.2" fill="none" />
  <path d="M12 31 Q 64 16, 120 33" stroke="#E5E0D8" stroke-width="1.2" fill="none" />
  ${letters}
</svg>`
}

export async function GET(request: NextRequest) {
  const rawScope = request.nextUrl.searchParams.get('scope') || 'default'
  const scope = rawScope.replace(/[^a-z0-9_-]/gi, '').slice(0, 48) || 'default'
  const code = generateCode(4)
  const challengeId = randomBytes(16).toString('hex')
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()

  // Persist challenge in shared Supabase inquiry_captcha_challenges when configured
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (url && key) {
    try {
      const supabase = createClient(url, key, { auth: { persistSession: false } })
      const codeHash = signCaptchaPayload(`${challengeId}:${scope}:${code.toUpperCase()}`)
      await supabase.from('inquiry_captcha_challenges').insert({
        id: challengeId,
        tenant_id: TENANT_ID,
        scope,
        answer_hash: codeHash,
        expires_at: expiresAt,
      })
    } catch {
      // Fall back cleanly to HMAC-bound token if table schema differs
    }
  }

  const tokenPayload = `${challengeId}.${scope}.${Date.parse(expiresAt)}`
  const sig = signCaptchaPayload(`${tokenPayload}.${code.toUpperCase()}`)
  const token = `${tokenPayload}.${sig}`

  const svg = renderCaptchaSvg(code)
  const response = new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'X-Captcha-Scope': scope,
    },
  })
  response.cookies.set(`xg_captcha_${scope}`, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 600,
  })
  return response
}
