import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

const steps = [
  { n: '01', cause: 'Você investe R$3k/mês em tráfego pago.' },
  { n: '02', cause: 'A página não converte — abaixo de 2%.' },
  { n: '03', cause: 'A agência demora 3 semanas para entregar.' },
  { n: '04', cause: 'A janela da campanha fechou. Dinheiro perdido.' },
]

export function Diagnosis() {
  return (
    <section className="py-[clamp(5rem,10vw,9rem)] border-t border-white/[0.06] bg-pit">
      <div className="max-w-[1400px] mx-auto px-[clamp(1rem,4vw,4rem)]">
        <Reveal className="mb-12">
          <SectionLabel>Reconhece essa história?</SectionLabel>
          <h2 className="font-display font-bold text-display text-bone mt-3">
            O buraco que drena<br />
            <span className="text-electric">cada real investido.</span>
          </h2>
        </Reveal>

        {/* Narrative chain */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-white/[0.06]">
          {steps.map((step, i) => (
            <Reveal
              key={step.n}
              delay={i * 0.08}
              className="border-r border-b lg:border-b-0 border-white/[0.06] p-6 relative group hover:bg-well transition-colors duration-300"
            >
              <div className="font-display font-bold text-[4rem] text-white/[0.03] leading-none mb-4 group-hover:text-white/[0.06] transition-colors">
                {step.n}
              </div>
              <p className="text-sm font-light text-fog leading-relaxed">{step.cause}</p>
              {i < steps.length - 1 && (
                <span className="hidden lg:block absolute top-8 -right-3 z-10 font-mono text-mono-xs text-stone">→</span>
              )}
            </Reveal>
          ))}
        </div>

        {/* Resolution */}
        <Reveal delay={0.35} className="mt-10 border border-electric/20 bg-electric/[0.04] px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="font-mono text-mono-xs uppercase tracking-[0.2em] text-electric mb-1">O diagnóstico</div>
            <p className="text-sm text-ghost font-light">
              Isso tem nome: é o buraco no funil. <strong className="text-bone font-medium">Sampa Vision AI fecha esse buraco — em 60 segundos.</strong>
            </p>
          </div>
          <div className="shrink-0 font-display font-bold text-2xl text-electric whitespace-nowrap">60s.</div>
        </Reveal>
      </div>
    </section>
  )
}
