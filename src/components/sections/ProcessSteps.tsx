import { SectionLabel } from '@/components/shared/SectionLabel'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'
import { PROCESS_STEPS } from '@/config/content'

export function ProcessSteps() {
  return (
    <AnimatedSection
      id="processo"
      className="py-section-sm md:py-section border-t border-[rgba(100,100,180,0.12)]"
    >
      <div className="container-main">
        <SectionLabel>Como funciona</SectionLabel>
        <h2 className="font-display font-bold text-display-md text-bone mt-4 mb-2">
          De zero a publicado.
        </h2>
        <p className="font-body text-body-lg text-fog mb-12">
          Em menos de 5 minutos.
        </p>

        {/* Grid de 4 etapas com conectores */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[rgba(100,100,180,0.12)]">
          {PROCESS_STEPS.map((step) => (
            <StaggerItem
              key={step.step}
              className="border-r border-b border-[rgba(100,100,180,0.12)] p-6 lg:p-7 relative group hover:bg-well transition-colors duration-300"
            >
              <span className="font-display font-extrabold text-5xl text-[rgba(228,228,240,0.05)] leading-none block mb-5">
                {step.step}
              </span>
              <h3 className="font-display font-bold text-base text-bone mb-2">
                {step.title}
              </h3>
              <p className="font-body text-body-sm text-ash mb-4 leading-relaxed">
                {step.description}
              </p>
              <span className="font-mono text-mono-xs uppercase tracking-[0.14em] text-electric">
                {step.time}
              </span>

              {/* Linha de hover */}
              <span className="absolute top-0 left-0 w-0 h-0.5 bg-electric shadow-glow-sm group-hover:w-full transition-all duration-400" />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Total — transparência radical */}
        <div className="mt-8 pt-6 border-t border-[rgba(100,100,180,0.12)]">
          <p className="font-mono text-mono-sm text-ash">
            Total:{' '}
            <span className="text-bone font-medium">
              menos de 5 minutos
            </span>{' '}
            do briefing à página publicada.
          </p>
        </div>
      </div>
    </AnimatedSection>
  )
}
