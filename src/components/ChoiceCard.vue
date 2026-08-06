<script setup lang="ts">
import { computed } from 'vue'
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-vue-next'
import type { Choice } from '../models/types'

const props = defineProps<{ choice: Choice }>()

const LABELS: Record<string, string> = {
  isolation: 'aislamiento',
  support: 'apoyo',
  pressure: 'presión',
  norm: 'norma',
  silence: 'silencio',
}

const stanceChip = computed(() => {
  switch (props.choice.stance) {
    case 'pro':
      return { label: 'a favor', cls: 'bg-emerald-500/15 text-emerald-300', icon: ArrowUpRight }
    case 'anti':
      return { label: 'en contra', cls: 'bg-red-500/15 text-red-300', icon: ArrowDownRight }
    default:
      return { label: 'neutra', cls: 'bg-stone-700/40 text-stone-300', icon: Minus }
  }
})
</script>

<template>
  <button
    type="button"
    class="w-full rounded-xl border border-stone-700 bg-stone-900 p-4 text-left transition hover:border-sky-500 hover:bg-stone-800"
  >
    <div class="flex items-start justify-between gap-2">
      <p class="text-sm text-stone-100">{{ choice.text }}</p>
      <span
        class="mt-0.5 flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs"
        :class="stanceChip.cls"
        :title="`Postura ${stanceChip.label} con la víctima (no es bueno ni malo: influye en la clase)`"
      >
        <component :is="stanceChip.icon" class="h-3 w-3" />
        {{ stanceChip.label }}
      </span>
    </div>
    <div
      v-if="Object.keys(choice.effects).length"
      class="mt-3 flex flex-wrap gap-2"
    >
      <span
        v-for="(delta, key) in choice.effects"
        :key="key"
        class="rounded-full px-2 py-0.5 text-xs"
        :class="(delta as number) > 0 ? 'bg-sky-500/20 text-sky-200' : (delta as number) < 0 ? 'bg-rose-500/20 text-rose-200' : 'bg-stone-700 text-stone-300'"
      >
        {{ LABELS[key] ?? key }}
        {{ (delta as number) > 0 ? '+' : '' }}{{ Math.round(delta as number) }}
      </span>
    </div>
  </button>
</template>