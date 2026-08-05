# Tasks: Interfaz MVP en Vue

## 1. Infraestructura Vue

- [ ] 1.1 Crear `src/router/index.ts` con rutas: `/`, `/caso`, `/caso/:caseId/mapa`,
      `/caso/:caseId/evento`, `/caso/:caseId/final`.
- [ ] 1.2 Montar el router y pinia en `src/main.ts`; `App.vue` con `<router-view>`
      y layout básico (cabecera con volver al menú).
- [ ] 1.3 `src/stores/simulation.ts`: envuelve `SocialSimulationEngine`, expone
      estado reactivo (variables, evento activo, final) y acciones `start`,
      `choose`, `advanceDay`, `restart`.

## 2. Pantallas

- [ ] 2.1 `HomeView.vue`: título, botones «Jugar» y «Continuar partida» (si hay
      guardada).
- [ ] 2.2 `CaseSetupView.vue`: carga el caso por id, muestra presentación e
      inicia partida.
- [ ] 2.3 `ClassMapView.vue`: círculos de personajes (color por rol, tamaño por
      influencia, relación con la víctima) + panel de variables de clase.
- [ ] 2.4 `EventView.vue`: autor, texto y decisiones con chips de efectos
      (+/- por variable).
- [ ] 2.5 `EndingView.vue`: informe final (inicial vs final) y botones
      «Rejugar» y «Menú».

## 3. Componentes

- [ ] 3.1 `ClassVariablePanel.vue`: barras de las 5 variables.
- [ ] 3.2 `CharacterCircle.vue`: avatar circular con inicial, color de rol y
      rasgos.
- [ ] 3.3 `ChoiceCard.vue`: tarjeta de decisión con texto y chips de efectos.

## 4. Integración y persistencia

- [ ] 4.1 `store.bootstrap()`: intenta cargar partida guardada y expone
      `hasSave`.
- [ ] 4.2 Guardado automático tras `choose` y `advanceDay` (SaveSystem).
- [ ] 4.3 Botones «Nueva partida» / «Continuar» conectados al store.

## 5. Estilo

- [ ] 5.1 Tema sobrio (slate) con Tailwind, sin elementos que moralicen.
- [ ] 5.2 Responsive básico (móvil/tablet/pc).

## 6. Verificación

- [ ] 6.1 `npm run typecheck` sin errores.
- [ ] 6.2 `npm run test` en verde (los tests de motor intactos).
- [ ] 6.3 `npm run build` correcto.
- [ ] 6.4 Probar una partida completa en el navegador (dev) incluyendo recarga
      y continuación.