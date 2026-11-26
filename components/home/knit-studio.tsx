'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Grid3x3, Move3d, RotateCcw } from 'lucide-react'
import { KnitScene } from '@/lib/knit-scene'
import { PRESETS, type Colorway, type PresetId } from '@/lib/knit-textures'
import { cn } from '@/lib/utils'

const COLORWAYS: { id: Colorway; label: string; swatch: string }[] = [
  { id: 'raspberry', label: 'Raspberry', swatch: '#B83B5E' },
  { id: 'offwhite', label: 'Off-White', swatch: '#EEE6D4' },
]

export default function KnitStudio() {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<KnitScene | null>(null)

  const [preset, setPreset] = useState<PresetId>('cardigan')
  const [colorway, setColorway] = useState<Colorway>('raspberry')
  const [topology, setTopology] = useState(false)
  const [failed, setFailed] = useState(false)
  const [reduced, setReduced] = useState(false)

  const info = PRESETS.find((p) => p.id === preset)!

  useEffect(() => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    if (!canvas || !stage) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduced(reducedMotion)

    let scene: KnitScene
    try {
      scene = new KnitScene(canvas, { reducedMotion })
    } catch {
      setFailed(true)
      return
    }
    sceneRef.current = scene

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      scene.resize(width, height)
    })
    ro.observe(stage)

    const io = new IntersectionObserver(
      ([entry]) => scene.setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    )
    io.observe(stage)

    const onVisibility = () => {
      if (document.hidden) scene.stop()
      else scene.start()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      io.disconnect()
      ro.disconnect()
      scene.dispose()
      sceneRef.current = null
    }
  }, [])

  useEffect(() => {
    sceneRef.current?.setLook(preset, colorway)
  }, [preset, colorway, failed])

  useEffect(() => {
    sceneRef.current?.setTopology(topology)
  }, [topology])

  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline lg:grid-cols-12">
      <div className="bg-white lg:col-span-8">
        <div
          role="tablist"
          aria-label="Knit structure"
          className="flex flex-wrap gap-2 border-b border-hairline p-4"
        >
          {PRESETS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={preset === p.id}
              onClick={() => setPreset(p.id)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                preset === p.id
                  ? 'border-ink bg-ink text-white'
                  : 'border-hairline bg-porcelain text-slate hover:border-ink/40 hover:text-ink',
              )}
            >
              <span className="mr-2 text-[0.6875rem] opacity-60">0{i + 1}</span>
              {p.short}
            </button>
          ))}
        </div>

        <div
          ref={stageRef}
          className="hairline-grid relative aspect-[4/3] w-full bg-porcelain"
        >
          {failed ? (
            <Image
              src={info.photos[colorway]}
              alt={`${info.label} garment photo`}
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-contain p-6"
            />
          ) : (
            <canvas
              ref={canvasRef}
              tabIndex={0}
              role="img"
              aria-label={`Interactive 3D knit swatch: ${info.label}, ${colorway === 'raspberry' ? 'Raspberry' : 'Off-White'}. Drag or use arrow keys to orbit.`}
              className="absolute inset-0 size-full cursor-grab touch-pan-y outline-none focus-visible:ring-2 focus-visible:ring-blueprint"
            />
          )}

          <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-hairline bg-white/90 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-slate">
            <Move3d className="size-3.5 text-blueprint" aria-hidden="true" />
            {failed ? 'Photo view' : reduced ? 'Static view \u00B7 drag to orbit' : 'Drag to orbit'}
          </div>
          <div className="pointer-events-none absolute bottom-4 right-4 rounded-md border border-hairline bg-white/90 px-2.5 py-1 font-mono text-[0.6875rem] text-slate">
            7G &middot; HP2-52S
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline p-4">
          <div role="radiogroup" aria-label="Colorway" className="flex items-center gap-2">
            {COLORWAYS.map((c) => (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={colorway === c.id}
                onClick={() => setColorway(c.id)}
                className={cn(
                  'flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors',
                  colorway === c.id
                    ? 'border-ink bg-white text-ink'
                    : 'border-hairline bg-porcelain text-slate hover:text-ink',
                )}
              >
                <span
                  className="size-4 rounded-full border border-black/10"
                  style={{ backgroundColor: c.swatch }}
                  aria-hidden="true"
                />
                {c.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-pressed={topology}
              onClick={() => setTopology((v) => !v)}
              disabled={failed}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors disabled:opacity-40',
                topology
                  ? 'border-blueprint bg-blueprint/10 text-blueprint'
                  : 'border-hairline bg-porcelain text-slate hover:text-ink',
              )}
            >
              <Grid3x3 className="size-4" aria-hidden="true" />
              Topology
            </button>
            <button
              type="button"
              onClick={() => sceneRef.current?.resetView()}
              disabled={failed}
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-porcelain px-3.5 py-2 text-sm font-medium text-slate transition-colors hover:text-ink disabled:opacity-40"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>
      </div>

      <aside
        className="flex flex-col bg-white p-6 sm:p-8 lg:col-span-4"
        aria-live="polite"
      >
        <p className="eyebrow">Stitch inspector</p>
        <h3 className="mt-3 text-balance text-2xl font-semibold leading-tight text-ink">
          {info.label}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate">{info.detail}</p>

        <dl className="mt-6 divide-y divide-hairline border-y border-hairline text-sm">
          {[
            ['Structure', info.structure],
            ['Stitch', info.stitch],
            ['Edge', info.edge],
            ['Colourway', colorway === 'raspberry' ? 'Raspberry' : 'Off-White'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-3">
              <dt className="text-slate">{k}</dt>
              <dd className="text-right font-medium text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-lg border border-hairline bg-stone">
          <Image
            src={info.photos[colorway]}
            alt={`Reference photo of ${info.label}`}
            fill
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-xs text-slate">
          Reference photo of the finished garment. The 3D swatch is an illustrative stitch model.
        </p>
      </aside>
    </div>
  )
}
