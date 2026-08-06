<script setup lang="ts">
import { computed, ref } from 'vue'
import { BookOpen, ChevronDown } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useSimulation } from '../stores/simulation'
import ClassVariablePanel from '../components/ClassVariablePanel.vue'
import CharacterCircle from '../components/CharacterCircle.vue'
import { ROLE_LIST, ROLE_META } from '../lib/caseMeta'

const router = useRouter()
const sim = useSimulation()
const caso = sim.activeCase

const rolesOpen = ref(false)

const dayProgress = computed(() => {
  if (!caso?.days) return 0
  return Math.min(100, Math.round((sim.day / caso.days) * 100))
})

async function irAEvento() {
  await router.push({ name: 'evento', params: { caseId: caso?.id } })
}

async function avanzarDia() {
  await sim.advanceDay()
  if (sim.ended) {
    await router.push({ name: 'final', params: { caseId: caso?.id } })
  }
}
</script>

<template>
  <main class="mx-auto flex min-h-svh max-w-4xl flex-col gap-6 p-6">
    <header class="flex items-center justify-between">
      <div>
        <p class="text-sm text-slate-400">Caso: {{ caso?.title }}</p>
        <div class="flex items-center gap-3">
          <h2 class="text-2xl font-bold">Día {{ sim.day }}</h2>
          <span v-if="caso?.days" class="text-xs text-slate-400 tabular-nums">
            de {{ caso.days }}
          </span>
        </div>
        <div
          v-if="caso?.days"
          class="mt-2 h-1.5 w-40 overflow-hidden rounded-full bg-slate-800"
        >
          <div
            class="h-full rounded-full bg-sky-500 transition-all"
            :style="{ width: `${dayProgress}%` }"
          />
        </div>
      </div>
      <div class="flex gap-2">
        <button
          type="button"
          class="flex items-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:bg-slate-900"
          @click="router.push({ name: 'como-jugar' })"
        >
          <BookOpen class="h-3.5 w-3.5" />
          ¿Cómo se juega?
        </button>
        <button
          type="button"
          class="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-900"
          @click="router.push({ name: 'home' })"
        >
          Menú
        </button>
      </div>
    </header>

    <ClassVariablePanel :vars="sim.classVars!" />

    <section>
      <h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
        La clase
      </h2>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <CharacterCircle
          v-for="ch in caso?.characters"
          :key="ch.id"
          :character="ch"
          :victim-id="caso!.victimId"
          :relationships="sim.state!.relationships"
          :gender="ch.id === caso?.playerId ? sim.playerGender : ch.gender"
        />
      </div>

      <div class="mt-4 flex flex-wrap items-center gap-2">
        <span class="text-xs text-slate-400">Papeles:</span>
        <button
          v-for="role in ROLE_LIST"
          :key="role"
          type="button"
          class="flex items-center gap-1.5 rounded-full border border-slate-800 px-2.5 py-1 text-xs text-slate-300 transition hover:bg-slate-900"
          :title="ROLE_META[role].desc"
        >
          <component :is="ROLE_META[role].icon" class="h-3.5 w-3.5 text-slate-400" />
          {{ ROLE_META[role].label }}
        </button>
        <button
          type="button"
          class="flex items-center gap-1 text-xs text-slate-400 transition hover:text-slate-200"
          :aria-expanded="rolesOpen"
          @click="rolesOpen = !rolesOpen"
        >
          ¿Qué significa cada papel?
          <ChevronDown class="h-3 w-3 transition-transform" :class="{ 'rotate-180': rolesOpen }" />
        </button>
      </div>

      <div
        v-if="rolesOpen"
        class="mt-3 flex flex-col gap-2 rounded-lg bg-slate-900 p-3"
      >
        <p v-for="role in ROLE_LIST" :key="role" class="text-xs text-slate-300">
          <span class="font-semibold text-slate-200">{{ ROLE_META[role].label }}</span>:
          {{ ROLE_META[role].desc }}
        </p>
      </div>
    </section>

    <footer class="mt-auto flex flex-col gap-3">
      <template v-if="sim.activeEvent">
        <p class="text-sm text-slate-400">Hay un acontecimiento en la clase.</p>
        <button
          type="button"
          class="rounded-xl bg-sky-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-sky-400"
          @click="irAEvento()"
        >
          Ver evento del día
        </button>
      </template>
      <template v-else-if="!sim.ended">
        <p class="text-sm text-slate-400">Nada relevante hoy. La clase sigue su curso.</p>
        <button
          type="button"
          class="rounded-xl border border-slate-700 px-6 py-3 text-slate-200 transition hover:border-sky-500 hover:bg-slate-900"
          @click="avanzarDia()"
        >
          Avanzar día
        </button>
      </template>
    </footer>
  </main>
</template>