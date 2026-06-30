import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1.5',
    'font-mono text-mono-xs uppercase tracking-[0.22em]',
    'rounded-none select-none',
  ].join(' '),
  {
    variants: {
      variant: {
        default:     'bg-well border border-stone text-ash px-3 py-1',
        electric:    'bg-electric/10 border border-electric/35 text-electric px-3 py-1',
        success:     'bg-success/10 border border-success/35 text-success px-3 py-1',
        warning:     'bg-warning/10 border border-warning/35 text-warning px-3 py-1',
        error:       'bg-error/10 border border-error/35 text-error px-3 py-1',
        ghost:       'text-ash px-0 py-0',
        live:        'bg-success/10 border border-success/35 text-success px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, dot = false, children, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            'inline-block w-1.5 h-1.5 rounded-full animate-pulse-dot',
            variant === 'live' || variant === 'success' ? 'bg-success' : 'bg-electric'
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
)

Badge.displayName = 'Badge'

export { Badge, badgeVariants }
