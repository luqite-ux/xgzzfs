import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { RfqForm } from '@/components/rfq-form'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact & Request a Quote — Suzhou Xigong Knitting Apparel Co., Ltd.',
  description:
    'Contact Suzhou Xigong Knitting Apparel Co., Ltd. for OEM/ODM women knitwear quotes, 5 pcs MOQ trial orders, and 4–15 day sampling. Email info@xgzzfs.com or call +86 132 9516 0880.',
  alternates: { canonical: `${SITE.url}/contact` },
}

export default function ContactPage() {
  return (
    <div className="bg-porcelain py-16 lg:py-20">
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-slate">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">Contact</span>
        </nav>

        <SectionHeading
          as="h1"
          eyebrow="Contact & RFQ"
          title="Request a Women's Knitwear Quote or Sample"
          description="Send your style reference, tech pack, yarn requirement, or target order volume. Our Wujiang factory team responds directly with sampling timelines and quotations."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-stretch">
          <Reveal
            id="contact-channels"
            as="section"
            className="flex flex-col justify-between rounded-2xl border border-hairline bg-white p-6 sm:p-8 lg:col-span-5"
          >
            <div>
              <p className="eyebrow text-rose">Direct Factory Channels</p>
              <h2 className="mt-2 text-2xl font-semibold text-ink">{SITE.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                Established in 2014 in Wujiang District, Suzhou. Dedicated women&apos;s knitwear OEM/ODM factory with HP2-52S 7G flat knitting machines and 100K–300K pcs monthly capacity.
              </p>

              <dl className="mt-8 space-y-5 border-t border-hairline pt-6 text-sm">
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
                <p className="font-semibold uppercase tracking-wider text-slate">MOQ</p>
                <p className="mt-1 font-display text-base font-semibold text-ink">5 pcs / style</p>
              </div>
              <div>
                <p className="font-semibold uppercase tracking-wider text-slate">Lead Time</p>
                <p className="mt-1 font-display text-base font-semibold text-ink">4–15 Days</p>
              </div>
            </div>
          </Reveal>

          <Reveal id="contact-rfq-form" as="section" delay={80} className="lg:col-span-7">
            <RfqForm captchaScope="contact-rfq" sourcePage="/contact" />
          </Reveal>
        </div>
      </div>
    </div>
  )
}
