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
const step = ref(0)

onMounted(async () => {
  try {
    const id = String(route.params.caseId)
    caso.value = await loadCaseById(id)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'No se pudo cargar el caso.'
  }
})

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
    <div v-if="error" class="rounded-xl border border-rose-500 bg-rose-500/10 p-4 text-rose-200">
      {{ error }}
    </div>

    <template v-else-if="caso">
      <div v-if="blocks.length" class="flex flex-col gap-6">
        <div class="flex items-center justify-between text-sm text-slate-500">
          <span class="uppercase tracking-wide text-sky-400">{{ caso.title }}</span>
          <span class="tabular-nums">{{ step + 1 }} / {{ blocks.length }}</span>
        </div>

        <div class="flex h-1 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            class="h-full bg-sky-500 transition-all"
            :style="{ width: `${((step + 1) / blocks.length) * 100}%` }"
          />
        </div>

        <transition name="fade" mode="out-in">
          <section :key="step" class="flex flex-col gap-3">
            <h1 class="text-3xl font-bold sm:text-4xl">{{ blocks[step].title }}</h1>
            <p class="text-lg leading-relaxed text-slate-300">{{ blocks[step].text }}</p>
          </section>
        </transition>
      </div>

      <div v-else class="rounded-xl bg-slate-900 p-5 text-slate-300">
        <p>{{ caso.intro }}</p>
      </div>

      <div class="flex justify-between">
        <button
          type="button"
          class="rounded-xl border border-slate-700 px-6 py-3 text-slate-200 transition hover:bg-slate-900"
          @click="router.push({ name: 'caso', params: { caseId: caso.id } })"
        >
          Volver
        </button>
        <button
          type="button"
          class="flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-sky-400"
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
</style>
