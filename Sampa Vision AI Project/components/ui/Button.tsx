import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-mono uppercase tracking-[0.16em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-void disabled:pointer-events-none disabled:opacity-40 select-none rounded-none',
  {
    variants: {
      variant: {
        primary:
          'bg-electric text-void font-semibold hover:bg-electric-hover hover:-translate-y-px hover:shadow-glow-md active:translate-y-0',
        ghost:
          'bg-transparent text-ghost border border-stone hover:border-electric hover:text-electric',
        outline:
          'bg-transparent text-electric border border-[rgba(0,102,255,0.35)] hover:bg-electric hover:text-void hover:shadow-glow-sm',
        link:
          'bg-transparent text-ash border-b border-stone pb-px hover:text-bone hover:border-bone',
      },
      size: {
        sm: 'px-4 py-2 text-[0.6rem]',
        md: 'px-6 py-3 text-mono-sm',
        lg: 'px-8 py-4 text-mono-md',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
