import Ajv, { type ErrorObject } from 'ajv'
import type { CaseData } from '../models/types'
import caseSchema from '../../data/schema/case.schema.json'

const ajv = new Ajv({ allErrors: true, strict: false })
const validate = ajv.compile(caseSchema)

export class CaseValidationError extends Error {
  readonly errors: ErrorObject[]

  constructor(errors: ErrorObject[]) {
    const details = errors
      .map((e) => `${e.instancePath || '/'} ${e.message}`)
      .join('; ')
    super(`Caso inválido: ${details}`)
    this.name = 'CaseValidationError'
    this.errors = errors
  }
}

/**
 * Valida un caso (JSON crudo) contra el esquema y devuelve el caso tipado.
 * Lanza `CaseValidationError` con los errores detallados.
 */
export function validateCase(raw: unknown): CaseData {
  if (!validate(raw)) {
    throw new CaseValidationError(validate.errors ?? [])
  }
  return raw as unknown as CaseData
}

export { validate }