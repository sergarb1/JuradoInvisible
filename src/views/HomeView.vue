<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { BookOpen, Play } from 'lucide-vue-next'
import { useSimulation } from '../stores/simulation'

const router = useRouter()
const sim = useSimulation()

const heroFailed = ref(false)
const defaultCaseId = 'el-alumno-invisible'

const coverSrc = `${import.meta.env.BASE_URL}assets/home-hero.webp`

onMounted(async () => {
  await sim.bootstrap()
})

async function continuar() {
  const ok = await sim.continueGame()
  if (!ok) return
  const { ended, activeEvent } = sim
  if (ended) {
    router.push({ name: 'final', params: { caseId: sim.activeCase?.id } })
  } else if (activeEvent) {
    router.push({ name: 'evento', params: { caseId: sim.activeCase?.id } })
  } else {
    router.push({ name: 'mapa', params: { caseId: sim.activeCase?.id } })
  }
}
</script>

<template>
  <main class="mx-auto flex min-h-svh max-w-2xl flex-col items-center justify-center gap-6 p-6 text-center">
      <img
        v-if="!heroFailed"
        :src="coverSrc"
        :alt="''"
        class="w-56 rounded-2xl object-cover shadow-xl shadow-amber-500/10"
        @error="heroFailed = true"
      />
    <h1 class="text-4xl font-bold sm:text-5xl">El Jurado Invisible</h1>
    <p class="max-w-md text-slate-400">
      Un simulador social: decides dentro de una clase y observas cómo cambia la
      dinámica del grupo. Sin respuestas correctas.
    </p>
    <div class="flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch sm:justify-center">
      <button
        type="button"
        class="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-8 py-3 font-semibold text-slate-950 transition hover:bg-amber-400"
        @click="router.push({ name: 'caso', params: { caseId: defaultCaseId } })"
      >
        <Play class="h-4 w-4" />
        Jugar
      </button>
      <button
        type="button"
        class="flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-8 py-3 text-slate-200 transition hover:border-amber-500 hover:bg-slate-900"
        @click="router.push({ name: 'como-jugar' })"
      >
        <BookOpen class="h-4 w-4" />
        ¿Cómo se juega?
      </button>
      <button
        v-if="sim.hasSave"
        type="button"
        class="rounded-xl border border-slate-700 px-8 py-3 text-slate-200 transition hover:border-amber-500 hover:bg-slate-900"
        @click="continuar()"
      >
        Continuar partida
      </button>
    </div>
  </main>
</template>