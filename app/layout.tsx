import type { Metadata, Viewport } from 'next'
import { Inter, Sora } from 'next/font/google'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { SITE, TENANT_ID } from '@/lib/site'
import './globals.css'

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})
const heading = Sora({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Suzhou Xigong Knitting Apparel | Women's Knitwear OEM/ODM Manufacturer",
    template: '%s | Suzhou Xigong Knitting Apparel',
  },
  description:
    "OEM/ODM women's knitwear manufacturer in Suzhou, China. HP2-52S 7G flat knitting, 5 pcs MOQ, 4–15 day sampling, 100K–300K pcs monthly capacity.",
  applicationName: 'Suzhou Xigong Knitting Apparel',
  keywords: [
    'knitwear manufacturer',
    'OEM knitwear',
    'ODM sweaters',
    "women's cardigan supplier",
    '7G flat knitting',
    'Suzhou knitwear factory',
  ],
  alternates: {
    canonical: SITE.url,
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    url: SITE.url,
    siteName: SITE.name,
    title: "Women's Knitwear OEM/ODM Manufacturer in Suzhou",
    description:
      "7G flat knitting, hand finishing and 100% piece inspection for women's sweaters, cardigans and knit base layers.",
    images: [
      {
        url: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/xgzzfs/banners/banner-3.jpg',
        width: 3840,
        height: 1600,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Suzhou Xigong Knitting Apparel | Women's Knitwear OEM/ODM Manufacturer",
    description:
      "HP2-52S 7G flat knitting, 5 pcs MOQ, 4–15 day sampling, 100K–300K pcs monthly capacity.",
    images: [
      'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/xgzzfs/banners/banner-3.jpg',
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#FAF9F7',
  width: 'device-width',
  initialScale: 1,
}

const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/brand-logo.svg`,
      email: SITE.email,
      telephone: SITE.phone,
      foundingDate: '2014',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Shop 109, Building 2, No. 676 Nanju Road, Hengshan, Songling Town, Wujiang District',
        addressLocality: 'Suzhou',
        addressRegion: 'Jiangsu',
        addressCountry: 'CN',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { '@id': `${SITE.url}/#organization` },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${body.variable} ${heading.variable}`}>
      <body className="font-sans antialiased bg-porcelain text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          src={`/api/public/analytics.js?tenantId=${TENANT_ID}`}
          defer
        />
      </body>
    </html>
  )
}
