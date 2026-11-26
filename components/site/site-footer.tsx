import Link from 'next/link'
import { Logo } from '@/components/site/logo'
import { NAV_LINKS, SITE } from '@/lib/site'

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-hairline bg-stone">
      <div className="container-page grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate">
            OEM/ODM women&apos;s knitwear manufacturer in Suzhou, China. 7G flat knitting,
            hand finishing and 100% piece inspection for brands and importers.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-ink transition-colors hover:text-rose"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic md:col-span-4">
          <p className="eyebrow">Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm text-ink">
            <li>
              <a href={SITE.phoneHref} className="hover:text-rose">
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-rose">
                {SITE.email}
              </a>
            </li>
            <li className="leading-relaxed text-slate">{SITE.address}</li>
          </ul>
        </address>
      </div>
      <div className="border-t border-hairline">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-slate sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear} Suzhou Xigong Knitting Apparel Co., Ltd. All rights reserved.
          </p>
          <p>xgzzfs.com</p>
        </div>
      </div>
    </footer>
  )
}
