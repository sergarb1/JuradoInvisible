/**
 * Ignorancia pluralista (Miller & McFarland, 1987).
 *
 * Hipótesis: cada miembro cree que los demás aceptan la situación cuando nadie
 * la acepta privadamente; cuanto mayor es la desaprobación privada y mayor la
 * apariencia pública de aceptación, más se suprime cualquier intervención.
 */

export interface PluralisticIgnoranceInput {
  privateDisapproval: number
  publicAcceptance: number
}

export function suppressionFactor({
  privateDisapproval,
  publicAcceptance,
}: PluralisticIgnoranceInput): number {
  const d = Math.min(100, Math.max(0, privateDisapproval))
  const a = Math.min(100, Math.max(0, publicAcceptance))
  return Math.min(100, (d * a) / 100)
}

export function pluralisticIgnorance(input: PluralisticIgnoranceInput): number {
  return suppressionFactor(input)
}