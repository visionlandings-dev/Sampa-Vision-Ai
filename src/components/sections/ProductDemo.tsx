'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { cn } from '@/lib/utils'
import { SEGMENT_DEMOS } from '@/config/content'

export function ProductDemo() {
  const [activeId, setActiveId] = useState(SEGMENT_DEMOS[0].id)
  const active = SEGMENT_DEMOS.find((d) => d.id === activeId) ?? SEGMENT_DEMOS[0]

  return (
    <AnimatedSection
      id="produto"
      className="py-section-sm md:py-section border-t border-[rgba(100,100,180,0.12)]"
    >
      <div className="container-main">
        <SectionLabel>Produto em funcionamento</SectionLabel>
        <h2 className="font-display font-bold text-display-md text-bone mt-4 mb-10">
          Veja acontecendo.
        </h2>

        {/* ── PAINEL BRIEFING → RESULTADO ── */}
        <div className="grid lg:grid-cols-2 gap-px bg-[rgba(100,100,180,0.12)] border border-[rgba(100,100,180,0.12)] mb-6">

          {/* Briefing */}
          <div className="bg-pit p-6 md:p-8">
            <span className="font-mono text-mono-xs uppercase tracking-[0.22em] text-ash block mb-6">
              Briefing
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <BriefingField label="Negócio" value={active.briefing.business} />
                <BriefingField label="Público" value={active.briefing.audience} />
                <BriefingField label="Objetivo" value={active.briefing.objective} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Resultado */}
          <div className="bg-pit p-6 md:p-8 flex flex-col">
            <span className="font-mono text-mono-xs uppercase tracking-[0.22em] text-ash block mb-6">
              Resultado
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 bg-void border border-electric/20 p-6 flex flex-col justify-center gap-4"
              >
                <h3 className="font-display font-bold text-lg leading-tight text-bone">
                  {active.result.headline}
                </h3>
                <p className="font-body text-body-sm text-fog">
                  {active.result.subheadline}
                </p>
                <button className="self-start font-mono text-mono-sm uppercase tracking-[0.14em] bg-electric text-void px-5 py-2.5 hover:bg-electric-hover transition-colors">
                  {active.result.cta}
                </button>
              </motion.div>
            </AnimatePresence>

            <span className="font-mono text-mono-xs text-ash mt-3 self-end">
              ↑ gerado em {active.result.time}
            </span>
          </div>
        </div>

        {/* ── TABS DE SEGMENTO ── */}
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Escolha o segmento do negócio"
        >
          {SEGMENT_DEMOS.map((demo) => (
            <button
              key={demo.id}
              role="tab"
              aria-selected={activeId === demo.id}
              onClick={() => setActiveId(demo.id)}
              className={cn(
                'font-mono text-mono-sm uppercase tracking-[0.14em] px-5 py-2.5 border transition-all duration-200',
                activeId === demo.id
                  ? 'bg-electric text-void border-electric font-medium'
                  : 'bg-transparent text-ash border-stone hover:border-electric/40 hover:text-bone'
              )}
            >
              {demo.label}
            </button>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

function BriefingField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="font-mono text-mono-xs uppercase tracking-[0.16em] text-stone block mb-1.5">
        {label}
      </span>
      <p className="font-body text-body-md text-ghost">{value}</p>
    </div>
  )
}
