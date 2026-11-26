import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { signCaptchaPayload } from '@/app/api/captcha/route'
import { TENANT_ID } from '@/lib/site'

const consumedTokens = new Set<string>()

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const company = String(body.company || '').trim()
  const product = String(body.product || '').trim()
  const quantity = String(body.quantity || '').trim()
  const message = String(body.message || '').trim()
  const captcha = String(body.captcha || '').trim().toUpperCase()
  const rawScope = String(body.captchaScope || 'default')
  const scope = rawScope.replace(/[^a-z0-9_-]/gi, '').slice(0, 48) || 'default'

  const errors: Record<string, string> = {}
  if (!name) errors.name = 'Please enter your name.'
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.'
  if (!message) errors.message = 'Please share your inquiry details.'
  if (!captcha || captcha.length !== 4) errors.captcha = 'Please enter the 4-character verification code.'

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Validation failed', errors }, { status: 400 })
  }

  // Verify and atomically consume CAPTCHA challenge BEFORE writing to inquiries
  const cookieName = `xg_captcha_${scope}`
  const token = request.cookies.get(cookieName)?.value || ''
  const parts = token.split('.')
  if (parts.length !== 4) {
    return NextResponse.json(
      { error: 'Verification code expired. Please refresh and try again.', errors: { captcha: 'Verification code expired. Please refresh.' } },
      { status: 400 },
    )
  }

  const [challengeId, tokenScope, expiresMsStr, expectedSig] = parts
  const expiresMs = Number(expiresMsStr)
  if (tokenScope !== scope || !Number.isFinite(expiresMs) || Date.now() > expiresMs) {
    return NextResponse.json(
      { error: 'Verification code expired. Please refresh and try again.', errors: { captcha: 'Verification code expired. Please refresh.' } },
      { status: 400 },
    )
  }

  const actualSig = signCaptchaPayload(`${challengeId}.${tokenScope}.${expiresMsStr}.${captcha}`)
  if (actualSig !== expectedSig || consumedTokens.has(challengeId)) {
    return NextResponse.json(
      { error: 'Verification code does not match.', errors: { captcha: 'Incorrect verification code. Please try again.' } },
      { status: 400 },
    )
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (url && key) {
    const supabase = createClient(url, key, { auth: { persistSession: false } })
    // Attempt atomic consume in shared DB challenge store
    try {
      const { data: consumed } = await supabase
        .from('inquiry_captcha_challenges')
        .update({ consumed_at: new Date().toISOString() })
        .eq('id', challengeId)
        .eq('tenant_id', TENANT_ID)
        .eq('scope', scope)
        .is('consumed_at', null)
        .select('id')
        .maybeSingle()
      if (consumed === null) {
        // Check if challenge row existed & was already consumed
        const { data: existing } = await supabase
          .from('inquiry_captcha_challenges')
          .select('id, consumed_at')
          .eq('id', challengeId)
          .maybeSingle()
        if (existing?.consumed_at) {
          return NextResponse.json(
            { error: 'Verification code already used. Please refresh.', errors: { captcha: 'Verification code already used.' } },
            { status: 400 },
          )
        }
      }
    } catch {
      // Continue with HMAC + memory replay guard
    }

    consumedTokens.add(challengeId)

    const fullMessage = [
      product ? `Product Interest: ${product}` : '',
      quantity ? `Estimated Quantity: ${quantity}` : '',
      message,
    ]
      .filter(Boolean)
      .join('\n')

    const { error: insertErr } = await supabase.from('inquiries').insert({
      tenant_id: TENANT_ID,
      name,
      email,
      company: company || null,
      product_name: product || null,
      message: fullMessage,
      source_page: String(body.sourcePage || '/contact'),
      status: 'new',
    })

    if (insertErr) {
      return NextResponse.json({ error: 'Unable to submit inquiry right now. Please email info@xgzzfs.com.' }, { status: 500 })
    }
  } else {
    consumedTokens.add(challengeId)
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.delete(cookieName)
  return res
}
