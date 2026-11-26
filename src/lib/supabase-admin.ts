import { createClient } from '@supabase/supabase-js'

/**
 * Client com chave de serviço — USO EXCLUSIVO NO SERVIDOR (Route Handlers).
 * Nunca importe este arquivo em componentes 'use client'.
 *
 * As variáveis SAMPAVISION_* são mantidas pela integração Supabase–Vercel
 * e apontam para o projeto Sampa-Core (schema vision).
 */
const url = process.env.SAMPAVISION_SUPABASE_URL
const serviceKey = process.env.SAMPAVISION_SUPABASE_SERVICE_ROLE_KEY

const admin =
  url && serviceKey
    ? createClient(url, serviceKey, {
        db: { schema: 'vision' },
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null

export interface LeadRef {
  id: string
  email: string
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/** Valida o par id + e-mail enviado pelo navegador junto com o briefing. */
export function parseLeadRef(value: unknown): LeadRef | null {
  if (!value || typeof value !== 'object') return null
  const { id, email } = value as Record<string, unknown>
  if (typeof id !== 'string' || !UUID.test(id)) return null
  if (typeof email !== 'string' || !email.includes('@')) return null
  return { id, email: email.trim() }
}

/**
 * Registra cada tentativa de geração em vision.generation_events.
 * Uma falha (status 'failed') dispara o alerta para draft@sampa.vision.
 */
export async function logGeneration(
  lead: LeadRef | null,
  status: 'completed' | 'failed',
  durationMs: number,
  model: string,
  erro?: string,
): Promise<void> {
  if (!admin) return
  try {
    const row = {
      lead_id: lead?.id ?? null,
      status,
      duration_ms: Math.round(durationMs),
      model,
      erro: erro ? erro.slice(0, 1000) : null,
    }
    let { error } = await admin.from('generation_events').insert(row)
    // 23503 = o lead não chegou a ser gravado; registra a geração sem vínculo.
    if (error?.code === '23503') {
      ;({ error } = await admin.from('generation_events').insert({ ...row, lead_id: null }))
    }
    if (error) console.error('[supabase-admin] generation_events:', error.message)
  } catch (e) {
    console.error('[supabase-admin] generation_events:', e)
  }
}

/**
 * Grava o rascunho gerado pela IA no lead (vision.leads.draft_page).
 * Só atualiza se id E e-mail baterem e se ainda não houver rascunho,
 * para que ninguém consiga sobrescrever o lead de outra pessoa.
 * A gravação dispara o e-mail "Rascunho pronto" para draft@app.sampa.vision.
 * Nunca lança erro: o visitante sempre recebe o rascunho na tela.
 */
export async function saveDraft(
  lead: LeadRef | null,
  page: unknown,
  durationMs: number,
  model: string,
): Promise<void> {
  if (!admin) {
    console.warn('[supabase-admin] SAMPAVISION_SUPABASE_* ausentes; rascunho não foi salvo')
    return
  }
  if (lead) {
    try {
      const { error } = await admin
        .from('leads')
        .update({ draft_page: page, rascunho_salvo_em: new Date().toISOString() })
        .eq('id', lead.id)
        .eq('email', lead.email)
        .is('draft_page', null)
      if (error) console.error('[supabase-admin] draft_page:', error.message)
    } catch (e) {
      console.error('[supabase-admin] draft_page:', e)
    }
  }
  await logGeneration(lead, 'completed', durationMs, model)
}
