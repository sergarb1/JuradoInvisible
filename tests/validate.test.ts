import { describe, expect, it } from 'vitest'
import { validateCase, CaseValidationError } from '../src/loader/ValidateCase'
import caseData from '../data/cases/el-alumno-invisible.json'

describe('validador de casos', () => {
  it('acepta un caso válido', () => {
    const parsed = validateCase(caseData)
    expect(parsed.id).toBe('el-alumno-invisible')
  })

  it('rechaza un caso sin personajes suficientes', () => {
    const broken = structuredClone(caseData) as Record<string, unknown>
    broken.characters = broken.characters.slice(0, 1)
    expect(() => validateCase(broken)).toThrow(CaseValidationError)
  })

  it('rechaza rasgos fuera de rango 0-100', () => {
    const broken = structuredClone(caseData) as {
      characters: { traits: { empathy: number } }[]
    }
    broken.characters[0].traits.empathy = 500
    expect(() => validateCase(broken)).toThrow()
  })

  it('los errores señalan el campo afectado', () => {
    const broken = structuredClone(caseData) as {
      characters: { traits: { empathy: number } }[]
    }
    broken.characters[0].traits.empathy = 500
    try {
      validateCase(broken)
      throw new Error('no lanzó')
    } catch (e) {
      if (e instanceof CaseValidationError) {
        const paths = e.errors.map((x) => x.instancePath).join(' ')
        expect(paths).toContain('traits')
      } else {
        throw e
      }
    }
  })
})