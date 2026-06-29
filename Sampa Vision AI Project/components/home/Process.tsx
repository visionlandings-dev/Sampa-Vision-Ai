import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { PROCESS_STEPS } from '@/config/content'

export function Process() {
  return (
    <section id="processo" className="py-[clamp(5rem,10vw,9rem)] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-[clamp(1rem,4vw,4rem)]">
        <Reveal className="mb-12">
          <SectionLabel>Como funciona</SectionLabel>
          <h2 className="font-display font-bold text-display text-bone mt-3">
            De zero a publicado.<br />
            <span className="text-electric">Em menos de 5 minutos.</span>
          </h2>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-white/[0.06]">
          {PROCESS_STEPS.map((step) => (
            <RevealItem
              key={step.n}
              className="border-r border-b lg:border-b-0 border-white/[0.06] p-6 relative group hover:bg-well transition-colors duration-300"
            >
              {/* Top accent on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-electric scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" aria-hidden />

              <div className="font-display font-bold text-[3.5rem] text-white/[0.04] leading-none mb-6 group-hover:text-white/[0.07] transition-colors">
                {step.n}
              </div>
              <div className="font-display font-bold text-base text-bone mb-2">{step.title}</div>
              <p className="text-xs font-light text-ash leading-relaxed mb-4">{step.desc}</p>
              <div className="font-mono text-mono-xs text-electric">{step.time}</div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Total time banner */}
        <Reveal delay={0.3} className="mt-1 border border-white/[0.06] border-t-0 px-6 py-4 flex items-center justify-between bg-pit">
          <span className="font-mono text-mono-xs text-ash">Total estimado</span>
          <span className="font-display font-bold text-bone text-sm">
            Menos de <span className="text-electric">5 minutos</span> do briefing à página publicada
          </span>
        </Reveal>
      </div>
    </section>
  )
}
