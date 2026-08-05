import type { CaseData } from '../models/types'
import { validateCase } from './ValidateCase'

export const CASES_BASE = import.meta.env?.BASE_URL ?? '/'

/**
 * Carga y valida un caso desde una URL (navegador) o desde un objeto ya
 * presente (tests/offline). Devuelve el caso tipado.
 */
export async function loadCaseFromUrl(url: string): Promise<CaseData> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`No se pudo cargar el caso: ${res.status} ${res.statusText}`)
  }
  const raw: unknown = await res.json()
  return validateCase(raw)
}

/** Carga un caso por id desde `public/data/cases/<id>.json`. */
export async function loadCaseById(id: string): Promise<CaseData> {
  const url = `${CASES_BASE}data/cases/${id}.json`
  return loadCaseFromUrl(url)
}

export function parseCase(raw: unknown): CaseData {
  return validateCase(raw)
}

export { validateCase }
