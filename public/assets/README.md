# Public assets

Hay dos capas:

1. **Assets base en SVG** (ya en el repo, generados por mí) → funciona siempre.
2. **Arte raster enriquecido** (tú lo generas con IA) → sustituye al SVG con el
   mismo nombre, o añade nuevas piezas. Es opcional y mejora el acabado.

**Regla de nombres**: carpetas y nombres son obligatorios. Si falta un archivo,
la app oculta esa imagen y no rompe. Publica con `git push` a `main` (el
workflow despliega solo).

---

## Qué usa el código hoy

| Uso | Ruta esperada |
|---|---|
| Menú principal | `public/assets/home-hero.svg` |
| Portada del caso | `public/assets/cases/<casoId>-cover.svg` |
| Avatares de rol (5) | `public/assets/avatars/rol-<rol>.svg` |
| Iconos PWA | `public/assets/icons/icon-192.svg`, `icon-512.svg`, `icon-maskable-512.svg` |

`base` del proyecto: `/JuradoInvisible/`. El código usa `import.meta.env.BASE_URL`.

---

## 1. Iconos PWA (SVG ya hecho; si prefieres PNG, genéralo y guárdalo así)

Chrome/Edge/Firefox aceptan SVG en el manifest. Si tu generador da PNG, guárdalos
añadiéndolos **junto** al SVG:

- `public/assets/icons/icon-192.png`
- `public/assets/icons/icon-512.png`
- `public/assets/icons/icon-maskable-512.png` (área segura ~20% libre)

y avísame para apuntar el manifest a PNG.

---

## Estilo común (pegar en TODOS los prompts)

> Ilustración editorial plana, sin líneas gruesas ni cartoon infantil, paleta
> gris pizarra (slate oscuro #0f172a / #1e293b) con acentos cielo #38bdf8,
> violeta #8b5cf6, ámbar #f59e0b y rosa #f471b5, fondo oscuro, atmósfera
> psicológica fría y contemplativa, sin texto, encuadre cinematográfico, alta calidad.

## Prompt de referencia para sustituir el arte (generar tú)

Los prompts detallados (hero, portada caso, 5 avatares) los tienes abajo en
«Generación IA» con su ruta. Guarda cada resultado con **el nombre exacto de la
ruta** indicada, reemplazando el `.svg` por `.png` o `.webp` si lo prefieres,
y dime para cambiar la extensión en el código.

---

## Generación IA (arte raster de calidad)

Guarda **exactamente** cada resultado en la ruta indicada. El SVG actual actúa
como fallback; tu imagen reemplaza el visual. Reemplaza `.svg` por `.webp` en
el nombre de archivo (extensión preferida).

### 1. Portada del menú

**Ruta**: `public/assets/home-hero.webp`

> Ilustración editorial plana sin líneas gruesas, paleta slate oscuro
> (#0f172a / #1e293b) con acentos cielo #38bdf8, violeta #8b5cf6 y ámbar
> #f59e0b. Un aula vacía de instituto vista desde el marco de la puerta:
> pupitres en filas, una silla vacía junto a una ventana con luz fría de
> tarde, atmósfera de silencio. Una larga sombra humana entra desde el fondo
> sin cuerpo visible, como un observador invisible que sostiene una pequeña
> balanza de juicio. Encuadre cinematográfico, composición vertical ~1:1, sin
> texto, alta calidad.

### 2. Portada del caso

**Ruta**: `public/assets/cases/el-alumno-invisible-cover.webp`

> Ilustración editorial plana, paleta slate oscuro con acento azul frío.
> Perspectiva de pasillo de instituto a la hora del recreo: al fondo un alumno
> solo, ligeramente desenfocado, los demás en grupos junto a las ventanas
> mirando de reojo. Luz fría por los ventanales, atmósfera de soledad y rumor.
> Encuadre cinematográfico panorámico 16:9, sin texto, alta calidad.

### 3. Avatares (5, mismo estilo, cambia la pauta)

**Rutas**: `public/assets/avatars/rol-victim.webp`, `rol-aggressor.webp`,
`rol-defender.webp`, `rol-bystander.webp`, `rol-neutral.webp`

**`rol-victim.webp`**
> Retrato de medio cuerpo de un adolescente encogido, mirada baja, manos
> cruzadas, paleta azul frío, fondo uniforme que recorte un avatar circular,
> ilustración editorial plana, sin texto, sin estigma, alta calidad.

**`rol-aggressor.webp`**
> Retrato de medio cuerpo de un adolescente con gesto seguro y ceño marcado,
> paleta rojo, fondo uniforme circular, ilustración editorial plana, sin
> texto, alta calidad.

**`rol-defender.webp`**
> Retrato de medio cuerpo de un adolescente erguido con una mano levantada en
> señal de apoyo y sonrisa serena, paleta esmeralda, fondo uniforme circular,
> ilustración editorial plana, sin texto, alta calidad.

**`rol-bystander.webp`**
> Retrato de medio cuerpo de un adolescente con los brazos cruzados, ojos
> mirando de reojo, paleta ámbar, fondo uniforme circular, ilustración
> editorial plana, sin texto, alta calidad.

**`rol-neutral.webp`**
> Retrato de medio cuerpo de un adolescente con postura neutra y expresión
> calmada, paleta gris slate, fondo uniforme circular, ilustración editorial
> plana, sin texto, alta calidad.

### 4. Iconos PWA (opcional, si prefieres PNG raster)

**Rutas**: `public/assets/icons/icon-192.png`, `icon-512.png`,
`icon-maskable-512.png` (512 con ~20% libre alrededor).

> Icono de app minimalista: una balanza cuya sombra es la silueta de un grupo
> de personas, fondo slate oscuro, contenido central, sin texto.

---

## Publicar

Tras guardar las piezas: `git add . && git commit -m "assets: arte raster" &&
git push` → GitHub Pages se actualiza solo. Si usaste `.png`, avisa para
cambiar la extensión en el código.