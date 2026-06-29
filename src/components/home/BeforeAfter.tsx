import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { BEFORE_AFTER } from '@/config/content'
import { cn } from '@/lib/utils'

export function BeforeAfter() {
  const [main, ...others] = BEFORE_AFTER

  return (
    <section className="py-[clamp(5rem,10vw,9rem)] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-[clamp(1rem,4vw,4rem)]">
        <Reveal className="mb-12">
          <SectionLabel>Números reais. Clientes reais.</SectionLabel>
          <h2 className="font-display font-bold text-display text-bone mt-3">
            O que acontece quando<br />
            <span className="text-electric">você fecha o buraco no funil.</span>
          </h2>
        </Reveal>

        {/* Main case */}
        <Reveal delay={0.1} className="border border-white/[0.06] bg-well mb-1 p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent" aria-hidden />
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
            <div>
              <span className="block font-display font-bold text-5xl text-well leading-none mb-4">"</span>
              <p className="text-base font-light text-ghost leading-relaxed mb-6 max-w-[560px]">{main.quote}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <div className="w-9 h-9 border border-electric/30 bg-electric/[0.05] flex items-center justify-center font-mono text-mono-xs text-electric">
                  {main.author.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm text-ghost font-medium">{main.author}</div>
                  <div className="font-mono text-mono-xs text-ash">{main.role}</div>
                </div>
              </div>
            </div>
            {/* Metrics */}
            <div className="grid grid-cols-1 gap-0 border border-white/[0.06] min-w-[200px]">
              <div className="p-4 border-b border-white/[0.06]">
                <div className="font-mono text-mono-xs text-ash mb-1">{main.before.label}</div>
                <div className="font-display font-bold text-sm text-stone line-through">{main.before.value}</div>
              </div>
              <div className="p-4 bg-electric/[0.04]">
                <div className="font-mono text-mono-xs text-electric mb-1">{main.after.label}</div>
                <div className="font-display font-bold text-sm text-bone">{main.after.value}</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Other cases */}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {others.map((c) => (
            <RevealItem key={c.author} className="border border-white/[0.06] bg-pit p-6 relative overflow-hidden group hover:bg-well transition-colors duration-300">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
              <div className="grid grid-cols-2 gap-0 border border-white/[0.06] mb-5">
                <div className="p-3 border-r border-white/[0.06]">
                  <div className="font-mono text-mono-xs text-ash mb-1">{c.before.label}</div>
                  <div className="font-display font-bold text-sm text-stone line-through">{c.before.value}</div>
                </div>
                <div className="p-3 bg-electric/[0.04]">
                  <div className="font-mono text-mono-xs text-electric mb-1">{c.after.label}</div>
                  <div className="font-display font-bold text-sm text-bone">{c.after.value}</div>
                </div>
              </div>
              <p className="text-sm font-light text-fog leading-relaxed mb-4">"{c.quote}"</p>
              <div className="font-mono text-mono-xs text-ash">{c.author} · {c.role}</div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
