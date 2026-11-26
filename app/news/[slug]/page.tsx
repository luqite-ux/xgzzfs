import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getStoreArticle } from '@/lib/data'
import { SITE } from '@/lib/site'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getStoreArticle(slug)
  if (!article) return { title: 'Article Not Found' }
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `${SITE.url}/news/${article.slug}` },
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getStoreArticle(slug)
  if (!article) notFound()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    image: article.coverImage ? [article.coverImage] : undefined,
    publisher: { '@id': `${SITE.url}/#organization` },
  }

  return (
    <article className="bg-porcelain py-16 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="container-page max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-slate">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/news" className="hover:text-ink">
            News
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{article.title}</span>
        </nav>

        <time className="eyebrow text-rose">
          {new Date(article.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
          {article.title}
        </h1>
        {article.coverImage && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-hairline bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={article.coverImage} alt={article.title} className="w-full object-cover" />
          </div>
        )}
        <div className="mt-8 space-y-4 text-base leading-relaxed text-slate whitespace-pre-line">
          {article.content}
        </div>
      </div>
    </article>
  )
}
