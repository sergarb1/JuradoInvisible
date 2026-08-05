# Spec: reglas-psicologia

## Purpose
Módulos TS puros que implementan teorías de psicología social del acoso.
Cada teoría es una función pura entrada→salida. No contienen juicios morales;
simulan mecanismos.

## Requirements

### Requirement: Módulo efecto espectador

El sistema MUST proporcionar una función pura que, dados el número de
observadores y la responsabilidad percibida, devuelva la probabilidad de que
alguien intervenga (modelo Latané & Darley).

#### Scenario: Más observadores, menos intervención

- **WHEN** se aumenta el número de observadores manteniendo la responsabilidad
- **THEN** la probabilidad de intervención calculada disminuye

#### Scenario: Mayor responsabilidad percibida, más intervención

- **WHEN** se aumenta la responsabilidad percibida manteniendo los observadores
- **THEN** la probabilidad de intervención calculada aumenta

### Requirement: Módulo difusión de responsabilidad

El sistema MUST simular cómo la responsabilidad individual se diluye al
repartirse entre el colectivo.

#### Scenario: La responsabilidad individual cae con el grupo

- **WHEN** se calcula la responsabilidad asumida por un individuo con N miembros implicados en el colectivo
- **THEN** el resultado es menor cuanto mayor es N

### Requirement: Módulo conformidad

El sistema MUST simular la presión de ajustarse a la norma del grupo en función
de la presión grupal y el miedo al rechazo del personaje.

#### Scenario: Mayor presión grupal, más conformidad

- **WHEN** aumenta la presión grupal manteniendo el miedo al rechazo
- **THEN** la probabilidad de que el personaje se ajuste a la norma calculada aumenta

#### Scenario: El miedo al rechazo amplifica la conformidad

- **WHEN** aumenta el miedo al rechazo del personaje manteniendo la presión grupal
- **THEN** la probabilidad de conformidad calculada aumenta

### Requirement: Módulo ignorancia pluralista

El sistema MUST simular cómo cada miembro cree erróneamente que los demás
aceptan la situación cuando ninguno la acepta privadamente.

#### Scenario: La discrepancia refuerza la inacción

- **WHEN** cada miembro del grupo mantiene su desaprobación privada sin expresarla públicamente
- **THEN** la probabilidad de que cualquier miembro intervenga calculada disminuye

### Requirement: Módulo identidad social

El sistema MUST simular la dinámica endogrupo/exogrupo según la pertenencia del
personaje y la distancia percibida hacia la víctima.

#### Scenario: La distancia al exogrupo reduce el apoyo

- **WHEN** aumenta la distancia percibida entre el personaje y la víctima (exogrupo)
- **THEN** el apoyo calculado hacia la víctima disminuye

### Requirement: Módulo desenganche moral

El sistema MUST simular mecanismos de desenganche (justificación, difusión,
minimización, eufemismo) que modulan la percepción del daño.

#### Scenario: La minimización reduce la gravedad percibida

- **WHEN** se aplica un mecanismo de minimización del daño
- **THEN** la percepción de gravedad del observador calculada disminuye

### Requirement: Módulo influencia por estatus

El sistema MUST modelar cuánto pesa el estatus de un personaje en la norma
grupal.

#### Scenario: Alto estatus mueve la norma

- **WHEN** un personaje de alto estatus se pronuncia en un evento
- **THEN** su influencia sobre las variables de clase es proporcionalmente mayor