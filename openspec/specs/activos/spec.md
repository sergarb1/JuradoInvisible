# Spec: activos

## Purpose
Recursos visuales y de audio desacoplados del código, sustituibles sin
recompilar.

## Requirements

### Requirement: Manifiesto de activos

El sistema MUST describir sus activos mediante un manifiesto JSON que asocie
identificadores de personaje/contexto con rutas de fichero (por ejemplo
posturas de un personaje).

#### Scenario: Resolver activo por id

- **WHEN** la interfaz necesita el avatar de un personaje
- **THEN** consulta el manifiesto por id y recibe la ruta correspondiente

### Requirement: Sustitución sin tocar código

El sistema MUST permitir sustituir o añadir activos (imágenes, fondos, iconos)
modificando únicamente el manifiesto y añadiendo los ficheros, sin cambios de
código.

#### Scenario: Cambiar un avatar por fichero

- **WHEN** se sustituye el fichero de un avatar y se actualiza la ruta en el manifiesto
- **THEN** la interfaz muestra el nuevo avatar sin recompilar

### Requirement: Ausencia de activos no rompe el motor

El sistema MUST seguir funcionando aunque un activo falte: la interfaz debe
degradarse (p. ej. usar un marcador genérico) sin romper la simulación.

#### Scenario: Activo ausente degradado

- **WHEN** el fichero indicado en el manifiesto no existe
- **THEN** la interfaz muestra un marcador por defecto y el juego sigue