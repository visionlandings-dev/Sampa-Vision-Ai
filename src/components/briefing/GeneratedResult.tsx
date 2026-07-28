'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { GeneratedPage } from '@/types'

export function GeneratedResult() {
  const router = useRouter()
  const [page, setPage] = useState<GeneratedPage | null>(null)
  const [elapsed, setElapsed] = useState<number | null>(null)

  useEffect(() => {
    const raw = sessionStorage.getItem('sv_generated_page')
    const ms = sessionStorage.getItem('sv_elapsed_ms')
    if (!raw) {
      router.replace('/briefing')
      return
    }
    setPage(JSON.parse(raw))
    setElapsed(ms ? Number(ms) : null)
  }, [router])

  if (!page) return null

  return (
    <div className="max-w-3xl mx-auto">
      {/* Badge de tempo + expectativa */}
      <div className="mb-6 space-y-2">
        {elapsed !== null && (
          <div className="flex items-center gap-2 font-mono text-mono-sm text-success">
            <Check className="w-4 h-4" aria-hidden="true" />
            Rascunho gerado em {(elapsed / 1000).toFixed(0)} segundos
          </div>
        )}
        <p className="font-body text-body-sm text-ash">
          Isto é um rascunho gerado por IA. Nossa equipe está refinando sua versão
          final — você recebe por e-mail em até 72 horas.
        </p>
      </div>

      {/* Preview da landing page — mockup em container */}
      <div className="bg-void border border-[rgba(100,100,180,0.15)] p-8 md:p-12 mb-8">
        <h1 className="font-display font-extrabold text-display-md text-bone whitespace-pre-line mb-4">
          {page.heroTitle}
        </h1>
        <p className="font-body text-body-lg text-fog mb-6 whitespace-pre-line">
          {page.heroSubtitle}
        </p>
        <button className="font-mono text-mono-sm uppercase tracking-[0.14em] bg-electric text-void px-6 py-3.5 hover:bg-electric-hover transition-colors mb-12">
          {page.heroCta}
        </button>

        {/* Pain points */}
        {page.painPoints.length > 0 && (
          <div className="border-t border-[rgba(100,100,180,0.12)] pt-8 mb-8">
            <span className="font-mono text-mono-xs uppercase tracking-[0.2em] text-ash block mb-4">
              Dores identificadas
            </span>
            <ul className="space-y-2">
              {page.painPoints.map((p, i) => (
                <li key={i} className="font-body text-body-md text-ghost">
                  · {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Benefícios */}
        {page.benefits.length > 0 && (
          <div className="border-t border-[rgba(100,100,180,0.12)] pt-8 grid sm:grid-cols-3 gap-6">
            {page.benefits.map((b, i) => (
              <div key={i}>
                <h3 className="font-display font-bold text-base text-bone mb-1.5">
                  {b.title}
                </h3>
                <p className="font-body text-body-sm text-ash">{b.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button size="lg" disabled className="cursor-default opacity-70">
          <Check className="w-4 h-4" aria-hidden="true" />
          Recebemos seu briefing — aguarde o e-mail
        </Button>
        <Button variant="ghost" size="lg" onClick={() => router.push('/briefing')}>
          Gerar outra versão
        </Button>
      </div>
    </div>
  )
}
