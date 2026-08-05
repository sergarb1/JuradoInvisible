# AGENTS.md — El Jurado Invisible

## Proyecto
Videojuego educativo de navegador sobre psicología social del acoso escolar
(ESO / Bachillerato / FP). Juego = experiencia interactiva de decisión sobre
un **motor de simulación social**, no una novela lineal.

## Reglas de diseño (nunca romper)
- **Simulación antes que narrativa.** El núcleo es un motor que evoluciona una
  clase según decisiones. La UI/Pantallas son una capa sobre el motor.
- **Datos ≠ código.** Personajes, casos, eventos, decisiones y finales son
  objetos JSON en `data/` o `public/data/`. Nunca hardcodear nombres ni casos
  en el código TS.
- **Reglas psicológicas como módulos puros.** Cada teoría (efecto espectador,
  difusión de responsabilidad, conformidad…) es una función pura
  entrada→salida en `src/psychology/`. No «bullying = malo»: simular mecanismos.
- **No moralizar.** No mostrar respuestas «correcta/incorrecta», no convertirlo
  en examen. El jugador descubre mecanismos; las decisiones tienen costes.
- **Personajes con motivaciones**, nunca buenos/malos monolíticos.

## Pila
Vue 3 + TypeScript + Vite + Tailwind 4 + Pinia + vue-router. Motor en TS puro
desacoplado del render (sin Phaser en el MVP). Datos JSON. Guardado IndexedDB
(fallback localStorage). Publicación GitHub Pages.

## Comandos
- `npm run dev` — servidor dev
- `npm run typecheck` — tsc sin emit
- `npm run build` — vue-tsc + vite build
- `npm run test` — vitest (tests del motor en `tests/`)
- `npm run test:watch` — vitest en modo watch
- `npm run deploy` — build + gh-pages a `dist`
- **GitHub Pages automático**: el workflow `.github/workflows/deploy.yml` publica en cada push a `main`. La `base` de Vite es fija: `/JuradoInvisible/`.

## Flujo OpenSpec
Los specs viven en `openspec/specs/` y los cambios en `openspec/changes/`.
Ejecutar un cambio: skill `openspec-apply-change`. Proponer: `opsx:propose`.
**Implementar únicamente la primera propuesta de cambio a la vez, sin añadir
funcionalidades no especificadas.**

## Estructura clave
```
src/core/        motores (simulación, personajes, eventos, influencia, decisión, finales)
src/psychology/  módulos psicológicos puros
src/models/      interfaces TS de datos (Character, Case, Event, Decision)
src/loader/      carga y validación JSON (JSON Schema)
src/systems/     SaveSystem (IndexedDB), resources
data/cases/      casos en JSON (alumno-invisible.json, futuro: ciberacoso, rumores…)
```