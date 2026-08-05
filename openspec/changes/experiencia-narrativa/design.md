# Design: Experiencia narrativa, guía y datos por fragmentos

## Context

El MVP jugaba en el navegador pero con tres carencias: (1) un bug del motor
hacía que cada día se seleccionara el evento con el estado del día anterior,
con lo que los eventos se veían con un día de retraso y el del día 10 nunca
aparecía; (2) la interfaz no explicaba qué significan las variables, los roles
ni el bucle del juego; (3) el caso era un único JSON de ~1.000 líneas difícil
de editar.

## Goals / Non-Goals

**Goals:**
- Corregir la selección de evento por día en el motor.
- Que el jugador entienda las mecánicas (guía + glosario con iconos) y sienta
  la narración (prólogo, escenas, consecuencias).
- Que los datos sean editables por humanos e IA en ficheros pequeños.
- Mantener el runtime (fetch de un JSON único) y los tests intactos.

**Non-Goals:**
- Gráficos/ilustraciones nuevas, sonido, animaciones complejas.
- Editor visual de casos.
- i18n.

## Decisions

### 1. Fix del motor: seleccionar el evento sobre el día nuevo
`advanceDay()` construía `{ day: day+1, pendingEventId: selectForDay() }`;
`selectForDay()` se evaluaba con el `state` anterior (día viejo). Se calcula
primero `next = { ...state, day: day+1 }` y se selecciona con `next`.
Se añade un test de regresión que exige `event.day === state.day` en toda la
partida y que `reunion-final` (día 10) se dispare antes de terminar.

### 2. Narración como datos
Se añaden campos opcionales al esquema (sin romper casos futuros):
`CaseData.prologue`, `EventData.scene`, `Choice.consequence`. El motor no
consume la narración: la lee el store/UI. «Datos ≠ código» se mantiene.

### 3. Interfaz narrativa sin moralizar
- `PrologueView` (/prologo): pantallas con progreso y «Comenzar partida» al
  final (llama a `store.newGame`).
- `ConsequenceView` (/consecuencia): muestra la opción elegida, su
  consecuencia narrada, la escena y las variables actualizadas.
- `EventView`: narrador de escena (cursiva) antes del texto del evento.
- `HowToPlayView` (/como-jugar): bucle de juego, glosario de las 5 variables y
  de los 5 roles con iconos (lucide-vue-next), nota «No es un examen».
- Leyenda de roles interactiva en el mapa; `title`/tooltips en variables.
- Las posturas pro/anti/neutra se muestran como etiqueta informativa (no como
  acierto o error).

### 4. Datos por fragmentos con ensamblador
- Fuente de verdad: `data/cases/<id>/{meta,characters,endings}.json` y
  `events/<NN>-<id>.json`.
- `scripts/assemble-cases.mjs` (Node puro): fusiona, valida estructura
  (actor→personaje, días 1..N, ids únicos) y escribe `data/cases/<id>.json`
  (tests) y `public/data/cases/<id>.json` (runtime).
- Hooks npm `predev`/`pretest`/`prebuild`/`predeploy` garantizan frescura.
- Fragment schemas (`meta/event/character/ending.schema.json`) que referencian
  `case.schema.json#/definitions/...` para edición asistida (editor/IA).
- El runtime sigue validando el JSON único contra `case.schema.json` (sin
  cambios en `CaseLoader`/`ValidateCase`).

### 5. Contenido del caso
Prólogo de 5 bloques; `scene` en los 20 eventos; `consequence` en todas las
opciones; eventos con 3-4 opciones; 4 eventos nuevos condicionados con
`priority` superior a los incondicionales de su día (si no, nunca se verían).

## Risks / Trade-offs

- [Fragmentos requieren ensamblar para reflejar cambios en runtime] →
  Mitigación: hooks automáticos + `--watch` para dev.
- [Condiciones emergentes difíciles de ver] → Mitigación: los nuevos eventos
  solo se ven si se cumplen sus condiciones; es una ventaja de rejugabilidad,
  y el test de integridad garantiza que cada día 1..N tenga evento posible.

## Migration Plan

El JSON único existente se sustituye por el generado por el ensamblador.
No hay despliegue previo que migrar.

## Open Questions

- ¿Mostrar al final un resumen de «mecanismos activados» (efecto espectador,
  difusión…)? Se deja para una iteración posterior; requiere etiquetar eventos
  en datos sin moralizar.