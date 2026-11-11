# Fernanda Andia — Fotografía publicitaria

Portafolio independiente en React y Vite, con diseño oscuro. Contiene las 35 fotografías de la selección final en `public/photos`, en WebP y dos tamaños. No necesita Supabase, cuentas, variables de entorno ni servicios de almacenamiento. Se muestran por filas en orden natural de nombre: a1, a2… b1, b2… c9, c10, c11.

## Ejecutar

```sh
npm install
npm run dev
```

## Compilar

```sh
npm run build
npm run preview
```

La carpeta `dist` se puede subir a cualquier alojamiento estático. Para alojarlo dentro de una subcarpeta: `npm run build -- --base=/nombre-subcarpeta/`.

## Contenido

- `src/main.jsx`: textos, contacto, orden de las fotos, categorías y visor.
- `src/style.css`, `src/night.css` y `src/modern.css`: diseño oscuro azul/celeste y adaptaciones para móvil.
- `src/gallery-layout.js`: filas equilibradas que respetan las proporciones y el orden de las fotografías. `node check-layout.mjs` verifica nueve anchos de pantalla.
- `public/mi-mirada.webp`: fotografía suministrada para la sección «Mi mirada».
- `photos.json`: relación entre los originales y los archivos numerados.
- `public/photos/01.webp`: imagen grande; `01-small.webp`: versión para la galería.
- `ordered-originals/` y `originals/`: respaldos locales de la selección; excluidos del repositorio y de la compilación. Las imágenes que utiliza la web sí están incluidas en `public/`.

Los contactos de WhatsApp, Instagram y LinkedIn se conservaron del portafolio original. Las fuentes de Google Fonts tienen alternativas locales si no hay conexión.

Las pestañas corresponden a las letras de los archivos: A → Tinto & carácter, B → Rosado en flor, C → Brillo nocturno, D → Blanco sobre blanco, E → Dulce tentación y F → Joyas de la tierra. Dentro de cada colección se mantiene el orden numérico. «Todo» presenta las seis series con sus propios títulos. Las filas se ajustan al ancho disponible sin recortar las fotografías.

El sitio funciona de forma independiente. En el entorno de desarrollo original, la versión anterior permanece en `../portfolio-react-photographer`.
