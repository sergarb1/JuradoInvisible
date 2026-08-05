# Spec: interfaz-mvp-vue

## ADDED Requirements

### Requirement: Guardado automático durante la partida

La interfaz MUST guardar la partida en curso mediante `SaveSystem` tras cada
decisión y avance de día, y ofrecer continuar una partida a medias al volver.

#### Scenario: Continuar al volver

- **WHEN** el jugador recarga la página con una partida a medias
- **THEN** se ofrece continuar desde el punto guardado o empezar una nueva