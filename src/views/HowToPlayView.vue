<script setup lang="ts">
import { ArrowLeft, CalendarDays, ListChecks, MessageCircleQuestion } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { VARIABLE_KEYS, VARIABLE_META, ROLE_LIST, ROLE_META } from '../lib/caseMeta'

const router = useRouter()

const PASOS = [
  {
    icon: CalendarDays,
    title: 'Cada día, un acontecimiento',
    text: 'El caso dura varios días. Cada día puede aparecer una situación en la clase que exige una decisión tuya.',
  },
  {
    icon: ListChecks,
    title: 'Tú eliges una salida',
    text: 'Cada situación ofrece varias opciones. No hay respuestas correctas: cada opción cambia la dinámica del grupo (apoyo, silencio, presión…) de forma visible.',
  },
  {
    icon: MessageCircleQuestion,
    title: 'La clase reacciona',
    text: 'No decides en el vacío: los personajes tienen motivaciones y miedos. Lo que haces —y lo que no haces— influye en cómo se comporta el resto.',
  },
]
</script>

<template>
  <main class="mx-auto flex min-h-svh max-w-2xl flex-col gap-8 p-6">
    <button
      type="button"
      class="flex w-fit items-center gap-2 text-sm text-stone-400 transition hover:text-stone-200"
      @click="router.back()"
    >
      <ArrowLeft class="h-4 w-4" />
      Volver
    </button>

    <header>
      <h1 class="text-3xl font-bold">¿Cómo se juega?</h1>
      <p class="mt-2 text-stone-400">
        «El Jurado Invisible» es un <strong class="text-stone-200">simulador social</strong>: tomas
        decisiones dentro de una clase y observas cómo cambia el grupo. No te puntúan; observa
        qué precio tienen las cosas.
      </p>
    </header>

    <section class="flex flex-col gap-4">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-stone-400">El bucle del día</h2>
      <div
        v-for="(paso, i) in PASOS"
        :key="paso.title"
        class="flex gap-4 rounded-xl bg-stone-900 p-4"
      >
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-sky-300">
          <component :is="paso.icon" class="h-5 w-5" />
        </div>
        <div>
          <p class="font-semibold text-stone-100">
            <span class="mr-2 text-sky-400 tabular-nums">{{ i + 1 }}.</span>{{ paso.title }}
          </p>
          <p class="mt-1 text-sm text-stone-400">{{ paso.text }}</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-400">
        Las variables de la clase
      </h2>
      <p class="mb-3 text-sm text-stone-400">
        Miden cómo está el grupo en cada momento. Suben y bajan con cada decisión.
      </p>
      <div class="flex flex-col gap-3">
        <div
          v-for="k in VARIABLE_KEYS"
          :key="k"
          class="flex items-start gap-3 rounded-xl bg-stone-900 p-4"
        >
          <component
            :is="VARIABLE_META[k].icon"
            class="mt-0.5 h-5 w-5 shrink-0"
            :class="{
              'text-rose-300': k === 'isolation',
              'text-emerald-300': k === 'support',
              'text-amber-300': k === 'pressure',
              'text-violet-300': k === 'norm',
              'text-sky-300': k === 'silence',
            }"
          />
          <div>
            <p class="font-semibold text-stone-100">{{ VARIABLE_META[k].label }}</p>
            <p class="text-sm text-stone-400">{{ VARIABLE_META[k].desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-400">
        Los papeles en la clase
      </h2>
      <p class="mb-3 text-sm text-stone-400">
        No hay «buenos» y «malos»: cada personaje actúa según sus motivaciones. El papel puede
        cambiar con lo que hace el grupo.
      </p>
      <div class="flex flex-col gap-3">
        <div
          v-for="role in ROLE_LIST"
          :key="role"
          class="flex items-start gap-3 rounded-xl bg-stone-900 p-4"
        >
          <component :is="ROLE_META[role].icon" class="mt-0.5 h-5 w-5 shrink-0 text-stone-300" />
          <div>
            <p class="font-semibold text-stone-100">{{ ROLE_META[role].label }}</p>
            <p class="text-sm text-stone-400">{{ ROLE_META[role].desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <div class="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
      <strong class="font-semibold">No es un examen.</strong>
      No hay «respuesta correcta» ni puntuación. Las decisiones tienen costes y consecuencias;
      la simulación no te juzga, te deja ver.
    </div>

    <button
      type="button"
      class="rounded-xl bg-sky-500 px-6 py-3 font-semibold text-stone-950 transition hover:bg-sky-400"
      @click="router.push({ name: 'home' })"
    >
      Volver al menú
    </button>
  </main>
</template>
