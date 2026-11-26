import Link from 'next/link'

export const metadata = {
  title: 'Service Notice',
  robots: { index: false, follow: false },
}

export default function ServiceExpiredPage() {
  return (
    <div className="container-page flex min-h-[65vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">Service Notice</p>
      <h1 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">
        Website Service Temporarily Paused
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-slate">
        This storefront is currently paused pending service renewal. Site administrators may still sign in via the management console.
      </p>
      <Link
        href="/admin/login"
        className="mt-6 inline-flex h-10 items-center rounded-full border border-hairline bg-white px-5 text-sm font-medium text-ink hover:border-ink/40"
      >
        Administrator Sign In
      </Link>
    </div>
  )
}
