import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProductCatalog } from '@/components/products/product-catalog'
import { SectionHeading } from '@/components/section-heading'
import { getStoreCategories, getStoreProducts } from '@/lib/data'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: "Women's Knitwear Catalog — Sweaters, Cardigans & Base Layers",
  description:
    "Explore OEM/ODM women's knitwear styles from Suzhou Xigong Knitting Apparel Co., Ltd. Hand-embroidered wool cardigans, 3D butterfly hollow-out base layers, and openwork ribbed sweaters starting from 5 pcs MOQ.",
  alternates: { canonical: `${SITE.url}/products` },
}

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([
    getStoreCategories(),
    getStoreProducts(),
  ])

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE.url}/products` },
    ],
  }

  return (
    <div className="bg-porcelain py-16 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-slate">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">Products</span>
        </nav>

        <div id="catalog-header">
          <SectionHeading
            as="h1"
            eyebrow="OEM / ODM Catalog"
            title="Women's Knitwear & Sweater Collection"
            description="Every style is knitted in our Suzhou Wujiang factory on HP2-52S 7G machines. Request private-label ODM runs from 5 pcs/style or submit a custom tech pack."
          />
        </div>

        <div className="mt-10">
          <Suspense fallback={<div className="py-12 text-sm text-slate">Loading catalog...</div>}>
            <ProductCatalog categories={categories} products={products} />
          </Suspense>
        </div>

        <div className="mt-16 rounded-2xl border border-hairline bg-white p-8 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow text-rose">Custom Development</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">
              Need Custom Knit Vests, Pullovers, or Knit Dresses?
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate">
              Send your drawings, reference sample, or yarn specifications. We deliver prototypes in 4–15 days and scale up to 100K–300K pieces per month.
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-5 inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-white hover:bg-ink/90 sm:ml-6 sm:mt-0"
          >
            Request Custom Quote
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
