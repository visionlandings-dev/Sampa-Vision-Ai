import { createClient } from '@supabase/supabase-js'
import { SAMPA_CONFIG } from './sampaConfig'
import { insertLead } from './sampaAnalytics'

/**
 * Client público do Sampa-Core, já apontado para o schema `vision`.
 * O papel `anon` só tem INSERT em vision.leads e vision.events: a leitura é bloqueada
 * por RLS e grants. Consulte os leads pelo painel do Supabase (Table Editor), não pela API pública.
 */
export const supabase = createClient(SAMPA_CONFIG.url, SAMPA_CONFIG.key, {
  db: { schema: 'vision' },
  auth: { persistSession: false },
})

export interface LeadInsert {
  email: string
  whatsapp?: string | null
  produto: string
  publico: string
  dor: string
  diferencial: string
  beneficios: string
  oferta: string
  cta: string
  // Extensão opcional (LandingBriefingContract §10)
  concorrentes?: string | null
  referencia?: string | null
  // Preenchidos automaticamente por insertLead (origem = 'app', UTMs, sessão, página)
  origem?: string | null
  utm_source?: string | null
  utm_campaign?: string | null
}

export interface LeadRow extends LeadInsert {
  id: string
  created_at: string
  draft_page: unknown | null
  status: 'aguardando_refinamento' | 'em_producao' | 'entregue'
}

/**
 * Grava o lead assim que o briefing é enviado — antes mesmo da IA rodar.
 * Agora em vision.leads (Sampa-Core), com origem 'app' e atribuição completa,
 * e registra lead_created / lead_error em vision.events.
 */
export async function createLead(input: LeadInsert): Promise<void> {
  // insertLead força origem = 'app' e acrescenta UTMs, sessão e página
  const result = await insertLead({ ...input })
  if (!result.ok) {
    // eslint-disable-next-line no-console
    console.error('[supabase] Falha ao gravar lead:', result.error)
  }
}
