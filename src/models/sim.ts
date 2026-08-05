import type { VariableMap } from './types'

/**
 * Estado ejecutable de la simulación. Serializable a JSON para guardado.
 * `relationships[`${from}:${to}`]` guarda el lazo dirigido entre personajes.
 */
export interface DecisionRecord {
  day: number
  eventId: string
  choiceId: string
}

export interface SimulationState {
  caseId: string
  seed: number
  day: number
  classVars: VariableMap
  relationships: Record<string, number>
  flags: Record<string, boolean>
  history: DecisionRecord[]
  pendingEventId: string | null
  endingId: string | null
  ended: boolean
  log: string[]
}

/** Satura un valor al rango [min, max] (por defecto 0-100). */
export function clamp(value: number, min = 0, max = 100): number {
  if (Number.isNaN(value)) return min
  return Math.min(max, Math.max(min, value))
}

/** Clave canónica de una relación dirigida. */
export function relKey(from: string, to: string): string {
  return `${from}:${to}`
}
