# Spec: interfaz-mvp-vue

## ADDED Requirements

### Requirement: Flujo de partida en el navegador

La interfaz MUST permitir completar una partida en el navegador con las
pantallas: menú principal, presentación del caso, mapa de clase, evento con
decisión e informe final.

#### Scenario: Partida completa

- **WHEN** el jugador inicia el caso, avanza por sus eventos eligiendo
  decisiones y termina los días
- **THEN** llega al informe final con las variables de clase resultantes

### Requirement: Decisiones con efectos visibles

Cada decisión MOSTRADA MUST indicar qué variables de clase modifica y en qué
sentido antes de elegir, sin etiquetarla como correcta o incorrecta.

#### Scenario: Efectos previos visibles

- **WHEN** se muestra un evento con decisiones
- **THEN** cada decisión muestra chips con las variables afectadas y su delta

### Requirement: Mapa de clase

La interfaz MUST representar a cada personaje como un círculo o avatar con sus
rasgos visibles y su relación con el resto de la clase.

#### Scenario: Personajes en el mapa

- **WHEN** el jugador abre el mapa de clase
- **THEN** ve a cada personaje con nombre, rol y rasgos principales

### Requirement: Panel de variables persistente

La interfaz MUST mostrar las variables de clase en la partida y actualizarlas
tras cada decisión.

#### Scenario: Actualización tras decidir

- **WHEN** el jugador elige una decisión
- **THEN** el panel de variables refleja los nuevos valores del motor

### Requirement: Informe final cuantitativo

Al terminar, la interfaz MUST mostrar la evolución de las variables (iniciales
vs finales) sin emitir veredictos morales.

#### Scenario: Informe sin calificación

- **WHEN** termina la partida
- **THEN** se muestran valores iniciales y finales y el final declarado, sin
  mensajes de correcto/incorrecto
