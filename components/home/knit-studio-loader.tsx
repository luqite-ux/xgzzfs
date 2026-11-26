'use client'

import dynamic from 'next/dynamic'

const KnitStudio = dynamic(() => import('@/components/home/knit-studio'), {
  ssr: false,
  loading: () => (
    <div
      className="hairline-grid flex aspect-[16/10] w-full items-center justify-center rounded-2xl border border-hairline bg-porcelain text-sm text-slate"
      role="status"
    >
      Loading 7G Knit Studio&hellip;
    </div>
  ),
})

export function KnitStudioLoader() {
  return <KnitStudio />
}
