import { describe, expect, it } from 'vitest'
import type { CaseData } from '../src/models/types'
import { newSimulation } from '../src/core/SocialSimulationEngine'
import casoRaw from '../data/cases/el-alumno-invisible.json'

const caso = casoRaw as unknown as CaseData

function run(stance: 'pro' | 'anti' | 'first') {
  const engine = newSimulation(caso)
  while (!engine.isEnded()) {
    const evt = engine.getActiveEvent()
    if (evt) {
      const pick =
        stance === 'first'
          ? evt.choices[0]
          : (evt.choices.find((c) => c.stance === stance) ?? evt.choices[0])
      engine.chooseDecision(pick.id)
    }
    engine.advanceDay()
  }
  return engine.getState()
}

it('muestra un tablero comparativo de estrategias', () => {
  const pro = run('pro')
  const anti = run('anti')
  const first = run('first')
  const line = (name: string, s: typeof pro) =>
    `${name}: iso=${Math.round(s.classVars.isolation)} ap=${Math.round(s.classVars.support)} pres=${Math.round(s.classVars.pressure)} norm=${Math.round(s.classVars.norm)} sil=${Math.round(s.classVars.silence)} → ${s.endingId}`
  // eslint-disable-next-line no-console
  console.log('\n' + ['pro', 'anti', 'first']
    .map((n) => line(n as 'pro', n === 'pro' ? pro : n === 'anti' ? anti : first))
    .join('\n') + '\n')
  expect(pro.endingId).not.toBe(anti.endingId)
})