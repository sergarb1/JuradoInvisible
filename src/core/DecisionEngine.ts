import type { Choice, EventData, VariableKey } from '../models/types'
import type { SimulationState } from '../models/sim'
import { clamp, relKey } from '../models/sim'

/**
 * Aplica una decisión al estado: deltas de variables, cambios de relaciones,
 * banderas y registro histórico. Devuelve un estado nuevo (inmutable).
 */
export function applyChoice(
  state: SimulationState,
  event: EventData,
  choice: Choice
): SimulationState {
  const classVars = { ...state.classVars }
  for (const [key, delta] of Object.entries(choice.effects)) {
    const k = key as VariableKey
    classVars[k] = clamp(classVars[k] + (delta ?? 0))
  }

  const relationships = { ...state.relationships }
  for (const [key, delta] of Object.entries(choice.relationEffects)) {
    relationships[key] = clamp((relationships[key] ?? 0) + delta)
  }

  const flags = { ...state.flags }
  for (const f of choice.setFlags) flags[f] = true
  for (const f of choice.clearFlags) delete flags[f]

  const history = [
    ...state.history,
    { day: state.day, eventId: event.id, choiceId: choice.id },
  ]

  const log = [
    ...state.log,
    `Día ${state.day} · ${event.id} → ${choice.id}`,
  ]

  return {
    ...state,
    classVars,
    relationships,
    flags,
    history,
    log,
  }
}

export function relationKey(from: string, to: string): string {
  return relKey(from, to)
}
export type { Choice, EventData, VariableKey }
