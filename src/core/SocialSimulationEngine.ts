import type { CaseData, Choice, EventData } from '../models/types'
import type { SimulationState } from '../models/sim'
import { buildRelationships, findCharacter } from './CharacterEngine'
import { selectEvent } from './EventEngine'
import { applyChoice } from './DecisionEngine'
import { applyChoiceRipple, applyDailyDrift } from './InfluenceEngine'
import { resolveEnding } from './EndingEngine'

/**
 * Motor de simulación social: orquesta día a día el estado de la clase.
 * Desacoplado de la interfaz; determinista para un mismo caso y decisiones.
 */
export class SocialSimulationEngine {
  private readonly caseData: CaseData
  private state: SimulationState

  constructor(caseData: CaseData) {
    this.caseData = caseData
    const state: SimulationState = {
      caseId: caseData.id,
      seed: caseData.seed,
      day: 1,
      classVars: { ...caseData.initial },
      relationships: buildRelationships(caseData),
      flags: {},
      history: [],
      pendingEventId: null,
      endingId: null,
      ended: false,
      log: [],
    }
    this.state = state
    this.state.pendingEventId = this.selectForDay()?.id ?? null
  }

  getState(): SimulationState {
    return this.state
  }

  getActiveEvent(): EventData | null {
    const id = this.state.pendingEventId
    if (!id) return null
    return this.caseData.events.find((e) => e.id === id) ?? null
  }

  /** Restaura un estado guardado (debe corresponder al mismo caso). */
  restore(saved: SimulationState): void {
    this.state = { ...saved }
  }

  getActor(): { id: string; name: string } | null {
    const event = this.getActiveEvent()
    if (!event) return null
    const actor = findCharacter(this.caseData.characters, event.actor)
    return { id: actor.id, name: actor.name }
  }

  /**
   * Aplica la decisión del jugador al evento activo. Lanza si no hay evento.
   */
  chooseDecision(choiceId: string): SimulationState {
    const event = this.getActiveEvent()
    if (!event) throw new Error('No active event to decide on')
    const choice = event.choices.find((c) => c.id === choiceId)
    if (!choice) throw new Error(`Choice not found: ${choiceId}`)

    let next = applyChoice(this.state, event, choice)
    next = applyChoiceRipple(next, this.caseData, event.actor, choice)
    next = { ...next, pendingEventId: null }
    this.state = next
    return this.state
  }

  availableChoices(event: EventData): Choice[] {
    return event.choices
  }

  /**
   * Avanza al día siguiente: aplica la deriva diaria y, si procede, resuelve el
   * final. Devuelve false si hay una decisión pendiente o la partida acabó.
   */
  advanceDay(): boolean {
    if (this.state.ended) return false
    if (this.state.pendingEventId) return false

    this.state = applyDailyDrift(this.state, this.caseData)

    if (this.state.day >= this.caseData.days) {
      const ending = resolveEnding(this.caseData, this.state)
      this.state = {
        ...this.state,
        day: this.state.day + 1,
        pendingEventId: null,
        ended: true,
        endingId: ending?.id ?? null,
        log: [
          ...this.state.log,
          ending
            ? `Final: ${ending.title}`
            : 'Final: sin desenlace declarado',
        ],
      }
      return true
    }

    const next: SimulationState = { ...this.state, day: this.state.day + 1 }
    const selected = selectEvent(this.caseData, next)
    this.state = { ...next, pendingEventId: selected?.id ?? null }
    return true
  }

  isEnded(): boolean {
    return this.state.ended
  }

  getEndingId(): string | null {
    return this.state.endingId
  }

  getLog(): string[] {
    return this.state.log
  }

  private selectForDay(): EventData | null {
    return selectEvent(this.caseData, this.state)
  }
}

export function newSimulation(caseData: CaseData): SocialSimulationEngine {
  return new SocialSimulationEngine(caseData)
}

export type { CaseData, Choice, EventData }
