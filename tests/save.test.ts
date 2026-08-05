import { describe, expect, it } from 'vitest'
import { SaveSystem, MemoryStorage } from '../src/systems/SaveSystem'
import { newSimulation } from '../src/core/SocialSimulationEngine'
import type { CaseData } from '../src/models/types'
import caseData from '../data/cases/el-alumno-invisible.json'

const caso = caseData as unknown as CaseData

describe('SaveSystem', () => {
  it('guarda, carga y restaura el estado (storage de memoria)', async () => {
    const ss = new SaveSystem(new MemoryStorage())
    const engine = newSimulation(caso)
    const state = engine.getState()

    await ss.save(caso, state)
    const loaded = await ss.load()

    expect(loaded).not.toBeNull()
    expect(loaded!.state.history).toEqual(state.history)
    expect(loaded!.caseData.id).toBe(caso.id)
  })

  it('exporta e importa la misma partida', async () => {
    const ss = new SaveSystem(new MemoryStorage())
    const engine = newSimulation(caso)
    const state = engine.getState()
    await ss.save(caso, state)

    const exported = await ss.exportSave()
    expect(() => JSON.parse(exported)).not.toThrow()

    const ss2 = new SaveSystem(new MemoryStorage())
    const imported = await ss2.importSave(exported)
    expect(imported.state.caseId).toBe(caso.id)
  })

  it('importar un JSON no válido falla con error claro', async () => {
    const ss = new SaveSystem(new MemoryStorage())
    await expect(ss.importSave('{"version":2}')).rejects.toThrow()
  })
})