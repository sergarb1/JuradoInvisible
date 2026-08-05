# Spec: narrativa-y-guia

## ADDED Requirements

### Requirement: Prólogo narrado por pantallas

El caso DEBE poder incluir un prólogo (`prologue`) mostrado como pantallas
sucesivas antes de empezar, con botón «Continuar» y un botón final «Comenzar
partida» que inicia la simulación.

#### Scenario: Prólogo antes de jugar

- **WHEN** el jugador pulsa «Comenzar» en la presentación del caso
- **THEN** se muestran los bloques del prólogo uno a uno
- **AND** al llegar al último bloque, «Comenzar partida» inicia la partida y
  lleva al mapa

### Requirement: Guía «¿Cómo se juega?»

La interfaz MUST ofrecer una pantalla de ayuda accesible desde el menú y desde
dentro de la partida que explique el bucle de juego, el significado de las
variables de clase y los papeles, sin emitir juicios morales.

#### Scenario: Acceso a la guía

- **WHEN** el jugador abre la ayuda desde el menú o el mapa
- **THEN** ve el bucle del día (acontecimiento → decisión → reacción) y
  glosarios de variables y roles con iconos

### Requirement: Consecuencia narrada tras decidir

Tras elegir una opción, la interfaz MUST mostrar una pantalla de consecuencia
con el texto narrado de `consequence`, la opción elegida y las variables
actualizadas, antes de volver al mapa.

#### Scenario: Resultado visible

- **WHEN** el jugador elige una decisión
- **THEN** se muestra la escena, la opción, su consecuencia narrada y el panel
  de variables con los nuevos valores
- **AND** un botón «Continuar» lleva de vuelta al mapa

### Requirement: Narración de escena en los eventos

Cuando un evento tenga `scene`, la interfaz MUST mostrarla como narración del
escenario (estilo narrador) junto al texto del evento.

#### Scenario: Escena narrada

- **WHEN** se muestra un evento con `scene`
- **THEN** la escena aparece como cita/narrador antes del diálogo del personaje

### Requirement: Iconografía y leyenda de roles

Las variables de clase y los roles MUST mostrarse con iconos y descripciones
(tooltips) para que el jugador identifique qué es cada cosa sin calificarla.

#### Scenario: Leyenda de la clase

- **WHEN** el jugador abre el mapa
- **THEN** cada personaje muestra su papel con icono y tooltip
- **AND** existe una leyenda de roles y ayuda en las variables

## MODIFIED Requirements

### Requirement: Decisiones con efectos visibles

Cada decisión MOSTRADA MUST indicar además su postura (a favor / en contra /
neutra) como etiqueta informativa, manteniendo los chips de variables.

#### Scenario: Postura visible sin veredicto

- **WHEN** se muestra un evento con decisiones
- **THEN** cada decisión muestra su postura como etiqueta neutra (no
  «correcta/incorrecta») y sus chips de efectos