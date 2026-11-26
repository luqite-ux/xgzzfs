'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { IMAGES } from '@/lib/site'
import { cn } from '@/lib/utils'

type Tone = 'light' | 'dark'

interface Slide {
  src: string
  tone: Tone
  mobileBg: string
  eyebrow: string
  title: string
  body: string
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
  alt: string
}

const SLIDES: Slide[] = [
  {
    src: IMAGES.banners[0],
    tone: 'light',
    mobileBg: 'bg-[#16294A]',
    eyebrow: 'OEM / ODM Knitwear \u00B7 Suzhou, China',
    title: 'Women\u2019s knitwear, engineered from tech pack to carton.',
    body: 'Sweaters, cardigans and base layers knitted on HP2-52S 7G machines. 5 pcs MOQ and 4\u201315 day sampling for brands and importers.',
    primary: { label: 'Request a Quote', href: '/contact' },
    secondary: { label: 'Explore Products', href: '/products' },
    alt: 'Factory floor blueprint beside folded knit sweaters and yarn cones',
  },
  {
    src: IMAGES.banners[1],
    tone: 'dark',
    mobileBg: 'bg-[#EDF0F2]',
    eyebrow: 'Manufacturing \u00B7 1,000 m\u00B2 Facility',
    title: 'HP2-52S 7G flat knitting, under one roof.',
    body: 'Computerized knitting, hand finishing and 100% piece inspection managed in-house, with 100K\u2013300K pcs monthly capacity.',
    primary: { label: 'See Manufacturing', href: '/manufacturing' },
    secondary: { label: 'Request a Quote', href: '/contact' },
    alt: 'Modern knitting machine with fabric rolls and garments on a rack in a bright factory hall',
  },
  {
    src: IMAGES.banners[2],
    tone: 'dark',
    mobileBg: 'bg-[#F4EDDC]',
    eyebrow: 'Custom Development \u00B7 Made to Tech Pack',
    title: 'Cardigans, pullovers, vests and knit dresses, made to your spec.',
    body: 'Send a tech pack or a reference garment. We develop the structure, yarn and trims, then sample it in 4\u201315 days.',
    primary: { label: 'Browse Products', href: '/products' },
    secondary: { label: 'Contact Sales', href: '/contact' },
    alt: 'Knit sweaters, cardigans and vests displayed on mannequins and folded on a studio table',
  },
]

const INTERVAL_MS = 6500

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPlaying(false)
    }
  }, [])

  const go = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (!playing || paused) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [playing, paused, index])

  const activeTone = SLIDES[index].tone

  return (
    <section
      id="hero-carousel"
      aria-roledescription="carousel"
      aria-label="Featured capabilities"
      className="relative overflow-hidden border-b border-hairline"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="grid" aria-live={playing ? 'off' : 'polite'}>
        {SLIDES.map((slide, i) => {
          const active = i === index
          const isLight = slide.tone === 'light'
          const Heading = i === 0 ? 'h1' : 'h2'
          return (
            <div
              key={slide.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${SLIDES.length}`}
              aria-hidden={!active}
              className={cn(
                'col-start-1 row-start-1 flex flex-col transition-[opacity,visibility] duration-700 ease-out md:relative md:block md:h-[clamp(540px,41.67vw,740px)]',
                active ? 'visible opacity-100' : 'invisible opacity-0',
              )}
            >
              <div
                className={cn(
                  'relative z-10 px-5 pb-10 pt-10 sm:px-8 md:relative md:z-10 md:flex md:h-full md:items-center md:bg-transparent md:p-0',
                  slide.mobileBg,
                )}
              >
                <div className="mx-auto w-full max-w-[1280px] md:px-8">
                  <div className="max-w-[34rem] lg:max-w-[38rem]">
                    <p
                      className={cn(
                        'text-[0.6875rem] font-semibold uppercase tracking-[0.18em]',
                        isLight ? 'text-white/70' : 'text-slate',
                      )}
                      style={{ color: undefined }}
                    >
                      <span
                        className={cn(
                          'mr-3 inline-block h-px w-8 align-middle',
                          isLight ? 'bg-white/50' : 'bg-ink/30',
                        )}
                        aria-hidden="true"
                      />
                      {slide.eyebrow}
                    </p>
                    <Heading
                      className={cn(
                        'mt-5 text-balance text-[2rem] font-semibold leading-[1.06] sm:text-5xl lg:text-[3.5rem]',
                        // Mobile sits on a solid tone panel; desktop sits on the banner safe zone.
                        isLight ? 'text-white' : 'text-[#14171F]',
                      )}
                    >
                      {slide.title}
                    </Heading>
                    <p
                      className={cn(
                        'mt-5 max-w-md text-pretty text-base leading-relaxed',
                        isLight ? 'text-white/80' : 'text-[#14171F]/75',
                      )}
                    >
                      {slide.body}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <Link
                        href={slide.primary.href}
                        tabIndex={active ? 0 : -1}
                        className={cn(
                          'group inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-medium transition-colors',
                          isLight
                            ? 'bg-white text-ink hover:bg-white/90'
                            : 'bg-ink text-white hover:bg-ink/90',
                        )}
                      >
                        {slide.primary.label}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                      <Link
                        href={slide.secondary.href}
                        tabIndex={active ? 0 : -1}
                        className={cn(
                          'inline-flex h-11 items-center rounded-full border px-6 text-sm font-medium transition-colors',
                          isLight
                            ? 'border-white/40 text-white hover:bg-white/10'
                            : 'border-ink/25 text-ink hover:bg-ink/5',
                        )}
                      >
                        {slide.secondary.label}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-0 aspect-[2.4] w-full md:absolute md:inset-0 md:z-0 md:aspect-auto">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  quality={80}
                  className="object-cover object-right md:object-center"
                />
              </div>
            </div>
          )
        })}
      </div>

      <div
        className={cn(
          'relative z-20 border-t border-hairline bg-porcelain md:pointer-events-none md:absolute md:inset-x-0 md:bottom-0 md:z-20 md:border-t-0 md:bg-transparent',
        )}
      >
        <div className="container-page flex items-center justify-between py-3 md:py-6">
          <div
            className={cn(
              'pointer-events-auto flex items-center gap-4',
              activeTone === 'light' ? 'md:text-white' : 'md:text-ink',
              'text-ink',
            )}
          >
            <div className="flex items-center gap-1.5">
              <ControlButton tone={activeTone} label="Previous slide" onClick={() => go(index - 1)}>
                <ChevronLeft className="size-4" />
              </ControlButton>
              <ControlButton tone={activeTone} label="Next slide" onClick={() => go(index + 1)}>
                <ChevronRight className="size-4" />
              </ControlButton>
              <ControlButton
                tone={activeTone}
                label={playing ? 'Pause autoplay' : 'Start autoplay'}
                onClick={() => setPlaying((p) => !p)}
              >
                {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
              </ControlButton>
            </div>

            <div className="flex items-center gap-2" role="tablist" aria-label="Choose slide">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => go(i)}
                  className="group flex h-6 items-center"
                >
                  <span
                    className={cn(
                      'block h-[3px] rounded-full transition-all duration-300',
                      i === index ? 'w-10' : 'w-5 opacity-40 group-hover:opacity-70',
                      'bg-ink',
                      activeTone === 'light' && 'md:bg-white',
                    )}
                  />
                </button>
              ))}
            </div>

            <span className="text-xs font-medium tabular-nums opacity-70">
              {String(index + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function ControlButton({
  tone,
  label,
  onClick,
  children,
}: {
  tone: Tone
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-full border transition-colors',
        'border-ink/25 bg-white/70 text-ink hover:bg-white',
        tone === 'light' &&
          'md:border-white/40 md:bg-white/10 md:text-white md:hover:bg-white/20',
      )}
    >
      {children}
    </button>
  )
}
