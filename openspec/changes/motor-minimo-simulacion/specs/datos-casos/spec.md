# Spec: motor-minimo-simulacion

## ADDED Requirements

### Requirement: Esquema JSON del caso MVP

El sistema MUST incluir `data/schema/case.schema.json` que defina la estructura
de `Case`, `Character`, `Event`, `Decision` y `Ending`, y validar cada caso
contra él en carga.

#### Scenario: Esquema presente y válido

- **WHEN** se valida el esquema con un documento de ejemplo
- **THEN** el documento válido pasa y uno inválido falla con el campo señalado

### Requirement: Caso de ejemplo «El alumno invisible»

El sistema MUST incluir `data/cases/alumno-invisible.json` válido según el
esquema, con 8 personajes, 10 días, al menos 15 eventos y 3 finales.

#### Scenario: El caso se carga y se juega

- **WHEN** se carga `alumno-invisible.json` y se ejecuta una partida completa de
  10 días con decisiones válidas
- **THEN** la simulación termina resolviendo uno de los finales declarados
