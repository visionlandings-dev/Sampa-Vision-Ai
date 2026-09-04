'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'

const ease = [0.16, 1, 0.3, 1] as const

export function FinalCTA() {
  return (
    <motion.section
      className="py-section-sm md:py-section border-t border-[rgba(100,100,180,0.12)]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="container-main">
        <div className="bg-well border border-electric/15 p-8 md:p-16 text-center relative overflow-hidden">
          {/* Linha de glow no topo */}
          <div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/50 to-transparent"
            aria-hidden
          />

          <SectionLabel className="justify-center mb-6">Comece agora</SectionLabel>

          <h2 className="font-display font-bold text-display-lg text-bone mb-4 max-w-2xl mx-auto">
            Sua primeira landing page gerada por IA em{' '}
            <span className="text-electric">menos de 60 segundos</span>
          </h2>

          <p className="text-body-md text-text-secondary max-w-lg mx-auto mb-10">
            Sem agência. Sem código. Sem espera de 3 semanas.
            Responda 7 perguntas e a Aurora gera, publica e ativa sua página.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Button asChild size="lg">
              <Link href="#contato">
                Gerar minha primeira página
                <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="#produto">Ver demonstração</Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {['Sem cartão de crédito', 'Primeira página grátis', 'Cancela quando quiser'].map((item) => (
              <span key={item} className="flex items-center gap-2 font-mono text-mono-sm text-text-tertiary">
                <span className="text-success" aria-hidden>✓</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
