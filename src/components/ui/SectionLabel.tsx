import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div className={cn('inline-flex items-center gap-2 font-mono text-mono-xs uppercase tracking-[0.26em] text-electric', className)}>
      <span className="inline-block w-4 h-px bg-electric glow-line" aria-hidden />
      {children}
    </div>
  )
}
