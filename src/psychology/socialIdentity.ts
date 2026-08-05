/**
 * Identidad social (Tajfel & Turner, 1979).
 *
 * Hipótesis: el apoyo a la víctima decrece con la distancia percibida
 * (endogrupo/exogrupo) y se recupera en la medida en que la persona identifica
 * a la víctima como parte de su propio grupo.
 */

export interface SocialIdentityInput {
  distanceToVictim: number
  ingroupIdentification: number
}

export function supportToVictim({
  distanceToVictim,
  ingroupIdentification,
}: SocialIdentityInput): number {
  const d = Math.min(100, Math.max(0, distanceToVictim))
  const id = Math.min(100, Math.max(0, ingroupIdentification))
  const support = 100 - d + (id / 100) * d
  return Math.min(100, Math.max(0, support))
}

export function socialIdentity(input: SocialIdentityInput): number {
  return supportToVictim(input)
}