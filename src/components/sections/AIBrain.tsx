'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'

// ── AGENTES DE IA — cada um com papel, entrada e saída específicos ────────
const AGENTS = [
  {
    id:       'strategist',
    icon:     '◎',
    name:     'IA Estratégica',
    role:     'Analisa o briefing e mapeia o posicionamento ideal de mercado.',
    input:    'Briefing do cliente',
    output:   'Estratégia de conversão',
    color:    'rgba(0, 191, 255, 0.08)',
    border:   'rgba(0, 191, 255, 0.25)',
    dot:      '#00BFFF',
  },
  {
    id:       'copywriter',
    icon:     '✦',
    name:     'IA Copywriter',
    role:     'Gera headlines, subtítulos e CTAs calibrados para o público-alvo.',
    input:    'Estratégia + Tom de voz',
    output:   'Copy de conversão',
    color:    'rgba(0, 191, 255, 0.05)',
    border:   'rgba(0, 191, 255, 0.15)',
    dot:      '#33CFFF',
  },
  {
    id:       'designer',
    icon:     '◈',
    name:     'IA Designer',
    role:     'Seleciona layout, hierarquia visual e identidade adequados ao segmento.',
    input:    'Copy + Segmento',
    output:   'Layout e identidade',
    color:    'rgba(0, 191, 255, 0.05)',
    border:   'rgba(0, 191, 255, 0.15)',
    dot:      '#33CFFF',
  },
  {
    id:       'seo',
    icon:     '◆',
    name:     'IA SEO',
    role:     'Otimiza meta tags, estrutura semântica e velocidade de indexação.',
    input:    'Conteúdo gerado',
    output:   'Estrutura indexável',
    color:    'rgba(0, 191, 255, 0.05)',
    border:   'rgba(0, 191, 255, 0.15)',
    dot:      '#33CFFF',
  },
  {
    id:       'frontend',
    icon:     '▲',
    name:     'IA Front-end',
    role:     'Monta o código responsivo, conecta pixels e publica em cloud.',
    input:    'Layout + SEO',
    output:   'URL publicada',
    color:    'rgba(0, 191, 255, 0.08)',
    border:   'rgba(0, 191, 255, 0.25)',
    dot:      '#00BFFF',
  },
]

// ── MÉTRICAS DO PIPELINE ──────────────────────────────────────────────────
const PIPELINE_METRICS = [
  { value: '5',    label: 'agentes ativos',        sub: 'em paralelo'         },
  { value: '<60s', label: 'tempo total',            sub: 'do briefing à URL'  },
  { value: '100%', label: 'automação',              sub: 'zero intervenção'   },
]

export function AIBrain() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="cerebro"
      className="py-[5rem] md:py-[8rem] border-t border-[rgba(100,100,180,0.12)] bg-[#0E0E16] relative overflow-hidden"
      aria-labelledby="cerebro-title"
    >
      {/* Glow de fundo sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 100%,
            rgba(0,191,255,0.04) 0%, transparent 70%)`
        }}
      />

      <div className="max-w-[1440px] mx-auto px-[clamp(1.5rem,4vw,5rem)] relative z-10">

        {/* ── HEADER ── */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <SectionLabel>Tecnologia</SectionLabel>
            <h2
              id="cerebro-title"
              className="font-display font-extrabold text-[clamp(1.8rem,3vw,3rem)] leading-[1.05] tracking-[-0.01em] text-[#E4E4F0] mt-4"
            >
              O cérebro por trás.
            </h2>
            <p className="font-body text-[0.9rem] text-[#9090AA] mt-4 max-w-sm leading-relaxed">
              Não é mágica. É um pipeline de cinco agentes de IA especializados
              operando em sequência — cada um responsável por uma camada do resultado.
            </p>
          </div>

          {/* Métricas do pipeline */}
          <div className="flex flex-col justify-end gap-0 border border-[rgba(100,100,180,0.12)]">
            {PIPELINE_METRICS.map((m, i) => (
              <div
                key={m.label}
                className={`flex items-center gap-6 px-6 py-4 ${
                  i < PIPELINE_METRICS.length - 1
                    ? 'border-b border-[rgba(100,100,180,0.12)]'
                    : ''
                }`}
              >
                <span className="font-display font-extrabold text-2xl text-[#00BFFF] w-16 flex-shrink-0">
                  {m.value}
                </span>
                <div>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#E4E4F0] block">
                    {m.label}
                  </span>
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[#6B6B8A]">
                    {m.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PIPELINE VISUAL ── */}
        <div
          className="relative"
          role="list"
          aria-label="Pipeline de agentes de IA"
        >
          {/* Linha de conexão vertical — desktop */}
          <div
            className="hidden lg:block absolute left-[calc(2.5rem+1px)] top-8 bottom-8 w-px bg-[rgba(100,100,180,0.12)]"
            aria-hidden="true"
          >
            {/* Linha de progresso animada */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#00BFFF]"
              style={{ boxShadow: '0 0 8px rgba(0,191,255,0.6)' }}
              initial={{ height: '0%' }}
              animate={inView ? { height: '100%' } : { height: '0%' }}
              transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
            />
          </div>

          <div className="flex flex-col gap-0" role="list">
            {AGENTS.map((agent, i) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                index={i}
                inView={inView}
                isLast={i === AGENTS.length - 1}
              />
            ))}
          </div>
        </div>

        {/* ── RESULTADO FINAL — seta de saída ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: AGENTS.length * 0.15 + 0.4 }}
          className="mt-8 flex items-center gap-4 pl-0 lg:pl-20"
        >
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(to right, #00BFFF, transparent)' }}
            aria-hidden="true"
          />
          <div className="border border-[rgba(0,191,255,0.35)] bg-[rgba(0,191,255,0.06)] px-6 py-3 flex items-center gap-3">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#00BFFF]">
              ↗
            </span>
            <div>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#E4E4F0] block">
                Rascunho pronto para revisão
              </span>
              <span className="font-mono text-[0.58rem] text-[#6B6B8A]">
                Copy • Layout • Identidade visual
              </span>
            </div>
          </div>
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(to left, #00BFFF, transparent)' }}
            aria-hidden="true"
          />
        </motion.div>

      </div>
    </section>
  )
}

// ── CARD DE AGENTE ────────────────────────────────────────────────────────
function AgentCard({
  agent,
  index,
  inView,
  isLast,
}: {
  agent: typeof AGENTS[0]
  index: number
  inView: boolean
  isLast: boolean
}) {
  return (
    <motion.div
      role="listitem"
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.15 + 0.2,
      }}
      className="grid lg:grid-cols-[5rem_1fr] gap-0 group"
    >
      {/* Coluna esquerda — dot + linha */}
      <div className="hidden lg:flex flex-col items-center pt-6">
        {/* Dot do agente */}
        <motion.div
          className="w-5 h-5 rounded-none border-2 flex items-center justify-center flex-shrink-0 z-10 relative bg-[#0E0E16]"
          style={{ borderColor: agent.dot }}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, delay: index * 0.15 + 0.35 }}
          aria-hidden="true"
        >
          <span
            className="w-1.5 h-1.5 rounded-none"
            style={{ background: agent.dot }}
          />
        </motion.div>
      </div>

      {/* Coluna direita — conteúdo do card */}
      <div
        className={`border border-[rgba(100,100,180,0.12)] p-6 lg:p-7 transition-all duration-300 group-hover:border-[rgba(0,191,255,0.2)] ${
          isLast ? '' : 'border-b-0'
        }`}
        style={{ background: agent.color }}
      >
        <div className="grid sm:grid-cols-[1fr_auto] gap-6 items-start">

          {/* Info principal */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span
                className="font-mono text-base"
                style={{ color: agent.dot }}
                aria-hidden="true"
              >
                {agent.icon}
              </span>
              <span className="font-display font-bold text-sm text-[#E4E4F0] uppercase tracking-[0.06em]">
                {agent.name}
              </span>
              {/* Número de sequência */}
              <span className="font-mono text-[0.56rem] text-[#2C2C3E] ml-auto">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <p className="font-body text-[0.82rem] text-[#9090AA] leading-relaxed">
              {agent.role}
            </p>
          </div>

          {/* Input → Output */}
          <div
            className="flex flex-col gap-2 text-right sm:text-right flex-shrink-0 min-w-[140px]"
            aria-label={`Entrada: ${agent.input}. Saída: ${agent.output}`}
          >
            <IOTag label="entrada" value={agent.input} dim />
            <div
              className="self-end w-px h-3 ml-auto"
              style={{ background: agent.border }}
              aria-hidden="true"
            />
            <IOTag label="saída" value={agent.output} />
          </div>

        </div>
      </div>
    </motion.div>
  )
}

// ── TAG DE ENTRADA/SAÍDA ──────────────────────────────────────────────────
function IOTag({
  label,
  value,
  dim = false,
}: {
  label: string
  value: string
  dim?: boolean
}) {
  return (
    <div className="text-right">
      <span className="font-mono text-[0.52rem] uppercase tracking-[0.2em] text-[#2C2C3E] block mb-0.5">
        {label}
      </span>
      <span
        className={`font-mono text-[0.62rem] uppercase tracking-[0.1em] ${
          dim ? 'text-[#6B6B8A]' : 'text-[#00BFFF]'
        }`}
      >
        {value}
      </span>
    </div>
  )
}
