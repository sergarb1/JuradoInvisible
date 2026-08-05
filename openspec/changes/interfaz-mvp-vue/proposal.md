# Proposal: Interfaz MVP en Vue

## Why

El motor de simulación está completo y probado por tests, pero nadie puede
jugarlo. Hay que construir la capa Vue sobre el motor para que una partida de
«El alumno invisible» se juegue en el navegador: menú, selección de caso,
mapa de clase, eventos con decisiones e informe final.

## What Changes

- Configurar `vue-router` con las vistas del juego y `pinia` para el estado de
  partida (orquesta el motor, no lo sustituye).
- Vistas Vue: menú principal, selección/presentación de caso, mapa de clase,
  evento con decisión, y pantalla de final/informe.
- Barra de indicadores de las variables de clase (aislamiento, apoyo, presión,
  norma, silencio) visible en la partida.
- Mapa de clase: personajes como círculos/avatares con rasgos y relaciones.
- Guardado automático de la partida en curso (SaveSystem) y restauración.
- Carga del caso desde `public/data/cases/`.
- **Sin moralizar**: ninguna pantalla etiqueta aciertos o errores; solo se
  muestran consecuencias y el informe cuantitativo final.

## Capabilities

### New Capabilities

- `interfaz-mvp-vue`: pantallas y flujo del MVP de interfaz.

### Modified Capabilities

- `interfaz`: se concretan las pantallas del MVP y el flujo de partida real.
- `persistencia`: se integra el guardado automático durante la partida.

## Impact

- Nuevo código Vue en `src/views/`, `src/components/`, `src/router/`,
  `src/stores/` (no toca el motor `src/core/`).
- `App.vue`, `main.ts` y `style.css` se reorganizan para el router.
- Sin cambios en el motor, datos ni módulos de psicología.