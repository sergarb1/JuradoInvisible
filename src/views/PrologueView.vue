<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronRight, Play } from 'lucide-vue-next'
import { useSimulation } from '../stores/simulation'
import { loadCaseById } from '../loader/CaseLoader'
import type { CaseData } from '../models/types'

const route = useRoute()
const router = useRouter()
const sim = useSimulation()

const caso = ref<CaseData | null>(null)
const error = ref('')
const loading = ref(true)
const step = ref(0)

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

const blocks = computed(() => caso.value?.prologue ?? [])
const isLast = computed(() => step.value >= blocks.value.length - 1)

function continuar() {
  if (isLast.value) {
    empezar()
    return
  }
  step.value += 1
}

async function empezar() {
  if (!caso.value) return
  await sim.newGame(caso.value)
  await router.push({ name: 'mapa', params: { caseId: caso.value.id } })
}
</script>

<template>
  <main class="mx-auto flex min-h-svh max-w-2xl flex-col justify-center gap-8 p-6">
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
      <div class="h-6 w-32 animate-pulse rounded bg-stone-800" />
      <div class="h-9 w-2/3 animate-pulse rounded bg-stone-800" />
      <div class="h-40 w-full animate-pulse rounded-xl bg-stone-800" />
    </div>

    <template v-else-if="caso">
      <div v-if="blocks.length" class="flex flex-col gap-6">
        <div class="flex items-center justify-between text-sm text-stone-400">
          <span class="uppercase tracking-wide text-sky-400">{{ caso.title }}</span>
          <span class="tabular-nums">{{ step + 1 }} / {{ blocks.length }}</span>
        </div>

        <div class="flex h-1 w-full overflow-hidden rounded-full bg-stone-800">
          <div
            class="h-full bg-sky-500 transition-all"
            :style="{ width: `${((step + 1) / blocks.length) * 100}%` }"
          />
        </div>

        <transition name="fade" mode="out-in">
          <section :key="step" class="flex flex-col gap-3">
            <h1 class="text-3xl font-bold sm:text-4xl">{{ blocks[step].title }}</h1>
            <p class="text-lg leading-relaxed text-stone-300">{{ blocks[step].text }}</p>
          </section>
        </transition>

        <div v-if="isLast" class="rounded-xl border border-stone-700 bg-stone-900/60 p-5">
          <p class="mb-3 text-sm font-medium uppercase tracking-wide text-stone-400">
            Elige con qué avatar jugarás
          </p>
          <div class="flex gap-3">
            <button
              type="button"
              class="flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold transition"
              :class="
                sim.playerGender === 'm'
                  ? 'border-sky-400 bg-sky-500/20 text-sky-200'
                  : 'border-stone-700 text-stone-300 hover:bg-stone-800'
              "
              @click="sim.setPlayerGender('m')"
            >
              Chico
            </button>
            <button
              type="button"
              class="flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold transition"
              :class="
                sim.playerGender === 'f'
                  ? 'border-sky-400 bg-sky-500/20 text-sky-200'
                  : 'border-stone-700 text-stone-300 hover:bg-stone-800'
              "
              @click="sim.setPlayerGender('f')"
            >
              Chica
            </button>
          </div>
        </div>
      </div>

      <div v-else class="rounded-xl bg-stone-900 p-5 text-stone-300">
        <p>{{ caso.intro }}</p>
      </div>

      <div class="flex justify-between">
        <button
          type="button"
          class="rounded-xl border border-stone-700 px-6 py-3 text-stone-200 transition hover:bg-stone-900"
          @click="router.push({ name: 'caso', params: { caseId: caso.id } })"
        >
          Volver
        </button>
        <button
          type="button"
          class="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-stone-950 transition hover:bg-amber-400"
          @click="continuar()"
        >
          <Play v-if="isLast" class="h-4 w-4" />
          <ChevronRight v-else class="h-4 w-4" />
          {{ isLast ? 'Comenzar partida' : 'Continuar' }}
        </button>
      </div>
    </template>
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
@media (prefers-reduced-motion: reduce) {
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 1;
    transform: none;
  }
}
</style>
