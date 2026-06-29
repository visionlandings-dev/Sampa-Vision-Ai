import { TICKER_ITEMS } from '@/config/content'

const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]

export function Ticker() {
  return (
    <div className="border-t border-b border-white/[0.06] overflow-hidden py-3 bg-pit">
      <div className="flex animate-ticker whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-8 font-mono text-mono-xs uppercase tracking-[0.22em] text-ash">
            <span className="w-1 h-1 rounded-full bg-electric shadow-[0_0_6px_rgba(0,102,255,0.9)]" aria-hidden />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
