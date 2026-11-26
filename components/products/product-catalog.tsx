'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import type { StoreCategory, StoreProduct } from '@/lib/data'
import { cn } from '@/lib/utils'

export function ProductCatalog({
  categories,
  products,
}: {
  categories: StoreCategory[]
  products: StoreProduct[]
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeCategory = searchParams.get('category') || 'all'

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory)

  const selectCategory = (slug: string) => {
    const target = slug === 'all' ? '/products' : `/products?category=${encodeURIComponent(slug)}`
    router.push(target, { scroll: false })
  }

  return (
    <div>
      <div
        id="category-filters"
        role="tablist"
        aria-label="Filter knitwear by category"
        className="flex flex-wrap items-center gap-2.5"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === 'all'}
          onClick={() => selectCategory('all')}
          className={cn(
            'rounded-full border px-5 py-2.5 text-sm font-medium transition-colors',
            activeCategory === 'all'
              ? 'border-ink bg-ink text-white'
              : 'border-hairline bg-white text-slate hover:border-ink/40 hover:text-ink',
          )}
        >
          All Styles ({products.length})
        </button>
        {categories.map((cat) => {
          const count = products.filter((p) => p.category === cat.slug).length
          const isSelected = activeCategory === cat.slug
          return (
            <button
              key={cat.slug}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => selectCategory(cat.slug)}
              className={cn(
                'rounded-full border px-5 py-2.5 text-sm font-medium transition-colors',
                isSelected
                  ? 'border-ink bg-ink text-white'
                  : 'border-hairline bg-white text-slate hover:border-ink/40 hover:text-ink',
              )}
            >
              {cat.name} ({count})
            </button>
          )
        })}
      </div>

      <div id="product-grid" className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product, idx) => (
          <Reveal key={product.slug} delay={idx * 70} className="h-full">
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white transition-all duration-300 hover:-translate-y-1 hover:border-ink/25 hover:shadow-sm">
              <Link
                href={`/products/${product.slug}`}
                className="relative block aspect-square w-full overflow-hidden bg-porcelain"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.images[0]?.src}
                  alt={product.images[0]?.alt || product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-3.5 top-3.5 rounded-full border border-hairline bg-white/90 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink backdrop-blur-sm">
                  {product.model}
                </span>
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-rose">
                  {product.categoryName}
                </p>
                <h2 className="mt-2 text-lg font-semibold leading-snug text-ink">
                  <Link href={`/products/${product.slug}`} className="hover:text-rose">
                    {product.name}
                  </Link>
                </h2>
                <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-slate">
                  {product.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-stone px-2.5 py-1 text-xs font-medium text-ink/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-hairline/80 pt-4">
                  <span className="text-xs font-medium text-slate">MOQ: 5 pcs / style</span>
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-rose"
                  >
                    View Specifications
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
