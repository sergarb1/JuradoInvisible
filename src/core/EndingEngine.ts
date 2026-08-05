import type { CaseData, Condition, EndingData, VariableKey } from '../models/types'
import type { SimulationState } from '../models/sim'
import { evaluateCondition } from './EventEngine'

/** Resuelve el final según las variables finales; el primer final que cumple gana. */
export function resolveEnding(
  caseData: CaseData,
  state: SimulationState
): EndingData | null {
  for (const ending of caseData.endings) {
    if (endingMatches(ending, state)) return ending
  }
  return null
}

function endingMatches(ending: EndingData, state: SimulationState): boolean {
  const logic = ending.condition.logic ?? 'and'
  const results = ending.condition.rules.map((r) =>
    evaluateCondition(r, state)
  )
  return logic === 'or' ? results.some(Boolean) : results.every(Boolean)
}

export { evaluateCondition }
export type { Condition, EndingData, VariableKey, CaseData }
