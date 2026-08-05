/**
 * Conformidad (Asch, 1951; identidad social).
 *
 * Hipótesis: la probabilidad de que un personaje se ajuste a la norma del grupo
 * crece con la presión grupal percibida y con su miedo al rechazo.
 */

export interface ConformityInput {
  pressure: number
  rejectionFear: number
}

export function conformity({
  pressure,
  rejectionFear,
}: ConformityInput): number {
  const p = Math.min(100, Math.max(0, pressure))
  const f = Math.min(100, Math.max(0, rejectionFear))
  return Math.min(100, p * 0.6 + f * 0.4)
}