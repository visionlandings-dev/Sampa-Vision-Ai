import { cn } from '@/lib/utils'

interface ProgressProps {
  value: number  // 0–100
  className?: string
}

export function Progress({ value, className }: ProgressProps) {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('h-px bg-stone w-full overflow-hidden', className)}
    >
      <div
        className="h-full bg-electric shadow-glow-sm transition-all duration-500 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
