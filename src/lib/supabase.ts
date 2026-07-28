import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Não derruba o app — só avisa em dev. Em produção, configure o .env antes do deploy.
  // eslint-disable-next-line no-console
  console.warn(
    '[supabase] NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY ausentes. ' +
    'O registro de leads não vai funcionar até isso ser configurado.'
  )
}

/**
 * Client público (anon key). Usado só no browser, só para:
 *  - inserir um novo lead (briefing + contato) assim que o wizard é enviado
 *  - atualizar esse mesmo lead com o rascunho gerado, quando a IA termina
 *
 * A leitura (SELECT) é bloqueada por RLS para o papel `anon` — consulte os
 * leads direto pelo painel do Supabase (Table Editor) usando sua conta,
 * não pela API pública.
 */
export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')

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
  // Extensão opcional (LandingBriefingContract §10) — não faz parte
  // dos 7 campos canônicos, só enriquece o prompt quando presente.
  concorrentes?: string | null
  referencia?: string | null
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

/** Grava o lead assim que o briefing é enviado — antes mesmo da IA rodar. */
export async function createLead(input: LeadInsert): Promise<string | null> {
  const { data, error } = await supabase
    .from('leads')
    .insert(input)
    .select('id')
    .single()

  if (error) {
    // eslint-disable-next-line no-console
    console.error('[supabase] Falha ao gravar lead:', error.message)
    return null
  }
  return data?.id ?? null
}

/** Atualiza o lead com o rascunho gerado assim que a IA termina. */
export async function attachDraftToLead(leadId: string, draftPage: unknown) {
  const { error } = await supabase
    .from('leads')
    .update({ draft_page: draftPage })
    .eq('id', leadId)

  if (error) {
    // eslint-disable-next-line no-console
    console.error('[supabase] Falha ao anexar rascunho ao lead:', error.message)
  }
}
