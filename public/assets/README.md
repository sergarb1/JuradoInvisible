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