import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'w-full bg-well border px-4 py-3.5',
        'font-body text-body-md text-bone placeholder:text-stone',
        'resize-none rounded-none outline-none transition-colors duration-200',
        error
          ? 'border-error focus:border-error'
          : 'border-stone focus:border-electric focus:shadow-[0_0_0_3px_rgba(0,191,255,0.08)]',
        className
      )}
      rows={4}
      {...props}
    />
  )
)

Textarea.displayName = 'Textarea'

export { Textarea }
