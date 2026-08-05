import type { CaseData, Choice, EventData } from '../models/types'
import type { SimulationState } from '../models/sim'
import { clamp } from '../models/sim'
import { findCharacter, meanTrait } from './CharacterEngine'
import { bystanderEffect } from '../psychology/bystanderEffect'
import { conformity as conformityModule } from '../psychology/conformity'
import { pluralisticIgnorance } from '../psychology/pluralisticIgnorance'
import { statusInfluence } from '../psychology/statusInfluence'

const RIPPLE_AMPLITUDE = 10

/**
 * Traduce la postura de una elección en un «efecto de onda» sobre la norma y el
 * apoyo, escalado por el estatus de quien la protagoniza y la conformidad media
 * del grupo (psicología social como componentes).
 */
export function applyChoiceRipple(
  state: SimulationState,
  caseData: CaseData,
  actorId: string,
  choice: Choice
): SimulationState {
  if (choice.stance === 'neutral') return state

  const actor = findCharacter(caseData.characters, actorId)
  const weight =
    statusInfluence({ status: actor.traits.influence, stanceStrength: 100 }) /
    100
  const avgConformity = meanTrait(caseData.characters, 'conformity')

  const classVars = { ...state.classVars }
  if (choice.stance === 'pro') {
    const stick = 1 - avgConformity / 100
    const delta = RIPPLE_AMPLITUDE * weight * stick
    classVars.norm = clamp(classVars.norm + delta)
    classVars.support = clamp(classVars.support + delta)
    classVars.silence = clamp(classVars.silence - delta * 0.5)
  } else {
    const stick = 1 + avgConformity / 100
    const delta = RIPPLE_AMPLITUDE * weight * stick
    classVars.norm = clamp(classVars.norm - delta)
    classVars.support = clamp(classVars.support - delta)
    classVars.silence = clamp(classVars.silence + delta * 0.5)
  }

  return { ...state, classVars }
}

/**
 * Deriva diaria del estado de la clase al terminar el día, compuesta con los
 * módulos psicológicos. La ausencia de intervención (efecto espectador) y la
 * ignorancia pluralista alimentan el silencio colectivo.
 */
export function applyDailyDrift(
  state: SimulationState,
  caseData: CaseData
): SimulationState {
  const observers = caseData.characters.filter(
    (c) => c.role !== 'victim' && c.role !== 'aggressor'
  ).length

  const intervention = bystanderEffect({
    observers,
    responsibility: 100 - state.classVars.isolation,
  })
  const suppression = pluralisticIgnorance({
    privateDisapproval: 100 - state.classVars.isolation,
    publicAcceptance: state.classVars.norm,
  })
  const conformityAvg = meanTrait(caseData.characters, 'conformity')

  const classVars = { ...state.classVars }
  const supportFactor = classVars.support / 100
  classVars.silence = clamp(
    classVars.silence +
      (1 - intervention) * 8 * (1 - supportFactor) -
      supportFactor * 4
  )
  classVars.silence = clamp(
    classVars.silence + (suppression / 20) * (1 - supportFactor)
  )
  classVars.pressure = clamp(
    classVars.pressure +
      (conformityAvg - 50) * 0.1 +
      (classVars.norm < 50 ? 0.5 : -0.3)
  )
  classVars.norm = clamp(
    classVars.norm + (classVars.support - 50) * 0.08
  )
  classVars.isolation = clamp(
    classVars.isolation +
      (classVars.pressure > 55 ? 0.6 : -0.2) +
      (classVars.support < 40 ? 0.4 : -0.3)
  )

  return { ...state, classVars }
}

export function conformityOf(state: SimulationState, caseData: CaseData): number {
  return conformityModule({
    pressure: state.classVars.pressure,
    rejectionFear: meanTrait(caseData.characters, 'rejectionFear'),
  })
}

export type { Choice, EventData }
export type { CaseData }
