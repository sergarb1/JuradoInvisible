<script setup lang="ts">
import { useSimulation } from './stores/simulation'

const sim = useSimulation()
</script>

<template>
  <div class="app-bg min-h-svh text-stone-100">
    <div
      v-if="sim.bootstrapping"
      class="flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center"
    >
      <div class="h-10 w-10 animate-spin rounded-full border-2 border-stone-700 border-t-amber-500" />
      <p class="text-sm text-stone-400">Cargando partida…</p>
    </div>
    <router-view v-else />
  </div>
</template>