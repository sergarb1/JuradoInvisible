<div align="center">
  <img src="public/favicon.svg" alt="El Jurado Invisible" width="220"/>
  <h1>El Jurado Invisible</h1>
  <p><strong>Simulador social educativo: dinámicas grupales y acoso escolar</strong></p>
  <p>
    <a href="https://sergarb1.github.io/JuradoInvisible/">
      <img src="https://img.shields.io/badge/demo-%236366f1?style=for-the-badge&logo=githubpages&logoColor=white" alt="Demo"/>
    </a>
    <img src="https://img.shields.io/badge/PWA-ready-%235a0fc8?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA"/>
    <img src="https://img.shields.io/badge/simulaci%C3%B3n-social-%230ea5e9?style=for-the-badge" alt="Simulación social"/>
    <img src="https://img.shields.io/badge/license-AGPLv3-%23e11d48?style=for-the-badge" alt="License"/>
  </p>
  <p>
    <strong>Motor de simulación &middot; Datos editables &middot; Sin juicios &middot; 100% en el navegador</strong>
  </p>
  <p><em>Tú eres el juicio que nadie ve. Tus decisiones diarias moldean la clase: aislamiento, apoyo, presión, norma y silencio.</em></p>
  <p style="font-size: 1.15rem; word-break: break-all;">
    <a href="https://sergarb1.github.io/JuradoInvisible/" style="color:#f59e0b; font-weight:700; text-decoration:none;">
      https://sergarb1.github.io/JuradoInvisible/
    </a>
  </p>
</div>

---

## 🚀 En un clic

Sin registro, sin instalación, sin servidor. Pensado para ESO, Bachillerato y FP.

| | |
|---|---|
| **🌐 Web** | [sergarb1.github.io/JuradoInvisible](https://sergarb1.github.io/JuradoInvisible/) |
| **📱 PWA** | Abre la web → "Instalar" en el menú del navegador |
| **💻 Local** | `git clone` + `npm install && npm run dev` |

---

## 🎮 Qué es

**El Jurado Invisible** no es una novela lineal ni un examen: es un **motor de
simulación social**. El jugador toma decisiones diarias dentro de un aula y
observa cómo la clase reacciona según mecanismos psicológicos reales (efecto
espectador, difusión de responsabilidad, conformidad, presión del grupo, norma
social). No se te dice si algo está "bien o mal": los criterios se ven, las
consecuencias se sienten y los mecanismos se descubren.

### Bucle de juego

```
Acontecimiento del día → eliges una decisión → la clase reacciona
        ↑                                            │
        └──────────── siguiente día ◄─────────────────┘
```

---

## ✨ Funcionalidades

| | |
|---|---|
| 🎭 | **Casos en JSON** — «El alumno invisible»: 10 días, 25 eventos y 6 finales |
| 🧠 | **Motor de simulación determinista** desacoplado del render (`src/core/`) |
| 🧩 | **Teorías psicológicas como módulos puros** (`src/psychology/`) |
| 🗣️ | **Prólogo, escenas y consecuencias narradas** para cada evento y decisión |
| 🧭 | **Guía «¿Cómo se juega?»** con glosario de variables y roles e iconografía |
| 📊 | **Barra de variables**: aislamiento, apoyo, presión, norma, silencio |
| 🚻 | **Personajes con motivaciones**, nunca héroes ni villanos monolíticos |
| 🏳️ | **Avatares por género** — retrato masculino y femenino por rol (`-f.webp`) |
| 🧵 | **6 finales matizados** según apoyo, aislamiento y silencio (incluye finales intermedios) |
| 🔄 | **Guardado automático** en IndexedDB (fallback localStorage) |
| ✏️ | **Casos editables por fragmentos** (`data/cases/<id>/events/*.json`) |

### Variables de clase

| Variable | Qué mide |
|---|---|
| **Aislamiento** | ¿Qué tan solo queda la víctima? |
| **Apoyo** | ¿Cuánto se la sostiene? |
| **Presión** | ¿Cuánto se fuerza el criterio dominante? |
| **Norma** | ¿Existe una pauta implícita de silencio o de rechazo? |
| **Silencio** | ¿Cuánto se calla ante el malestar? |

---

## 🛠️ Stack técnico

| Frontend | Motor | Datos | Despliegue |
|---|---|---|---|
| **Vue 3** + TypeScript SFCs | **TS puro** (`src/core`, `src/psychology`) | **JSON** (+ JSON Schema) | **GitHub Pages** |
| **Vite** | Desacoplado de la UI | Fragmentos por caso | GitHub Actions |
| **Tailwind CSS v4** | Determinista (sin Phaser) | Loader con validación | PWA offline |
| **Pinia** + **vue-router** | | Ensamblador `scripts/assemble-cases.mjs` | |

---

## 📁 Estructura

```
JuradoInvisible/
├── index.html                 ← Entry point Vite
├── AGENTS.md                  ← Guía para asistentes IA
├── README.md
├── package.json               ← scripts (assemble-cases, test, build, deploy)
├── src/
│   ├── core/                  ← Motores (simulación, personajes, eventos, influencia, decisión, finales)
│   ├── psychology/            ← Módulos psicológicos puros (efecto espectador, conformidad…)
│   ├── models/                ← Interfaces TS (Character, Case, Event, Decision)
│   ├── loader/                ← Carga y validación JSON (JSON Schema con Ajv)
│   ├── systems/               ← SaveSystem (IndexedDB), resources
│   ├── stores/                ← Pinia: simulation (orquesta el motor)
│   ├── views/                 ← Home, Prólogo, Cómo se juega, Mapa, Evento, Consecuencia, Final
│   ├── components/            ← ClassVariablePanel, CharacterCircle, ChoiceCard…
│   ├── router/                ← vue-router
│   ├── lib/                   ← caseMeta (iconos/variables/roles)
│   └── main.ts / App.vue / style.css
├── data/
│   ├── cases/<case-id>/      ← Casos por fragmentos (fuente de verdad)
│   └── schema/               ← JSON Schemas (case, meta, event, character, ending)
├── public/
│   ├── data/cases/            ← JSON único por caso (runtime+tests)
│   └── data/schema/           ← Schemas para el navegador/editor
├── scripts/assemble-cases.mjs ← Fusiona fragmentos → JSON único (--watch)
├── tests/                     ← Vitest (motor + integridad de datos)
└── .github/workflows/deploy.yml
```

---

## 🧑‍💻 Desarrollo

```bash
npm install
npm run dev          # Dev server con HMR en http://localhost:5173
npm run assemble-cases   # ensambla los fragmentos (se hace solo en predev/pretest/prebuild)
npm run assemble-cases:watch  # re-ensambla al guardar
npm run typecheck    # vue-tsc sin emitir
npm run test         # vitest (motor + datos)
npm run build        # vue-tsc + vite build → dist/
```

> Los casos **se editan por fragmentos** en `data/cases/`. Los `hooks`
> npm (`predev`, `pretest`, `prebuild`, `predeploy`). Consulta
> `data/cases/README.md`.

---

## ✏️ Añadir un caso

Cada caso vive en `data/cases/<case-id>/`:

```
data/cases/el-alumno-invisible/
├── meta.json         # Título, días, variables iniciales, prólogo
├── characters.json   # Personajes con rol, rasgos y motivaciones
├── endings.json      # Finales posibles
└── events/
    ├── 01-arranque.json
    └── ...            # Un fichero por evento
```

Valida en cada fragmento con los JSON Schemas de `data/schema/` y ejecuta
`npm run test` (incluye `tests/cases.test.ts`).

---

## 🤖 Uso con IA

Los casos son JSON editables por humano o IA. Para proponer un nuevo caso o
revisar la coherencia de la psicología:

```text
Propón un nuevo caso sobre <fenómeno> siguiendo el esquema de
data/schema/case.schema.json y la estructura de data/cases/el-alumno-invisible/.
```

---

## 📄 Licencia

**GNU AGPL v3** — Usa, modifica y comparte, pero cualquier mejora o derivado debe mantenerse libre.

<div align="center">
  <sub>Hecho con ❤️ para docentes que quieren entender, desde las reglas del propio grupo, el acoso escolar.</sub>
  <br>
  <sub>100% gratuito &middot; online &middot; sin juicios morales</sub>
</div>