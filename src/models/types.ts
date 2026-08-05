/**
 * Modelos de datos del simulador.
 *
 * Tipos que definen el contrato externo (JSON) del juego: variables,
 * personajes, eventos, decisiones y finales. Los datos NUNCA se hardcodean en
 * el motor: se cargan desde JSON y se validan contra JSON Schema.
 */

export type VariableKey =
  | 'isolation'
  | 'support'
  | 'pressure'
  | 'norm'
  | 'silence'

/** Variables de clase: todas en rango 0-100. */
export interface VariableMap {
  isolation: number
  support: number
  pressure: number
  norm: number
  silence: number
}

export type Role =
  | 'victim'
  | 'aggressor'
  | 'defender'
  | 'bystander'
  | 'neutral'

export interface CharacterTraits {
  empathy: number
  popularity: number
  influence: number
  conformity: number
  rejectionFear: number
}

export interface CharacterBeliefs {
  victimResponsibility: number
  groupPressure: number
}

/**
 * Personaje. `relationships[otherId]` es el lazo hacia otro personaje
 * (negativo = hostil, positivo = afín).
 */
export interface Character {
  id: string
  name: string
  role: Role
  age: number
  traits: CharacterTraits
  beliefs: CharacterBeliefs
  relationships: Record<string, number>
}

export type Comparator = '>' | '<' | '>=' | '<=' | '==' | '!='

/**
 * Condición de disparo. Evalúa los campos presentes como AND.
 * - `variable`+`op`+`value`: compara una variable de clase.
 * - `flag`: exige que la bandera esté puesta.
 * - `notFlag`: exige que la bandera NO esté puesta.
 */
export interface Condition {
  variable?: VariableKey
  op?: Comparator
  value?: number
  flag?: string
  notFlag?: string
}

export interface EndingCondition {
  logic?: 'and' | 'or'
  rules: Condition[]
}

export interface Choice {
  id: string
  text: string
  /** Postura de la decisión: refuerza o daña a la víctima (el motor traduce la
   * influencia, no la moraleja). */
  stance: 'pro' | 'anti' | 'neutral'
  /** Resultado narrado (qué pasa tras elegir esta opción). */
  consequence?: string
  effects: Partial<VariableMap>
  relationEffects: Record<string, number>
  setFlags: string[]
  clearFlags: string[]
}

export interface EventData {
  id: string
  day: number
  priority: number
  condition: Condition | null
  actor: string
  speaker: string
  /** Narración del escenario/lugar donde ocurre el evento. */
  scene?: string
  text: string
  choices: ChoiceData[]
}

export type ChoiceData = Choice

/** Bloque narrativo del prólogo: una pantalla dentro de la introducción. */
export interface NarrativeBlock {
  title: string
  speaker?: string
  text: string
}

export interface EndingData {
  id: string
  title: string
  text: string
  condition: EndingCondition
}

export interface CaseData {
  id: string
  title: string
  seed: number
  description: string
  intro: string
  days: number
  playerId: string
  victimId: string
  initial: VariableMap
  characters: Character[]
  events: EventData[]
  endings: EndingData[]
  /** Prólogo por pantallas que precede a la partida. */
  prologue?: NarrativeBlock[]
}