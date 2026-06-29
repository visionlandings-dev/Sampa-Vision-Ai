import Link from 'next/link'
import { ArrowRight, X, Check } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { PRICE_COMPARISON } from '@/config/content'

export function PriceAnchor() {
  const { agency, product } = PRICE_COMPARISON

  return (
    <section id="precos" className="py-[clamp(5rem,10vw,9rem)] border-t border-white/[0.06] bg-pit">
      <div className="max-w-[1400px] mx-auto px-[clamp(1rem,4vw,4rem)]">
        <Reveal className="mb-12">
          <SectionLabel>Contexto de preço</SectionLabel>
          <h2 className="font-display font-bold text-display text-bone mt-3">
            O que você pagaria<br />
            <span className="text-electric">por uma agência?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/[0.06]">
          {/* Agency column */}
          <div className="p-8 border-b md:border-b-0 md:border-r border-white/[0.06] bg-void">
            <div className="font-mono text-mono-xs uppercase tracking-[0.22em] text-ash mb-6">{agency.label}</div>
            <div className="font-display font-bold text-3xl text-stone mb-1">{agency.price}</div>
            <div className="font-mono text-mono-xs text-stone mb-8">{agency.unit}</div>
            <div className="space-y-3">
              {agency.cons.map((c) => (
                <div key={c} className="flex items-center gap-3 text-sm font-light text-ash">
                  <X className="w-3.5 h-3.5 text-stone shrink-0" aria-hidden />
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* Product column */}
          <div className="p-8 bg-well relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-electric" aria-hidden />
            <div className="font-mono text-mono-xs uppercase tracking-[0.22em] text-electric mb-6">{product.label}</div>
            <div className="font-display font-bold text-3xl text-bone mb-1">{product.price}</div>
            <div className="font-mono text-mono-xs text-ash mb-8">{product.unit}</div>
            <div className="space-y-3 mb-8">
              {product.pros.map((p) => (
                <div key={p} className="flex items-center gap-3 text-sm font-light text-ghost">
                  <Check className="w-3.5 h-3.5 text-electric shrink-0" aria-hidden />
                  {p}
                </div>
              ))}
            </div>
            <Button asChild size="md">
              <Link href="#contato">
                Ver todos os planos
                <ArrowRight className="w-3.5 h-3.5" aria-hidden />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
