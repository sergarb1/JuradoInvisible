<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Character } from '../models/types'
import { ROLE_META } from '../lib/caseMeta'

const props = defineProps<{
  character: Character
  victimId: string
  relationships: Record<string, number>
}>()

const avatarFailed = ref(false)

const meta = computed(() => ROLE_META[props.character.role])

const avatarSrc = computed(
  () => `${import.meta.env.BASE_URL}assets/avatars/rol-${props.character.role}.webp`,
)

const size = computed(() => 36 + props.character.traits.influence / 4)
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
        v-if="!avatarFailed"
        :src="avatarSrc"
        :alt="`Retrato de ${character.name}`"
        class="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        @error="avatarFailed = true"
      />
      <span
        class="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-950 ring-1 ring-slate-700"
        :title="meta.label"
      >
        <component :is="icon" class="h-3.5 w-3.5 text-slate-300" />
      </span>
    </div>
    <div class="text-xs font-medium text-slate-200">{{ character.name }}</div>
    <span
      v-if="relationLabel"
      class="rounded px-1 text-[10px]"
      :class="chip"
      :title="`relación con la víctima: ${relationLabel} (${relationLabel.startsWith('+') ? 'afín' : 'hostil'})`"
    >
      {{ relationLabel }}
    </span>
    <span v-else class="text-[10px] text-slate-500">{{ meta.label }}</span>
  </div>
</template>