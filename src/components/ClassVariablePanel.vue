<script setup lang="ts">
import { computed, ref } from 'vue'
import { BookOpen, ChevronDown } from 'lucide-vue-next'
import type { VariableMap } from '../models/types'
import { VARIABLE_KEYS, VARIABLE_META } from '../lib/caseMeta'

const props = defineProps<{ vars: VariableMap }>()

const helpOpen = ref(false)

const rows = computed(() =>
  VARIABLE_KEYS.map((k) => ({
    key: k,
    ...VARIABLE_META[k],
    value: Math.round(props.vars[k]),
  }))
)
</script>

<template>
  <div class="rounded-xl bg-stone-900 p-4">
    <div class="mb-3 flex items-center justify-between">
      <h3 class="text-sm font-semibold uppercase tracking-wide text-stone-400">
        Dinámica de la clase
      </h3>
      <button
        type="button"
        class="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-stone-400 transition hover:bg-stone-800 hover:text-stone-200"
        :aria-expanded="helpOpen"
        @click="helpOpen = !helpOpen"
      >
        <BookOpen class="h-3.5 w-3.5" />
        ayuda
        <ChevronDown class="h-3 w-3 transition-transform" :class="{ 'rotate-180': helpOpen }" />
      </button>
    </div>
    <div v-if="helpOpen" class="mb-3 flex flex-col gap-2 rounded-lg bg-stone-950/60 p-3">
      <p v-for="row in rows" :key="row.key" class="text-xs text-stone-300">
        <span class="font-semibold text-stone-200">{{ row.label }}</span>: {{ row.desc }}
      </p>
    </div>
    <div v-for="row in rows" :key="row.key" class="flex items-center gap-3 py-0.5" :title="row.desc">
      <component :is="row.icon" class="h-4 w-4 shrink-0 text-stone-400" />
      <span class="w-32 text-xs text-stone-300">{{ row.label }}</span>
      <div class="h-3 flex-1 overflow-hidden rounded-full bg-stone-800">
        <div
          class="h-full rounded-full"
          :class="row.bar"
          :style="{ width: `${row.value}%` }"
        />
      </div>
      <span class="w-8 text-right text-xs tabular-nums text-stone-300">
        {{ row.value }}
      </span>
    </div>
  </div>
</template>