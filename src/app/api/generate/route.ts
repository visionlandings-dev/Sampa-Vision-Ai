import { NextRequest } from 'next/server'
import {
  anthropic,
  CLAUDE_MODEL,
  SYSTEM_PROMPT,
  buildUserPrompt,
  parseGeneratedPage,
  validateBriefing,
} from '@/lib/claude'
import type { BriefingAnswers, BriefingExtras, GenerationEvent } from '@/types'

// Este endpoint roda em ambiente Node (não Edge) porque o SDK da Anthropic
// depende de APIs do Node. Streaming continua funcionando normalmente.
export const runtime = 'nodejs'

// Gera o rascunho em até 60s. Se exceder, o cliente recebe um evento de erro tratável.
export const maxDuration = 60

/**
 * POST /api/generate
 *
 * Recebe o briefing de 7 perguntas, chama a Claude API com streaming,
 * e repassa os eventos para o cliente via Server-Sent Events (SSE).
 *
 * A API key nunca é exposta ao navegador — toda a chamada acontece aqui,
 * no servidor, dentro do Route Handler.
 */
export async function POST(req: NextRequest) {
  let answers: BriefingAnswers
  let extras: BriefingExtras | undefined

  try {
    const body = await req.json()
    answers = body.answers
    extras = body.extras
  } catch {
    return jsonError('Briefing inválido. Verifique os dados enviados.', 400)
  }

  const validationError = validateBriefing(answers)
  if (validationError) {
    return jsonError(validationError, 422)
  }

  const startedAt = Date.now()

  // ── STREAM SSE — ReadableStream nativo do Web Streams API ──────────────
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()

      const send = (event: GenerationEvent) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))
      }

      try {
        // Etapas visuais — emitidas antes/durante a chamada real,
        // para dar feedback contínuo enquanto o modelo processa.
        send({ type: 'status', step: 'reading',  label: 'Lendo perfil de marca...' })
        send({ type: 'status', step: 'audience', label: 'Identificando público-alvo...' })

        let fullText = ''

        const claudeStream = anthropic.messages.stream({
          model: CLAUDE_MODEL,
          max_tokens: 1536,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content: buildUserPrompt(answers, extras) }],
        })

        send({ type: 'status', step: 'structuring', label: 'Estruturando hierarquia...' })

        for await (const event of claudeStream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            fullText += event.delta.text
            send({ type: 'delta', text: event.delta.text })
          }
        }

        send({ type: 'status', step: 'applying', label: 'Aplicando identidade visual...' })

        const page = parseGeneratedPage(fullText)
        const elapsedMs = Date.now() - startedAt

        send({ type: 'status', step: 'publishing', label: 'Finalizando rascunho...' })
        send({ type: 'complete', page, elapsedMs })
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Erro inesperado ao gerar a página.'
        send({ type: 'error', message })
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // desabilita buffering em proxies (nginx)
    },
  })
}

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status })
}
