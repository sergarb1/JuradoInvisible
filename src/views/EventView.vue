<script setup lang="ts">
import { BookOpen, Quote } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useSimulation } from '../stores/simulation'
import ChoiceCard from '../components/ChoiceCard.vue'

const router = useRouter()
const sim = useSimulation()
const caso = sim.activeCase
const event = sim.activeEvent

async function elegir(choiceId: string) {
  await sim.choose(choiceId)
  await router.push({ name: 'consecuencia', params: { caseId: caso?.id } })
}
</script>

<template>
  <main v-if="event" class="mx-auto flex min-h-svh max-w-2xl flex-col justify-center gap-6 p-6">
    <div class="flex items-center justify-between">
      <p class="text-sm text-slate-400">Día {{ sim.day }}</p>
      <button
        type="button"
        class="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-900"
        @click="router.push({ name: 'como-jugar' })"
      >
        <BookOpen class="h-3.5 w-3.5" />
        ¿Cómo se juega?
      </button>
    </div>

    <div v-if="event.scene" class="flex items-start gap-3 text-sm italic text-slate-500">
      <Quote class="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
      <p>{{ event.scene }}</p>
    </div>

    <div class="rounded-xl border-l-4 border-sky-500 bg-slate-900 p-5">
      <p class="text-xs uppercase tracking-wide text-sky-400">{{ sim.actorName || event.actor || '—' }}</p>
      <p class="mt-2 text-slate-200">{{ event.text }}</p>
    </div>

    <div class="flex flex-col gap-3">
      <p class="text-sm text-slate-400">¿Qué haces?</p>
      <ChoiceCard
        v-for="choice in sim.availableChoices(event)"
        :key="choice.id"
        :choice="choice"
        @click="elegir(choice.id)"
      />
    </div>
  </main>

  <main v-else class="mx-auto flex min-h-svh max-w-2xl items-center justify-center p-6">
    <button
      type="button"
      class="rounded-xl border border-slate-700 px-6 py-3 text-slate-200 hover:bg-slate-900"
      @click="router.push({ name: 'mapa', params: { caseId: caso?.id } })"
    >
      Volver al mapa
    </button>
  </main>
</template>