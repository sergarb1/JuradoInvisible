<script setup lang="ts">
import { ChevronRight, Quote } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useSimulation } from '../stores/simulation'
import ClassVariablePanel from '../components/ClassVariablePanel.vue'

const router = useRouter()
const sim = useSimulation()

const caso = sim.activeCase
const result = sim.lastConsequence

async function continuar() {
  await router.push({ name: 'mapa', params: { caseId: caso?.id } })
}
</script>

<template>
  <main
    v-if="result && sim.state"
    class="mx-auto flex min-h-svh max-w-2xl flex-col justify-center gap-6 p-6"
  >
    <p class="text-sm text-stone-400">Día {{ sim.day }}</p>

    <div v-if="result.scene" class="flex items-start gap-3 text-sm italic text-stone-400">
      <Quote class="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
      <p>{{ result.scene }}</p>
    </div>

    <div class="rounded-xl bg-stone-900 p-5">
      <p class="text-xs uppercase tracking-wide text-sky-400">Has decidido</p>
      <p class="mt-2 font-medium text-stone-100">{{ result.choice.text }}</p>
    </div>

    <div class="rounded-xl border-l-4 border-emerald-500 bg-stone-900 p-5">
      <p class="text-xs uppercase tracking-wide text-emerald-400">Qué ha pasado</p>
      <p class="mt-2 leading-relaxed text-stone-200">{{ result.consequence }}</p>
    </div>

    <ClassVariablePanel :vars="sim.state.classVars" />

    <button
      type="button"
      class="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-stone-950 transition hover:bg-amber-400"
      @click="continuar()"
    >
      Continuar
      <ChevronRight class="h-4 w-4" />
    </button>
  </main>

  <main v-else class="mx-auto flex min-h-svh max-w-2xl flex-col items-center justify-center gap-6 p-6">
    <p class="text-stone-400">No hay ninguna decisión reciente que mostrar.</p>
    <button
      type="button"
      class="rounded-xl border border-stone-700 px-6 py-3 text-stone-200 hover:bg-stone-900"
      @click="router.push({ name: 'mapa', params: { caseId: caso?.id } })"
    >
      Volver al mapa
    </button>
  </main>
</template>