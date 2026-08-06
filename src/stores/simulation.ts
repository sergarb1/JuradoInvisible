import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { CaseData, Choice, EventData, VariableMap } from '../models/types'
import type { SimulationState } from '../models/sim'
import { newSimulation, SocialSimulationEngine } from '../core/SocialSimulationEngine'
import { SaveSystem } from '../systems/SaveSystem'

export const useSimulation = defineStore('simulation', () => {
  const saveSystem = new SaveSystem()

  const engine = ref<SocialSimulationEngine | null>(null)
  const activeCase = ref<CaseData | null>(null)
  const state = ref<SimulationState | null>(null)
  const hasSave = ref(false)
  const lastDecision = ref<{ eventId: string; choiceId: string } | null>(null)
  const playerGender = ref<'m' | 'f'>('m')

  function setPlayerGender(g: 'm' | 'f'): void {
    playerGender.value = g
  }

  const classVars = computed<VariableMap | null>(() => state.value?.classVars ?? null)
  const day = computed<number>(() => state.value?.day ?? 0)
  const ended = computed<boolean>(() => state.value?.ended ?? false)
  const endingId = computed<string | null>(() => state.value?.endingId ?? null)
  const activeEvent = computed<EventData | null>(() => engine.value?.getActiveEvent() ?? null)
  const actorName = computed<string>(() => engine.value?.getActor()?.name ?? '')
  const lastConsequence = computed<{ choice: Choice; consequence: string; scene?: string } | null>(() => {
    const ld = lastDecision.value
    if (!ld || !activeCase.value) return null
    const evt = activeCase.value.events.find((e) => e.id === ld.eventId)
    if (!evt) return null
    const choice = evt.choices.find((c) => c.id === ld.choiceId)
    if (!choice || !choice.consequence) return null
    return { choice, consequence: choice.consequence, scene: evt.scene }
  })

  async function bootstrap(): Promise<boolean> {
    const save = await saveSystem.load()
    hasSave.value = !!save
    return hasSave.value
  }

  function start(caseData: CaseData): void {
    activeCase.value = caseData
    engine.value = newSimulation(caseData)
    state.value = engine.value.getState()
  }

  async function newGame(caseData: CaseData): Promise<void> {
    start(caseData)
    await persist()
  }

  async function continueGame(): Promise<boolean> {
    const save = await saveSystem.load()
    if (!save) return false
    activeCase.value = save.caseData
    playerGender.value = save.playerGender ?? 'm'
    const e = newSimulation(save.caseData)
    e.restore(save.state)
    engine.value = e
    state.value = e.getState()
    hasSave.value = false
    return true
  }

  async function choose(choiceId: string): Promise<void> {
    const e = engine.value
    if (!e) return
    const evt = e.getActiveEvent()
    state.value = e.chooseDecision(choiceId)
    lastDecision.value = evt ? { eventId: evt.id, choiceId } : null
    await persist()
  }

  async function advanceDay(): Promise<void> {
    const e = engine.value
    if (!e) return
    e.advanceDay()
    state.value = e.getState()
    await persist()
  }

  async function restart(): Promise<void> {
    if (activeCase.value) await newGame(activeCase.value)
  }

  function availableChoices(event: EventData): Choice[] {
    return event.choices
  }

  function hasPendingDecision(): boolean {
    return engine.value ? engine.value.getActiveEvent() !== null : false
  }

  async function persist(): Promise<void> {
    if (activeCase.value && state.value) {
      await saveSystem.save(activeCase.value, state.value, playerGender.value)
    }
  }

  return {
    activeCase,
    state,
    hasSave,
    classVars,
    day,
    ended,
    endingId,
    activeEvent,
    actorName,
    lastConsequence,
    bootstrap,
    newGame,
    continueGame,
    restart,
    choose,
    advanceDay,
    availableChoices,
    hasPendingDecision,
    playerGender,
    setPlayerGender,
  }
})