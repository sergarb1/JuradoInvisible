<script setup lang="ts">
import { useSimulation } from './stores/simulation'

const sim = useSimulation()
</script>

<template>
  <div
    class="min-h-svh bg-[radial-gradient(75%_50%_at_50%_-8%,rgba(251,191,36,0.10),transparent_60%),radial-gradient(60%_45%_at_100%_100%,rgba(56,189,248,0.07),transparent_60%),#020617] text-slate-100"
  >
    <div
      v-if="sim.bootstrapping"
      class="flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center"
    >
      <div class="h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-sky-400" />
      <p class="text-sm text-slate-400">Cargando partida…</p>
    </div>
    <router-view v-else />
  </div>
</template>