import { describe, expect, it } from 'vitest'
import type { CaseData } from '../src/models/types'
import { newSimulation, SocialSimulationEngine } from '../src/core/SocialSimulationEngine'
import casodata from '../data/cases/el-alumno-invisible.json'

const caso = casodata as unknown as CaseData

function playthrough(
  engine: SocialSimulationEngine,
  choose: (engine: SocialSimulationEngine) => void = () => {
    const evt = engine.getActiveEvent()
    if (evt) engine.chooseDecision(evt.choices[0].id)
  }
): string {
  while (!engine.isEnded()) {
    if (engine.getActiveEvent()) {
      choose(engine)
    }
    engine.advanceDay()
  }
  return engine.getState().endingId ?? 'sin-final'
}

function allPro(engine: SocialSimulationEngine): void {
  const evt = engine.getActiveEvent()
  if (evt) {
    const pro = evt.choices.find((c) => c.stance === 'pro') ?? evt.choices[0]
    engine.chooseDecision(pro.id)
  }
}

function allAnti(engine: SocialSimulationEngine): void {
  const evt = engine.getActiveEvent()
  if (evt) {
    const anti = evt.choices.find((c) => c.stance === 'anti') ?? evt.choices[0]
    engine.chooseDecision(anti.id)
  }
}

describe('motor: flujo de partida', () => {
  it('avanza por días y termina resolviendo un final', () => {
    const engine = newSimulation(caso)
    const ending = playthrough(engine)
    expect(engine.isEnded()).toBe(true)
    expect(ending).toBeTruthy()
  })

  it('cada día activa el evento de ese mismo día (sin retrasos) y el día 10 dispara reunion-final', () => {
    const engine = newSimulation(caso)
    const seen: string[] = []
    let guard = 0
    while (!engine.isEnded() && guard < 100) {
      guard++
      const evt = engine.getActiveEvent()
      if (evt) {
        expect(evt.day).toBe(engine.getState().day)
        seen.push(evt.id)
        engine.chooseDecision(evt.choices[0].id)
      }
      engine.advanceDay()
    }
    expect(seen).toContain('reunion-final')
    expect(engine.getState().day).toBe(caso.days + 1)
  })

  it('no avanza de día mientras haya una decisión pendiente', () => {
    const engine = newSimulation(caso)
    const before = engine.getState().day
    for (let i = 0; i < 5; i++) {
      if (engine.getActiveEvent()) break
      engine.advanceDay()
    }
    if (engine.getActiveEvent()) {
      expect(engine.advanceDay()).toBe(false)
      expect(engine.getState().day).toBe(before)
    }
  })
})

describe('motores: determinismo', () => {
  it('misma secuencia → mismo estado final', () => {
    const a = newSimulation(caso)
    const b = newSimulation(caso)
    const ea = playthrough(a, allPro)
    const eb = playthrough(b, allPro)
    expect(ea).toBe(eb)
    expect(a.getState().classVars).toEqual(b.getState().classVars)
  })
})

describe('motor: decisiones distintas cambian el desenlace', () => {
  it('estrategia pro y anti derivan en finales/evolución distintos', () => {
    const a = newSimulation(caso)
    const b = newSimulation(caso)
    const ea = playthrough(a, allPro)
    const eb = playthrough(b, allAnti)
    expect(a.getState().classVars.isolation).not.toBe(b.getState().classVars.isolation)
    expect(a.getState().classVars.support).not.toBe(b.getState().classVars.support)
  })
})

describe('motor: el JSON condiciona la evolución', () => {
  it('cambiar la presión inicial modifica la simulación', () => {
    const base = structuredClone(caso)
    const alto: CaseData = { ...base, initial: { ...base.initial, pressure: 85 } }
    const a = newSimulation(base)
    const b = newSimulation(alto)
    playthrough(a, allAnti)
    playthrough(b, allAnti)
    expect(a.getState().classVars.isolation).not.toBe(b.getState().classVars.isolation)
  })
})