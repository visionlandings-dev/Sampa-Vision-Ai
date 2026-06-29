'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { TERMINAL_STEPS, HERO_FRICTION_KILLERS, HERO_METRICS } from '@/config/content'
import { ease } from '@/lib/utils'

// Animated terminal — the product thesis shown before described
function Terminal() {
  const [visible, setVisible] = useState<number[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timers = TERMINAL_STEPS.map((step, i) =>
      setTimeout(() => setVisible((prev) => [...prev, i]), step.delay),
    )
    const donTimer = setTimeout(() => setDone(true), 5200)
    return () => { timers.forEach(clearTimeout); clearTimeout(donTimer) }
  }, [])

  return (
    <div className="relative bg-well border border-white/[0.06] overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-pit">
        <span className="w-2.5 h-2.5 rounded-full bg-stone" />
        <span className="w-2.5 h-2.5 rounded-full bg-stone" />
        <span className="w-2.5 h-2.5 rounded-full bg-stone" />
        <span className="ml-3 font-mono text-mono-xs text-ash">Aurora AI · Gerando página...</span>
        <span className={`ml-auto w-1.5 h-1.5 rounded-full ${done ? 'bg-success' : 'bg-electric animate-pulse-dot'}`} />
      </div>

      {/* Lines */}
      <div className="p-4 space-y-1.5 min-h-[260px]">
        {TERMINAL_STEPS.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={visible.includes(i) ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.25 }}
            className={`flex items-start gap-2.5 font-mono text-mono-xs ${step.isResult ? 'text-electric font-medium mt-2 pt-2 border-t border-white/[0.06]' : step.icon === '✓' ? 'text-success' : 'text-ash'}`}
          >
            <span className="shrink-0 w-3">{step.icon}</span>
            <span>{step.text}</span>
          </motion.div>
        ))}

        {/* Blinking cursor */}
        {!done && (
          <div className="flex items-center gap-2.5 font-mono text-mono-xs text-ash">
            <span className="shrink-0 w-3">›</span>
            <span className="inline-block w-1.5 h-3.5 bg-electric animate-cursor-blink" />
          </div>
        )}
      </div>

      {/* Metrics strip */}
      <div className="grid grid-cols-2 border-t border-white/[0.06]">
        {HERO_METRICS.map((m) => (
          <div key={m.label} className="px-4 py-3 border-r last:border-r-0 border-white/[0.06]">
            <div className="font-display font-bold text-xl text-bone leading-none">{m.value}</div>
            <div className="font-mono text-mono-xs text-ash mt-0.5">{m.label} <span className="text-stone">{m.sub}</span></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-[10vh] overflow-hidden" aria-label="Hero">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,black_30%,transparent_100%)]" aria-hidden />

      {/* Glow orbs */}
      <div className="absolute top-[-120px] right-[-80px] w-[600px] h-[600px] rounded-full bg-glow-radial blur-[80px] opacity-60 pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 left-[-60px] w-[400px] h-[400px] rounded-full bg-radial-gradient blur-[80px] opacity-30 pointer-events-none" aria-hidden />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-[clamp(1rem,4vw,4rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-end">
          {/* Left column */}
          <div className="pb-0 lg:pb-8">
            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-electric/35 bg-electric/[0.06] font-mono text-mono-xs uppercase tracking-[0.22em] text-electric mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse-dot" aria-hidden />
              Ao vivo · 2.847 páginas geradas hoje
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden mb-1">
              <motion.h1
                className="font-display font-bold text-hero text-bone leading-[0.92] tracking-[-0.03em]"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease, delay: 0.3 }}
              >
                MAIS LEADS.
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-1">
              <motion.span
                className="block font-display font-bold text-hero text-electric leading-[0.92] tracking-[-0.03em]"
                style={{ textShadow: '0 0 40px rgba(0,102,255,0.4)' }}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease, delay: 0.45 }}
                aria-hidden
              >
                MENOS AGÊNCIA.
              </motion.span>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.span
                className="block font-display font-bold text-hero text-bone leading-[0.92] tracking-[-0.03em]"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease, delay: 0.6 }}
                aria-hidden
              >
                PÁGINAS EM 60s.
              </motion.span>
            </div>

            {/* Subheadline */}
            <motion.p
              className="text-sm font-light text-fog leading-[1.85] max-w-[420px] border-l border-electric/35 pl-4 mb-10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
            >
              De um briefing de 7 perguntas para uma landing page publicada. Sem agência. Sem código. Sem espera de 3 semanas.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Button asChild size="lg">
                <Link href="#contato">
                  Gerar minha primeira página
                  <ArrowRight className="w-4 h-4" aria-hidden />
                </Link>
              </Button>

              {/* Friction killers */}
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4">
                {HERO_FRICTION_KILLERS.map((item) => (
                  <span key={item} className="flex items-center gap-1.5 font-mono text-mono-xs text-ash">
                    <span className="text-success">✓</span>
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column — the signature element */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.5 }}
            className="lg:pb-8"
          >
            <Terminal />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-[clamp(1rem,4vw,4rem)] flex items-center gap-3 font-mono text-mono-xs uppercase tracking-[0.3em] text-stone"
        aria-hidden
      >
        <div className="relative w-10 h-px bg-gradient-to-r from-electric to-transparent overflow-hidden">
          <span className="absolute inset-0 bg-electric animate-[line-run_1.6s_ease-in-out_1.4s_infinite]" />
        </div>
        scroll
      </motion.div>
    </section>
  )
}
