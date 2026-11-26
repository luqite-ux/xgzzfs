import Link from 'next/link'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn('size-8', className)}
    >
      <rect x="0.5" y="0.5" width="31" height="31" rx="7" fill="#FFFFFF" stroke="#E5E0D8" />
      <path
        d="M9 8.5c4.4 3.2 9.6 11.8 14 15"
        stroke="#14171F"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M23 8.5c-4.4 3.2-9.6 11.8-14 15"
        stroke="#14171F"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="3.6" fill="#FFFFFF" stroke="#B83B5E" strokeWidth="2" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Suzhou Xigong Knitting Apparel, home"
      className={cn('inline-flex items-center gap-2.5', className)}
    >
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.0625rem] font-semibold tracking-[0.22em] text-ink">
          XIGONG
        </span>
        <span className="mt-1 text-[0.5625rem] font-medium uppercase tracking-[0.2em] text-slate">
          Knitting Apparel
        </span>
      </span>
    </Link>
  )
}
