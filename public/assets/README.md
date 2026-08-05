# Public assets

Aquí vas a generar tú, a mano, las imágenes del juego con un generador de IA
(Leo, Midjourney, Ideogram, DALL·E…). **Carpetas y nombres son obligatorios**:
el código y el modo PWA esperan estas rutas. Si un archivo falta, la app solo
oculta esa imagen (no rompe nada), así que puedes ir añadiendo generaciones
poco a poco y luego publicar.

## Estilo común (pega este prefijo en TODOS los prompts)

> Ilustración editorial plana, sin líneas gruesas, paleta gris pizarra
> (slate #0f172a / #1e293b) con acentos cielo #0ea5e9, violeta #8b5cf6 y ámbar
> #f59e0b, fondo oscuro, atmósfera psicológica fría y contemplativa, sin
> texto, encuadre cinematográfico, alta calidad.

Comando para publicarlo todo al final: `npm run build && npm run deploy`
(o `git push` a `main`, que ya despliega el workflow).

---

## Estructura

```
public/assets/
├── home-hero.webp        ← portada del menú (cuadrado ~1:1)
├── icons/
│   ├─ icon-192.png          192x192
│   ├─ icon-512.png          512x512
│   └─ icon-maskable-512.png 512x512 (con área segura)
├── avatars/              ← un avatar por rol (los personajes reutilizan)
│   ├─ rol-victim.webp
│   ├─ rol-aggressor.webp
│   ├─ rol-defender.webp
│   ├─ rol-bystander.webp
│   └─ rol-neutral.webp
├── cases/                ← portada por caso: <casoId>-cover.webp (16:9)
└── bg/                   ← fondos sutiles para finales/escenas
```

---

## 1. Iconos PWA — `public/assets/icons/` (empieza por aquí)

La app se instala como PWA cuando existan los 3 (en PNG).

Prompt:
> Icono de app de un simulador educativo sobre dinámicas de grupo: una balanza
> cuya sombra es la silueta de un grupo, muy minimalista, fondo slate oscuro,
> contenido central, [estilo]. (El `icon-maskable` debe dejar ~20% libre
> alrededor.)

## 2. Portada del menú — `public/assets/home-hero.webp`

> Un aula vacía vista desde el marco de la puerta, pupitres en filas, una silla
> vacía junto a una ventana con luz fría de tarde, atmósfera de silencio, una
> larga sombra que entra sin cuerpo, como un observador invisible, [estilo],
> sin texto. Aspecto ~1:1.

## 3. Portada por caso — `public/assets/cases/<caso-id>-cover.webp`

`<caso-id>` es el `id` del caso (hoy `el-alumno-invisible`). Aspecto 16:9.

> "Un alumno solo al fondo de un pasillo del instituto a la hora del recreo,
> los demás en grupos a lo lejos mirando de reojo, figura central algo
> desenfocada, [estilo], sin texto."

## 4. Avatares por rol — `public/assets/avatars/rol-<key>.webp`

Los 8 personajes reutilizan el avatar de su rol.

Prompt:
> "Retrato de medio cuerpo de <rol> y ESO, ilustración plana, fondo
> uniforme que recorte un avatar circular, [estilo]. Pauta por rol:
> víctima encogida y mirando abajo; agresor con gesto seguro (rojo); defensor
> con apoyo esmeralda; espectador mirando de reojo (ámbar); neutro postura
> neutra (gris). Sin rasgos que marquen edad exacta, sin estigma."

Roles: `victim`, `aggressor`, `defender`, `bystander`, `neutral`
(coincide con `src/lib/roleMeta.ts`).

---

## Notas

- `.webp` para ilustraciones (más ligeras); solo los iconos PWA deben ser `.png`.
- La `base` del proyecto es `/JuradoInvisible/`, las rutas ya se resuelven
  desde el código con `import.meta.env.BASE_URL`.