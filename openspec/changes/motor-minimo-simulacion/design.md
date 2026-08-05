# Design: Motor mínimo de simulación

## Context

Proyecto recién iniciado (sin código todavía). La visión es un simulador social
educativo sobre dinámicas de acoso escolar, con los casos como datos JSON
externos. Esta iteración construye y valida el corazón: un motor de simulación
TS puro, determinista y desacoplado del render, que evoluciona una clase según
las decisiones. Pila: TypeScript + Vite + Vitest.

## Goals / Non-Goals

**Goals:**
- Motor determinista: mismo caso + mismas decisiones → exactamente la misma
  evolución. Esto hace los tests fiables.
- Datos 100 % externos (JSON): el motor no conoce personajes ni casos concretos.
- Reglas psicológicas como funciones puras e independientes.
- Un caso de ejemplo completo («El alumno invisible») ejecutado por tests.
- Guardado IndexedDB con respaldo localStorage y exportación/importación.

**Non-Goals:**
- Ninguna interfaz en esta iteración (sin Vue, sin Phaser, sin assets).
- Sin moralización ni veredicto: el motor solo propaga consecuencias.
- Sin editor de casos.

## Decisions

### 1. Motor desacoplado y determinista
El `SimulationEngine` gestiona un `SimulationState` que se recrea (patrón
inmutable) en cada paso, en lugar de mutarse. Cada función de `core/` recibe un
estado y devuelve un nuevo estado o un resultado. Esto permite serializar para
guardado, replicar cálculos y testear de forma aislada.
Alternativa descartada: estado mutable compartido en un store global, que
dificulta el testeo y el historial.

### 2. Psicología como funciones puras con magnitudes
Los siete módulos (`bystanderEffect`, `diffusionResponsibility`, `conformity`,
`pluralisticIgnorance`, `socialIdentity`, `moralDisengagement`,
`statusInfluence`) exponen funciones puras que reciben valores normalizados y
devuelven un número o un efecto. El `InfluenceEngine` y `DecisionEngine` los
componen para aplicar consecuencias al estado.
Alternativa descartada: reglas declarativas en JSON. Se mantienen como código TS
porque dan seguridad de tipos; el JSON solo cubre datos y constantes,
preservando la promesa «datos ≠ código».

### 3. Variables de clase acotadas
Todas las variables (aislamiento, apoyo, presión grupal, norma social, silencio
colectivo) y atributos de personaje viven en `[0, 100]`; los efectos se saturan
en los límites. Esto simplifica la UI futura y evita estados imposibles.

### 4. Evolución por días con eventos condicionales
Cada día el motor evalúa los eventos cuya condición (expresión sobre variables,
p. ej. `isolation > 50`) se cumple. Entre los elegibles se elige el de mayor
prioridad (desempate por semilla determinista). Los eventos sin condición
cumplida no se disparan.
Alternativa descartada: narrativa lineal guionizada, que rompería la mecánica
de simulación.

### 5. Decisiones con efectos y costes
Cada decisión declara deltas sobre variables, atributos y relaciones. Aplicarla
puede desbloquear o suprimir eventos posteriores mediante banderas. El jugador
nunca recibe etiqueta moral; solo observa cómo cambia el entramado social.

### 6. Persistencia por serialización del estado
`SaveSystem` serializa el `SimulationState` a JSON. IndexedDB es el almacén
principal; si no está disponible se usa `localStorage`. Exportar/importar
reutiliza la misma serialización.

### 7. Validación con AJV + JSON Schema
`CaseLoader` valida cada caso contra `case.schema.json`; un caso inválido falla
con un mensaje que señala el campo y el problema. Se elige `ajv` por ser el
validador JSON Schema estándar en TS.

## Risks / Trade-offs

- [El modelo psicológico es una simplificación] → Mitigación: hipótesis
  documentadas por módulo y constantes/ajustes configurables en el caso.
- [Modelo inmutable puede sentirse más técnico] → Mitigación: API de dominio
  pequeña y tests que describen el comportamiento educativo.
- [Dependencia `ajv`] → Solo la importa el loader, no el núcleo.

## Migration Plan

N/A (proyecto inicial, sin estado previo que migrar).

## Open Questions

- Umbrales de disparo de condiciones (p. ej. `> 50`): se dejan en 50 en el caso
  de ejemplo y se revisarán al jugar.
- Si en el futuro queremos condiciones sobre *relaciones* (no solo variables de
  clase), el modelo de condición se ampliará en otra iteración.