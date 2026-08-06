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
- **Sin llegar a ser un drama continuo.** La temática es seria, pero el caso
  debe ofrecer arcos positivos alcanzables (apoyo, alianza, protocolo) y gestos
  pequeños con peso. Los finales matizan: ni todo es catástrofe ni todo es milagro.
- **Paleta: oscura pero cálida.** Fondo `slate-950` + veladura ámbar, CTAs en
  `amber-500`, info en `sky`. Respetar contraste AA: nada de `slate-500` en
  texto pequeño. No devolver la app a un azul frío y plano.

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

## Estado del contenido
- «El alumno invisible»: 10 días, **25 eventos**, **6 finales**, 8 personajes.
- 5 variables de clase: aislamiento, apoyo, presión, norma, silencio.
- Avatares por género en `public/assets/avatars/` (`rol-<rol>.webp` y `rol-<rol>-f.webp`).
- Convenciones de eventos: un evento por día se elige por `priority` (más alta).
  Los condicionales necesitan `priority` mayor que sus hermanos sin condición, o
  nunca aparecen. El **día 7 ya tiene evento por defecto** (`07c-recreo-lluvia`,
  priority 3) para no dejar días muertos.
- Los `endings.json` se resuelven **en orden de aparición** (primer match gana):
  dejar un matches-all (`support >= 0`) al final como final por defecto.