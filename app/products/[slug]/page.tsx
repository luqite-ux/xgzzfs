import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import { ProductGallery } from '@/components/products/product-gallery'
import { RfqForm } from '@/components/rfq-form'
import { Reveal } from '@/components/reveal'
import { getStoreProduct, getStoreProducts } from '@/lib/data'
import { SITE } from '@/lib/site'

export async function generateStaticParams() {
  const products = await getStoreProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getStoreProduct(slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: `${product.name} (${product.model})`,
    description: product.summary,
    alternates: { canonical: `${SITE.url}/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.summary,
      url: `${SITE.url}/products/${product.slug}`,
      images: product.images[0] ? [{ url: product.images[0].src }] : [],
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getStoreProduct(slug)
  if (!product) notFound()

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE.url}/products` },
          { '@type': 'ListItem', position: 3, name: product.name, item: `${SITE.url}/products/${product.slug}` },
        ],
      },
      {
        '@type': 'Product',
        '@id': `${SITE.url}/products/${product.slug}#product`,
        name: product.name,
        sku: product.model,
        description: product.description,
        category: product.categoryName,
        image: product.images.map((i) => i.src),
        manufacturer: { '@id': `${SITE.url}/#organization` },
      },
    ],
  }

  return (
    <div className="bg-porcelain py-14 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-slate">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-ink">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          <div id="product-specs" className="space-y-8 lg:col-span-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-hairline bg-white px-3 py-1 text-xs font-semibold text-ink">
                  {product.model}
                </span>
                <span className="eyebrow text-rose">{product.categoryName}</span>
              </div>
              <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate">{product.description}</p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-hairline bg-white">
              <div className="border-b border-hairline bg-stone/60 px-5 py-3">
                <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                  Technical Specifications & Commercial Terms
                </h2>
              </div>
              <dl className="divide-y divide-hairline text-sm">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="grid grid-cols-12 gap-4 px-5 py-3.5">
                    <dt className="col-span-4 font-medium text-slate">{spec.label}</dt>
                    <dd className="col-span-8 font-medium text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-hairline bg-white p-5">
                <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-blueprint">
                  Craft Highlights
                </h2>
                <ul className="mt-3.5 space-y-2.5 text-sm text-slate">
                  {product.details.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-rose" aria-hidden="true" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-hairline bg-white p-5">
                <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-blueprint">
                  Target Channels & Advantages
                </h2>
                <ul className="mt-3.5 space-y-2.5 text-sm text-slate">
                  {[...product.applications.slice(0, 2), ...product.advantages.slice(0, 2)].map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blueprint" aria-hidden="true" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Reveal id="product-inquiry" as="section" className="mt-16 border-t border-hairline pt-14">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow text-rose">Style Inquiry</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
                Request Sample or OEM Quote for {product.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                Share your target quantity (from 5 pcs/style), preferred colors, size chart, or private-label packaging notes. Our Wujiang factory team replies directly by email.
              </p>
            </div>
            <div className="lg:col-span-7">
              <RfqForm
                defaultProduct={product.name}
                captchaScope="product-rfq"
                sourcePage={`/products/${product.slug}`}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
