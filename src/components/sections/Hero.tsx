'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { HERO_METRICS, HERO_FRICTION_KILLERS, TERMINAL_STEPS } from '@/config/content'

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-grid bg-grid"
      aria-label="Apresentação principal"
    >
      {/* ── GLOW DE FUNDO ── */}
      <div
        className="absolute top-[-120px] right-[-80px] w-[600px] h-[600px] rounded-full blur-[80px] bg-electric/15 pointer-events-none animate-glow"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-[-60px] w-[400px] h-[400px] rounded-full blur-[80px] bg-purple-600/8 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-main relative z-10 grid lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">

        {/* ═══════════════ COLUNA ESQUERDA — COPY ═══════════════ */}
        <div>
          {/* Badge ao vivo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <Badge variant="live" dot>
              {HERO_METRICS[0].value} {HERO_METRICS[0].label} {HERO_METRICS[0].sublabel}
            </Badge>
          </motion.div>

          {/* Headline — resultado, não feature */}
          <h1 className="font-display font-extrabold text-display-xl text-bone mb-6">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Mais leads.
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              Menos agência.
            </motion.span>
            <motion.span
              className="block text-electric"
              style={{ textShadow: '0 0 40px rgba(0,102,255,0.4)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Em 60 segundos.
            </motion.span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="text-body-lg text-fog max-w-md mb-8 leading-relaxed"
          >
            De um briefing de 7 perguntas para uma página publicada.
            Sem agência. Sem código. Sem espera.
          </motion.p>

          {/* CTA único */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button size="xl" asChild>
              <Link href="/auth/signup">
                Gerar minha primeira página
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>

          {/* Friction killers */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap gap-x-6 gap-y-2 mt-6"
            aria-label="Garantias"
          >
            {HERO_FRICTION_KILLERS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 font-mono text-mono-sm text-ash"
              >
                <Check className="w-3 h-3 text-electric flex-shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ═══════════════ COLUNA DIREITA — TERMINAL + MÉTRICAS ═══════════════ */}
        <div className="flex flex-col gap-6">
          <AITerminal />

          {/* Métricas */}
          <div className="grid grid-cols-2 gap-3">
            {HERO_METRICS.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                className="bg-well border border-[rgba(100,100,180,0.12)] p-4"
              >
                <div className="font-display font-bold text-2xl text-bone leading-none mb-1">
                  {metric.value}
                </div>
                <div className="font-mono text-mono-xs uppercase text-ash">
                  {metric.label}
                  {metric.sublabel && ` ${metric.sublabel}`}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── TERMINAL ANIMADO — produto em funcionamento ──────────────────────────
function AITerminal() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-pit border border-[rgba(100,100,180,0.15)] overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label="Demonstração da IA gerando uma landing page"
    >
      {/* Header do terminal */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(100,100,180,0.12)] bg-well">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-electric animate-pulse-dot" aria-hidden="true" />
          <span className="font-mono text-mono-sm uppercase tracking-[0.15em] text-electric">
            Aurora
          </span>
        </div>
        <span className="font-mono text-mono-xs text-ash uppercase">Ativo</span>
      </div>

      {/* Corpo — sequência de steps animados */}
      <div className="p-5 min-h-[260px] flex flex-col justify-center gap-2.5">
        {TERMINAL_STEPS.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: step.delay }}
            className={
              step.isResult
                ? 'flex items-center gap-2 font-mono text-mono-sm text-electric mt-2 pt-2 border-t border-[rgba(100,100,180,0.12)]'
                : 'flex items-center gap-2 font-mono text-mono-sm text-ghost'
            }
          >
            <span
              className={
                step.icon === '✓'
                  ? 'text-success w-3 flex-shrink-0'
                  : step.icon === '↗'
                  ? 'text-electric w-3 flex-shrink-0'
                  : 'text-ash w-3 flex-shrink-0'
              }
              aria-hidden="true"
            >
              {step.icon}
            </span>
            {step.text}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
