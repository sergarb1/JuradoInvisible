# Spec: motor-minimo-simulacion

## ADDED Requirements

### Requirement: API mínima del motor

El sistema MUST exponer una API de dominio en `src/core/` con: crear una
simulación desde un caso, avanzar un día, consultar el evento activo, aplicar
una decisión y resolver el final al agotar los días.

#### Scenario: Iniciar y avanzar

- **WHEN** se crea una simulación con un caso válido y se avanza un día
- **THEN** el estado refleja los eventos del día y las decisiones tomadas

#### Scenario: No hay evento sin condición

- **WHEN** se avanza un día y ningún evento tiene condición cumplida
- **THEN** el estado avanza sin presentar ninguna decisión

### Requirement: Estado serializable

El estado de la simulación MUST ser serializable a JSON para guardado y
restauración sin pérdida de información.

#### Scenario: Serializar y restaurar

- **WHEN** se serializa el estado y se restaura desde ese JSON
- **THEN** la simulación continúa desde el mismo punto
