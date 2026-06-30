import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ── CLASS MERGER — shadcn/ui padrão ───────────────────────────────────────
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// ── FORMATADORES ──────────────────────────────────────────────────────────

/** Formata número com separador de milhar PT-BR */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat('pt-BR').format(n)
}

/** Formata moeda BRL */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  }).format(value)
}

// ── HELPERS DE ANIMAÇÃO ───────────────────────────────────────────────────

/** Gera delay de stagger para animações em sequência */
export function staggerDelay(index: number, base = 0.1): number {
  return index * base
}

/** Variantes padrão de fade-up para Framer Motion */
export const fadeUpVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  }),
}

export const fadeInVariants = {
  hidden:  { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay },
  }),
}

export const containerVariants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const itemVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

// ── STATUS ────────────────────────────────────────────────────────────────
export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    operational: 'text-success',
    degraded:    'text-warning',
    outage:      'text-error',
    available:   'text-success',
    soon:        'text-warning',
    planned:     'text-ash',
  }
  return map[status] ?? 'text-ash'
}

export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    operational: 'Operacional',
    degraded:    'Degradado',
    outage:      'Fora do ar',
    available:   'Disponível',
    soon:        'Em breve',
    planned:     'Planejado',
  }
  return map[status] ?? status
}
