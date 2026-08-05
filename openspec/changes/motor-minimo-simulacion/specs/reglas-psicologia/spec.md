# Spec: motor-minimo-simulacion

## ADDED Requirements

### Requirement: Firmas de los módulos psicológicos del MVP

El sistema MUST exportar funciones puras tipadas en `src/psychology/` para los
siete módulos: `bystanderEffect`, `diffusionResponsibility`, `conformity`,
`pluralisticIgnorance`, `socialIdentity`, `moralDisengagement` y
`statusInfluence`, con entradas y salidas numéricas normalizadas.

#### Scenario: Módulo espectador exportado

- **WHEN** se importa `bystanderEffect` desde `src/psychology/`
- **THEN** expone una función pura que dado número de observadores y
  responsabilidad percibida devuelve una probabilidad

#### Scenario: Todos los módulos se importan

- **WHEN** se importan los siete módulos desde `src/psychology/`
- **THEN** todos se resuelven y cada uno exporta al menos una función pura

### Requirement: Rangos de entrada normalizados

Las entradas y salidas de los módulos MUST operar en rango 0–100 (o 0–1 para
probabilidades) y MUST saturarse en los límites.

#### Scenario: Entrada fuera de rango

- **WHEN** un módulo recibe un valor fuera de 0–100
- **THEN** el valor se satura a 0 o 100 sin producir resultados fuera de rango
