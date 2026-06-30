import { SectionLabel } from '@/components/shared/SectionLabel'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'
import { cn } from '@/lib/utils'
import { TESTIMONIALS } from '@/config/content'

export function SocialProof() {
  const featured = TESTIMONIALS.find((t) => t.featured)
  const others = TESTIMONIALS.filter((t) => !t.featured)

  return (
    <AnimatedSection
      id="clientes"
      className="py-section-sm md:py-section border-t border-[rgba(100,100,180,0.12)]"
    >
      <div className="container-main">
        <SectionLabel>Resultados reais</SectionLabel>
        <h2 className="font-display font-bold text-display-md text-bone mt-4 mb-12">
          Números reais. Clientes reais.
        </h2>

        {/* Card em destaque */}
        {featured && (
          <div className="bg-well border border-[rgba(100,100,180,0.15)] p-6 md:p-8 mb-px">
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <BeforeAfterBlock
                label="Antes"
                value={featured.before.value}
                metric={featured.before.metric}
                tone="muted"
              />
              <BeforeAfterBlock
                label="Depois"
                value={featured.after.value}
                metric={featured.after.metric}
                tone="electric"
              />
            </div>
            <blockquote className="font-body text-body-lg text-ghost italic mb-4 border-l-2 border-electric pl-4">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <cite className="font-mono text-mono-sm text-ash not-italic">
              {featured.author}, {featured.role} · {featured.city}
            </cite>
          </div>
        )}

        {/* Cards menores — padrão de repetição */}
        <StaggerContainer className="grid sm:grid-cols-2 gap-px bg-[rgba(100,100,180,0.12)] border-x border-b border-[rgba(100,100,180,0.12)]">
          {others.map((t) => (
            <StaggerItem key={t.id} className="bg-void p-6">
              <p className="font-mono text-mono-sm text-ash mb-1">
                Antes:{' '}
                <span className="text-ghost">
                  {t.before.metric} {t.before.value}
                </span>
              </p>
              <p className="font-mono text-mono-sm text-electric mb-4">
                Depois: <span className="font-medium">{t.after.value}</span>
              </p>
              <cite className="font-mono text-mono-xs uppercase tracking-[0.1em] text-stone not-italic">
                {t.author}, {t.role}
              </cite>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  )
}

function BeforeAfterBlock({
  label,
  value,
  metric,
  tone,
}: {
  label: string
  value: string
  metric: string
  tone: 'muted' | 'electric'
}) {
  return (
    <div>
      <span className="font-mono text-mono-xs uppercase tracking-[0.2em] text-stone block mb-2">
        {label}
      </span>
      <p
        className={cn(
          'font-display font-bold text-xl mb-1',
          tone === 'electric' ? 'text-electric' : 'text-ghost'
        )}
      >
        {value}
      </p>
      <span className="font-body text-body-sm text-ash">{metric}</span>
    </div>
  )
}
