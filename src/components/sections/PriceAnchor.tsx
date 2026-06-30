import Link from 'next/link'
import { Check, X, ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { PRICE_COMPARISON } from '@/config/content'

export function PriceAnchor() {
  const { competitor, product } = PRICE_COMPARISON

  return (
    <AnimatedSection
      id="precos"
      className="py-section-sm md:py-section border-t border-[rgba(100,100,180,0.12)] bg-pit"
    >
      <div className="container-main">
        <h2 className="font-display font-bold text-display-md text-bone mb-12">
          O que você pagaria por uma agência?
        </h2>

        <div className="grid md:grid-cols-2 gap-px bg-[rgba(100,100,180,0.12)] border border-[rgba(100,100,180,0.12)]">

          {/* Coluna concorrente */}
          <div className="bg-void p-6 md:p-8">
            <span className="font-mono text-mono-xs uppercase tracking-[0.2em] text-ash block mb-4">
              {competitor.label}
            </span>
            <p className="font-display font-bold text-3xl text-ghost mb-1">
              {competitor.price}
            </p>
            <p className="font-body text-body-sm text-stone mb-6">{competitor.unit}</p>

            <ul className="space-y-2.5">
              {competitor.cons.map((con) => (
                <li key={con} className="flex items-start gap-2 font-mono text-mono-sm text-ash">
                  <X className="w-3.5 h-3.5 text-stone flex-shrink-0 mt-0.5" aria-hidden="true" />
                  {con}
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna produto — destaque */}
          <div className="bg-well p-6 md:p-8 border-t-2 border-electric relative">
            <span className="font-mono text-mono-xs uppercase tracking-[0.2em] text-electric block mb-4">
              {product.label}
            </span>
            <p className="font-display font-bold text-3xl text-bone mb-1">
              {product.price}
            </p>
            <p className="font-body text-body-sm text-ash mb-6">{product.unit}</p>

            <ul className="space-y-2.5 mb-6">
              {product.pros.map((pro) => (
                <li key={pro} className="flex items-start gap-2 font-mono text-mono-sm text-ghost">
                  <Check className="w-3.5 h-3.5 text-electric flex-shrink-0 mt-0.5" aria-hidden="true" />
                  {pro}
                </li>
              ))}
            </ul>

            <Button asChild>
              <Link href="#precos-completo">
                Ver todos os planos
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
