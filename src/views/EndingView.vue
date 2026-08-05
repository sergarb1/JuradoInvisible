<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSimulation } from '../stores/simulation'
import type { VariableMap } from '../models/types'

const router = useRouter()
const sim = useSimulation()
const caso = sim.activeCase

const ending = computed(() =>
  caso?.endings.find((e) => e.id === sim.endingId)
)
const endingTitle = computed(() => ending.value?.title ?? 'Fin de la partida')
const endingText = computed(
  () => ending.value?.text ?? 'El caso ha llegado a su fin.'
)

const LABELS: Record<keyof VariableMap, string> = {
  isolation: 'Aislamiento',
  support: 'Apoyo',
  pressure: 'Presión grupal',
  norm: 'Norma social',
  silence: 'Silencio colectivo',
}
</script>

<template>
  <main class="mx-auto flex min-h-svh max-w-2xl flex-col justify-center gap-6 p-6">
    <p class="text-sm text-slate-400">Día {{ sim.day - 1 }} · fin de la partida</p>
    <h1 class="text-3xl font-bold">{{ endingTitle }}</h1>
    <p class="text-slate-300">{{ endingText }}</p>

    <section v-if="caso" class="rounded-xl bg-slate-900 p-4">
      <h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
        Evolución de la clase
      </h2>
      <div
        v-for="(label, key) in LABELS"
        :key="key"
        class="flex items-center gap-3 py-1"
      >
        <span class="w-40 text-sm text-slate-300">{{ label }}</span>
        <span class="text-slate-500 tabular-nums">
          {{ Math.round(caso.initial[key as keyof VariableMap]) }}
        </span>
        <span class="text-slate-600">→</span>
        <span v-if="sim.state" class="font-medium text-slate-100 tabular-nums">
          {{ Math.round(sim.state.classVars[key as keyof VariableMap]) }}
        </span>
      </div>
    </section>

    <div class="flex gap-3">
      <button
        type="button"
        class="rounded-xl bg-sky-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-sky-400"
        @click="sim.restart(); router.push({ name: 'mapa', params: { caseId: caso?.id } })"
      >
        Rejugar
      </button>
      <button
        type="button"
        class="rounded-xl border border-slate-700 px-6 py-3 text-slate-200 hover:bg-slate-900"
        @click="router.push({ name: 'home' })"
      >
        Menú
      </button>
    </div>
  </main>
</template>