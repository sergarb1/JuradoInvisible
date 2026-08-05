/**
 * Influencia por estatus.
 *
 * Hipótesis: el cambio que produce la postura de un personaje sobre la norma
 * grupal crece con su estatus y con la fuerza de su postura.
 */

export interface StatusInfluenceInput {
  status: number
  stanceStrength: number
}

export function normShift({ status, stanceStrength }: StatusInfluenceInput): number {
  const s = Math.min(100, Math.max(0, status))
  const strength = Math.min(100, Math.max(0, stanceStrength))
  return Math.min(100, (s / 100) * strength)
}

export function statusInfluence(input: StatusInfluenceInput): number {
  return normShift(input)
}