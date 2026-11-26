import { createHmac, randomInt, timingSafeEqual } from 'node:crypto'

const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const SECRET = process.env.CAPTCHA_SECRET ?? 'xigong-captcha-dev-secret'
export const CAPTCHA_COOKIE = 'xg_captcha'
export const CAPTCHA_TTL_SECONDS = 600

export function newCode() {
  let code = ''
  for (let i = 0; i < 4; i++) code += CHARSET[randomInt(CHARSET.length)]
  return code
}

function sign(code: string, exp: number) {
  return createHmac('sha256', SECRET).update(`${code}:${exp}`).digest('hex')
}

export function createToken(code: string) {
  const exp = Date.now() + CAPTCHA_TTL_SECONDS * 1000
  return `${exp}.${sign(code, exp)}`
}

export function verifyCaptcha(input: string, token: string | undefined) {
  if (!token || input.length !== 4) return false
  const [expRaw, sig] = token.split('.')
  const exp = Number(expRaw)
  if (!exp || !sig || exp < Date.now()) return false
  const expected = Buffer.from(sign(input.toUpperCase(), exp))
  const given = Buffer.from(sig)
  return expected.length === given.length && timingSafeEqual(expected, given)
}

export function renderSvg(code: string) {
  const w = 148
  const h = 48
  const colors = ['#14171F', '#1D4ED8', '#B83B5E', '#525A69']
  const glyphs = [...code]
    .map((ch, i) => {
      const x = 22 + i * 32 + randomInt(-3, 4)
      const y = 32 + randomInt(-4, 5)
      const rot = randomInt(-22, 23)
      const fill = colors[randomInt(colors.length)]
      return `<text x="${x}" y="${y}" font-family="ui-monospace,Menlo,monospace" font-size="28" font-weight="700" fill="${fill}" transform="rotate(${rot} ${x} ${y})">${ch}</text>`
    })
    .join('')
  let noise = ''
  for (let i = 0; i < 5; i++) {
    noise += `<path d="M${randomInt(0, 20)} ${randomInt(4, 44)} Q ${randomInt(40, 100)} ${randomInt(0, 48)} ${randomInt(120, 148)} ${randomInt(4, 44)}" stroke="#B9B1A3" stroke-width="1.2" fill="none"/>`
  }
  for (let i = 0; i < 22; i++) {
    noise += `<circle cx="${randomInt(0, w)}" cy="${randomInt(0, h)}" r="1" fill="#C9C1B2"/>`
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="#F2EFEA"/>${noise}${glyphs}</svg>`
}
