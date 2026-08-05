# Spec: motor-simulacion-social

## MODIFIED Requirements

### Requirement: Selección de evento por día correcta

Al avanzar de día, el motor MUST seleccionar el evento del día nuevo (no del
día actual). El evento activo de un día D DEBE cumplir `event.day === D` en
toda la partida, y el evento del último día (`days`) DEBE poder dispararse
antes de resolver el final.

#### Scenario: Partida sin retraso de eventos

- **WHEN** se juega una partida completa eligiendo decisiones
- **THEN** cada evento activo corresponde al día en curso
- **AND** `reunion-final` (día `days`) se activa antes de terminar

#### Scenario: El evento del día 10 no se pierde

- **WHEN** la partida llega al último día con evento pendiente
- **THEN** ese evento se muestra y se puede decidir antes del final