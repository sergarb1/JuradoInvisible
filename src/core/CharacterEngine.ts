import type { CaseData, Character } from '../models/types'
import { clamp, relKey } from '../models/sim'

/**
 * Componente de personajes: construye los lazos iniciales desde el caso y
 * ofrece utilidades de múltiples personajes.
 */
export function buildRelationships(caseData: CaseData): Record<string, number> {
  const rel = new Map<string, number>()
  for (const ch of caseData.characters) {
    for (const [otherId, valence] of Object.entries(ch.relationships)) {
      rel.set(relKey(ch.id, otherId), clamp(valence))
    }
  }
  return Object.fromEntries(rel)
}

export function findCharacter(
  characters: Character[],
  id: string
): Character {
  const c = characters.find((ch) => ch.id === id)
  if (!c) throw new Error(`Character not found: ${id}`)
  return c
}

/** Media de un rasgo sobre todos los personajes. */
export function meanTrait(characters: Character[], trait: keyof Character['traits']): number {
  const items = characters
  const sum = items.reduce((acc, c) => acc + c.traits[trait], 0)
  return items.length ? sum / items.length : 0
}