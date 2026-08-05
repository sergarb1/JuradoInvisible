# Spec: persistencia

## Purpose
Guardado de la partida en el navegador y exportación/importación.

## Requirements

### Requirement: Guardar partida local

El sistema MUST guardar el estado de la partida (día actual, estado de clase,
atributos y relaciones, decisiones tomadas) de forma persistente en el
navegador.

#### Scenario: Guardar y reanudar

- **WHEN** el jugador guarda en mitad de una partida y recarga la página
- **THEN** la partida se restaura en el mismo punto

### Requirement: IndexedDB con respaldo localStorage

El sistema MUST usar IndexedDB como almacenamiento principal y caer a
localStorage si IndexedDB no está disponible.

#### Scenario: IndexedDB indisponible

- **WHEN** IndexedDB no está disponible en el navegador
- **THEN** el juego usa localStorage y mantiene el guardado funcional

### Requirement: Exportar e importar partida

El sistema MUST permitir exportar la partida a un fichero JSON e importarla de
vuelta.

#### Scenario: Exportar y reimportar

- **WHEN** el jugador exporta una partida y posteriormente la importa
- **THEN** el estado restaurado es idéntico al exportado