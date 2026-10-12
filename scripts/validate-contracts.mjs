#!/usr/bin/env node
// Validação dos contratos do Landing System (JSON Schema Draft 2020-12).
// Os três schemas são registrados no MESMO Ajv2020 antes de qualquer compilação,
// para que a URN do LandingContentIR resolva dentro do GenerationEvent.
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Ajv2020 from 'ajv/dist/2020.js'

const here = path.dirname(fileURLToPath(import.meta.url))
export const SCHEMAS_DIR = path.resolve(here, '..', 'products/landing-system/schemas')
export const FIXTURES_DIR = path.join(SCHEMAS_DIR, 'fixtures')

export const URNS = {
  briefing: 'urn:gs-oif:schema:landing-system:briefing:v1',
  'content-ir': 'urn:gs-oif:schema:landing-system:content-ir:v1',
  'generation-events': 'urn:gs-oif:schema:landing-system:generation-events:v1',
}

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'))

export function createAjv() {
  const ajv = new Ajv2020({ strict: true, allErrors: true })
  const files = readdirSync(SCHEMAS_DIR).filter((f) => f.endsWith('.schema.json'))
  for (const f of files) ajv.addSchema(readJson(path.join(SCHEMAS_DIR, f)))
  for (const urn of Object.values(URNS)) {
    if (!ajv.getSchema(urn)) throw new Error(`Schema não registrado: ${urn}`)
  }
  return ajv
}

export function createValidators() {
  const ajv = createAjv()
  return Object.fromEntries(Object.entries(URNS).map(([k, urn]) => [k, ajv.getSchema(urn)]))
}

// Normalizer (trim) aplicado antes do Validator: Loader -> Normalizer (trim) -> Validator.
// Não completa, amplia nem reescreve respostas: apenas remove espaços periféricos.
export function normalizeBriefing(input) {
  const trimObj = (o) =>
    Object.fromEntries(Object.entries(o).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]))
  if (input === null || typeof input !== 'object') return input
  const out = { ...input }
  if (out.answers && typeof out.answers === 'object') out.answers = trimObj(out.answers)
  if (out.extras && typeof out.extras === 'object') out.extras = trimObj(out.extras)
  return out
}

export function loadFixtures() {
  const cases = []
  for (const schema of Object.keys(URNS)) {
    for (const expected of ['valid', 'invalid']) {
      const dir = path.join(FIXTURES_DIR, schema, expected)
      if (!existsSync(dir)) continue
      for (const f of readdirSync(dir).filter((x) => x.endsWith('.json')).sort()) {
        cases.push({ schema, expected, name: f, data: readJson(path.join(dir, f)) })
      }
    }
  }
  return cases
}

export function runFixtures() {
  const validators = createValidators()
  const failures = []
  const cases = loadFixtures()
  for (const c of cases) {
    const data = c.schema === 'briefing' ? normalizeBriefing(c.data) : c.data
    const ok = validators[c.schema](data) === true
    if (ok !== (c.expected === 'valid')) {
      failures.push(`${c.schema}/${c.expected}/${c.name}: esperado ${c.expected}, obtido ${ok ? 'valid' : 'invalid'}`)
    }
  }
  return { total: cases.length, failures }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { total, failures } = runFixtures()
  if (failures.length) {
    console.error(`FALHA: ${failures.length}/${total} fixtures divergentes`)
    for (const f of failures) console.error(` - ${f}`)
    process.exit(1)
  }
  console.log(`OK: ${total} fixtures conformes; 3 schemas registrados em Ajv2020`)
}
