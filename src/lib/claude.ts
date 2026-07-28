import Anthropic from '@anthropic-ai/sdk'
import type { BriefingAnswers, BriefingExtras, GeneratedPage } from '@/types'

// ── CLIENTE — instanciado apenas no servidor ─────────────────────────────
// A API key NUNCA deve ser exposta ao client. Este módulo só roda
// dentro de Route Handlers (app/api/**) ou Server Components.
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // lido do .env.local — nunca hardcode
})

export const CLAUDE_MODEL = 'claude-sonnet-4-6'

// ── MEGA-PROMPT DE CALIBRAÇÃO ─────────────────────────────────────────────
// Espelha a "Esteira V2" já validada no projeto: trava anticorte de título,
// proibição de pontos de exclamação, tags estruturadas de saída.
export const SYSTEM_PROMPT = `Você atua como Redator Sênior e Estrategista de Conversão da Sampa Vision AI.
Seu objetivo é transformar o briefing do cliente em uma Landing Page magnética, sem erros de quebra de layout.

DIRETRIZES DE TOM E COPY:
- Tom de voz: direto, moderno, sem clichês corporativos e sem jargão técnico.
- Proibido usar pontos de exclamação (!).
- Frases curtas. Sem enrolação.

TRAVA ANTICORTE DE TÍTULO (MANDATÓRIA):
- O HERO_TITLE deve ter no máximo 4 a 5 palavras no total.
- Divida obrigatoriamente em duas linhas curtas usando \\n como quebra.
- Textos de apoio devem ter no máximo 2 linhas.

USO DE CONTEXTO OPCIONAL (quando presente no briefing):
- Se "Concorrentes" for informado: evite copy, promessas ou ângulos parecidos
  com o que esses concorrentes provavelmente já usam. Busque um posicionamento
  diferenciado, não genérico de mercado.
- Se "Referência de padrão" for informada: calibre o tom, o nível de ambição
  e o registro de linguagem para o mesmo patamar dessa referência — sem
  copiar a identidade dela, só usando como termômetro de qualidade esperada.
- Se nenhum dos dois for informado, ignore esta seção e gere normalmente
  a partir dos 7 campos obrigatórios.

ESTRUTURA DE SAÍDA — responda SOMENTE com um objeto JSON válido, sem markdown, sem texto antes ou depois, no formato exato:

{
  "heroTitle": "string com \\n entre as duas linhas",
  "heroSubtitle": "string, máximo 2 linhas",
  "heroCta": "string, máximo 3 palavras",
  "painPoints": ["string curta", "string curta", "string curta"],
  "benefits": [
    { "title": "string curta", "description": "string, 2 linhas" },
    { "title": "string curta", "description": "string, 2 linhas" },
    { "title": "string curta", "description": "string, 2 linhas" }
  ],
  "socialProofHook": "string, frase de ancoragem",
  "offerSection": "string, fechamento da oferta",
  "footerCta": "string, botão final"
}`

// ── MONTAGEM DO PROMPT DO USUÁRIO ────────────────────────────────────────
export function buildUserPrompt(answers: BriefingAnswers, extras?: BriefingExtras): string {
  const extrasLines: string[] = []
  if (extras?.concorrentes?.trim()) {
    extrasLines.push(`Concorrentes: ${extras.concorrentes.trim()}`)
  }
  if (extras?.referencia?.trim()) {
    extrasLines.push(`Referência de padrão desejado: ${extras.referencia.trim()}`)
  }

  const extrasBlock = extrasLines.length
    ? `\n\nContexto adicional (opcional, informado pelo cliente):\n${extrasLines.join('\n')}`
    : ''

  return `Briefing do cliente:

1. Produto/serviço: ${answers.produto}
2. Cliente ideal: ${answers.publico}
3. Maior dor: ${answers.dor}
4. Diferencial competitivo: ${answers.diferencial}
5. Benefícios principais: ${answers.beneficios}
6. Oferta especial: ${answers.oferta}
7. Ação desejada (CTA): ${answers.cta}${extrasBlock}

Gere a landing page seguindo estritamente o formato JSON especificado.`
}

// ── PARSER — extrai o JSON da resposta, tolerante a markdown acidental ───
export function parseGeneratedPage(raw: string): GeneratedPage {
  // Remove possíveis fences de markdown que o modelo às vezes adiciona
  const cleaned = raw.replace(/```json\s*|```\s*/g, '').trim()

  let parsed: unknown
  try {
    parsed = JSON.parse(cleaned)
  } catch {
    throw new Error('A IA retornou um formato inválido. Tente novamente.')
  }

  // Validação mínima de shape — evita quebrar a UI com dados malformados
  const p = parsed as Partial<GeneratedPage>
  if (
    !p.heroTitle ||
    !p.heroSubtitle ||
    !p.heroCta ||
    !Array.isArray(p.painPoints) ||
    !Array.isArray(p.benefits)
  ) {
    throw new Error('A resposta da IA está incompleta. Tente novamente.')
  }

  return {
    heroTitle:       p.heroTitle,
    heroSubtitle:    p.heroSubtitle,
    heroCta:         p.heroCta,
    painPoints:      p.painPoints,
    benefits:        p.benefits as GeneratedPage['benefits'],
    socialProofHook: p.socialProofHook ?? '',
    offerSection:    p.offerSection ?? '',
    footerCta:       p.footerCta ?? p.heroCta,
  }
}

// ── VALIDAÇÃO DO BRIEFING ANTES DE CHAMAR A API ──────────────────────────
export function validateBriefing(answers: Partial<BriefingAnswers>): string | null {
  const required: (keyof BriefingAnswers)[] = [
    'produto', 'publico', 'dor', 'diferencial', 'beneficios', 'oferta', 'cta',
  ]
  for (const field of required) {
    const value = answers[field]
    if (!value || value.trim().length < 5) {
      return `O campo "${field}" precisa de uma resposta mais detalhada.`
    }
  }
  return null
}
