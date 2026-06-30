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
