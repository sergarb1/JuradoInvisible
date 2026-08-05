# Spec: proyecto

## Purpose
Fijar la misión y los principios no negociables del sistema «El Jurado
Invisible»: un simulador social educativo, no una novela moralizante.

## Requirements

### Requirement: Simulación antes que narrativa

El sistema MUST estar construido como un motor de simulación social que
evoluciona una clase según decisiones, con la interfaz como una capa
presentacional sobre ese motor.

#### Scenario: El juego funciona sin interfaz

- **WHEN** se ejecuta una partida completa del motor sin renderizar ninguna pantalla
- **THEN** el estado de la clase cambia de forma válida según las decisiones tomadas

#### Scenario: La interfaz no contiene reglas

- **WHEN** se inspecciona el código de presentación
- **THEN** no contiene lógica de simulación, solo lectura/escritura del estado del motor

### Requirement: Datos separados del código

El sistema MUST mantener todos los personajes, casos, eventos, decisiones y
finales como objetos JSON externos. El código fuente MUST NOT hardcodear nombres,
casos ni situaciones concretas.

#### Scenario: Cargar un caso nuevo sin tocar código

- **WHEN** se añade un fichero JSON válido nuevo en el directorio de casos
- **THEN** el motor lo carga y ejecuta sin modificación de código fuente

### Requirement: Reglas psicológicas como módulos puros

Cada teoría psicológica MUST implementarse como una función pura
entrada→salida, desacoplada del estado del juego.

#### Scenario: El módulo no muta estado externo

- **WHEN** se invoca un módulo psicológico con los mismos argumentos
- **THEN** devuelve el mismo resultado y no modifica ningún estado global

### Requirement: Sin moralizar

El sistema MUST NOT mostrar respuestas correctas/incorrectas ni emitir
veredictos morales. Las decisiones MUST tener costes y consecuencias
observables, y el aprendizaje MUST producirse por descubrimiento de mecanismos.

#### Scenario: Una decisión nunca se etiqueta

- **WHEN** el jugador elige una opción cualquiera en un evento
- **THEN** el sistema no presenta la elección como acierto o error

### Requirement: Personajes con motivaciones

Los personajes MUST definirse con rasgos y motivaciones (empatía, popularidad,
miedo al rechazo, relaciones) y NO como buenos o malos monolíticos.

#### Scenario: Un personaje reacciona según sus rasgos

- **WHEN** ocurre un evento y dos personajes tienen rasgos distintos
- **THEN** sus reacciones calculadas por el motor difieren de forma coherente con sus rasgos

### Requirement: Alcance educativo

El producto MUST estar orientado a alumnado de ESO, Bachillerato y FP y ser
distribuible gratis en navegador sin backend.

#### Scenario: Jugable sin servidor

- **WHEN** se abre la aplicación compilada desde un servidor estático (GitHub Pages)
- **THEN** todo el juego funciona sin peticiones a un backend
