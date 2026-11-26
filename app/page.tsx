import Link from 'next/link'
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { HeroCarousel } from '@/components/home/hero-carousel'
import { KnitStudioLoader } from '@/components/home/knit-studio-loader'
import { BuyerFaq } from '@/components/home/buyer-faq'
import { RfqForm } from '@/components/rfq-form'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { FACTORY_GALLERY, FAQ_ITEMS, KPIS, QC_CHECKPOINTS, SITE, WORKFLOW_STEPS } from '@/lib/site'
import { getStoreCategories, getStoreProducts } from '@/lib/data'

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getStoreCategories(),
    getStoreProducts(),
  ])

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <div className="bg-porcelain">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 1. Hero Carousel (#hero-carousel) */}
      <HeroCarousel />

      {/* 2. Factory Metrics Strip (#factory-metrics) */}
      <section id="factory-metrics" className="border-b border-hairline bg-white">
        <div className="container-page grid grid-cols-2 divide-x divide-y divide-hairline lg:grid-cols-4 lg:divide-y-0">
          {KPIS.map((kpi, idx) => (
            <Reveal key={kpi.eyebrow} delay={idx * 60} className="px-5 py-8 sm:px-8">
              <p className="eyebrow text-rose">{kpi.eyebrow}</p>
              <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                {kpi.value}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate sm:text-sm">
                {kpi.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. Product Categories (#product-categories) */}
      <section id="product-categories" className="border-b border-hairline py-20 lg:py-24">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Product Lines"
              title="Women's Knitwear Collections"
              description="Built on HP2-52S 7G computerized flat knitting machines in Wujiang, Suzhou — ready for private-label ODM or custom OEM tech packs."
            />
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-rose"
            >
              Browse Full Catalog
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {categories.map((cat, idx) => (
              <Reveal key={cat.slug} delay={idx * 80} className="h-full">
                <Link
                  href={`/products?category=${encodeURIComponent(cat.slug)}`}
                  className="group grid h-full overflow-hidden rounded-2xl border border-hairline bg-white transition-all duration-300 hover:-translate-y-1 hover:border-ink/30 hover:shadow-sm sm:grid-cols-12"
                >
                  <div className="relative aspect-square bg-porcelain sm:col-span-5 sm:aspect-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cat.image}
                      alt={cat.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-6 sm:col-span-7 sm:p-8">
                    <div>
                      <p className="eyebrow text-blueprint">0{idx + 1} · Category</p>
                      <h3 className="mt-2.5 text-xl font-semibold text-ink group-hover:text-rose">
                        {cat.name}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate">{cat.blurb}</p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                      Explore Category
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-6 rounded-2xl border border-hairline bg-stone/70 px-6 py-5 sm:flex sm:items-center sm:justify-between">
            <p className="text-sm text-ink">
              <span className="font-semibold">Custom OEM / ODM Scope:</span> In addition to featured styles, we develop women&apos;s knit vests, pullovers, knit tops, and knit dresses to your tech packs or reference garments.
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-rose hover:underline sm:ml-6 sm:mt-0"
            >
              Send Tech Pack
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 4. Interactive Three.js 7G Knit Studio (#threejs-knit-studio) */}
      <section id="threejs-knit-studio" className="border-b border-hairline bg-white py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Interactive 3D Craft Lab"
            title="7G Knit Stitch & Yarn Topology Studio"
            description="Inspect our three signature knit constructions in real-time Three.js WebGL — switch stitch patterns, compare Raspberry and Off-White yarns, drag to orbit, or toggle the 7G mesh wireframe."
          />
          <div className="mt-10">
            <KnitStudioLoader />
          </div>
        </div>
      </section>

      {/* 5. Featured Knitwear Styles (#featured-products) */}
      <section id="featured-products" className="border-b border-hairline py-20 lg:py-24">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Featured Styles"
              title="Ready for Sampling & Private Label"
              description="Every style supports custom sizing, yarn selection, color matching, and private labels starting from 5 pieces per style."
            />
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-rose"
            >
              View All Styles
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {products.map((product, idx) => (
              <Reveal key={product.slug} delay={idx * 80} className="h-full">
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
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-rose">
                      {product.categoryName}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">
                      <Link href={`/products/${product.slug}`} className="hover:text-rose">
                        {product.name}
                      </Link>
                    </h3>
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
                      <span className="text-xs font-medium text-slate">
                        {product.images.length} Studio Views
                      </span>
                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-rose"
                      >
                        Details
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OEM/ODM & 6-Stage QC Workflow (#oem-odm-workflow) */}
      <section id="oem-odm-workflow" className="border-b border-hairline bg-white py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Cooperation & Quality Control"
            title="From Tech Pack to Export Carton in 4–15 Days"
            description="Structured milestone reporting with workshop photos at pattern, cutting, sewing, finishing, and dispatch — backed by 100% final piece inspection."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {WORKFLOW_STEPS.map((item, idx) => (
              <Reveal
                key={item.step}
                delay={idx * 70}
                className="flex flex-col justify-between rounded-2xl border border-hairline bg-porcelain p-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs font-semibold tracking-[0.18em] text-blueprint">
                      STEP {item.step}
                    </span>
                    <span className="rounded-full border border-hairline bg-white px-2.5 py-0.5 text-[0.6875rem] font-medium text-slate">
                      {item.meta}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 rounded-2xl border border-hairline bg-porcelain p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="size-5 text-blueprint" aria-hidden="true" />
              <h3 className="text-base font-semibold text-ink">
                6-Stage In-House Quality Control Checkpoints
              </h3>
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {QC_CHECKPOINTS.map((cp, idx) => (
                <li key={cp} className="flex items-center gap-2.5 text-sm text-slate">
                  <CheckCircle2 className="size-4 shrink-0 text-rose" aria-hidden="true" />
                  <span>
                    <strong className="font-medium text-ink">0{idx + 1}.</strong> {cp}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 7. Real Factory & Quality Showcase (#manufacturing-gallery) */}
      <section id="manufacturing-gallery" className="border-b border-hairline py-20 lg:py-24">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Inside Our Wujiang Facility"
              title="Direct Source Knitting Floor & Inspection Line"
              description="1,000 m² dedicated women's knitwear workshop in Suzhou Wujiang equipped with HP2-52S 7G computerized flat knitting machines."
            />
            <Link
              href="/manufacturing"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-rose"
            >
              View All 7 Facility Photos
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {FACTORY_GALLERY.slice(0, 4).map((photo, idx) => (
              <Reveal key={photo.src} delay={idx * 70} className="h-full">
                <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="flex flex-1 flex-col p-5">
                    <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-blueprint">
                      {photo.group}
                    </span>
                    <h3 className="mt-1.5 text-base font-semibold text-ink">{photo.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate">{photo.caption}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Buyer FAQ Accordion (#buyer-faq) */}
      <section id="buyer-faq" className="border-b border-hairline bg-white py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Buyer FAQ"
            title="MOQ, Sampling, Lead Time & Inspection Terms"
            description="Straightforward commercial terms for fashion brands, cross-border retailers, and wholesale knitwear buyers."
          />
          <div className="mt-12">
            <BuyerFaq />
          </div>
        </div>
      </section>

      {/* 9. Balanced Contact & RFQ Section (#contact-rfq) */}
      <section id="contact-rfq" className="py-20 lg:py-24">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
            <Reveal className="flex flex-col justify-between rounded-2xl border border-hairline bg-white p-6 sm:p-8 lg:col-span-5">
              <div>
                <p className="eyebrow text-rose">Direct Factory Inquiry</p>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink">
                  Start Your Women&apos;s Knitwear Sample or Bulk Order
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate">
                  Founded in 2014 in Wujiang, Suzhou, Suzhou Xigong Knitting Apparel Co., Ltd. brings over 20 years of women&apos;s sweater, cardigan, vest, and base-layer craft to global brands, cross-border sellers, and wholesalers.
                </p>

                <dl className="mt-8 space-y-4 border-t border-hairline pt-6 text-sm">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-blueprint" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-slate">Email</dt>
                      <dd className="mt-0.5 font-medium text-ink">
                        <a href={`mailto:${SITE.email}`} className="hover:text-rose">
                          {SITE.email}
                        </a>
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-4 shrink-0 text-blueprint" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-slate">Phone</dt>
                      <dd className="mt-0.5 font-medium text-ink">
                        <a href={SITE.phoneHref} className="hover:text-rose">
                          {SITE.phone}
                        </a>
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-blueprint" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-slate">Factory Address</dt>
                      <dd className="mt-0.5 leading-relaxed text-slate">{SITE.address}</dd>
                    </div>
                  </div>
                </dl>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 rounded-xl bg-porcelain p-4 text-xs">
                <div>
                  <p className="font-semibold uppercase tracking-wider text-slate">Standard MOQ</p>
                  <p className="mt-1 font-display text-base font-semibold text-ink">5 pcs / style</p>
                </div>
                <div>
                  <p className="font-semibold uppercase tracking-wider text-slate">Sampling & Bulk</p>
                  <p className="mt-1 font-display text-base font-semibold text-ink">4–15 Days</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80} className="lg:col-span-7">
              <RfqForm captchaScope="home-rfq" sourcePage="/" />
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
