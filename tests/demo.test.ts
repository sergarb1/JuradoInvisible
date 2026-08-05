import { it } from 'vitest'
import { newSimulation } from '../src/core/SocialSimulationEngine'
import type { CaseData } from '../src/models/types'
import casoRaw from '../data/cases/el-alumno-invisible.json'

const caso = casoRaw as unknown as CaseData

it('demo: partida completa impresa en consola', () => {
  const engine = newSimulation(caso)
  const log: string[] = []
  log.push(`Caso: ${caso.title}`)
  log.push(`Víctima: ${caso.victimId}`)

  let guard = 0
  while (!engine.isEnded() && guard < 100) {
    guard++
    const evt = engine.getActiveEvent()
    if (evt) {
      const choice = evt.choices[0]
      engine.chooseDecision(choice.id)
      log.push(`  día ${engine.getState().day}: ${evt.speaker} → ${choice.text}`)
    }
    engine.advanceDay()
  }

  const v = engine.getState().classVars
  log.push('Estado final:')
  log.push(`  aislamiento=${v.isolation} apoyo=${v.support} presión=${v.pressure} norma=${v.norm} silencio=${v.silence}`)
  log.push(`Final: ${engine.getState().endingId ?? 'ninguno'}`)

  // eslint-disable-next-line no-console
  console.log('\n' + log.join('\n') + '\n')
})