# Spec: datos-casos

## Purpose
Contrato JSON de los casos del juego y su validación. Los casos son datos
externos cargados por el loader; nunca código.

## Requirements

### Requirement: Modelo de datos Case

Un caso JSON MUST definir: id, título, descripción, contexto narrativo inicial,
personajes, variables iniciales de clase, lista de eventos y lista de finales.

#### Scenario: Caso mínimo cargable

- **WHEN** se carga un fichero JSON con todos los campos obligatorios de un caso
- **THEN** el validador lo acepta y el motor puede iniciar una partida

### Requirement: Modelo de datos Character

Un personaje JSON MUST incluir: id, nombre, rol (víctima/agresor/espectador/
defensor/neutro), rasgos (empatía, popularidad, influencia, conformidad, miedo
al rechazo) y relaciones con otros personajes.

#### Scenario: Personaje con rasgos acotados

- **WHEN** un personaje tiene rasgos numéricos fuera del rango 0–100
- **THEN** el validador lo rechaza con un mensaje claro

### Requirement: Modelo de datos Event

Un evento JSON MUST incluir: id, día, condición de activación (expresión sobre
variables de clase), texto, personaje que lo protagoniza y lista de decisiones
con sus efectos sobre variables y relaciones.

#### Scenario: Evento con condición

- **WHEN** la condición del evento referencia una variable inexistente
- **THEN** el validador lo rechaza

### Requirement: Modelo de datos Decision

Una decisión MUST definir: id, texto, y efectos (deltas positivos o negativos
sobre variables de clase, atributos y relaciones).

#### Scenario: Efecto referenciado se aplica

- **WHEN** el motor aplica una decisión cuyos efectos referencian variables válidas
- **THEN** las variables cambian exactamente en los deltas declarados

### Requirement: Validación con JSON Schema

El sistema MUST validar los casos contra un JSON Schema y devolver errores
claros (camino del fallo y mensaje) sin lanzar excepciones genéricas.

#### Scenario: Fichero roto detectado

- **WHEN** un caso JSON es inválido
- **THEN** la carga falla con un mensaje que identifica el campo y el problema

### Requirement: Carga múltiple y rejugabilidad

El loader MUST permitir cargar cualquier caso del directorio de datos en
tiempo de ejecución, de modo que añadir un caso no requiera compilar.

#### Scenario: Nuevo caso sin recompilar

- **WHEN** se coloca un caso JSON válido nuevo en el directorio de datos
- **THEN** está disponible para jugar sin recompilar la aplicación
