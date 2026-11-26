import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Factory, ShieldCheck } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { FACTORY_GALLERY, KPIS, QC_CHECKPOINTS, SITE, WORKFLOW_STEPS } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Manufacturing & Quality Control — HP2-52S 7G Flat Knitting',
  description:
    'Inside Suzhou Xigong Knitting Apparel Co., Ltd.: 1,000 m² Wujiang factory, HP2-52S 7G computerized flat knitting machines, 100K–300K monthly capacity, and 6-stage quality inspection.',
  alternates: { canonical: `${SITE.url}/manufacturing` },
}

export default function ManufacturingPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Manufacturing', item: `${SITE.url}/manufacturing` },
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
          <span className="text-ink">Manufacturing</span>
        </nav>

        <section id="mfg-overview" className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionHeading
              as="h1"
              eyebrow="Production Capability"
              title="1,000 m² Women's Knitwear Facility in Wujiang, Suzhou"
              description="Equipped with HP2-52S 7G computerized flat knitting machines, hand finishing benches, and a 6-stage quality control line producing 100,000 to 300,000 garments per month."
            />
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-white hover:bg-ink/90"
            >
              Request Factory Quote
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        <section id="equipment-7g" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KPIS.map((kpi, idx) => (
            <Reveal
              key={kpi.eyebrow}
              delay={idx * 60}
              className="rounded-2xl border border-hairline bg-white p-6"
            >
              <p className="eyebrow text-rose">{kpi.eyebrow}</p>
              <p className="mt-2 font-display text-2xl font-semibold text-ink">{kpi.value}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate">{kpi.label}</p>
            </Reveal>
          ))}
        </section>

        <section id="qc-workflow" className="mt-14 grid gap-8 lg:grid-cols-12">
          <Reveal className="rounded-2xl border border-hairline bg-white p-8 lg:col-span-6">
            <div className="flex items-center gap-2.5">
              <Factory className="size-5 text-blueprint" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-ink">5-Stage OEM / ODM Production Flow</h2>
            </div>
            <ol className="mt-6 space-y-4">
              {WORKFLOW_STEPS.map((s) => (
                <li key={s.step} className="flex gap-4 border-b border-hairline/70 pb-4 last:border-0 last:pb-0">
                  <span className="font-display text-xs font-semibold tracking-wider text-blueprint">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{s.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={80} className="rounded-2xl border border-hairline bg-white p-8 lg:col-span-6">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="size-5 text-rose" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-ink">6-Stage Quality Control & Inspection</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              Bulk garments are produced strictly to signed pre-production samples with progress photo updates at pattern, cutting, sewing, finishing, and dispatch. Pre-shipment third-party inspection is welcomed.
            </p>
            <ul className="mt-6 space-y-3">
              {QC_CHECKPOINTS.map((cp, idx) => (
                <li key={cp} className="flex items-center gap-3 rounded-xl bg-porcelain px-4 py-3 text-sm text-ink">
                  <CheckCircle2 className="size-4 shrink-0 text-rose" aria-hidden="true" />
                  <span>
                    <strong>Stage 0{idx + 1}:</strong> {cp}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section id="factory-gallery" className="mt-16">
          <SectionHeading
            eyebrow="Workshop Photo Tour"
            title="Real Facility, Equipment & Quality Inspection Line"
            description="All seven operational views from our Wujiang production floor — knitting aisles, tension calibration, hand finishing, piece inspection, and export warehousing."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FACTORY_GALLERY.map((photo, idx) => (
              <Reveal key={photo.src} delay={idx * 60} className="h-full">
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
                    <p className="mt-2 text-sm leading-relaxed text-slate">{photo.caption}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
