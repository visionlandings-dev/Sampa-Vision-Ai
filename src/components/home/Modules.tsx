import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { MODULES } from '@/config/content'
import { cn } from '@/lib/utils'

export function Modules() {
  return (
    <section className="py-[clamp(5rem,10vw,9rem)] border-t border-white/[0.06] bg-pit">
      <div className="max-w-[1400px] mx-auto px-[clamp(1rem,4vw,4rem)]">
        <Reveal className="mb-12">
          <SectionLabel>Plataforma modular</SectionLabel>
          <h2 className="font-display font-bold text-display text-bone mt-3">
            Você entra pelo módulo.<br />
            <span className="text-electric">Fica pela plataforma.</span>
          </h2>
          <p className="text-sm font-light text-fog max-w-[440px] mt-3">
            Cada engine compartilha a mesma camada de inteligência. O que você cria hoje alimenta o sistema de amanhã.
          </p>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/[0.06]">
          {MODULES.map((mod) => (
            <RevealItem
              key={mod.title}
              className="border-r border-b border-white/[0.06] last:border-r-0 p-6 relative group hover:bg-well transition-colors duration-300"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-electric scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" aria-hidden />

              <div className="flex items-start justify-between mb-4">
                <span className="text-xl leading-none">{mod.icon}</span>
                <span className={cn(
                  'font-mono text-mono-xs uppercase tracking-[0.14em] px-2 py-0.5 border',
                  mod.status === 'live'
                    ? 'text-success border-success/30 bg-success/[0.06]'
                    : mod.status === 'soon'
                      ? 'text-electric border-electric/30 bg-electric/[0.06]'
                      : 'text-ash border-stone/40',
                )}>
                  {mod.date}
                </span>
              </div>
              <div className="font-display font-bold text-sm text-bone">{mod.title}</div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.25} className="mt-6 font-mono text-mono-xs text-ash text-center">
          Clientes que entram agora têm acesso prioritário a cada módulo no lançamento.
        </Reveal>
      </div>
    </section>
  )
}
