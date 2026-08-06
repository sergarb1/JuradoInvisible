<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Character } from '../models/types'
import { ROLE_META } from '../lib/caseMeta'

const props = defineProps<{
  character: Character
  victimId: string
  relationships: Record<string, number>
  gender?: 'm' | 'f'
}>()

/** URL de avatar que ya ha fallado (para no reintentar sin límite). */
const failedSrc = ref<string | null>(null)

const meta = computed(() => ROLE_META[props.character.role])

/** Género efectivo: prioriza el prop (para el personaje del jugador). */
const gender = computed<'m' | 'f'>(() => props.gender ?? props.character.gender ?? 'm')

const baseSrc = computed(
  () => `${import.meta.env.BASE_URL}assets/avatars/rol-${props.character.role}.webp`,
)

const femaleSrc = computed(
  () => `${import.meta.env.BASE_URL}assets/avatars/rol-${props.character.role}-f.webp`,
)

const avatarSrc = computed(() => {
  if (failedSrc.value === femaleSrc.value) return baseSrc.value
  if (failedSrc.value === baseSrc.value) return ''
  return gender.value === 'f' ? femaleSrc.value : baseSrc.value
})

function onImgError() {
  const current = avatarSrc.value
  if (current && failedSrc.value !== current) failedSrc.value = current
}

watch(
  () => [props.character.id, gender.value] as const,
  () => {
    failedSrc.value = null
  },
)

/** Tamaño del retrato: jerarquía sutil por influencia, con tope para que
 *  los líderes no rompan la cuadrícula (Daniel ya no se ve «gigante»). */
const size = computed(() => Math.round(Math.min(50, 36 + props.character.traits.influence / 6)))
const relationToVictim = computed(() => {
  if (props.character.id === props.victimId) return null
  return props.character.relationships[props.victimId]
})
const relationLabel = computed(() => {
  const v = relationToVictim.value
  if (v === null || v === undefined) return ''
  const sign = v >= 0 ? '+' : '−'
  return `${sign}${Math.abs(Number(v.toFixed(0)))}`
})
const relationChip = computed(() => {
  const v = relationToVictim.value
  if (v === null || v === undefined || v === 0) return 'bg-slate-700/60 text-slate-300'
  return v > 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
})
const initial = computed(() => props.character.name.trim().charAt(0).toUpperCase())
const ring = computed(() => meta.value.ring)
const chip = computed(() => meta.value.chip)
const icon = computed(() => meta.value.icon)
</script>

<template>
  <div
    class="flex flex-col items-center gap-1 rounded-xl bg-slate-900 p-2"
    :style="{ width: `${size + 32}px` }"
    :title="`${character.name}: ${meta.label}. ${meta.desc}`"
  >
    <div
      class="relative flex items-center justify-center overflow-hidden rounded-full text-lg font-bold ring-2"
      :class="ring"
      :style="{ width: `${size}px`, height: `${size}px` }"
    >
      <span class="select-none">{{ initial }}</span>
      <img
        v-if="avatarSrc"
        :src="avatarSrc"
        :alt="`Retrato de ${character.name}`"
        class="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        @error="onImgError"
      />
      <span
        class="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-950 ring-1 ring-slate-700"
        :title="meta.label"
      >
        <component :is="icon" class="h-3.5 w-3.5 text-slate-300" />
      </span>
    </div>
    <div class="text-xs font-medium text-slate-200">{{ character.name }}</div>
    <div class="flex flex-wrap items-center justify-center gap-1">
      <span class="rounded px-1 text-[10px]" :class="chip">{{ meta.label }}</span>
      <span
        v-if="relationLabel"
        class="rounded px-1 text-[10px] font-semibold tabular-nums"
        :class="relationChip"
        :title="`relación con la víctima: ${relationLabel} (${relationLabel.startsWith('+') ? 'afín' : 'hostil'})`"
      >
        {{ relationLabel }}
      </span>
    </div>
  </div>
</template>