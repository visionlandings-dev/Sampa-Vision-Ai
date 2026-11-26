import { supabase } from '@/lib/supabase'

/**
 * Eventos do funil do briefing → vision.events (Sampa-Core).
 * Base do relatório diário de abandono. Nunca quebra a experiência:
 * qualquer falha é só registrada no console.
 *
 * Eventos usados hoje:
 *   briefing_iniciado  — o wizard abriu
 *   etapa_concluida    — props.etapa = número da etapa concluída (1..N)
 *   briefing_enviado   — lead gravado e geração iniciada
 */

function persistentId(storage: Storage, key: string): string | null {
  try {
    let v = storage.getItem(key)
    if (!v) {
      v = crypto.randomUUID()
      storage.setItem(key, v)
    }
    return v
  } catch {
    return null
  }
}

function cut(v: string | null, max: number): string | null {
  return v ? v.slice(0, max) : null
}

export function trackEvent(evento: string, props: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  try {
    const url = new URL(window.location.href)
    const q = url.searchParams
    void supabase
      .from('events')
      .insert({
        origem: 'app',
        evento,
        session_id: persistentId(sessionStorage, 'sv_session'),
        anon_id: persistentId(localStorage, 'sv_anon'),
        pagina: cut(url.pathname, 512),
        referrer: cut(document.referrer || null, 1024),
        utm_source: cut(q.get('utm_source'), 200),
        utm_medium: cut(q.get('utm_medium'), 200),
        utm_campaign: cut(q.get('utm_campaign'), 200),
        utm_content: cut(q.get('utm_content'), 200),
        utm_term: cut(q.get('utm_term'), 200),
        props,
        user_agent: cut(navigator.userAgent, 512),
      })
      .then(({ error }) => {
        // eslint-disable-next-line no-console
        if (error) console.warn('[events]', error.message)
      })
  } catch {
    /* nunca quebra a UX */
  }
}
