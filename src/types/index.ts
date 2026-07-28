// ── TIPOS GLOBAIS — Sampa Vision AI ──────────────────────────────────────

// Módulos da plataforma
export type ModuleStatus = 'available' | 'soon' | 'planned'

export interface PlatformModule {
  id: string
  icon: string
  title: string
  description: string
  status: ModuleStatus
  releaseDate?: string
}

// Planos de preço
export type PlanTier = 'starter' | 'growth' | 'studio'

export interface PricingPlan {
  id: PlanTier
  name: string
  price: number
  period: string
  description: string
  features: string[]
  highlighted: boolean
  cta: string
}

// Depoimentos / Prova social
export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  city: string
  before: {
    metric: string
    value: string
  }
  after: {
    metric: string
    value: string
  }
  featured: boolean
}

// Demos de segmento no produto
export interface SegmentDemo {
  id: string
  label: string
  briefing: {
    business: string
    audience: string
    objective: string
  }
  result: {
    headline: string
    subheadline: string
    cta: string
    time: string
  }
}

// Etapas do processo
export interface ProcessStep {
  step: string
  title: string
  description: string
  time: string
}

// FAQ
export interface FAQItem {
  question: string
  answer: string
}

// Status operacional
export type OperationalStatus = 'operational' | 'degraded' | 'outage'

export interface SystemStatus {
  status: OperationalStatus
  label: string
  updatedAt: string
}

// Navegação
export interface NavItem {
  label: string
  href: string
  external?: boolean
}

// Métricas do hero
export interface HeroMetric {
  value: string
  label: string
  sublabel?: string
}

// Etapas do terminal AI
export interface TerminalStep {
  icon: '→' | '✓' | '↗'
  text: string
  delay: number
  isResult?: boolean
}

// ── BRIEFING DE 7 PERGUNTAS ───────────────────────────────────────────────

/** Os 7 campos do briefing — espelha exatamente a Esteira V2 */
export interface BriefingAnswers {
  produto: string        // 1. Produto ou serviço principal
  publico: string        // 2. Cliente ideal
  dor: string             // 3. Maior dor/problema
  diferencial: string     // 4. Principal diferencial competitivo
  beneficios: string      // 5. 3 maiores benefícios práticos
  oferta: string           // 6. Oferta ou condição especial
  cta: string               // 7. Ação única ao clicar no botão
}

export type BriefingField = keyof BriefingAnswers

/**
 * Extensão opcional ao LandingBriefingContract (seção 10: "Extensibilidade" —
 * declarativa, identificável, fora do núcleo canônico de 7 campos). Não
 * altera o contrato original; só enriquece o prompt quando o visitante
 * preenche. Também é a base para o perfil de marca que Vision Branding e
 * Vision Intelligence vão reaproveitar futuramente.
 */
export interface BriefingExtras {
  concorrentes?: string
  referencia?: string
}

export interface BriefingQuestion {
  field: BriefingField
  number: number
  question: string
  placeholder: string
  helper: string
  minLength: number
}

/** Pergunta opcional — sem minLength, campo de BriefingExtras */
export interface ExtraQuestion {
  field: keyof BriefingExtras
  question: string
  placeholder: string
  helper: string
}

/** Estado de cada etapa enquanto a IA gera a página */
export type GenerationStepStatus = 'pending' | 'active' | 'done' | 'error'

export interface GenerationStep {
  id: string
  label: string
  status: GenerationStepStatus
}

/** Página gerada pela IA — saída estruturada via tags */
export interface GeneratedPage {
  heroTitle: string
  heroSubtitle: string
  heroCta: string
  painPoints: string[]
  benefits: { title: string; description: string }[]
  socialProofHook: string
  offerSection: string
  footerCta: string
}

/** Eventos enviados via SSE do servidor para o cliente */
export type GenerationEvent =
  | { type: 'status'; step: string; label: string }
  | { type: 'delta'; text: string }
  | { type: 'complete'; page: GeneratedPage; elapsedMs: number }
  | { type: 'error'; message: string }
