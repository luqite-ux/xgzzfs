import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Sign In | Suzhou Xigong Knitting Apparel Co., Ltd.',
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; reason?: string }>
}) {
  const params = await searchParams
  const errorMsg =
    params.error ||
    (params.reason === 'unauthorized'
      ? 'Please sign in to access the admin console.'
      : '')

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#F9F9FB] px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-[#E6E8EE] bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-[#111318]">
            Admin Sign In
          </h1>
          <p className="mt-1.5 text-xs text-[#6B7280]">
            Suzhou Xigong Knitting Apparel Co., Ltd. Management Portal
          </p>
        </div>

        {errorMsg && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
            {errorMsg}
          </div>
        )}

        <form action="/api/auth/login" method="post" className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563]"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1.5 w-full rounded-lg border border-[#D8DCE6] bg-[#F9F9FB] px-3.5 py-2.5 text-sm text-[#111318] focus:border-[#A83856] focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563]"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1.5 w-full rounded-lg border border-[#D8DCE6] bg-[#F9F9FB] px-3.5 py-2.5 text-sm text-[#111318] focus:border-[#A83856] focus:bg-white focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-[#111318] px-5 py-3 text-sm font-semibold text-white hover:bg-[#A83856] transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
