export type PresetId = 'cardigan' | 'butterfly' | 'eyelet'
export type Colorway = 'raspberry' | 'offwhite'

export const TEX_W = 1024
export const TEX_H = 768

interface Palette {
  base: string
  shade: string
  hi: string
  accent: string
  accentHi: string
}

export const PALETTES: Record<Colorway, Palette> = {
  raspberry: {
    base: '#B83B5E',
    shade: '#6F2039',
    hi: '#DE7B98',
    accent: '#8A2745',
    accentHi: '#E58CA6',
  },
  offwhite: {
    base: '#EEE6D4',
    shade: '#B3A68C',
    hi: '#FFFFFF',
    accent: '#D9CBB0',
    accentHi: '#FFFFFF',
  },
}

export interface KnitMaps {
  color: HTMLCanvasElement
  height: HTMLCanvasElement
  alpha: HTMLCanvasElement | null
}

function rng(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeCanvas() {
  const c = document.createElement('canvas')
  c.width = TEX_W
  c.height = TEX_H
  return c
}

interface Ctxs {
  c: CanvasRenderingContext2D
  h: CanvasRenderingContext2D
}

function drawStitch(
  { c, h }: Ctxs,
  cx: number,
  cy: number,
  sw: number,
  sh: number,
  pal: Palette,
  rand: () => number,
  lift = 1,
) {
  for (const dir of [-1, 1]) {
    const x = cx + dir * sw * 0.23
    for (const ctx of [c, h]) {
      ctx.save()
      ctx.translate(x, cy)
      ctx.rotate(dir * 0.4)
    }
    const rx = sw * 0.27
    const ry = sh * 0.58
    const jitter = 0.88 + rand() * 0.12

    c.globalAlpha = jitter
    const cg = c.createRadialGradient(0, -ry * 0.2, 0, 0, 0, ry * 1.05)
    cg.addColorStop(0, pal.hi)
    cg.addColorStop(0.45, pal.base)
    cg.addColorStop(1, pal.shade)
    c.fillStyle = cg
    c.beginPath()
    c.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
    c.fill()

    const hg = h.createRadialGradient(0, 0, 0, 0, 0, ry * 1.05)
    const top = Math.round(255 * lift)
    hg.addColorStop(0, `rgb(${top},${top},${top})`)
    hg.addColorStop(1, 'rgb(70,70,70)')
    h.fillStyle = hg
    h.beginPath()
    h.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
    h.fill()

    c.globalAlpha = 1
    c.restore()
    h.restore()
  }
}

function stitchField(
  ctxs: Ctxs,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  sw: number,
  sh: number,
  pal: Palette,
  rand: () => number,
  lift = 1,
) {
  ctxs.c.save()
  ctxs.h.save()
  for (const ctx of [ctxs.c, ctxs.h]) {
    ctx.beginPath()
    ctx.rect(x0, y0, x1 - x0, y1 - y0)
    ctx.clip()
  }
  const rowStep = sh * 0.72
  for (let y = y0 - sh; y < y1 + sh; y += rowStep) {
    for (let x = x0 - sw; x < x1 + sw; x += sw) {
      drawStitch(ctxs, x + sw / 2, y, sw, sh, pal, rand, lift)
    }
  }
  ctxs.c.restore()
  ctxs.h.restore()
}

function baseFill(ctxs: Ctxs, pal: Palette) {
  ctxs.c.fillStyle = pal.shade
  ctxs.c.fillRect(0, 0, TEX_W, TEX_H)
  ctxs.h.fillStyle = 'rgb(30,30,30)'
  ctxs.h.fillRect(0, 0, TEX_W, TEX_H)
}

function ribBands(
  ctxs: Ctxs,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  bandW: number,
  pal: Palette,
) {
  let i = 0
  for (let x = x0; x < x1; x += bandW, i++) {
    const raised = i % 2 === 0
    ctxs.h.fillStyle = raised ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.5)'
    ctxs.h.fillRect(x, y0, bandW, y1 - y0)
    ctxs.c.fillStyle = raised ? hexA(pal.hi, 0.18) : hexA(pal.shade, 0.5)
    ctxs.c.fillRect(x, y0, bandW, y1 - y0)
  }
}

function hexA(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`
}

function flower(ctxs: Ctxs, x: number, y: number, r: number, pal: Palette) {
  const petals = 6
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * Math.PI * 2
    const px = x + Math.cos(a) * r * 0.75
    const py = y + Math.sin(a) * r * 0.75
    const g = ctxs.c.createRadialGradient(px - 2, py - 2, 0, px, py, r * 0.7)
    g.addColorStop(0, pal.accentHi)
    g.addColorStop(1, pal.accent)
    ctxs.c.fillStyle = g
    ctxs.c.beginPath()
    ctxs.c.arc(px, py, r * 0.55, 0, Math.PI * 2)
    ctxs.c.fill()

    const hg = ctxs.h.createRadialGradient(px, py, 0, px, py, r * 0.55)
    hg.addColorStop(0, '#ffffff')
    hg.addColorStop(1, 'rgb(150,150,150)')
    ctxs.h.fillStyle = hg
    ctxs.h.beginPath()
    ctxs.h.arc(px, py, r * 0.55, 0, Math.PI * 2)
    ctxs.h.fill()
  }
  ctxs.c.fillStyle = pal.shade
  ctxs.c.beginPath()
  ctxs.c.arc(x, y, r * 0.3, 0, Math.PI * 2)
  ctxs.c.fill()
  ctxs.h.fillStyle = 'rgb(90,90,90)'
  ctxs.h.beginPath()
  ctxs.h.arc(x, y, r * 0.3, 0, Math.PI * 2)
  ctxs.h.fill()
}

function button(ctxs: Ctxs, x: number, y: number, r: number, pal: Palette) {
  const g = ctxs.c.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r)
  g.addColorStop(0, pal.hi)
  g.addColorStop(0.6, pal.base)
  g.addColorStop(1, pal.shade)
  ctxs.c.fillStyle = g
  ctxs.c.beginPath()
  ctxs.c.arc(x, y, r, 0, Math.PI * 2)
  ctxs.c.fill()
  ctxs.c.strokeStyle = hexA(pal.shade, 0.7)
  ctxs.c.lineWidth = 2
  ctxs.c.stroke()
  const hg = ctxs.h.createRadialGradient(x, y, 0, x, y, r)
  hg.addColorStop(0, '#ffffff')
  hg.addColorStop(1, 'rgb(170,170,170)')
  ctxs.h.fillStyle = hg
  ctxs.h.beginPath()
  ctxs.h.arc(x, y, r, 0, Math.PI * 2)
  ctxs.h.fill()
}

function buildCardigan(ctxs: Ctxs, pal: Palette, rand: () => number) {
  baseFill(ctxs, pal)
  const hemY = TEX_H * 0.86
  stitchField(ctxs, 0, 0, TEX_W, hemY, 15, 20, pal, rand)
  stitchField(ctxs, 0, hemY, TEX_W, TEX_H, 10, 20, pal, rand)
  ribBands(ctxs, 0, hemY, TEX_W, TEX_H, 10, pal)

  const px = TEX_W / 2
  stitchField(ctxs, px - 34, 0, px + 34, hemY, 9, 16, pal, rand, 0.95)
  ribBands(ctxs, px - 34, 0, px + 34, hemY, 9, pal)
  ctxs.h.fillStyle = 'rgba(0,0,0,0.6)'
  ctxs.h.fillRect(px - 36, 0, 3, hemY)
  ctxs.h.fillRect(px + 33, 0, 3, hemY)

  for (let y = 90; y < hemY - 40; y += 118) button(ctxs, px, y, 17, pal)

  const flowers: [number, number, number][] = [
    [250, 150, 22],
    [330, 250, 18],
    [200, 330, 20],
    [380, 400, 16],
    [290, 520, 19],
    [750, 160, 21],
    [680, 260, 17],
    [820, 340, 20],
    [650, 430, 16],
    [740, 540, 19],
    [120, 220, 14],
    [900, 230, 15],
  ]
  for (const [x, y, r] of flowers) flower(ctxs, x, y, r, pal)
}

function butterflyPath(ctx: CanvasRenderingContext2D, s: number) {
  ctx.beginPath()
  for (const side of [1, -1]) {
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(side * 0.2 * s, -0.9 * s, side * 1.25 * s, -1.05 * s, side * 1.15 * s, -0.2 * s)
    ctx.bezierCurveTo(side * 0.9 * s, 0.0, side * 0.4 * s, 0.05 * s, 0, 0)
    ctx.moveTo(0, 0.05 * s)
    ctx.bezierCurveTo(side * 0.7 * s, 0.0, side * 1.0 * s, 0.55 * s, side * 0.55 * s, 0.75 * s)
    ctx.bezierCurveTo(side * 0.25 * s, 0.85 * s, side * 0.05 * s, 0.4 * s, 0, 0.05 * s)
  }
  ctx.moveTo(0.06 * s, 0.05 * s)
  ctx.ellipse(0, 0.05 * s, 0.06 * s, 0.5 * s, 0, 0, Math.PI * 2)
}

function buildButterfly(ctxs: Ctxs, alpha: CanvasRenderingContext2D, pal: Palette, rand: () => number) {
  baseFill(ctxs, pal)
  stitchField(ctxs, 0, 0, TEX_W, TEX_H, 13, 17, pal, rand, 0.7)

  alpha.fillStyle = '#ffffff'
  alpha.fillRect(0, 0, TEX_W, TEX_H)
  alpha.fillStyle = '#000000'
  let row = 0
  for (let y = 8; y < TEX_H; y += 11, row++) {
    for (let x = row % 2 ? 6 : 0; x < TEX_W; x += 12) {
      alpha.beginPath()
      alpha.ellipse(x, y, 3.4, 3.4, 0, 0, Math.PI * 2)
      alpha.fill()
    }
  }

  const spots: [number, number, number, number][] = [
    [190, 170, 78, -0.2],
    [520, 130, 66, 0.25],
    [840, 190, 82, -0.1],
    [330, 400, 70, 0.3],
    [680, 380, 84, -0.28],
    [110, 600, 72, 0.12],
    [470, 620, 80, -0.15],
    [820, 610, 70, 0.22],
    [940, 420, 52, 0.4],
  ]
  for (const [x, y, s, rot] of spots) {
    for (const ctx of [ctxs.c, ctxs.h, alpha]) {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rot)
    }
    butterflyPath(alpha, s)
    alpha.fillStyle = '#ffffff'
    alpha.fill('nonzero')

    butterflyPath(ctxs.h, s)
    ctxs.h.fillStyle = 'rgb(190,190,190)'
    ctxs.h.fill('nonzero')
    ctxs.h.strokeStyle = '#ffffff'
    ctxs.h.lineWidth = 5
    ctxs.h.stroke()

    butterflyPath(ctxs.c, s)
    ctxs.c.fillStyle = pal.base
    ctxs.c.fill('nonzero')
    ctxs.c.strokeStyle = pal.hi
    ctxs.c.lineWidth = 4
    ctxs.c.stroke()

    for (const ctx of [ctxs.c, ctxs.h, alpha]) ctx.restore()
  }
}

function buildEyelet(ctxs: Ctxs, alpha: CanvasRenderingContext2D, pal: Palette, rand: () => number) {
  baseFill(ctxs, pal)
  const hemY = TEX_H * 0.94
  stitchField(ctxs, 0, 0, TEX_W, TEX_H, 12, 17, pal, rand)

  const colW = 16
  const cols = Math.ceil(TEX_W / colW)
  for (let i = 0; i < cols; i++) {
    const x = i * colW
    const kind = i % 4
    if (kind === 2) {
      ctxs.h.fillStyle = 'rgba(255,255,255,0.45)'
      ctxs.h.fillRect(x, 0, colW, TEX_H)
      ctxs.c.fillStyle = hexA(pal.hi, 0.2)
      ctxs.c.fillRect(x, 0, colW, TEX_H)
    } else if (kind === 0) {
      ctxs.h.fillStyle = 'rgba(0,0,0,0.55)'
      ctxs.h.fillRect(x, 0, colW, TEX_H)
      ctxs.c.fillStyle = hexA(pal.shade, 0.45)
      ctxs.c.fillRect(x, 0, colW, TEX_H)
    }
  }

  alpha.fillStyle = '#ffffff'
  alpha.fillRect(0, 0, TEX_W, TEX_H)
  alpha.fillStyle = '#000000'
  for (let i = 0; i < cols; i += 4) {
    const cx = i * colW + colW / 2
    for (let y = 18; y < hemY - 10; y += 30) {
      alpha.beginPath()
      alpha.ellipse(cx, y, 4.2, 9.5, 0, 0, Math.PI * 2)
      alpha.fill()
    }
  }
}

export function buildKnitMaps(preset: PresetId, colorway: Colorway): KnitMaps {
  const color = makeCanvas()
  const height = makeCanvas()
  const c = color.getContext('2d')!
  const h = height.getContext('2d')!
  const ctxs: Ctxs = { c, h }
  const pal = PALETTES[colorway]
  const rand = rng(preset === 'cardigan' ? 7 : preset === 'butterfly' ? 21 : 42)

  if (preset === 'cardigan') {
    buildCardigan(ctxs, pal, rand)
    return { color, height, alpha: null }
  }

  const alphaCanvas = makeCanvas()
  const a = alphaCanvas.getContext('2d')!
  if (preset === 'butterfly') buildButterfly(ctxs, a, pal, rand)
  else buildEyelet(ctxs, a, pal, rand)
  return { color, height, alpha: alphaCanvas }
}

export interface PresetInfo {
  id: PresetId
  label: string
  short: string
  structure: string
  stitch: string
  detail: string
  edge: string
  ruffle: boolean
  photos: Record<Colorway, string>
}

export const PRESETS: PresetInfo[] = [
  {
    id: 'cardigan',
    label: 'Hand-Embroidered Wool Cardigan',
    short: 'Embroidered Cardigan',
    structure: 'Stockinette ground with 1x1 rib hem and button placket',
    stitch: 'Jersey knit, 7G',
    detail: 'Hand-applied floral clusters sit proud of a smooth knit face; knit-covered buttons run down a rib placket.',
    edge: 'Ribbed hem, ruffled neckline',
    ruffle: false,
    photos: {
      raspberry: '/images/products/yh-01.jpg',
      offwhite: '/images/products/yh-07.jpg',
    },
  },
  {
    id: 'butterfly',
    label: '3D Embossed Butterfly Openwork',
    short: 'Butterfly Openwork',
    structure: 'Hollow-out mesh ground with embossed butterfly relief',
    stitch: 'Openwork + relief jacquard, 7G',
    detail: 'Dense butterfly motifs are knitted in relief over a perforated ground, balanced so the base layer stays non-sheer.',
    edge: 'Lettuce-edge hem',
    ruffle: true,
    photos: {
      raspberry: '/images/products/bf-00-front.jpg',
      offwhite: '/images/products/bf-00-front.jpg',
    },
  },
  {
    id: 'eyelet',
    label: 'White Tea Eyelet Ribbed Knit',
    short: 'Eyelet Ribbed Knit',
    structure: 'Vertical eyelet columns between raised knit ribs',
    stitch: 'Pointelle rib, 7G',
    detail: 'Every fourth wale is an open eyelet column; raised ribs on either side keep the body shape and opacity.',
    edge: 'Lettuce-edge neck, hem and cuffs',
    ruffle: true,
    photos: {
      raspberry: '/images/products/bc-01-front-a.jpg',
      offwhite: '/images/products/bc-01-front-a.jpg',
    },
  },
]
