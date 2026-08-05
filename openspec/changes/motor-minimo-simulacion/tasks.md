# Tasks: Motor mínimo de simulación

## 1. Modelo de datos

- [x] 1.1 Crear `src/models/` con los tipos TS: `Character`, `Case`, `Event`,
      `Decision`, `Ending`, `VariableMap`, `SimulationState`, `Condition`.
- [x] 1.2 Añadir utilidades de rango/saturación `clamp(value, min, max)` y
      `clampState` para mantener variables en 0–100.

## 2. Módulos de psicología (funciones puras)

- [x] 2.1 Implementar `bystanderEffect` (Latané & Darley): observadores +
      responsabilidad percibida → probabilidad de intervención.
- [x] 2.2 Implementar `diffusionResponsibility`: N miembros → responsabilidad
      individual.
- [x] 2.3 Implementar `conformity`: presión grupal + miedo al rechazo →
      probabilidad de ajustarse.
- [x] 2.4 Implementar `pluralisticIgnorance`: desaprobación privada sin
      expresión pública → reducción de intervención.
- [x] 2.5 Implementar `socialIdentity`: distancia endogrupo/exogrupo → apoyo a
      la víctima.
- [x] 2.6 Implementar `moralDisengagement`: mecanismo (p. ej. minimización) →
      percepción de gravedad.
- [x] 2.7 Implementar `statusInfluence`: estatus del personaje → peso en la norma.

## 3. Motor de simulación

- [x] 3.1 Implementar `CharacterEngine`: gestión de relaciones e influencia
      entre personajes.
- [x] 3.2 Implementar `EventEngine`: dado el día y las condiciones, selecciona
      el evento activo (prioridad, desempate determinista).
- [x] 3.3 Implementar `DecisionEngine`: aplica deltas de una decisión a
      variables, atributos y relaciones (con saturación).
- [x] 3.4 Implementar `InfluenceEngine`: compone los módulos de psicología para
      traducir una decisión en cambios de estado.
- [x] 3.5 Implementar `EndingEngine`: evalúa variables finales → final según el
      caso.
- [x] 3.6 Implementar `SocialSimulationEngine`: API pública (crear, avanzar día,
      evento activo, elegir decisión, resolver final) y estado serializable.

## 4. Carga y validación de datos

- [x] 4.1 Añadir `ajv` como dependencia y crear `src/loader/ValidateCase.ts`
      (JSON Schema).
- [x] 4.2 Crear `data/schema/case.schema.json` para Case/Character/Event/
      Decision/Ending.
- [x] 4.3 Implementar `src/loader/CaseLoader.ts` (carga desde
      `public/data/cases/` en runtime y desde `data/` en tests, con validación).

## 5. Persistencia

- [x] 5.1 Implementar `src/systems/SaveSystem.ts`: `save/load` (IndexedDB con
      fallback localStorage) y `export/import` (JSON).

## 6. Caso de ejemplo

- [x] 6.1 Crear `data/cases/alumno-invisible.json`: 8 personajes, 10 días,
      ≥15 eventos con condiciones y decisiones con efectos, 3 finales.
- [x] 6.2 Copiar el caso a `public/data/cases/` para disponibilidad en runtime.

## 7. Tests de motor

- [x] 7.1 Test por módulo de psicología (casos borde y rangos).
- [x] 7.2 Test de avance por días y condiciones de eventos.
- [x] 7.3 Test de determinismo: misma partida → mismo estado final.
- [x] 7.4 Test de finales: mismas condiciones de partida con decisiones opuestas
      → finales distintos (o evolución distinta).
- [x] 7.5 Test de validador: caso roto → error claro; caso válido → carga.
- [x] 7.6 Test de SaveSystem: serialización, guardado, restauración,
      exportación/importación.
- [x] 7.7 Demo CLI (`tests/cli-playthrough.ts` o script npm) que ejecuta una
      partida completa por consola para inspección humana.

## 8. Verificación final

- [x] 8.1 `npm run typecheck` sin errores.
- [x] 8.2 `npm run test` en verde.
- [x] 8.3 Probar que cambiar `pressure` en el JSON cambia la evolución de la
      simulación (test de contraste).