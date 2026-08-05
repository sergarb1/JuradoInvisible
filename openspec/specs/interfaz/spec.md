# Spec: interfaz

## Purpose
Capa Vue sobre el motor de simulación. Presenta estado, eventos y decisiones;
nunca contiene lógica de simulación ni moraliza.

## Requirements

### Requirement: Pantalla de presentación del caso

La interfaz MUST mostrar el contexto narrativo del caso (quién es la víctima,
la dinámica en curso) antes de comenzar la simulación.

#### Scenario: Iniciar partida

- **WHEN** el jugador selecciona un caso disponible
- **THEN** se muestra su presentación y puede iniciar la partida

### Requirement: Visualización del mapa de clase

La interfaz MUST representar a los personajes (círculos o avatares) con sus
atributos visibles (influencia, popularidad, empatía) y las relaciones entre
ellos.

#### Scenario: Atributos visibles

- **WHEN** el jugador abre el mapa de clase
- **THEN** ve a cada personaje con sus atributos principales y las conexiones con el resto

### Requirement: Presentación de eventos y decisiones

Cuando hay un evento activo, la interfaz MUST mostrar el texto del evento, el
personaje que lo protagoniza y las decisiones disponibles con indicación de
sus efectos sobre las variables.

#### Scenario: Efectos visibles antes de decidir

- **WHEN** se muestra un evento con decisiones
- **THEN** cada decisión indica qué variables de clase modifica (y en qué sentido) antes de elegir

### Requirement: Panel de variables de clase

La interfaz MUST mostrar en todo momento las variables de clase (aislamiento,
apoyo, presión grupal, norma social, silencio colectivo) como indicadores
numéricos o barras.

#### Scenario: Las variables se actualizan tras decidir

- **WHEN** el jugador elige una decisión
- **THEN** el panel refleja los nuevos valores calculados por el motor

### Requirement: Informe final sin veredicto moral

Al terminar la partida, la interfaz MUST mostrar un resumen cuantitativo de la
evolución (valores iniciales vs finales, mecanismos activados) sin calificar
moralmente las decisiones.

#### Scenario: Resumen cuantitativo

- **WHEN** termina la partida
- **THEN** se muestran las variables finales y cómo cambiaron, sin mensajes de correcto/incorrecto
