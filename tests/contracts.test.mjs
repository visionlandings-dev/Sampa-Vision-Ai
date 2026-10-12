import { describe, it, expect } from 'vitest'
import { createValidators, loadFixtures, normalizeBriefing, URNS } from '../scripts/validate-contracts.mjs'

const v = createValidators()
const cases = loadFixtures()

describe('registro dos schemas', () => {
  it('compila os três schemas no mesmo Ajv2020 (URN do content-ir resolvida)', () => {
    for (const k of Object.keys(URNS)) expect(typeof v[k]).toBe('function')
  })
})

describe.each(Object.keys(URNS))('fixtures: %s', (schema) => {
  const subset = cases.filter((c) => c.schema === schema)
  it('possui fixtures válidas e inválidas', () => {
    expect(subset.some((c) => c.expected === 'valid')).toBe(true)
    expect(subset.some((c) => c.expected === 'invalid')).toBe(true)
  })
  it.each(subset.map((c) => [`${c.expected}/${c.name}`, c]))('%s', (_n, c) => {
    const data = schema === 'briefing' ? normalizeBriefing(c.data) : c.data
    expect(v[schema](data)).toBe(c.expected === 'valid')
  })
})

describe('normalização do briefing (trim antes do minLength)', () => {
  const base = {
    produto: 'Plataforma de landing pages',
    publico: 'Fundadores e CTOs B2B',
    dor: 'Baixa conversão atual',
    diferencial: 'Entrega em até 72 horas',
    beneficios: 'Rapidez, clareza e conversão',
    oferta: 'Condição especial',
    cta: 'Agendar reunião',
  }
  it('sem trim, valor com espaços periféricos passa indevidamente no minLength', () => {
    const padded = { answers: { ...base, cta: '   curto   ' } }
    expect(v.briefing(padded)).toBe(true) // 11 caracteres brutos
  })
  it('com trim, o mesmo valor é rejeitado', () => {
    const padded = { answers: { ...base, cta: '   curto   ' } }
    expect(v.briefing(normalizeBriefing(padded))).toBe(false)
  })
  it('somente espaços é rejeitado até sem normalização (pattern \\S)', () => {
    expect(v.briefing({ answers: { ...base, produto: ' '.repeat(12) } })).toBe(false)
  })
  it('a normalização não completa nem reescreve respostas', () => {
    const out = normalizeBriefing({ answers: { ...base, produto: '  abc  ' } })
    expect(out.answers.produto).toBe('abc')
    expect(Object.keys(out.answers)).toEqual(Object.keys(base))
  })
})

describe('regras do IR e dos eventos', () => {
  const page = {
    heroTitle: 'a', heroSubtitle: 'b', heroCta: 'c',
    painPoints: ['1', '2', '3'],
    benefits: [1, 2, 3].map((n) => ({ title: `t${n}`, description: `d${n}` })),
    socialProofHook: 's', offerSection: 'o', footerCta: 'f',
  }
  it('rejeita cardinalidade diferente de 3 (erros minItems/maxItems do Ajv)', () => {
    for (const n of [0, 1, 2, 4]) {
      expect(v['content-ir']({ ...page, benefits: Array(n).fill(page.benefits[0]) })).toBe(false)
      expect(v['content-ir']({ ...page, painPoints: Array(n).fill('x') })).toBe(false)
    }
  })
  it('complete.page valida contra o LandingContentIR', () => {
    expect(v['generation-events']({ type: 'complete', page, elapsedMs: 1200 })).toBe(true)
    expect(v['generation-events']({ type: 'complete', page: {}, elapsedMs: 1200 })).toBe(false)
  })
  it('rejeita eventos legados e elapsedMs inválido', () => {
    expect(v['generation-events']({ type: 'done' })).toBe(false)
    expect(v['generation-events']({ type: 'complete', page, elapsedMs: 1.5 })).toBe(false)
    expect(v['generation-events']({ type: 'complete', page, elapsedMs: -1 })).toBe(false)
  })
})
