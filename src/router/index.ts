import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CaseSetupView from '../views/CaseSetupView.vue'
import PrologueView from '../views/PrologueView.vue'
import HowToPlayView from '../views/HowToPlayView.vue'
import ClassMapView from '../views/ClassMapView.vue'
import EventView from '../views/EventView.vue'
import ConsequenceView from '../views/ConsequenceView.vue'
import EndingView from '../views/EndingView.vue'
import { useSimulation } from '../stores/simulation'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/como-jugar', name: 'como-jugar', component: HowToPlayView },
    { path: '/caso/:caseId', name: 'caso', component: CaseSetupView },
    { path: '/caso/:caseId/prologo', name: 'prologo', component: PrologueView },
    { path: '/caso/:caseId/mapa', name: 'mapa', component: ClassMapView },
    { path: '/caso/:caseId/evento', name: 'evento', component: EventView },
    { path: '/caso/:caseId/consecuencia', name: 'consecuencia', component: ConsequenceView },
    { path: '/caso/:caseId/final', name: 'final', component: EndingView },
  ],
})

/** Rutas que necesitan una partida activa (guardada) en el store. */
const ROUTES_WITH_STATE = new Set(['mapa', 'evento', 'consecuencia', 'final'])

router.beforeEach(async (to) => {
  if (to.name && ROUTES_WITH_STATE.has(String(to.name))) {
    const ok = await useSimulation().restoreSession()
    if (!ok) return { name: 'home' }
  }
})
