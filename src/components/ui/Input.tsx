import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full bg-well border px-4 py-3.5',
        'font-body text-body-md text-bone placeholder:text-stone',
        'rounded-none outline-none transition-colors duration-200',
        error
          ? 'border-error focus:border-error'
          : 'border-stone focus:border-electric focus:shadow-[0_0_0_3px_rgba(0,191,255,0.08)]',
        className
      )}
      {...props}
    />
  )
)

Input.displayName = 'Input'

export { Input }
