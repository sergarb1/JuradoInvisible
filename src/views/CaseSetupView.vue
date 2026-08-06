<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loadCaseById } from '../loader/CaseLoader'
import type { CaseData } from '../models/types'

const route = useRoute()
const router = useRouter()

const caso = ref<CaseData | null>(null)
const error = ref('')
const loading = ref(true)
const coverFailed = ref(false)

const coverSrc = (caseId: string) => `${import.meta.env.BASE_URL}assets/cases/${caseId}-cover.webp`

async function cargar() {
  loading.value = true
  error.value = ''
  try {
    const id = String(route.params.caseId)
    caso.value = await loadCaseById(id)
  } catch (e) {
    caso.value = null
    error.value = e instanceof Error ? e.message : 'No se pudo cargar el caso.'
  } finally {
    loading.value = false
  }
}

onMounted(cargar)

async function comenzar() {
  if (!caso.value) return
  await router.push({ name: 'prologo', params: { caseId: caso.value.id } })
}
</script>

<template>
  <main class="mx-auto flex min-h-svh max-w-2xl flex-col justify-center gap-6 p-6">
    <div
      v-if="error"
      role="alert"
      class="rounded-xl border border-rose-500 bg-rose-500/10 p-4 text-rose-200"
    >
      <p>{{ error }}</p>
      <button
        type="button"
        class="mt-3 rounded-xl border border-rose-400 px-4 py-2 text-sm text-rose-100 hover:bg-rose-500/10"
        @click="cargar()"
      >
        Reintentar
      </button>
    </div>

    <div v-else-if="loading" class="flex flex-col gap-6" aria-busy="true">
      <div class="h-6 w-32 animate-pulse rounded bg-slate-800" />
      <div class="h-9 w-2/3 animate-pulse rounded bg-slate-800" />
      <div class="aspect-video w-full animate-pulse rounded-xl bg-slate-800" />
      <div class="h-20 w-full animate-pulse rounded-xl bg-slate-800" />
    </div>

    <template v-else-if="caso">
      <div>
        <p class="text-xs uppercase tracking-wide text-sky-400">Caso</p>
        <h1 class="text-3xl font-bold">{{ caso.title }}</h1>
      </div>
      <img
        v-if="!coverFailed"
        :src="coverSrc(caso.id)"
        :alt="`Portada del caso ${caso.title}`"
        class="aspect-video w-full rounded-xl object-cover"
        @error="coverFailed = true"
      />
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