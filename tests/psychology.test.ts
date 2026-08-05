import { describe, expect, it } from 'vitest'
import {
  probabilityOfIntervention,
  bystanderEffect,
} from '../src/psychology/bystanderEffect'
import { individualResponsibility } from '../src/psychology/diffusionResponsibility'
import { conformity } from '../src/psychology/conformity'
import { suppressionFactor } from '../src/psychology/pluralisticIgnorance'
import { supportToVictim } from '../src/psychology/socialIdentity'
import { perceivedSeverity } from '../src/psychology/moralDisengagement'
import { normShift } from '../src/psychology/statusInfluence'

describe('psicología: efecto espectador', () => {
  it('más observadores, menos probabilidad de intervención', () => {
    const one = probabilityOfIntervention({ observers: 1, responsibility: 80 })
    const ten = probabilityOfIntervention({ observers: 10, responsibility: 80 })
    expect(one).toBeGreaterThan(ten)
  })

  it('más responsabilidad percibida, más intervención', () => {
    const low = probabilityOfIntervention({ observers: 4, responsibility: 20 })
    const high = probabilityOfIntervention({ observers: 4, responsibility: 80 })
    expect(high).toBeGreaterThan(low)
  })

  it('con un solo observador y plena responsabilidad la probabilidad es alta', () => {
    expect(bystanderEffect({ observers: 1, responsibility: 100 })).toBeCloseTo(1)
  })

  it('satisface los límites 0-1', () => {
    const p = bystanderEffect({ observers: 100, responsibility: 100 })
    expect(p).toBeGreaterThanOrEqual(0)
    expect(p).toBeLessThanOrEqual(1)
  })
})

describe('psicología: difusión de responsabilidad', () => {
  it('la responsabilidad individual cae al crecer el grupo', () => {
    expect(individualResponsibility({ n: 2 })).toBeGreaterThan(
      individualResponsibility({ n: 10 })
    )
  })

  it('no divide entre cero', () => {
    expect(individualResponsibility({ n: 0 })).toBe(100)
  })
})

describe('psicología: conformidad', () => {
  it('más presión grupal, más conformidad', () => {
    expect(conformity({ pressure: 90, rejectionFear: 50 })).toBeGreaterThan(
      conformity({ pressure: 10, rejectionFear: 50 })
    )
  })

  it('más miedo al rechazo, más conformidad', () => {
    expect(conformity({ pressure: 50, rejectionFear: 90 })).toBeGreaterThan(
      conformity({ pressure: 50, rejectionFear: 10 })
    )
  })

  it('se mantiene en 0-100', () => {
    expect(conformity({ pressure: 300, rejectionFear: -5 })).toBeGreaterThanOrEqual(0)
    expect(conformity({ pressure: 300, rejectionFear: 200 })).toBeLessThanOrEqual(100)
  })
})

describe('psicología: ignorancia pluralista', () => {
  it('desaprobación privada y aceptación pública altas suprimen la intervención', () => {
    const sup = suppressionFactor({ privateDisapproval: 90, publicAcceptance: 90 })
    const none = suppressionFactor({ privateDisapproval: 10, publicAcceptance: 10 })
    expect(sup).toBeGreaterThan(none)
  })
})

describe('psicología: identidad social', () => {
  it('la distancia al exogrupo reduce el apoyo', () => {
    expect(supportToVictim({ distanceToVictim: 90, ingroupIdentification: 20 })).toBeLessThan(
      supportToVictim({ distanceToVictim: 10, ingroupIdentification: 20 })
    )
  })

  it('la identificación plena neutraliza la distancia', () => {
    expect(supportToVictim({ distanceToVictim: 90, ingroupIdentification: 100 })).toBeCloseTo(100)
  })
})

describe('psicología: desenganche moral', () => {
  it('un mecanismo reduce la gravedad percibida', () => {
    const sev = perceivedSeverity({ baseSeverity: 100, mechanism: 'blame' })
    expect(sev).toBeLessThan(100)
  })

  it('a mayor intensidad, mayor reducción', () => {
    expect(
      perceivedSeverity({ baseSeverity: 100, mechanism: 'dehumanization', intensity: 1 })
    ).toBeLessThan(
      perceivedSeverity({ baseSeverity: 100, mechanism: 'dehumanization', intensity: 0.2 })
    )
  })
})

describe('psicología: influencia por estatus', () => {
  it('a mayor estatus, mayor empuje sobre la norma', () => {
    expect(normShift({ status: 90, stanceStrength: 60 })).toBeGreaterThan(
      normShift({ status: 20, stanceStrength: 60 })
    )
  })
})
