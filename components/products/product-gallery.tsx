'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GalleryImage {
  src: string
  alt: string
  label: string
}

export function ProductGallery({ images, productName }: { images: GalleryImage[]; productName: string }) {
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const current = images[active] ?? images[0]

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen, images.length])

  return (
    <div id="product-gallery" className="space-y-4">
      <div className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-hairline bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.src}
          alt={current.alt}
          className="h-full w-full object-contain p-2 transition-transform duration-300"
        />
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`Inspect ${productName} full size`}
          className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white/95 px-3.5 py-2 text-xs font-medium text-ink shadow-xs transition-colors hover:border-ink/40"
        >
          <Expand className="size-3.5" />
          {current.label} ({active + 1}/{images.length})
        </button>
      </div>

      <div className="grid grid-cols-5 gap-2.5 sm:grid-cols-6">
        {images.map((img, idx) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(idx)}
            aria-label={`Show ${img.label}`}
            aria-pressed={idx === active}
            className={cn(
              'relative aspect-square overflow-hidden rounded-xl border bg-white transition-all',
              idx === active
                ? 'border-ink ring-2 ring-ink/15'
                : 'border-hairline opacity-75 hover:border-ink/40 hover:opacity-100',
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} studio viewer`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-xs"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative flex max-h-[90vh] max-w-4xl flex-col items-center gap-3 rounded-2xl bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close image viewer"
              className="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center rounded-full border border-hairline bg-white text-ink hover:bg-stone"
            >
              <X className="size-4" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[75vh] w-auto rounded-lg object-contain"
            />
            <div className="flex w-full items-center justify-between gap-4 px-2">
              <button
                type="button"
                onClick={() => setActive((i) => (i - 1 + images.length) % images.length)}
                className="inline-flex items-center gap-1 rounded-full border border-hairline px-3 py-1.5 text-xs font-medium text-ink hover:bg-stone"
              >
                <ChevronLeft className="size-4" />
                Prev
              </button>
              <span className="text-xs font-medium text-slate">
                {current.label} — {active + 1} / {images.length}
              </span>
              <button
                type="button"
                onClick={() => setActive((i) => (i + 1) % images.length)}
                className="inline-flex items-center gap-1 rounded-full border border-hairline px-3 py-1.5 text-xs font-medium text-ink hover:bg-stone"
              >
                Next
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
