'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQ_ITEMS } from '@/lib/site'
import { cn } from '@/lib/utils'

export function BuyerFaq() {
  const [openIds, setOpenIds] = useState<string[]>([FAQ_ITEMS[0].id, FAQ_ITEMS[1].id])

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {FAQ_ITEMS.map((item) => {
        const isOpen = openIds.includes(item.id)
        return (
          <div
            key={item.id}
            data-faq-id={item.id}
            className="flex flex-col rounded-2xl border border-hairline bg-white transition-colors hover:border-ink/25"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${item.id}`}
              onClick={() => toggle(item.id)}
              className="flex w-full items-start justify-between gap-4 p-6 text-left"
            >
              <div>
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-rose">
                  {item.group}
                </span>
                <h3 className="mt-1.5 text-base font-semibold leading-snug text-ink">
                  {item.question}
                </h3>
              </div>
              <ChevronDown
                className={cn(
                  'mt-1 size-5 shrink-0 text-slate transition-transform duration-300',
                  isOpen && 'rotate-180 text-ink',
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id={`faq-panel-${item.id}`}
              hidden={!isOpen}
              className="border-t border-hairline/70 px-6 pb-6 pt-4 text-sm leading-relaxed text-slate"
            >
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
