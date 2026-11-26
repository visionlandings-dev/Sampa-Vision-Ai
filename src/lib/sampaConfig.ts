/**
 * Configuração do Sampa Analytics para o sampa.vision (Next.js).
 *
 * As variáveis NEXT_PUBLIC_SAMPAVISION_* são criadas pela integração Supabase ↔ Vercel
 * (recurso supabase-sampa-core, prefixo SAMPAVISION). Os padrões apontam para o Sampa-Core
 * e nunca para o projeto antigo, que está pausado.
 * Obs.: o Next só embute no bundle variáveis lidas de forma literal (process.env.NOME).
 */
const DEFAULT_URL = 'https://bwzojcgptaitbhxrhoap.supabase.co'
const DEFAULT_KEY = 'sb_publishable_UIZBu703Kc42COX9dqtgQA_06V6-oxY'

export const SAMPA_CONFIG = {
  url: (process.env.NEXT_PUBLIC_SAMPAVISION_SUPABASE_URL || DEFAULT_URL).replace(/\/+$/, ''),
  key:
    process.env.NEXT_PUBLIC_SAMPAVISION_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SAMPAVISION_SUPABASE_ANON_KEY ||
    DEFAULT_KEY,
  origem: 'app' as const,
}
