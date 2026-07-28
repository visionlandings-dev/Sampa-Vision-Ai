'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { Input } from '@/components/ui/Input'
import { Progress } from '@/components/ui/Progress'
import { BRIEFING_QUESTIONS, BRIEFING_EXTRA_QUESTIONS } from '@/config/content'
import { createLead } from '@/lib/supabase'
import type { BriefingAnswers, BriefingExtras } from '@/types'

const EMPTY_ANSWERS: BriefingAnswers = {
  produto: '', publico: '', dor: '', diferencial: '', beneficios: '', oferta: '', cta: '',
}

const EMPTY_EXTRAS: BriefingExtras = {
  concorrentes: '', referencia: '',
}

// Regex simples o suficiente para pegar erro de digitação óbvio
// (não precisa validar RFC completo — é só uma primeira barreira de UX)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Ordem do wizard: 7 perguntas canônicas → perguntas extras (opcionais) → contato
type WizardPhase = 'questions' | 'extras' | 'contact'

export function BriefingWizard() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [extraStep, setExtraStep] = useState(0)
  const [phase, setPhase] = useState<WizardPhase>('questions')
  const [answers, setAnswers] = useState<BriefingAnswers>(EMPTY_ANSWERS)
  const [extras, setExtras] = useState<BriefingExtras>(EMPTY_EXTRAS)
  const [touched, setTouched] = useState(false)

  // Passo de contato, depois das perguntas. Fica fora do BriefingAnswers de
  // propósito: e-mail/WhatsApp não fazem parte do contrato semântico
  // consumido pela IA, são só dado de entrega.
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const total = BRIEFING_QUESTIONS.length
  const totalExtras = BRIEFING_EXTRA_QUESTIONS.length
  const question = BRIEFING_QUESTIONS[step]
  const extraQuestion = BRIEFING_EXTRA_QUESTIONS[extraStep]

  const value = phase === 'questions' ? answers[question.field] : ''
  const isValid = phase === 'questions' ? value.trim().length >= question.minLength : true
  const isEmailValid = EMAIL_RE.test(email.trim())
  const isLast = step === total - 1
  const isLastExtra = extraStep === totalExtras - 1

  const progress =
    phase === 'contact' ? 100 :
    phase === 'extras'  ? 100 :
    ((step + 1) / total) * 100

  const updateAnswer = useCallback(
    (text: string) => {
      setAnswers((prev) => ({ ...prev, [question.field]: text }))
    },
    [question.field]
  )

  const updateExtra = useCallback(
    (text: string) => {
      setExtras((prev) => ({ ...prev, [extraQuestion.field]: text }))
    },
    [extraQuestion.field]
  )

  const submitLead = useCallback(() => {
    if (!isEmailValid) {
      setTouched(true)
      return
    }
    setTouched(false)
    setSubmitError(null)
    setSubmitting(true)

    const cleanExtras = {
      concorrentes: extras.concorrentes?.trim() || null,
      referencia:   extras.referencia?.trim() || null,
    }

    createLead({
      email: email.trim(),
      whatsapp: whatsapp.trim() || null,
      ...answers,
      ...cleanExtras,
    })
      .then((leadId) => {
        // Mesmo se o registro falhar (ex: Supabase fora do ar), não travamos
        // o visitante — ele já preencheu tudo e quer ver o rascunho. O lead
        // é o "nice to have" de analytics/follow-up, não um bloqueio de UX.
        sessionStorage.setItem('sv_briefing', JSON.stringify(answers))
        sessionStorage.setItem('sv_extras', JSON.stringify(cleanExtras))
        sessionStorage.setItem('sv_contact', JSON.stringify({ email: email.trim(), whatsapp: whatsapp.trim() || null }))
        if (leadId) sessionStorage.setItem('sv_lead_id', leadId)
        router.push('/briefing/gerando')
      })
      .finally(() => setSubmitting(false))
  }, [isEmailValid, email, whatsapp, answers, extras, router])

  const goNext = useCallback(() => {
    if (phase === 'contact') {
      submitLead()
      return
    }

    if (phase === 'extras') {
      if (isLastExtra) {
        setPhase('contact')
        return
      }
      setExtraStep((s) => s + 1)
      return
    }

    // phase === 'questions'
    if (!isValid) {
      setTouched(true)
      return
    }
    setTouched(false)

    if (isLast) {
      setPhase('extras')
      return
    }

    setStep((s) => s + 1)
  }, [phase, isLastExtra, isValid, isLast, submitLead])

  const goBack = useCallback(() => {
    setTouched(false)
    if (phase === 'contact') {
      setPhase('extras')
      setExtraStep(totalExtras - 1)
      return
    }
    if (phase === 'extras') {
      if (extraStep === 0) {
        setPhase('questions')
        return
      }
      setExtraStep((s) => s - 1)
      return
    }
    setStep((s) => Math.max(0, s - 1))
  }, [phase, extraStep, totalExtras])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    // Enter sem shift avança — comportamento esperado em wizards de texto curto
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      goNext()
    }
  }

  const isFirstStep = phase === 'questions' && step === 0

  return (
    <div className="max-w-2xl mx-auto">
      {/* ── PROGRESSO ── */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-mono-sm text-ash uppercase tracking-[0.14em]">
            {phase === 'contact' ? 'Último passo' :
             phase === 'extras'  ? 'Opcional — resultado mais afiado' :
             `Pergunta ${step + 1} de ${total}`}
          </span>
          {phase === 'questions' && (
            <span className="font-mono text-mono-sm text-electric uppercase tracking-[0.14em]">
              ~{Math.max(1, Math.ceil((total - step) * 0.3))} min restantes
            </span>
          )}
        </div>
        <Progress value={progress} />
      </div>

      {/* ── PERGUNTA / EXTRA / CONTATO ── */}
      <AnimatePresence mode="wait">
        {phase === 'contact' ? (
          <motion.div
            key="contact"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-mono-xs uppercase tracking-[0.22em] text-electric block mb-3">
              CONTATO
            </span>
            <h2 className="font-display font-bold text-display-sm text-bone mb-2">
              Para onde enviamos sua página?
            </h2>
            <p className="font-body text-body-sm text-ash mb-6">
              Você vê um rascunho agora mesmo. A versão final, refinada pela nossa equipe,
              chega neste e-mail em até 72 horas.
            </p>

            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="seu@email.com"
                  error={touched && !isEmailValid}
                  autoFocus
                  aria-label="E-mail"
                  aria-invalid={touched && !isEmailValid}
                  aria-describedby={touched && !isEmailValid ? 'contact-error' : undefined}
                />
                {touched && !isEmailValid && (
                  <p id="contact-error" className="font-mono text-mono-sm text-error mt-2">
                    Digite um e-mail válido.
                  </p>
                )}
              </div>

              <Input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="WhatsApp (opcional)"
                aria-label="WhatsApp"
              />
            </div>

            {submitError && (
              <p className="font-mono text-mono-sm text-error mt-3">{submitError}</p>
            )}
          </motion.div>
        ) : phase === 'extras' ? (
          <motion.div
            key={`extra-${extraStep}`}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-mono-xs uppercase tracking-[0.22em] text-electric block mb-3">
              BÔNUS {extraStep + 1} / {totalExtras}
            </span>

            <h2 className="font-display font-bold text-display-sm text-bone mb-2">
              {extraQuestion.question}
            </h2>
            <p className="font-body text-body-sm text-ash mb-6">{extraQuestion.helper}</p>

            <Textarea
              value={extras[extraQuestion.field] ?? ''}
              onChange={(e) => updateExtra(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={extraQuestion.placeholder}
              autoFocus
              aria-label={extraQuestion.question}
            />
          </motion.div>
        ) : (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-mono-xs uppercase tracking-[0.22em] text-electric block mb-3">
              {String(question.number).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>

            <h2 className="font-display font-bold text-display-sm text-bone mb-2">
              {question.question}
            </h2>
            <p className="font-body text-body-sm text-ash mb-6">{question.helper}</p>

            <Textarea
              value={value}
              onChange={(e) => updateAnswer(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={question.placeholder}
              error={touched && !isValid}
              autoFocus
              aria-label={question.question}
              aria-invalid={touched && !isValid}
              aria-describedby={touched && !isValid ? 'briefing-error' : undefined}
            />

            {touched && !isValid && (
              <p id="briefing-error" className="font-mono text-mono-sm text-error mt-2">
                Conte um pouco mais — pelo menos {question.minLength} caracteres.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── NAVEGAÇÃO ── */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="ghost"
          onClick={goBack}
          disabled={isFirstStep}
          className="invisible:opacity-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          Voltar
        </Button>

        <div className="flex items-center gap-3">
          {phase === 'extras' && (
            <Button
              variant="ghost"
              onClick={() => { isLastExtra ? setPhase('contact') : setExtraStep((s) => s + 1) }}
            >
              Pular
            </Button>
          )}
          <Button onClick={goNext} disabled={submitting}>
            {submitting ? 'Enviando...' :
             phase === 'contact' ? 'Gerar minha página' :
             phase === 'extras'  ? (isLastExtra ? 'Continuar' : 'Próxima') :
             isLast ? 'Continuar' : 'Próxima'}
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}
