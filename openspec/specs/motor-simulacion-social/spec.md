# Spec: motor-simulacion-social

## Purpose
Motor TS puro que evoluciona el estado de una clase (relaciones, influencia,
normas, aislamiento) día a día según las decisiones del jugador. Desacoplado
de cualquier render.

## Requirements

### Requirement: Estado de la clase

El motor MUST mantener un estado social compuesto por variables de clase
(aislamiento de la víctima, apoyo percibido, presión grupal, norma social,
silencio colectivo) y atributos dinámicos por personaje (influencia, empatía,
popularidad, miedo al rechazo, relación con cada compañero).

#### Scenario: Estado inicial desde el caso

- **WHEN** se inicializa una simulación con un caso JSON
- **THEN** el estado refleja los personajes, rasgos, relaciones y variables iniciales del caso

#### Scenario: Variables acotadas

- **WHEN** el motor aplica cualquier efecto
- **THEN** todas las variables de clase y atributos quedan dentro de un rango configurable (por defecto 0–100)

### Requirement: Evolución por días

El motor MUST avanzar la simulación en turnos de día escolar. Cada día aplica
eventos cuya condición se cumple y las consecuencias de las decisiones previas.

#### Scenario: Avanzar un día con eventos condicionales

- **WHEN** el motor avanza a un día en el que se cumple la condición de un evento
- **THEN** el evento se activa y queda disponible para que el jugador decida

#### Scenario: Los eventos sin condición cumplida no se activan

- **WHEN** se avanza a un día cuya condición de evento no se cumple
- **THEN** ese evento no se dispara y no altera el estado

### Requirement: Relaciones e influencia entre personajes

El motor MUST calcular cómo influyen los personajes entre sí según su estatus,
red de relaciones y la decisión tomada, modificando las relaciones y las
variables de clase en consecuencia.

#### Scenario: Un personaje influyente apoya a la víctima

- **WHEN** un personaje con alta influencia toma una decisión de apoyo en un evento
- **THEN** las variables de apoyo/aislamiento cambian más que con un personaje de baja influencia

### Requirement: Determinismo con semilla

El motor MUST ser determinista dado el mismo caso y la misma secuencia de
decisiones: la misma entrada produce exactamente la misma evolución.

#### Scenario: Misma entrada, misma salida

- **WHEN** se ejecuta dos veces la misma partida (mismo caso, mismas decisiones)
- **THEN** el estado final es idéntico

### Requirement: Resolución de finales

El motor MUST evaluar al final de la partida un final según las variables de
clase, permitiendo que decisiones distintas produzcan finales distintos.

#### Scenario: Decisiones distintas, finales distintos

- **WHEN** dos partidas con el mismo caso toman decisiones opuestas
- **THEN** pueden resolverse en finales diferentes definidos en el caso
