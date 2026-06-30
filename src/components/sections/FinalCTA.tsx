import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { Button } from '@/components/ui/Button'

const GUARANTEES = [
  'Sem cartão de crédito',
  'Primeira landing page grátis',
  'Cancela quando quiser',
  'Suporte em português',
]

export function FinalCTA() {
  return (
    <AnimatedSection className="py-section-sm md:py-section border-t border-[rgba(100,100,180,0.12)]">
      <div className="container-main">
        <div className="bg-well border border-electric/15 p-8 md:p-16 text-center relative overflow-hidden">
          {/* Linha de glow no topo */}
          <span
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent"
            aria-hidden="true"
          />

          <h2 className="font-display font-extrabold text-display-lg text-bone mb-2 leading-[0.95]">
            Sua primeira página
            <br />
            publicada em 60 segundos.
          </h2>
          <p className="font-display font-extrabold text-display-lg text-electric mb-8 leading-[0.95]">
            Grátis. Agora.
          </p>

          <Button size="xl" asChild className="mb-8">
            <Link href="/auth/signup">
              Responder o briefing (2 minutos)
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>

          <ul
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8"
            aria-label="Garantias"
          >
            {GUARANTEES.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 font-mono text-mono-sm text-ash"
              >
                <Check className="w-3 h-3 text-electric flex-shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <div className="pt-6 border-t border-[rgba(100,100,180,0.12)] flex items-center justify-center gap-6 font-mono text-mono-sm">
            <Link href="/auth/login" className="text-ash hover:text-bone transition-colors">
              Já tem conta? Entrar →
            </Link>
            <Link href="/contato" className="text-ash hover:text-bone transition-colors">
              Falar com humano →
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
