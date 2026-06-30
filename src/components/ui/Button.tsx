import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// ── VARIANTES CVA ─────────────────────────────────────────────────────────
const buttonVariants = cva(
  // Base — compartilhado por todas as variantes
  [
    'inline-flex items-center justify-center gap-2',
    'font-mono text-mono-sm uppercase tracking-[0.18em]',
    'border-radius-none transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-void',
    'disabled:pointer-events-none disabled:opacity-40',
    'select-none cursor-pointer',
    // border-radius: 0 — regra fundamental do DESIGN.md
    'rounded-none',
  ].join(' '),
  {
    variants: {
      variant: {
        // CTA primário — fundo azul elétrico
        primary: [
          'bg-electric text-void font-semibold',
          'hover:bg-electric-hover hover:-translate-y-px',
          'hover:shadow-glow-md',
          'active:translate-y-0 active:bg-electric-dim',
        ].join(' '),

        // Ghost — contorno sem preenchimento
        ghost: [
          'bg-transparent text-ghost border border-stone',
          'hover:border-electric hover:text-electric',
          'active:bg-well',
        ].join(' '),

        // Outline — variante de nav
        outline: [
          'bg-transparent text-electric border border-electric/35',
          'hover:bg-electric hover:text-void',
          'hover:shadow-glow-sm',
        ].join(' '),

        // Destructive
        destructive: [
          'bg-error text-white',
          'hover:bg-red-600',
        ].join(' '),

        // Link — sem fundo ou borda
        link: [
          'bg-transparent text-ash border-b border-stone pb-px',
          'hover:text-bone hover:border-bone',
          'rounded-none',
        ].join(' '),
      },
      size: {
        sm:  'px-4 py-2 text-[0.6rem]',
        md:  'px-6 py-3 text-mono-sm',
        lg:  'px-8 py-4 text-[0.72rem]',
        xl:  'px-10 py-5 text-[0.78rem]',
        icon: 'p-2.5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size:    'md',
    },
  }
)

// ── PROPS ────────────────────────────────────────────────────────────────
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

// ── COMPONENTE ────────────────────────────────────────────────────────────
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="inline-block w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
            <span>Carregando...</span>
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
