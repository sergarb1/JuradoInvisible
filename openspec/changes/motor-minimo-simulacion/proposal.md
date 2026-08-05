# Proposal: Motor mínimo de simulación

## Why

El producto «El Jurado Invisible» solo aporta valor si su núcleo es un motor de
simulación social que evoluciona una clase según decisiones, no una novela
lineal. Hoy no existe código: hay que crear el motor mínimo, desacoplado del
render, para poder probar que una clase virtual cambia de comportamiento según
las decisiones del jugador y según los datos del caso.

## What Changes

- Crear el modelo de tipos (`Character`, `Event`, `Decision`, `Ending`, `Case`)
  en TypeScript, alineado con el contrato JSON.
- Implementar el motor de simulación (estado de clase, evolución por días,
  eventos condicionales, relaciones/influencia, resolución de finales).
- Implementar los módulos de psicología social como funciones puras
  (espectador, difusión de responsabilidad, conformidad, ignorancia pluralista,
  identidad social, desenganche moral, influencia por estatus).
- Implementar el cargador y validador de casos JSON (JSON Schema).
- Implementar el sistema de guardado (IndexedDB con respaldo localStorage) y
  exportación/importación.
- Crear el caso de ejemplo **«El alumno invisible»** (8 personajes, 10 días,
  ~20 eventos, 3 finales).
- Tests de motor (vitest): módulos psicológicos, avance por días, condiciones,
  determinismo y finales distintos ante decisiones distintas.
- **Sin interfaz** en esta iteración: el motor se valida por tests y una demo CLI.

## Capabilities

### New Capabilities

- `motor-minimo-simulacion`: capacidades de esta iteración que se añaden a las
  capacidades base existentes (motor-simulacion-social, datos-casos, reglas-
  psicología, persistencia).

### Modified Capabilities

- `motor-simulacion-social`: se añade el contrato mínimo ejecutable del motor
  (interfaz de la API `SimulationEngine y estado ejecutable por días para el MVP).
- `datos-casos`: se añade el esquema JSON exacto del MVP y el requisito de
  validación en carga para el caso `alumno-invisible`.
- `reglas-psicologia`: se añaden las firmas de exportación concretas de los
  siete módulos puros del MVP.
- `persistencia`: se añade el contrato de exportación/importación de la partida.

## Impact

- Nuevo código TS en `src/core/`, `src/psychology/`, `src/models/`, `src/loader/`,
  `src/systems/`.
- Nuevos datos en `data/cases/alumno-invisible.json` y schema en
  `data/schema/case.schema.json`.
- Dependencia nueva: `ajv` (validación JSON Schema) en runtime del loader.
- Tests nuevos bajo `tests/`.
- Sin backend, sin nuevo UI, sin assets.