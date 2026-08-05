/**
 * Desenganche moral (Bandura, 1999).
 *
 * Hipótesis: los ocho mecanismos de desenganche reducen la gravedad percibida
 * del daño. `intensity` (0-1) modula cuánto se aplica cada mecanismo.
 */

export type MoralDisengagementMechanism =
  | 'justification'
  | 'euphemism'
  | 'comparison'
  | 'displacement'
  | 'diffusion'
  | 'distortion'
  | 'dehumanization'
  | 'blame'

export const MORAL_DISENGAGEMENT_MECHANISMS: Record<
  MoralDisengagementMechanism,
  number
> = {
  justification: 0.5,
  euphemism: 0.4,
  comparison: 0.45,
  displacement: 0.5,
  diffusion: 0.55,
  distortion: 0.35,
  dehumanization: 0.7,
  blame: 0.6,
}

export interface MoralDisengagementInput {
  baseSeverity: number
  mechanism: MoralDisengagementMechanism
  intensity?: number
}

export function perceivedSeverity({
  baseSeverity,
  mechanism,
  intensity = 1,
}: MoralDisengagementInput): number {
  const base = Math.min(100, Math.max(0, baseSeverity))
  const strength = MORAL_DISENGAGEMENT_MECHANISMS[mechanism] ?? 0.5
  const ammount = Math.min(1, Math.max(0, intensity))
  return Math.min(100, Math.max(0, base * (1 - strength * ammount)))
}

export function moralDisengagement(input: MoralDisengagementInput): number {
  return perceivedSeverity(input)
}