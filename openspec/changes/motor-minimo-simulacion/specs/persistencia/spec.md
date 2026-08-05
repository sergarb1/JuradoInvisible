# Spec: motor-minimo-simulacion

## ADDED Requirements

### Requirement: API de guardado del MVP

El sistema MUST exponer un `SaveSystem` con `save`, `load`, `export` e `import`
sobre el estado serializado, usando IndexedDB con respaldo localStorage.

#### Scenario: Guardar y exportar

- **WHEN** se guarda un estado y se exporta
- **THEN** el exportado contiene el estado completo y se puede reimportar
