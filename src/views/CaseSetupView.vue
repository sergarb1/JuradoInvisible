<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loadCaseById } from '../loader/CaseLoader'
import type { CaseData } from '../models/types'

const route = useRoute()
const router = useRouter()

const caso = ref<CaseData | null>(null)
const error = ref('')

onMounted(async () => {
  try {
    const id = String(route.params.caseId)
    caso.value = await loadCaseById(id)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'No se pudo cargar el caso.'
  }
})

async function comenzar() {
  if (!caso.value) return
  await router.push({ name: 'prologo', params: { caseId: caso.value.id } })
}
</script>

<template>
  <main class="mx-auto flex min-h-svh max-w-2xl flex-col justify-center gap-6 p-6">
    <div v-if="error" class="rounded-xl border border-rose-500 bg-rose-500/10 p-4 text-rose-200">
      {{ error }}
    </div>

    <template v-else-if="caso">
      <div>
        <p class="text-xs uppercase tracking-wide text-sky-400">Caso</p>
        <h1 class="text-3xl font-bold">{{ caso.title }}</h1>
      </div>
      <p class="text-slate-300">{{ caso.intro }}</p>
      <div class="rounded-xl bg-slate-900 p-4 text-sm text-slate-400">
        {{ caso.description }}
      </div>
      <div class="flex gap-3">
        <button
          type="button"
          class="rounded-xl bg-sky-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-sky-400"
          @click="comenzar()"
        >
          Comenzar
        </button>
        <button
          type="button"
          class="rounded-xl border border-slate-700 px-6 py-3 text-slate-200 hover:bg-slate-900"
          @click="router.push({ name: 'como-jugar' })"
        >
          ¿Cómo se juega?
        </button>
        <button
          type="button"
          class="rounded-xl border border-slate-700 px-6 py-3 text-slate-200 hover:bg-slate-900"
          @click="router.push({ name: 'home' })"
        >
          Volver
        </button>
      </div>
    </template>
  </main>
</template>