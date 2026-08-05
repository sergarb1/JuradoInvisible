# Tasks: Experiencia narrativa, guía y datos por fragmentos

## 1. Motor

- [x] 1.1 Corregir `advanceDay()` en `SocialSimulationEngine` (seleccionar el
      evento con el día nuevo).
- [x] 1.2 Test de regresión: `event.day === state.day` en toda la partida y
      `reunion-final` (día 10) disparado antes del final.

## 2. Modelo y esquemas

- [x] 2.1 Añadir `prologue` (CaseData), `scene` (EventData), `consequence`
      (Choice) en `src/models/types.ts`.
- [x] 2.2 Actualizar `data/schema/case.schema.json` (campos opcionales) y copia
      en `public/data/schema/`.
- [x] 2.3 Crear fragment schemas: `meta`, `event`, `character`, `ending`
      (referencian `case.schema.json`).

## 3. Contenido del caso

- [x] 3.1 Prólogo de 5 bloques.
- [x] 3.2 `scene` en todos los eventos.
- [x] 3.3 `consequence` en todas las opciones.
- [x] 3.4 Ampliar a 3-4 opciones los eventos con menos.
- [x] 3.5 4 eventos nuevos condicionados (apoyo-visible, presion-silenciosa,
      charla-tutor, silencio-peso) con prioridad suficiente.

## 4. Refactor a fragmentos

- [x] 4.1 Dividir el caso en `data/cases/el-alumno-invisible/`
      (`meta`, `characters`, `endings`, `events/*`).
- [x] 4.2 `scripts/assemble-cases.mjs` (con `--watch`) que fusiona, valida y
      escribe ambos JSON únicos.
- [x] 4.3 README de edición (`data/cases/README.md` y por caso).
- [x] 4.4 Hooks npm `predev`/`pretest`/`prebuild`/`predeploy` + script
      `assemble-cases`.
- [x] 4.5 `tests/cases.test.ts`: valida fragmentos (esquema, prólogo,
      consequences, días, referencias).

## 5. Interfaz narrativa y guía

- [x] 5.1 `src/lib/caseMeta.ts`: iconos y descripciones de variables y roles.
- [x] 5.2 `PrologueView.vue` (ruta `/prologo`).
- [x] 5.3 `HowToPlayView.vue` (ruta `/como-jugar`).
- [x] 5.4 `ConsequenceView.vue` (ruta `/consecuencia`) + `lastDecision`/
      `lastConsequence` en el store.
- [x] 5.5 `EventView.vue`: narrador de escena, botón de ayuda, navegación a
      consecuencia.
- [x] 5.6 `ClassMapView.vue`: leyenda de roles; `ClassVariablePanel` con iconos
      y tooltips; `CharacterCircle` con icono de rol.
- [x] 5.7 `ChoiceCard.vue`: etiqueta de postura (pro/anti/neutra) informativa.
- [x] 5.8 Rutas y acceso a la guía desde Home y dentro de la partida.

## 6. Verificación

- [x] 6.1 `npm run typecheck` sin errores.
- [x] 6.2 `npm run test` en verde (35 tests).
- [x] 6.3 `npm run build` correcto.
- [x] 6.4 Partida completa en el navegador: prólogo → mapa → evento →
      consecuencia → día 2 (evento correcto) y guía accesible.
- [x] 6.5 Sin errores de consola.