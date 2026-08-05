# Proposal: Experiencia narrativa, guía y datos por fragmentos

## Why

La partida funciona (MVP), pero se siente «fría» y opaca: no explica sus
mecánicas, no guía al jugador, los eventos son escuetos y un bug del motor hacia
que cada día repitiera el evento del día anterior (el día 10 nunca se veía).
Además, el caso era un único JSON enorme, difícil de editar a mano o por una IA.

## What Changes

- **Fix del motor**: corregir `advanceDay()` para que seleccione el evento del
  día nuevo (antes usaba el día viejo → cada evento aparecía con un día de
  retraso y `reunion-final` del día 10 nunca se disparaba).
- **Modelo de datos ampliado**: `prologue` (introducción por bloques),
  `scene` (narración del escenario por evento) y `consequence` (resultado
  narrado por opción). Nuevos campos opcionales en el JSON Schema.
- **Contenido**: prólogo de 5 pantallas, escenas, consecuencia en todas las
  opciones, 3-4 opciones por evento y 4 eventos nuevos condicionados
  (emergent, sin tocar los 10 días ni los 8 personajes).
- **Guía del jugador**: pantalla «¿Cómo se juega?» (bucle de juego, glosario de
  variables y roles con iconos), accesible desde el menú y dentro de la partida.
- **Narrativa en la interfaz**: pantalla de prólogo, pantalla de consecuencia
  tras decidir, narrador de escena en los eventos y leyenda de roles en el mapa.
- **Iconografía**: iconos para variables, roles, botones y posturas de decisión
  (sin moralizar; la postura es informativa).
- **Datos por fragmentos**: el caso se edita en `data/cases/<id>/`
  (`meta.json`, `characters.json`, `endings.json`, `events/*.json`). Un script
  (`npm run assemble-cases`) fusiona y escribe el JSON único para runtime y
  tests. Esquemas por fragmento (`meta/event/character/ending.schema.json`).

## Capabilities

### New Capabilities

- `narrativa-y-guia`: prólogo, guía, consecuencias narradas y explicación de las
  mecánicas en la interfaz.

### Modified Capabilities

- `motor-simulacion-social`: corrección del bug de avance de día (selección de
  evento con el día correcto).
- `datos-casos`: campos `scene`/`consequence`/`prologue` y organización por fragmentos.
- `interfaz`: accesibilidad de la guía, pantallas de prólogo y consecuencia.

## Impact

- `src/core/SocialSimulationEngine.ts`: fix de `advanceDay()` (mínimo).
- `src/models/types.ts` y `data/schema/*.json`: campos y esquemas nuevos.
- Reestructura de `data/cases/` a fragmentos; `scripts/assemble-cases.mjs`.
- `src/views/*`, `src/components/*`, `src/router/*`, `src/lib/caseMeta.ts`.
- Tests: regresión del motor y `tests/cases.test.ts` (valida los fragmentos).