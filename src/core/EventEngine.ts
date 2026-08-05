import type { CaseData, Condition, EventData, VariableKey } from '../models/types'
import type { SimulationState } from '../models/sim'

/** Evalúa una condición contra el estado (los campos presentes se entienden AND). */
export function evaluateCondition(
  cond: Condition | null,
  state: SimulationState
): boolean {
  if (!cond) return true
  if (cond.flag !== undefined && !state.flags[cond.flag]) return false
  if (cond.notFlag !== undefined && state.flags[cond.notFlag]) return false
  if (cond.variable !== undefined) {
    const current = state.classVars[cond.variable as VariableKey] ?? 0
    const value = cond.value ?? 0
    switch (cond.op) {
      case '>':
        return current > value
      case '<':
        return current < value
      case '>=':
        return current >= value
      case '<=':
        return current <= value
      case '==':
        return current === value
      case '!=':
        return current !== value
      default:
        return false
    }
  }
  return true
}

/**
 * Selecciona el evento del día cuya condición se cumple. Prioriza por
 * `priority` (mayor primero); el desempate es determinista mediante la semilla.
 */
export function selectEvent(
  caseData: CaseData,
  state: SimulationState
): EventData | null {
  const candidates = caseData.events.filter(
    (e) => e.day === state.day && evaluateCondition(e.condition, state)
  )
  if (candidates.length === 0) return null
  const sorted = [...candidates].sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority
    return stableCompare(a.id, b.id, state.seed)
  })
  return sorted[0]
}

function stableCompare(a: string, b: string, seed: number): number {
  const order = (seed % 2 === 0 ? 1 : -1) * (a < b ? -1 : a > b ? 1 : 0)
  return order
}