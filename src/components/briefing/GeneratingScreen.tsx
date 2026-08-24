'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, AlertCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useGeneratePage } from '@/hooks/useGeneratePage'
import type { BriefingAnswers, BriefingExtras } from '@/types'

export function GeneratingScreen() {
  const router = useRouter()
  const { status, currentStepLabel, page, elapsedMs, error, generate } = useGeneratePage()
  const [log, setLog] = useState<string[]>([])

  // Dispara a geração ao montar — lê o briefing salvo pelo wizard
  useEffect(() => {
    const raw = sessionStorage.getItem('sv_briefing')
    if (!raw) {
      router.replace('/briefing')
      return
    }
    const answers: BriefingAnswers = JSON.parse(raw)

    const rawExtras = sessionStorage.getItem('sv_extras')
    const extras: BriefingExtras | undefined = rawExtras ? JSON.parse(rawExtras) : undefined

    generate(answers, extras)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Acumula o log visual conforme os status chegam
  useEffect(() => {
    if (currentStepLabel) {
      setLog((prev) => [...prev, currentStepLabel])
    }
  }, [currentStepLabel])

  useEffect(() => {
    if (status === 'done' && page) {
      sessionStorage.setItem('sv_generated_page', JSON.stringify(page))
      sessionStorage.setItem('sv_elapsed_ms', String(elapsedMs))
    }
  }, [status, page, elapsedMs])

  return (
    <div className="max-w-xl mx-auto text-center">
      {/* Terminal */}
      <div className="bg-pit border border-[rgba(100,100,180,0.15)] text-left mb-8">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(100,100,180,0.12)] bg-well">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${
                status === 'error' ? 'bg-error' : 'bg-electric animate-pulse-dot'
              }`}
            />
            <span className="font-mono text-mono-sm uppercase tracking-[0.15em] text-electric">
              Aurora
            </span>
          </div>
          <span className="font-mono text-mono-xs text-ash uppercase">
            {status === 'generating' ? 'Gerando' : status === 'done' ? 'Concluído' : status === 'error' ? 'Erro' : 'Aguardando'}
          </span>
        </div>

        <div className="p-5 min-h-[220px] flex flex-col justify-center gap-2.5">
          <AnimatePresence>
            {log.map((line, i) => (
              <motion.div
                key={`${line}-${i}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 font-mono text-mono-sm text-ghost"
              >
                <span className="text-electric w-3 flex-shrink-0">→</span>
                {line}
              </motion.div>
            ))}
          </AnimatePresence>

          {status === 'done' && page && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 font-mono text-mono-sm text-success mt-2 pt-2 border-t border-[rgba(100,100,180,0.12)]"
            >
              <Check className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
              Rascunho gerado em {((elapsedMs ?? 0) / 1000).toFixed(0)}s
            </motion.div>
          )}

          {status === 'error' && (
            <div className="flex items-start gap-2 font-mono text-mono-sm text-error mt-2 pt-2 border-t border-[rgba(100,100,180,0.12)]">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" aria-hidden="true" />
              {error}
            </div>
          )}
        </div>
      </div>

      {/* CTA pós-geração */}
      {status === 'done' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Button size="lg" onClick={() => router.push('/briefing/resultado')}>
            Ver meu rascunho
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Button>
        </motion.div>
      )}

      {status === 'error' && (
        <Button variant="ghost" onClick={() => router.push('/briefing')}>
          Tentar novamente
        </Button>
      )}
    </div>
  )
}
