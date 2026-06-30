import { ArrowRight } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'

const DIAGNOSIS_STEPS = [
  'Você investe\nR$3k/mês em\ntráfego.',
  'A página\nnão\nconverte.',
  'A agência\ndemora\n3 semanas.',
  'A janela\nfechou.',
]

export function ProblemDiagnosis() {
  return (
    <AnimatedSection className="py-section-sm md:py-section bg-pit border-t border-[rgba(100,100,180,0.12)]">
      <div className="container-main">
        <h2 className="font-display font-bold text-display-md text-bone mb-12 text-center md:text-left">
          Reconhece essa história?
        </h2>

        {/* Sequência narrativa de causa-efeito */}
        <StaggerContainer className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 mb-12">
          {DIAGNOSIS_STEPS.map((text, i) => (
            <StaggerItem key={i} className="flex items-center gap-4 md:gap-0">
              <div className="flex-shrink-0">
                <p className="font-body text-body-lg text-ghost whitespace-pre-line leading-snug max-w-[180px]">
                  {text}
                </p>
              </div>
              {i < DIAGNOSIS_STEPS.length - 1 && (
                <ArrowRight
                  className="hidden md:block w-6 h-6 text-electric mx-6 flex-shrink-0"
                  aria-hidden="true"
                />
              )}
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Pivot — dor para solução, sem seção separada */}
        <div className="border-t border-[rgba(100,100,180,0.15)] pt-8">
          <p className="font-display font-semibold text-display-sm text-bone">
            Isso tem nome: é o buraco no funil.
          </p>
          <p className="font-display font-semibold text-display-sm text-electric mt-1">
            Sampa Vision AI fecha esse buraco. Em 60 segundos.
          </p>
        </div>
      </div>
    </AnimatedSection>
  )
}
