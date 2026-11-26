/**
 * Sampa Analytics — núcleo compartilhado entre sampa.vision (app) e try.sampa.vision (landing).
 *
 * Grava LEADS em `vision.leads` e EVENTOS em `vision.events` no Sampa-Core (Supabase),
 * direto pela API REST com a chave publicável. O papel `anon` só tem INSERT:
 * nada pode ser lido de volta pelo navegador (RLS + grants).
 *
 * Este arquivo é IDÊNTICO nos dois repositórios. O que muda entre eles fica em `./sampaConfig`.
 */
import { SAMPA_CONFIG } from './sampaConfig'

export type Origem = 'app' | 'try'

export interface Attribution {
  session_id: string | null
  anon_id: string | null
  pagina: string | null
  referrer: string | null
  user_agent: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const
const SID_KEY = 'sampa_sid'
const AID_KEY = 'sampa_aid'
const UTM_KEY = 'sampa_utm'
const OPTOUT_KEY = 'sampa_optout'

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined'
let warned = false

function configured(): boolean {
  if (SAMPA_CONFIG.url && SAMPA_CONFIG.key) return true
  if (!warned) {
    warned = true
    // eslint-disable-next-line no-console
    console.warn('[sampa] URL ou chave do Supabase ausentes: leads e eventos não serão gravados.')
  }
  return false
}

function uid(): string {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  } catch { /* segue para o fallback */ }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`
}

function storageGet(store: 'local' | 'session', key: string): string | null {
  try {
    return (store === 'local' ? window.localStorage : window.sessionStorage).getItem(key)
  } catch {
    return null
  }
}

function storageSet(store: 'local' | 'session', key: string, value: string): void {
  try {
    ;(store === 'local' ? window.localStorage : window.sessionStorage).setItem(key, value)
  } catch { /* modo privado / storage bloqueado: segue sem persistir */ }
}

/** Id persistente e sem dado pessoal (aleatório). Volta null se o storage estiver bloqueado. */
function getOrCreate(store: 'local' | 'session', key: string): string | null {
  const existing = storageGet(store, key)
  if (existing) return existing
  const id = uid()
  storageSet(store, key, id)
  return storageGet(store, key) ?? id
}

/** UTMs de primeiro toque na sessão: a primeira URL com UTM vence. */
function readUtms(): Record<(typeof UTM_KEYS)[number], string | null> {
  const empty = { utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null, utm_term: null }
  if (!isBrowser()) return empty
  const params = new URLSearchParams(window.location.search)
  const fromUrl = Object.fromEntries(UTM_KEYS.map((k) => [k, params.get(k)?.slice(0, 200) || null]))
  if (UTM_KEYS.some((k) => fromUrl[k])) {
    const saved = storageGet('session', UTM_KEY)
    if (!saved) storageSet('session', UTM_KEY, JSON.stringify(fromUrl))
    return { ...empty, ...(saved ? JSON.parse(saved) : fromUrl) }
  }
  const saved = storageGet('session', UTM_KEY)
  if (!saved) return empty
  try {
    return { ...empty, ...JSON.parse(saved) }
  } catch {
    return empty
  }
}

export function getAttribution(): Attribution {
  if (!isBrowser()) {
    return { session_id: null, anon_id: null, pagina: null, referrer: null, user_agent: null,
      utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null, utm_term: null }
  }
  return {
    session_id: getOrCreate('session', SID_KEY),
    anon_id: getOrCreate('local', AID_KEY),
    pagina: window.location.pathname.slice(0, 512),
    referrer: document.referrer ? document.referrer.slice(0, 1024) : null,
    user_agent: navigator.userAgent.slice(0, 512),
    ...readUtms(),
  }
}

/** Visitante pode sair do analytics: localStorage.setItem('sampa_optout', '1'). */
function trackingAllowed(): boolean {
  if (!isBrowser()) return false
  if (storageGet('local', OPTOUT_KEY) === '1') return false
  if ((navigator as Navigator & { webdriver?: boolean }).webdriver) return false
  return configured()
}

function headers(): Record<string, string> {
  return {
    apikey: SAMPA_CONFIG.key,
    Authorization: `Bearer ${SAMPA_CONFIG.key}`,
    'Content-Type': 'application/json',
    'Content-Profile': 'vision',
    Prefer: 'return=minimal',
  }
}

function normalizeEvent(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9_]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 64) || 'evento'
}

/** Registra um evento em `vision.events`. Nunca lança erro e nunca bloqueia a interface. */
export function sendEvent(evento: string, variante?: string | null, props: Record<string, unknown> = {}): void {
  if (!trackingAllowed()) return
  const body = {
    origem: SAMPA_CONFIG.origem,
    evento: normalizeEvent(evento),
    variante: variante ? String(variante).slice(0, 64) : null,
    props,
    ...getAttribution(),
  }
  try {
    void fetch(`${SAMPA_CONFIG.url}/rest/v1/events`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body),
      keepalive: true, // o evento sobrevive a navegação (clique em link externo, WhatsApp etc.)
    }).catch(() => undefined)
  } catch { /* nunca quebra a página por causa de analytics */ }
}

export interface LeadResult {
  ok: boolean
  error?: string
}

/**
 * Grava um lead em `vision.leads` com origem e atribuição preenchidas.
 * Os campos obrigatórios dependem da origem (constraints no banco):
 *  - app: email + produto, publico, dor, diferencial, beneficios, oferta, cta
 *  - try: email + nome, objetivo e consentimento_lgpd = true
 */
export async function insertLead(row: Record<string, unknown>, variante?: string | null): Promise<LeadResult> {
  if (!isBrowser() || !configured()) return { ok: false, error: 'not_configured' }
  const payload = {
    ...getAttribution(),
    variante: variante ?? null,
    ...row,
    origem: SAMPA_CONFIG.origem,
  }
  try {
    const res = await fetch(`${SAMPA_CONFIG.url}/rest/v1/leads`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      sendEvent('lead_created', variante)
      return { ok: true }
    }
    const detail = await res.text().catch(() => '')
    sendEvent('lead_error', variante, { status: res.status, detail: detail.slice(0, 300) })
    return { ok: false, error: `http_${res.status}` }
  } catch (err) {
    sendEvent('lead_error', variante, { detail: err instanceof Error ? err.message.slice(0, 300) : 'network' })
    return { ok: false, error: 'network' }
  }
}
