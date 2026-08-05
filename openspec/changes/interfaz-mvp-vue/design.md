# Design: Interfaz MVP en Vue

## Context

El motor (`SocialSimulationEngine`) es una clase determinista que evoluciona el
estado día a día. Hay un caso válido («El alumno invisible») y un
`SaveSystem`. Falta la capa Vue que presenta el estado, pide decisiones y
guarda/restaura. La interfaz es presentacional: nunca contiene reglas.

## Goals / Non-Goals

**Goals:**
- Partida completa jugable en navegador (menú → mapa → eventos → informe).
- El store orquesta el motor; la UI solo lee estado y envía decisiones.
- Guardado automático con `SaveSystem` y restauración al volver.
- Cargar el caso desde `public/data/cases/`.
- Sin juicios morales en ninguna pantalla.

**Non-Goals:**
- Assets gráficos (avatares) en esta iteración: círculos con iniciales y color
  por rol.
- Editor de casos, i18n multi-idioma y PWA offline avanzado (ya hay base PWA).

## Decisions

### 1. Store único `useSimulation`
`src/stores/simulation.ts` envuelve el `SocialSimulationEngine` con estado
reactivo (`shallowRef` del estado, variables de clase, evento activo, final).
Las vistas llaman a `store.choose(choiceId)` y `store.advanceDay()`, que a su
vez delegan en el motor. El motor queda intacto.
Alternativa descartada: reimplementar lógica en el store (rompe «simulación
antes que narrativa»).

### 2. Persistencia al cambiar de estado
`store.choose` y `store.advanceDay` persisten (`SaveSystem.save(case, state)`)
tras cada mutación. `store.bootstrap()` intenta cargar partida guardada; si
existe un estado a medio jugar, ofrece «continuar» o «nueva partida».

### 3. Vistas minimalistas con Tailwind
- `HomeView`: menú principal.
- `CaseSetupView`: presentación del caso + «comenzar».
- `ClassView`: mapa de clase + panel de variables.
- `EventView`: texto del evento, autor y decisiones (con efectos visibles).
- `EndingView`: informe cuantitativo final (sin veredicto).
Router con rutas parametrizadas por caso (`/case/:caseId/map`, etc.).

### 4. Mapa de clase sin librería de grafo
Los personajes se dibujan como círculos en una cuadrícula, con tamaño/color
según influencia y rol, y la relación hacia la víctima se muestra con un signo
o intensidad del anillo. Se evita una dependencia de grafo para el MVP.

### 5. Efectos visibles antes de decidir
Cada decisión muestra un chip por variable afectada (`apoyo +7`, `silencio -4`)
para que el jugador vea la consecuencia previa, sin etiquetarla como buena o
mala.

## Risks / Trade-offs

- [El mapa sin grafo es menos expresivo] → Mitigación: suficiente para el MVP;
  el grafo se puede añadir después sin tocar el motor.
- [Guardado en cada mutación puede ser costoso en IndexedDB] → Mitigación: se
  guarda de forma asíncrona y sin bloquear la UI; el estado en memoria es la
  fuente de verdad durante la sesión.

## Migration Plan

N/A (proyecto sin despliegue previo). Se sustituye el `App.vue` placeholder.

## Open Questions

- Estilo visual definitivo (paleta/tema): se usa un tema sobrio (slate) que no
  moralice, revisable en una iteración de diseño.