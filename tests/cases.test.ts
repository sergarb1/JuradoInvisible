import { describe, expect, it } from 'vitest'
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { assembleCase } from '../scripts/assemble-cases.mjs'
import { validateCase } from '../src/loader/ValidateCase'
import type { CaseData } from '../src/models/types'

const casesDir = join(process.cwd(), 'data', 'cases')

function caseNames(): string[] {
  return readdirSync(casesDir).filter((n) => statSync(join(casesDir, n)).isDirectory())
}

describe('integridad de casos (fragmentos)', () => {
  const names = caseNames()

  it('existe al menos un caso', () => {
    expect(names.length).toBeGreaterThan(0)
  })

  it('todo caso ensamblado valida contra el esquema', () => {
    for (const name of names) {
      const merged = assembleCase(name) as unknown as CaseData
      expect(validateCase(merged).id).toBe(name)
    }
  })

  it('todo caso tiene prólogo y toda opción tiene consecuencia narrada', () => {
    for (const name of names) {
      const c = assembleCase(name) as unknown as CaseData
      expect(c.prologue && c.prologue.length > 0).toBe(true)
      expect(c.endings.length).toBeGreaterThan(0)
      for (const ev of c.events) {
        expect(ev.choices.length).toBeGreaterThanOrEqual(2)
        for (const opc of ev.choices) {
          expect(opc.consequence && opc.consequence.trim().length > 0).toBe(true)
        }
      }
    }
  })

  it('cada evento del caso tiene fechas dentro de su rango y actor válido', () => {
    for (const name of names) {
      const c = assembleCase(name) as unknown as CaseData
      const ids = new Set(c.characters.map((x) => x.id))
      for (const ev of c.events) {
        expect(ev.day).toBeGreaterThanOrEqual(1)
        expect(ev.day).toBeLessThanOrEqual(c.days)
        expect(ids.has(ev.actor)).toBe(true)
      }
    }
  })

  it('antes de cada día 1..days existe al menos un evento posible', () => {
    for (const name of names) {
      const c = assembleCase(name) as unknown as CaseData
      for (let d = 1; d <= c.days; d++) {
        expect(c.events.some((e) => e.day === d)).toBe(true)
      }
    }
  })
})