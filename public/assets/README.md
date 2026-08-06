# Public assets

Carpetas y nombres son obligatorios: el código y el manifest PWA esperan estas
rutas. Si falta un archivo, la app oculta esa imagen y no rompe. Publica con
`git push` a `main` (el workflow despliega solo).

## Qué usa el código hoy

| Uso | Ruta |
|---|---|
| Menú principal | `public/assets/home-hero.webp` |
| Portada del caso | `public/assets/cases/<casoId>-cover.webp` |
| Avatares de rol (5) | `public/assets/avatars/rol-<rol>.webp` |
| Avatares femeninos (5, opcionales) | `public/assets/avatars/rol-<rol>-f.webp` |
| Iconos PWA | `public/assets/icons/icon-192.png`, `icon-512.png`, `icon-maskable-512.png` |

`base`: `/JuradoInvisible/`. El código usa `import.meta.env.BASE_URL`.

> **Avatares de género**: el personaje del jugador se elige como chico/chica en
> el prólogo. Si existe `rol-<rol>-f.webp`, se usa para los personajes cuyo
> `gender` es `'f'` y para el jugador que eligió chica. Si falta, se cae a
> `rol-<rol>.webp` (la app no rompe).

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

### 1. Portada del menú — `assets/home-hero.webp`
> Aula vacía vista desde el marco de la puerta, pupitres en filas, una silla
> vacía junto a la ventana con luz fría, una larga sombra humana sin cuerpo que
> sostiene una pequeña balanza. ~1:1, sin texto.

### 2. Portada del caso — `assets/cases/<casoId>-cover.webp`
> Pasillo de instituto en el recreo, al fondo un alumno solo algo desenfocado,
> el resto en grupos mirando de reojo, luz fría, panorámico 16:9, sin texto.

### 3. Avatares (10) — `assets/avatars/rol-<rol>.webp` y `rol-<rol>-f.webp`

Cada avatar es un **retrato de medio cuerpo** de un adolescente de 15 años,
centrado y recortado en círculo por el código (fondo liso). Genera a ~512 px.
Todos comparten el **estilo común** y solo cambian **personaje + postura + color
de fondo + expresión** según el rol. Los `-f` son la misma pauta pero de chica.

Copia y pega el prompt completo de cada archivo:

**`rol-victim.webp`** (chico, encogido, fondo azul frío)
```
Ilustración editorial plana, trazo limpio, sin contornos gruesos ni cartoon infantil, paleta gris pizarra con acento azul frío (#38bdf8). Retrato de medio cuerpo de un adolescente chico de 15 años, delgado, pelo castaño liso cayendo sobre la frente, mirada baja y esquiva, hombros encogidos hacia dentro, brazos ligeramente cruzados en actitud insegura, sudadera gris oscura holgada. Fondo azul frío uniforme liso que recorte un avatar circular. Iluminación fría y baja, atmósfera psicológica contemplativa y triste. Sin texto, sin ropa con marcas, sin manos delante de la cara. Alta calidad.
```

**`rol-victim-f.webp`** (chica, encogida, fondo azul frío)
```
Ilustración editorial plana, trazo limpio, sin contornos gruesos ni cartoon infantil, paleta gris pizarra con acento azul frío (#38bdf8). Retrato de medio cuerpo de una adolescente chica de 15 años, pelo castaño recogido en una coleta baja, mirada baja y esquiva, hombros encogidos hacia dentro, brazos ligeramente cruzados en actitud insegura, sudadera gris oscura holgada. Fondo azul frío uniforme liso que recorte un avatar circular. Iluminación fría y baja, atmósfera psicológica contemplativa y triste. Sin texto, sin ropa con marcas, sin manos delante de la cara. Alta calidad.
```

**`rol-aggressor.webp`** (chico, gesto seguro, fondo rojo)
```
Ilustración editorial plana, trazo limpio, sin contornos gruesos ni cartoon infantil, paleta gris pizarra con acento rojo apagado. Retrato de medio cuerpo de un adolescente chico de 15 años, complexión atlética, pelo oscuro corto a los lados, mentón ligeramente alzado, sonrisa torcida de suficiencia, brazos cruzados con actitud dominante, camiseta negra de manga corta. Fondo rojo apagado uniforme liso que recorte un avatar circular. Iluminación dura y de contraste, atmósfera tensa. Sin texto, sin ropa con marcas. Alta calidad.
```

**`rol-aggressor-f.webp`** (chica, gesto seguro, fondo rojo)
```
Ilustración editorial plana, trazo limpio, sin contornos gruesos ni cartoon infantil, paleta gris pizarra con acento rojo apagado. Retrato de medio cuerpo de una adolescente chica de 15 años, pelo oscuro liso a media melena, mentón ligeramente alzado, mirada desafiante de reojo, brazos cruzados con actitud dominante, chaqueta negra de cremallera. Fondo rojo apagado uniforme liso que recorte un avatar circular. Iluminación dura y de contraste, atmósfera tensa. Sin texto, sin ropa con marcas. Alta calidad.
```

**`rol-defender.webp`** (chico, mano en señal de apoyo, fondo esmeralda)
```
Ilustración editorial plana, trazo limpio, sin contornos gruesos ni cartoon infantil, paleta gris pizarra con acento esmeralda. Retrato de medio cuerpo de un adolescente chico de 15 años, pelo castaño rizado corto, expresión serena y firme, una mano levantada a la altura del pecho con la palma abierta en gesto de apoyo, camisa gris claro con las mangas remangadas. Fondo esmeralda uniforme liso que recorte un avatar circular. Iluminación suave y cálida, atmósfera de confianza. Sin texto, sin ropa con marcas. Alta calidad.
```

**`rol-defender-f.webp`** (chica, mano en señal de apoyo, fondo esmeralda)
```
Ilustración editorial plana, trazo limpio, sin contornos gruesos ni cartoon infantil, paleta gris pizarra con acento esmeralda. Retrato de medio cuerpo de una adolescente chica de 15 años, pelo castaño ondulado recogido con una horquilla, expresión serena y firme, una mano levantada a la altura del pecho con la palma abierta en gesto de apoyo, jersey gris claro. Fondo esmeralda uniforme liso que recorte un avatar circular. Iluminación suave y cálida, atmósfera de confianza. Sin texto, sin ropa con marcas. Alta calidad.
```

**`rol-bystander.webp`** (chico, brazos cruzados, fondo ámbar)
```
Ilustración editorial plana, trazo limpio, sin contornos gruesos ni cartoon infantil, paleta gris pizarra con acento ámbar (#f59e0b). Retrato de medio cuerpo de un adolescente chico de 15 años, pelo rubio despeinado, mirada hacia un lado evitando el frente, brazos cruzados en postura indecisa, ligera inclinación del torso hacia atrás, sudadera gris con capucha baja. Fondo ámbar atenuado uniforme liso que recorte un avatar circular. Iluminación neutra y tenue, atmósfera de duda. Sin texto, sin ropa con marcas. Alta calidad.
```

**`rol-bystander-f.webp`** (chica, brazos cruzados, fondo ámbar)
```
Ilustración editorial plana, trazo limpio, sin contornos gruesos ni cartoon infantil, paleta gris pizarra con acento ámbar (#f59e0b). Retrato de medio cuerpo de una adolescente chica de 15 años, pelo rubio recogido en una coleta alta, mirada hacia un lado evitando el frente, brazos cruzados en postura indecisa, ligera inclinación del torso hacia atrás, sudadera gris con capucha baja. Fondo ámbar atenuado uniforme liso que recorte un avatar circular. Iluminación neutra y tenue, atmósfera de duda. Sin texto, sin ropa con marcas. Alta calidad.
```

**`rol-neutral.webp`** (chico, postura neutra, fondo gris)
```
Ilustración editorial plana, trazo limpio, sin contornos gruesos ni cartoon infantil, paleta gris pizarra. Retrato de medio cuerpo de un adolescente chico de 15 años, pelo castaño medio, expresión neutra y relajada, brazos a los lados con las manos en los bolsillos, camiseta gris lisa. Fondo gris pizarra uniforme liso que recorte un avatar circular. Iluminación equilibrada, atmósfera tranquila y observadora. Sin texto, sin ropa con marcas. Alta calidad.
```

**`rol-neutral-f.webp`** (chica, postura neutra, fondo gris)
```
Ilustración editorial plana, trazo limpio, sin contornos gruesos ni cartoon infantil, paleta gris pizarra. Retrato de medio cuerpo de una adolescente chica de 15 años, pelo castaño largo suelto, expresión neutra y relajada, brazos a los lados, camiseta gris lisa. Fondo gris pizarra uniforme liso que recorte un avatar circular. Iluminación equilibrada, atmósfera tranquila y observadora. Sin texto, sin ropa con marcas. Alta calidad.
```

### 4. Icono PWA — `assets/icons/`
> Balanza cuya sombra es un grupo de personas, fondo slate oscuro, contenido
> central, sin texto. (`icon-maskable` deja ~20% libre.)

---

**Nota de peso**: los avatares WebP actuales pesan ~10–16 KB cada uno (≈90 KB en
total). Genera los nuevos `.webp` a ~512 px con fondo liso para mantener el mapa
ligero.