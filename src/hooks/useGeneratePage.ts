'use client'

import { useCallback, useRef, useState } from 'react'
import type { BriefingAnswers, BriefingExtras, GeneratedPage, GenerationEvent } from '@/types'

interface GenerateState {
  status: 'idle' | 'generating' | 'done' | 'error'
  currentStepLabel: string | null
  page: GeneratedPage | null
  elapsedMs: number | null
  error: string | null
}

const INITIAL_STATE: GenerateState = {
  status: 'idle',
  currentStepLabel: null,
  page: null,
  elapsedMs: null,
  error: null,
}

/**
 * Hook que dispara o briefing para /api/generate e consome o stream SSE
 * em tempo real, atualizando o estado conforme os eventos chegam.
 */
export function useGeneratePage() {
  const [state, setState] = useState<GenerateState>(INITIAL_STATE)
  const abortRef = useRef<AbortController | null>(null)

  const generate = useCallback(async (answers: BriefingAnswers, extras?: BriefingExtras) => {
    // Cancela uma geração anterior, se houver
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setState({ ...INITIAL_STATE, status: 'generating' })

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, extras }),
        signal: controller.signal,
      })

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error ?? 'Não foi possível gerar a página.')
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })

        // SSE separa eventos por linha em branco dupla
        const parts = buffer.split('\n\n')
        buffer = parts.pop() ?? ''

        for (const part of parts) {
          const line = part.trim()
          if (!line.startsWith('data:')) continue

          const json = line.slice(5).trim()
          if (!json) continue

          const event: GenerationEvent = JSON.parse(json)
          handleEvent(event, setState)
        }
      }
    } catch (err) {
      if (controller.signal.aborted) return
      const message = err instanceof Error ? err.message : 'Erro de conexão.'
      setState((s) => ({ ...s, status: 'error', error: message }))
    }
  }, [])

  const reset = useCallback(() => {
    abortRef.current?.abort()
    setState(INITIAL_STATE)
  }, [])

  return { ...state, generate, reset }
}

function handleEvent(
  event: GenerationEvent,
  setState: React.Dispatch<React.SetStateAction<GenerateState>>
) {
  switch (event.type) {
    case 'status':
      setState((s) => ({ ...s, currentStepLabel: event.label }))
      break
    case 'delta':
      // Deltas de texto bruto não são exibidos diretamente —
      // a UI usa os eventos 'status' para o terminal e 'complete' para o resultado.
      break
    case 'complete':
      setState((s) => ({
        ...s,
        status: 'done',
        page: event.page,
        elapsedMs: event.elapsedMs,
        currentStepLabel: null,
      }))
      break
    case 'error':
      setState((s) => ({ ...s, status: 'error', error: event.message }))
      break
  }
}
