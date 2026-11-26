import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Newspaper } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { getStoreArticles } from '@/lib/data'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'News — Suzhou Xigong Knitting Apparel Co., Ltd.',
  description:
    'Factory announcements, seasonal knitwear development updates, and OEM/ODM production news from Suzhou Xigong Knitting Apparel Co., Ltd.',
  alternates: { canonical: `${SITE.url}/news` },
}

export default async function NewsPage() {
  const articles = await getStoreArticles()

  return (
    <div className="bg-porcelain py-16 lg:py-20">
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-slate">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">News</span>
        </nav>

        <div id="news-header">
          <SectionHeading
            as="h1"
            eyebrow="News"
            title="Factory Updates & Knitwear News"
            description="Official production updates, seasonal knitwear craft notes, and export announcements from Suzhou Xigong Knitting Apparel Co., Ltd."
          />
        </div>

        <section id="news-list" className="mt-12">
          {articles.length === 0 ? (
            <div className="rounded-2xl border border-hairline bg-white p-12 text-center">
              <Newspaper className="mx-auto size-10 text-slate/60" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-semibold text-ink">
                Official News Updates Coming Soon
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate">
                No public news articles have been published yet. Browse our women&apos;s knitwear catalog or contact our team directly for seasonal lookbooks and OEM/ODM capacity schedules.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/products"
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-white hover:bg-ink/90"
                >
                  Explore Products
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-10 items-center rounded-full border border-hairline bg-porcelain px-5 text-sm font-medium text-ink hover:border-ink/40"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white"
                >
                  {article.coverImage && (
                    <Link href={`/news/${article.slug}`} className="block aspect-[16/10] w-full overflow-hidden bg-stone">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <time className="text-xs font-medium text-slate">
                      {new Date(article.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    <h2 className="mt-2 line-clamp-2 text-lg font-semibold text-ink">
                      <Link href={`/news/${article.slug}`} className="hover:text-rose">
                        {article.title}
                      </Link>
                    </h2>
                    <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-slate">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto pt-4">
                      <Link
                        href={`/news/${article.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-rose"
                      >
                        Read Article
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
