# Spec: datos-casos

## MODIFIED Requirements

### Requirement: Almacenamiento por fragmentos

La fuente de verdad de un caso MUST vivir en `data/cases/<case-id>/` con
ficheros separados: `meta.json`, `characters.json`, `endings.json` y un fichero
por evento en `events/`. Un script (`assemble-cases`) MUST fusionarlos en el
JSON único que consumen tests (`data/cases/<id>.json`) y runtime
(`public/data/cases/<id>.json`).

#### Scenario: Ensamblado de un caso

- **WHEN** se ejecuta `npm run assemble-cases`
- **THEN** cada carpeta de caso se fusiona y valida (referencias de `actor`,
  días 1..`days`, ids de evento únicos)
- **AND** se escriben los dos JSON únicos

### Requirement: Campos narrativos opcionales

El esquema de caso DEBE admitir de forma opcional `prologue` (en `CaseData`),
`scene` (en cada evento) y `consequence` (en cada opción) sin romper casos
existentes.

#### Scenario: Caso con narración

- **WHEN** un caso incluye `prologue`, `scene` y `consequence`
- **THEN** valida contra `case.schema.json` y la interfaz los muestra

### Requirement: Esquemas por fragmento

Deben existir `meta.schema.json`, `characters.schema.json`,
`endings.schema.json` y `event.schema.json` que reutilicen las definiciones de
`case.schema.json` para validar cada fragmento de forma standalone.

#### Scenario: Validar un fragmento

- **WHEN** se si valida un fichero de evento contra `event.schema.json`
- **THEN** se valida como si fuera la definición `event` de `case.schema.json`