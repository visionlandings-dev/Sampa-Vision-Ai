'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/ui/Reveal'
import { SEGMENT_DEMOS } from '@/config/content'
import { cn, ease } from '@/lib/utils'

export function ProductDemo() {
  const [active, setActive] = useState(0)
  const demo = SEGMENT_DEMOS[active]

  return (
    <section id="produto" className="py-[clamp(5rem,10vw,9rem)] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-[clamp(1rem,4vw,4rem)]">
        <Reveal>
          <SectionLabel>Veja acontecendo</SectionLabel>
          <h2 className="font-display font-bold text-display text-bone mt-3 mb-2">
            Do briefing à página publicada.<br />
            <span className="text-electric">Em menos de 60 segundos.</span>
          </h2>
          <p className="text-sm font-light text-fog max-w-[480px] mt-3 mb-10">
            Selecione um segmento e veja a Aurora gerar copy e estrutura em tempo real.
          </p>
        </Reveal>

        {/* Segment tabs */}
        <Reveal delay={0.1}>
          <div className="flex gap-1 mb-8 flex-wrap">
            {SEGMENT_DEMOS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={cn(
                  'font-mono text-mono-xs uppercase tracking-[0.18em] px-4 py-2 transition-all duration-200 border',
                  active === i
                    ? 'bg-electric text-void border-electric'
                    : 'bg-transparent text-ash border-white/[0.06] hover:border-electric/40 hover:text-bone',
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Demo grid */}
        <Reveal delay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/[0.06]">
            {/* Briefing panel */}
            <div className="border-r-0 lg:border-r border-white/[0.06] p-6 bg-well">
              <div className="font-mono text-mono-xs uppercase tracking-[0.22em] text-ash mb-4">Briefing</div>
              <div className="space-y-3">
                {Object.entries(demo.briefing).map(([key, val]) => (
                  <div key={key} className="flex gap-3">
                    <span className="font-mono text-mono-xs text-stone uppercase tracking-[0.12em] w-16 shrink-0 pt-0.5">{key}</span>
                    <span className="text-sm font-light text-ghost leading-snug">{val}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 font-mono text-mono-xs text-ash">
                  <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse-dot" />
                  Aurora processando...
                </div>
              </div>
            </div>

            {/* Result panel */}
            <div className="p-6 bg-pit relative overflow-hidden">
              <div className="font-mono text-mono-xs uppercase tracking-[0.22em] text-ash mb-4">Resultado</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={demo.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease }}
                >
                  {/* Preview card */}
                  <div className="border border-white/[0.06] bg-void p-5 mb-4">
                    <div className="border-l-2 border-electric pl-4 mb-4">
                      <div className="font-display font-bold text-sm text-bone leading-tight tracking-tight">
                        {demo.headline}
                      </div>
                    </div>
                    <p className="text-xs font-light text-fog leading-relaxed mb-5">{demo.subheadline}</p>
                    <div className="inline-block bg-electric text-void font-mono text-mono-xs uppercase tracking-[0.14em] px-4 py-2">
                      {demo.cta}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-mono text-mono-xs text-ash">Gerado com Aurora AI</span>
                    <span className="font-mono text-mono-xs text-electric font-medium">↗ {demo.time}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
