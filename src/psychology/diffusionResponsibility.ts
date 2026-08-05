/**
 * Difusión de responsabilidad (Bandura, 1999; Darley & Latané, 1968).
 *
 * Hipótesis: la responsabilidad individual se diluye al repartirse entre el
 * colectivo. La parte que asume cada miembro decrece con el tamaño del grupo.
 */

export interface DiffusionInput {
  n: number
  totalResponsibility?: number
}

export function individualResponsibility({
  n,
  totalResponsibility = 100,
}: DiffusionInput): number {
  const group = Math.max(1, Math.floor(n))
  const share = totalResponsibility / group
  return Math.min(100, Math.max(0, share))
}

export function diffusionResponsibility(input: DiffusionInput): number {
  return individualResponsibility(input)
}
