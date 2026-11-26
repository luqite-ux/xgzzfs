import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { FACTORY_GALLERY, KPIS, SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Us — Suzhou Xigong Knitting Apparel Co., Ltd.',
  description:
    "Founded in 2014 in Wujiang, Suzhou with 20+ years of women's knitwear expertise. Direct OEM/ODM sweater, cardigan, vest, and base-layer manufacturer.",
  alternates: { canonical: `${SITE.url}/about` },
}

export default function AboutPage() {
  return (
    <div className="bg-porcelain py-16 lg:py-20">
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-slate">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">About</span>
        </nav>

        <section id="about-story" className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeading
              as="h1"
              eyebrow="Company Profile"
              title="Two Decades of Women's Knitwear Craft in Wujiang, Suzhou"
              description="Suzhou Xigong Knitting Apparel Co., Ltd. was established in 2014 in Wujiang District, Suzhou — a core Chinese sweater-knitting hub — building on more than 20 years of specialized women's knitwear manufacturing experience."
            />
            <p className="mt-5 text-sm leading-relaxed text-slate">
              From our 1,000 m² workshop equipped with HP2-52S 7G computerized flat knitting machines, we deliver stable monthly capacity of 100,000 to 300,000 pieces with a typical 4–15 day turnaround for both samples and bulk runs.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate">
              We partner with women&apos;s fashion brands, cross-border e-commerce sellers, wholesale traders, and private-label buyers seeking low 5-piece MOQ trial orders alongside dependable bulk replenishment.
            </p>
          </div>
          <Reveal className="overflow-hidden rounded-2xl border border-hairline bg-white lg:col-span-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FACTORY_GALLERY[0].src}
              alt={FACTORY_GALLERY[0].title}
              className="aspect-[16/10] w-full object-cover"
            />
          </Reveal>
        </section>

        <section id="about-metrics" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

        <section id="about-oem" className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal className="rounded-2xl border border-hairline bg-white p-8">
            <p className="eyebrow text-blueprint">OEM & ODM Flexibility</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">Built for Agile Brand Merchandising</h2>
            <ul className="mt-5 space-y-3 text-sm text-slate">
              {[
                'Custom development from client tech packs, drawings, or reference garments',
                'ODM private-label branding on our ready-to-sample women knitwear styles',
                'Low 5 pcs/style MOQ for test launches, scaling to 100K–300K pcs/month',
                'Custom sizing, yarn blends, dye colors, printing, and hand/3D embroidery',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-rose" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80} className="rounded-2xl border border-hairline bg-white p-8">
            <p className="eyebrow text-blueprint">Quality & Transparency</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">Controllable Schedule & Clear Terms</h2>
            <ul className="mt-5 space-y-3 text-sm text-slate">
              {[
                'Signed pre-production sample approval before bulk knitting begins',
                'Milestone progress photos at pattern, cutting, sewing, finishing, and shipping',
                '6-stage quality control ending with 100% piece inspection and third-party inspection support',
                'Post-arrival issue resolution within 7 days via repair, remake, or return per actual findings',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blueprint" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section id="about-cta" className="mt-14 rounded-2xl border border-hairline bg-white p-8 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow text-rose">Partner With Us</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">
              Ready to Sample Your Next Knitwear Capsule?
            </h2>
            <p className="mt-2 text-sm text-slate">
              Reach our Wujiang factory directly at {SITE.email} or {SITE.phone}.
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-5 inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-white hover:bg-ink/90 sm:ml-6 sm:mt-0"
          >
            Contact Sales
            <ArrowRight className="size-4" />
          </Link>
        </section>
      </div>
    </div>
  )
}
