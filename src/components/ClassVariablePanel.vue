<script setup lang="ts">
import { computed } from 'vue'
import { BookOpen } from 'lucide-vue-next'
import type { VariableMap } from '../models/types'
import { VARIABLE_KEYS, VARIABLE_META } from '../lib/caseMeta'

const props = defineProps<{ vars: VariableMap }>()

const rows = computed(() =>
  VARIABLE_KEYS.map((k) => ({
    key: k,
    ...VARIABLE_META[k],
    value: Math.round(props.vars[k]),
  }))
)
</script>

<template>
  <div class="rounded-xl bg-slate-900 p-4">
    <div class="mb-3 flex items-center justify-between">
      <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-400">
        Dinámica de la clase
      </h3>
      <span class="flex items-center gap-1 text-xs text-slate-500" title="Pasa el ratón por cada variable para saber qué significa">
        <BookOpen class="h-3.5 w-3.5" />
        ayuda
      </span>
    </div>
    <div v-for="row in rows" :key="row.key" class="flex items-center gap-3 py-0.5" :title="row.desc">
      <component :is="row.icon" class="h-4 w-4 shrink-0 text-slate-400" />
      <span class="w-32 text-xs text-slate-300">{{ row.label }}</span>
      <div class="h-3 flex-1 overflow-hidden rounded-full bg-slate-800">
        <div
          class="h-full rounded-full"
          :class="row.bar"
          :style="{ width: `${row.value}%` }"
        />
      </div>
      <span class="w-8 text-right text-xs tabular-nums text-slate-400">
        {{ row.value }}
      </span>
    </div>
  </div>
</template>