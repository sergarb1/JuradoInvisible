# Casos de simulación

Cada caso vive en su propia carpeta `data/cases/<id>/` con **fragmentos JSON**
independientes. Un script los fusiona en el JSON único que consumen el juego y
los tests.

## Estructura de un caso

```
data/cases/<id>/
  meta.json        # id, título, descripción, intro, prólogo, días, jugador, víctima, variables iniciales
  characters.json  # array de personajes (roles, rasgos, creencias, relaciones)
  endings.json     # array de finales con sus condiciones
  events/
    01-<id>.json   # un evento por fichero (prefijo NN ordena por día, luego letra)
    02-<id>.json
    ...
```

## Flujo de trabajo (importante)

1. Se editan SOLO los fragmentos. Nunca edites a mano `data/cases/<id>.json`
   ni `public/data/cases/<id>.json`: son generados.
2. Tras editar, regenera: `npm run assemble-cases` (o `--watch` para que
   vigile cambios). Los hooks `predev`, `pretest`, `prebuild` y `predeploy` lo
   hacen automáticamente.
3. `npm test` valida cada caso ensamblado contra el esquema (`case.schema.json`)
   y comprueba integridad (referencias, días, consecuencias, prólogo).

## Reglas al editar (humanos e IA)

- **Datos ≠ código**: nombres, textos, condiciones y efectos van en JSON, nunca
  hardcodeados en TS.
- **JSON siempre válido**: cierra comas y llaves; al ensamblar un JSON roto
  romperá la build.
- **Cada opción** (`choice`) DEBE tener `consequence` (resultado narrado) no
  vacío. Las opciones sin consecuencias rompen el test de integridad.
- **`actor`** de un evento debe ser el `id` de un personaje existente.
- **`day`** de cada evento entre 1 y `days` (en `meta.json`).
- **3-4 opciones por evento** siempre que el contexto lo permita.
- **No moralizar**: las decisiones tienen efectos (suben/bajan variables), no
  etiquetas de «correcto/incorrecto». La `stance` (pro/anti/neutral) solo ayuda
  al motor a traducir influencia, no a juzgar.
- **Escenas y narración**: `scene` describe el lugar (narrador), `consequence`
  narra el resultado de cada opción. Úsalas para que la simulación se sienta
  viva, sin convertirla en examen.
- **Condiciones**: un evento con `condition` solo dispara si se cumple. No
  pongas un evento condicional con prioridad menor que el evento incondicional
  del mismo día: nunca llegaría a verse.

## Reutilizar fragmentos

Para crear un caso nuevo: copia una carpeta de caso y cambia los ids y textos.
Cada caso es independiente; el ensamblador procesa todas las carpetas de
`data/cases/*/` automáticamente.
