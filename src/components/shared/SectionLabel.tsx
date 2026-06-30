import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

/**
 * Eyebrow label de seção — linha elétrica + texto mono uppercase.
 * Usado consistentemente em todas as seções da home.
 */
export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2',
        'font-mono text-mono-xs uppercase tracking-[0.26em]',
        'text-electric',
        className
      )}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {/* Linha elétrica — 16px */}
      <span
        className="inline-block w-4 h-px bg-electric shadow-[0_0_6px_rgba(0,102,255,0.8)]"
        aria-hidden="true"
      />
      {children}
    </div>
  )
}
