# El alumno invisible

Caso de 10 días sobre el acoso por indiferencia.

## Cómo está organizado
- `meta.json` — datos del caso, prólogo narrativo (`prologue`), variables iniciales.
- `characters.json` — los 8 personajes (Marcos es la víctima; tú eres `tu`).
- `endings.json` — 6 finales según las variables al terminar (primer match gana).
- `events/` — un fichero por evento (25), ordenados por día.

## Convenciones de este caso
- `NN-` al inicio del nombre ordena por día; la letra desambigua varios eventos del mismo día (`03a`, `03b`, `03c`).
- Los eventos condicionales solo se ven en partidas donde se cumple su condición.
  Asegúrate de que su `priority` sea mayor que los eventos sin condición del mismo día,
  o nunca aparecerían. Por ejemplo, el **día 7** tiene `07c-recreo-lluvia` (priority 3,
  sin condición) como red de seguridad: solo se ve si no se cumplen las ramas `07a`/`07b`.
- Toda opción lleva `consequence` (resultado narrado) — lo exige el test `cases.test.ts`.
- Los finales se resuelven **en orden**: dejar uno `support >= 0` al final como comodín.

## Editar
1. Toca solo estos archivos.
2. Regenera con `npm run assemble-cases` (los hooks `predev`/`pretest`/`prebuild`/`predeploy` lo hacen solos).
3. Verifica con `npm test`.