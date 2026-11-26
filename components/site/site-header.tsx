'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/site/logo'
import { NAV_LINKS } from '@/lib/site'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-porcelain/90 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium text-slate transition-colors hover:text-ink',
                isActive(link.href) && 'text-ink',
              )}
            >
              {link.label}
              <span
                className={cn(
                  'mx-auto mt-0.5 block h-px w-0 bg-rose transition-all',
                  isActive(link.href) && 'w-full',
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden rounded-full bg-ink px-5 text-white hover:bg-ink/90 sm:inline-flex"
          >
            <Link href="/contact">Request a Quote</Link>
          </Button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md border border-hairline bg-white text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-hairline bg-porcelain lg:hidden"
        >
          <ul className="container-page flex flex-col py-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={cn(
                    'flex items-center justify-between border-b border-hairline py-3.5 text-base font-medium text-slate',
                    isActive(link.href) && 'text-ink',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Button
                asChild
                className="w-full rounded-full bg-ink text-white hover:bg-ink/90"
              >
                <Link href="/contact">Request a Quote</Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
