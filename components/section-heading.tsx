import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  index?: string
  eyebrow: string
  title: string
  description?: string
  className?: string
  as?: 'h1' | 'h2'
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <p className="eyebrow flex items-center gap-3">
        {index && <span className="text-rose">{index}</span>}
        <span className="h-px w-8 bg-hairline" aria-hidden="true" />
        {eyebrow}
      </p>
      <Tag className="mt-4 text-balance text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl lg:text-[2.75rem]">
        {title}
      </Tag>
      {description && (
        <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-slate">
          {description}
        </p>
      )}
    </div>
  )
}
