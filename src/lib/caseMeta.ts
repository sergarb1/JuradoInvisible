import {
  Gauge,
  HeartHandshake,
  Scale,
  UserRound,
  UserX,
  VolumeX,
  Eye,
  Shield,
  Swords,
  Target,
  type LucideIcon,
} from 'lucide-vue-next'
import type { Role, VariableKey, VariableMap } from '../models/types'

export interface VariableMeta {
  label: string
  desc: string
  bar: string
  icon: LucideIcon
}

export const VARIABLE_META: Record<keyof VariableMap, VariableMeta> = {
  isolation: {
    label: 'Aislamiento',
    desc: 'Lo solo que se queda la víctima. Sube cuando nadie le integra.',
    bar: 'bg-rose-500',
    icon: UserX,
  },
  support: {
    label: 'Apoyo',
    desc: 'El respaldo explícito que recibe. Sube con gestos, aliados y palabras.',
    bar: 'bg-emerald-500',
    icon: HeartHandshake,
  },
  pressure: {
    label: 'Presión grupal',
    desc: 'La fuerza del grupo por que todos hagan lo mismo y nadie se salga.',
    bar: 'bg-amber-500',
    icon: Gauge,
  },
  norm: {
    label: 'Norma social',
    desc: 'Lo que la clase considera «normal» o aceptable. Cambia con cada gesto.',
    bar: 'bg-violet-500',
    icon: Scale,
  },
  silence: {
    label: 'Silencio colectivo',
    desc: 'Lo que nadie dice ni nombra. El silencio alimenta la inercia.',
    bar: 'bg-sky-500',
    icon: VolumeX,
  },
}

export const VARIABLE_KEYS = Object.keys(VARIABLE_META) as VariableKey[]

export interface RoleMeta {
  label: string
  desc: string
  ring: string
  chip: string
  icon: LucideIcon
}

export const ROLE_META: Record<Role, RoleMeta> = {
  victim: {
    label: 'Víctima',
    desc: 'Quien recibe la exclusión. No es un papel elegido.',
    ring: 'ring-rose-400',
    chip: 'bg-rose-500/20 text-rose-200',
    icon: Target,
  },
  aggressor: {
    label: 'Agresor',
    desc: 'Quien marca el ritmo de la exclusión, a veces sin pensarlo.',
    ring: 'ring-red-500',
    chip: 'bg-red-500/20 text-red-200',
    icon: Swords,
  },
  defender: {
    label: 'Defensor',
    desc: 'Quien se posiciona a favor de la víctima.',
    ring: 'ring-emerald-400',
    chip: 'bg-emerald-500/20 text-emerald-200',
    icon: Shield,
  },
  bystander: {
    label: 'Espectador',
    desc: 'Quien presencia y no interviene. Su papel es clave: callar también influye.',
    ring: 'ring-amber-400',
    chip: 'bg-amber-500/20 text-amber-200',
    icon: Eye,
  },
  neutral: {
    label: 'Neutro',
    desc: 'Sin un rol definido. Puede mover la balanza.',
    ring: 'ring-slate-400',
    chip: 'bg-slate-500/20 text-slate-200',
    icon: UserRound,
  },
}

/** Icono y descripción corta para la leyenda de roles de la clase. */
export const ROLE_LIST: Role[] = ['victim', 'aggressor', 'defender', 'bystander', 'neutral']
