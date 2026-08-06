# Public assets

Carpetas y nombres son obligatorios: el código y el manifest PWA esperan estas
rutas. Si falta un archivo, la app oculta esa imagen y no rompe. Publica con
`git push` a `main` (el workflow despliega solo).

## Qué usa el código hoy

| Uso | Ruta |
|---|---|
| Menú principal | `public/assets/home-hero.jpg` |
| Portada del caso | `public/assets/cases/<casoId>-cover.jpg` |
| Avatares de rol (5) | `public/assets/avatars/rol-<rol>.png` |
| Iconos PWA | `public/assets/icons/icon-192.png`, `icon-512.png`, `icon-maskable-512.png` |

`base`: `/JuradoInvisible/`. El código usa `import.meta.env.BASE_URL`.

> **Iconos PWA**: `icon-192.png` e `icon-maskable-512.png` son copias de
> `icon-512.png` (1024×1024). Sobrescríbelas con versiones dedicadas si quieres.

---

## Estilo común (para generar o sustituir piezas)

> Ilustración editorial plana, sin líneas gruesas ni cartoon infantil, paleta
> gris pizarra (slate oscuro #0f172a / #1e293b) con acentos cielo #38bdf8,
> violeta #8b5cf6, ámbar #f59e0b y rosa #f471b5, fondo oscuro, atmósfera
> psicológica fría y contemplativa, sin texto, encuadre cinematográfico, alta calidad.

---

## Generación IA

Guarda cada resultado **exactamente** en la ruta indicada (reemplaza la pieza).

### 1. Portada del menú — `assets/home-hero.jpg`
> Aula vacía vista desde el marco de la puerta, pupitres en filas, una silla
> vacía junto a la ventana con luz fría, una larga sombra humana sin cuerpo que
> sostiene una pequeña balanza. ~1:1, sin texto.

### 2. Portada del caso — `assets/cases/<casoId>-cover.jpg`
> Pasillo de instituto en el recreo, al fondo un alumno solo algo desenfocado,
> el resto en grupos mirando de reojo, luz fría, panorámico 16:9, sin texto.

### 3. Avatares (5) — `assets/avatars/rol-<rol>.png`
> Retrato de medio cuerpo de un adolescente, pauta por rol, fondo uniforme que
> recorte un avatar circular, sin texto, alta calidad. Roles: `victim`
> (encogido, azul frío), `aggressor` (gesto seguro, rojo), `defender` (mano en
> señal de apoyo, esmeralda), `bystander` (brazos cruzados, ámbar), `neutral`
> (postura neutra, gris).

### 4. Icono PWA — `assets/icons/`
> Balanza cuya sombra es un grupo de personas, fondo slate oscuro, contenido
> central, sin texto. (`icon-maskable` deja ~20% libre.)

---

**Nota de peso**: los avatares PNG pesan hoy ~1–1.7 MB cada uno (≈6.5 MB). Se
recomienda re-codificarlos a WebP de ~512 px (~100–150 KB) para no frenar el
mapa. Si generas versiones nuevas, dime la extensión y la cableo.