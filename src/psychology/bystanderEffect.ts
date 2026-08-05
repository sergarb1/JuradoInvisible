/**
 * Efecto espectador (Latané & Darley, 1968).
 *
 * Hipótesis: la probabilidad de que alguien intervenga decrece con el número de
 * observadores y crece con la responsabilidad percibida.
 *   p = r / (1 + difusión · (n − 1))
 */

export interface BystanderInput {
  observers: number
  responsibility: number
  diffusion?: number
}

export function probabilityOfIntervention({
  observers,
  responsibility,
  diffusion = 0.5,
}: BystanderInput): number {
  const r = Math.min(1, Math.max(0, responsibility / 100))
  const n = Math.max(1, Math.floor(observers))
  const p = r / (1 + diffusion * (n - 1))
  return Math.min(1, Math.max(0, p))
}

export function bystanderEffect(input: BystanderInput): number {
  return probabilityOfIntervention(input)
}
