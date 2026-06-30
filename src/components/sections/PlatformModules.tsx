import { SectionLabel } from '@/components/shared/SectionLabel'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import { PLATFORM_MODULES } from '@/config/content'
import type { ModuleStatus } from '@/types'

const STATUS_CONFIG: Record<ModuleStatus, { label: string; variant: 'success' | 'warning' | 'default' }> = {
  available: { label: 'Disponível', variant: 'success' },
  soon:      { label: '',           variant: 'warning' },
  planned:   { label: '',           variant: 'default' },
}

export function PlatformModules() {
  return (
    <AnimatedSection
      id="modulos"
      className="py-section-sm md:py-section border-t border-[rgba(100,100,180,0.12)] bg-pit"
    >
      <div className="container-main">
        <SectionLabel>A plataforma</SectionLabel>
        <h2 className="font-display font-bold text-display-md text-bone mt-4 mb-2">
          Você entra pelo módulo.
        </h2>
        <p className="font-body text-body-lg text-fog mb-12">
          Fica pela plataforma.
        </p>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(100,100,180,0.12)] border border-[rgba(100,100,180,0.12)] mb-8">
          {PLATFORM_MODULES.map((module) => {
            const isAvailable = module.status === 'available'
            const statusLabel =
              module.status === 'available'
                ? 'Disponível'
                : module.releaseDate ?? STATUS_CONFIG[module.status].label

            return (
              <StaggerItem
                key={module.id}
                className={cn(
                  'bg-void p-6 transition-opacity duration-300',
                  !isAvailable && 'opacity-60 hover:opacity-90'
                )}
              >
                <span className="text-2xl block mb-4" aria-hidden="true">
                  {module.icon}
                </span>
                <h3 className="font-display font-bold text-base text-bone mb-1.5">
                  {module.title}
                </h3>
                <p className="font-body text-body-sm text-ash mb-4 leading-relaxed">
                  {module.description}
                </p>
                <Badge variant={STATUS_CONFIG[module.status].variant} dot={isAvailable}>
                  {statusLabel}
                </Badge>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        <p className="font-mono text-mono-sm text-ash">
          Clientes que entram agora têm acesso prioritário a cada módulo no lançamento.
        </p>
      </div>
    </AnimatedSection>
  )
}
