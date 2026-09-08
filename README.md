# Wenddy Neciosup — sitio en React

Rediseño de [wenddyneciosup.com](https://wenddyneciosup.com/) hecho con **React 19 +
TypeScript + Vite**. Las 23 rutas del sitio original se conservan intactas y ahora se
resuelven en el cliente desde los datos, sin un archivo HTML por página.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # dist/
npm run preview    # sirve dist/
npm run typecheck  # tsc --noEmit
```

## Rutas

Se conservan **exactamente** los slugs del sitio original, incluidas las herencias de
WordPress: `/mayo-2/` es junio, `/agosto-2/` es agosto y `/agosto/` es setiembre. Cambiarlos
rompería enlaces y posicionamiento ya ganados.

| Ruta | Componente | Contenido |
|---|---|---|
| `/` | `pages/Home` | Libro, muestra, testimonios, 365 con Dios, podcast, reto, autora, apoyo |
| `/la-biblia-en-365-dias/` | `pages/Plan` | 12 portadas + las 9 series de promesas |
| `/:slug/` | `pages/ListingPage` | Los 21 listados: 12 meses y 9 de promesas |
| cualquier otra | `pages/NotFound` | 404 con la misma piel del sitio |

Una sola ruta dinámica `:slug` cubre los 21 listados: el contenido sale de
`src/data/routes.json` (623 tarjetas extraídas del sitio original, cada una con su lámina y
sus enlaces de YouTube y Spotify).

## Estructura

```
index.html               Shell de Vite
src/
  main.tsx               Entrada: BrowserRouter + ToastProvider
  App.tsx                Definición de rutas
  components/
    Layout.tsx           Encabezado, menú, pie, precarga, scroll por ruta
    Icon.tsx             <Icon name="spotify" /> con nombres tipados
    IconSprite.tsx       Sprite SVG (generado desde el sitio estático)
    Reveal / SplitText / Counter / MagneticLink
    home/                Las 12 secciones de la portada
    inner/               Barra de meses, tarjeta de día, visor, franja de plataformas
  hooks/                 useInView, useScrollEffects, useMagnetic, useToast, …
  lib/                   cx, helpers de scroll con el alto real del encabezado
  data/
    plan.ts              Rutas, meses, promesas y portadas (tipado)
    site.ts              Enlaces, testimonios, línea de tiempo, plataformas
    routes.json          Datos extraídos del sitio original
  styles/                styles.css (portada) + inner.css (listados)
public/assets/           Imágenes y audio, servidos desde /assets/... como antes
legacy/                  Instantánea de la versión estática (se puede borrar)
```

## Decisiones de la migración

- **Estilos tal cual.** El CSS pasó sin reescribir: ya estaba basado en tokens y clases de
  componente, así que el resultado visual es idéntico. Solo cambió la ruta de la imagen de
  fondo del CTA, ahora absoluta desde `/assets/`.
- **Las animaciones son hooks.** `useInView` alimenta los revelados, `useScrollEffects`
  concentra en un único listener la barra de progreso, el estado del encabezado, el botón de
  volver arriba y las capas con parallax.
- **La onda del audio se escribe en el DOM.** Las 56 barras se actualizan por `ref` desde el
  bucle de animación; pasarlas por el estado de React sería un render por fotograma.
- **`--hdr-h` sigue siendo la fuente de verdad.** El encabezado publica su alto real y la
  barra pegajosa de meses y los saltos de ancla lo leen, como en la versión estática.
- **El aro punteado es compartido.** La portada del libro lleva el mismo aro dorado con su
  punto orbitando, tanto en el hero como en la sección «El libro»: una sola clase `.ring`. Va
  dentro de un envoltorio que recorta, porque al girar la caja cuadrada del aro mide √2 veces
  su lado y arrastraba scroll horizontal en móvil.
- **Datos separados del marcado.** Testimonios, línea de tiempo, plataformas y enlaces viven
  en `src/data/site.ts`; añadir un testimonio o un mes de promesas no toca ningún componente.

## Antes de publicar

**Al ser una SPA, ninguna ruta llega con contenido en el HTML inicial.** Los buscadores que
ejecutan JavaScript la indexan, pero se pierde el HTML por ruta que sí tenía la versión
estática. Si el posicionamiento de las 22 rutas importa, conviene añadir prerenderizado
(`vite-plugin-prerender`, `react-snap` o migrar a un framework con SSG) antes de reemplazar
el sitio actual.

El servidor debe devolver `index.html` en cualquier ruta que no sea un archivo, o `/enero/`
dará 404 al recargar. Ya están los tres casos habituales:

- Apache — `public/.htaccess` (se copia a `dist/`)
- Netlify — `public/_redirects`
- Vercel — `vercel.json`

### Láminas diarias

Las 620+ láminas se sirven desde `https://wenddyneciosup.com/wp-content/uploads/…`, donde ya
viven, para no meter ~150 MB al repositorio. Si las mueves, reapunta `src/data/routes.json`.

## Notas sobre el contenido

- Los textos son los del sitio original, con correcciones tipográficas menores.
- El testimonio de Howard Andruejol tenía pegado un resto de *lorem ipsum*; se eliminó.
- En el sitio original solo Enero y Febrero estaban enlazados desde el plan de lectura; aquí
  los 12 meses enlazan a su ruta.

---

## Mapa completo de rutas

Las **23** rutas encontradas en el sitio original y la ruta que se creó para cada una.
Los slugs no cambian: la columna «Ruta creada» es idéntica a la original, lo que cambia es
quién la resuelve. Los **21 listados** los sirve un único componente a través del patrón
dinámico `:slug`, así que no existe un archivo por página.

| # | Ruta en el sitio original | Ruta creada | Componente | Patrón de ruta | Contenido |
|---|---|---|---|---|---|
| 1 | `https://wenddyneciosup.com/` | `/` | `pages/Home.tsx` | ruta índice | Portada completa (12 secciones) |
| 2 | `https://wenddyneciosup.com/la-biblia-en-365-dias/` | `/la-biblia-en-365-dias/` | `pages/Plan.tsx` | `la-biblia-en-365-dias` | 12 portadas de mes + 9 series de promesas |
| 3 | `https://wenddyneciosup.com/enero/` | `/enero/` | `pages/ListingPage.tsx` | `:slug` | Enero · 31 devocionales |
| 4 | `https://wenddyneciosup.com/febrero/` | `/febrero/` | `pages/ListingPage.tsx` | `:slug` | Febrero · 28 devocionales |
| 5 | `https://wenddyneciosup.com/marzo/` | `/marzo/` | `pages/ListingPage.tsx` | `:slug` | Marzo · 31 devocionales |
| 6 | `https://wenddyneciosup.com/abril/` | `/abril/` | `pages/ListingPage.tsx` | `:slug` | Abril · 30 devocionales |
| 7 | `https://wenddyneciosup.com/mayo/` | `/mayo/` | `pages/ListingPage.tsx` | `:slug` | Mayo · 31 devocionales |
| 8 | `https://wenddyneciosup.com/mayo-2/` | `/mayo-2/` | `pages/ListingPage.tsx` | `:slug` | **Junio** · 30 devocionales |
| 9 | `https://wenddyneciosup.com/julio/` | `/julio/` | `pages/ListingPage.tsx` | `:slug` | Julio · 31 devocionales |
| 10 | `https://wenddyneciosup.com/agosto-2/` | `/agosto-2/` | `pages/ListingPage.tsx` | `:slug` | **Agosto** · 31 devocionales |
| 11 | `https://wenddyneciosup.com/agosto/` | `/agosto/` | `pages/ListingPage.tsx` | `:slug` | **Setiembre** · 30 devocionales |
| 12 | `https://wenddyneciosup.com/octubre/` | `/octubre/` | `pages/ListingPage.tsx` | `:slug` | Octubre · 31 devocionales |
| 13 | `https://wenddyneciosup.com/noviembre/` | `/noviembre/` | `pages/ListingPage.tsx` | `:slug` | Noviembre · 30 devocionales |
| 14 | `https://wenddyneciosup.com/diciembre/` | `/diciembre/` | `pages/ListingPage.tsx` | `:slug` | Diciembre · 31 devocionales |
| 15 | `https://wenddyneciosup.com/promesas-enero/` | `/promesas-enero/` | `pages/ListingPage.tsx` | `:slug` | Promesas de enero · 31 promesas |
| 16 | `https://wenddyneciosup.com/promesas-febrero/` | `/promesas-febrero/` | `pages/ListingPage.tsx` | `:slug` | Promesas de febrero · 28 promesas |
| 17 | `https://wenddyneciosup.com/promesas-marzo/` | `/promesas-marzo/` | `pages/ListingPage.tsx` | `:slug` | Promesas de marzo · 31 promesas |
| 18 | `https://wenddyneciosup.com/promesas-abril/` | `/promesas-abril/` | `pages/ListingPage.tsx` | `:slug` | Promesas de abril · 30 promesas |
| 19 | `https://wenddyneciosup.com/promesas-mayo/` | `/promesas-mayo/` | `pages/ListingPage.tsx` | `:slug` | Promesas de mayo · 31 promesas |
| 20 | `https://wenddyneciosup.com/promesas-junio/` | `/promesas-junio/` | `pages/ListingPage.tsx` | `:slug` | Promesas de junio · 30 promesas |
| 21 | `https://wenddyneciosup.com/promesas-julio/` | `/promesas-julio/` | `pages/ListingPage.tsx` | `:slug` | Promesas de julio · 31 promesas |
| 22 | `https://wenddyneciosup.com/promesas-agosto/` | `/promesas-agosto/` | `pages/ListingPage.tsx` | `:slug` | Promesas de agosto · 31 promesas |
| 23 | `https://wenddyneciosup.com/promesas-setiembre/` | `/promesas-setiembre/` | `pages/ListingPage.tsx` | `:slug` | Promesas de setiembre · 3 promesas (las publicadas) |
| — | *(cualquier slug desconocido)* | `/lo-que-sea/` | `pages/NotFound.tsx` | `*` | 404 con la piel del sitio |

**Total de tarjetas servidas desde `src/data/routes.json`: 623.**

### Slugs heredados de WordPress

Tres rutas no coinciden con el mes que muestran. Se conservan tal cual, a propósito, para no
romper enlaces ni el posicionamiento ya ganado:

| Ruta | Muestra | Ruta «lógica» que **no** se usó |
|---|---|---|
| `/mayo-2/` | Junio | ~~`/junio/`~~ |
| `/agosto-2/` | Agosto | ~~`/agosto/`~~ (ocupada por setiembre) |
| `/agosto/` | Setiembre | ~~`/setiembre/`~~ |

### Anclas de la portada

No son rutas propias: react-router navega a `/` y `ScrollManager` baja a la sección,
descontando el alto real del encabezado (`--hdr-h`).

`/#libro` · `/#muestra` · `/#digital` · `/#podcast` · `/#reto` · `/#autora` · `/#apoyo` · `/#contacto`

### Recursos que no pasan por el router

| Origen | Ruta | Nota |
|---|---|---|
| Imágenes y audio propios | `/assets/img/…`, `/assets/audio/…` | `public/assets/`, misma URL que antes |
| Láminas diarias (620+) | `https://wenddyneciosup.com/wp-content/uploads/…` | Siguen en su servidor actual |
| Certificado del reto | `https://wenddyneciosup.com/wp-content/uploads/2025/12/CERTIFICADO-365-.pdf` | PDF externo |

---

## Enlaces de salida

A dónde lleva cada botón. Los destinos externos viven en `src/data/site.ts` (`LINKS`), así que
cambiar una URL se hace en un solo sitio. Todo enlace que empieza por `http` recibe
automáticamente `target="_blank"` y `rel="noopener noreferrer"` desde `MagneticA`.

### Destinos externos

| Clave en `LINKS` | URL |
|---|---|
| `spotify` | `https://open.spotify.com/show/6WmA7TTxcGMUM7Kp4abXVx` |
| `youtube` | `https://www.youtube.com/@WenddyNeciosup` |
| `youtubePlaylist` | `https://www.youtube.com/playlist?list=PLYkJP2_zxCIoVz6dP3OEFuD_2yxP1--dp` |
| `apple` | `https://podcasts.apple.com/pe/podcast/365-con-dios/id1546917854` |
| `instagram` | `https://www.instagram.com/wenddyneciosup/` |
| `facebook` | `https://www.facebook.com/wenddyneciosupm` |
| `amazon40` | `https://www.amazon.com/-/es/Wenddy-Neciosup-ebook/dp/B07NTW74YR/` |
| `amazon365` | `https://www.amazon.com/-/es/Wenddy-Neciosup-ebook/dp/B0BNY7Z4Z5/` |
| `paypal` | `https://paypal.me/wenddyneciosup?country.x=PE&locale.x=es_XC` |
| `westernUnion` | `https://www.westernunion.com/pe/es/home.html` |
| `certificado` | `https://wenddyneciosup.com/wp-content/uploads/2025/12/CERTIFICADO-365-.pdf` |
| `audioSample` | `/assets/audio/proverbios3.mp3` |
| correo | `mailto:wen.neciosup@gmail.com` |

### Botón por botón

#### Encabezado y menú móvil

| Elemento | Destino |
|---|---|
| Logo | `/` |
| «Plan 365» *(solo en páginas internas)* | `/la-biblia-en-365-dias/` |
| El libro · 365 con Dios · Podcast · Reto 365 · Autora · Apoyar | `/#libro` · `/#digital` · `/#podcast` · `/#reto` · `/#autora` · `/#apoyo` |
| «Conseguir el libro» *(en la portada)* | `amazon40` |
| «Escuchar el podcast» *(en páginas internas)* | `spotify` |
| Menú móvil: 7 entradas | `/#libro` · `/#muestra` · `/#digital` · `/#podcast` · `/#reto` · `/#autora` · `/#apoyo` |
| Menú móvil: iconos | `spotify` · `youtube` · `instagram` · `facebook` |

#### Portada

| Sección | Elemento | Destino |
|---|---|---|
| Hero | «Leer una muestra» | baja a `#muestra` |
| Hero | «Escuchar el podcast» | baja a `#podcast` |
| Hero | 4 iconos de plataforma | `spotify` · `youtube` · `apple` · `amazon365` |
| Hero | «desliza» | baja a `#marquee` |
| El libro | «Comprar en Amazon» | `amazon40` |
| El libro | «Ver muestra de un día» | baja a `#muestra` |
| Muestra | «Leerlo completo» | no navega: despliega el texto |
| 365 con Dios | «Descargar en Amazon» | `amazon365` |
| Podcast | Reproducir | no navega: `audioSample` |
| Podcast | Spotify · YouTube · Apple Podcasts · Amazon Music | `spotify` · `youtubePlaylist` · `apple` · `amazon365` |
| Reto | 12 tarjetas de mes | `/enero/` … `/diciembre/` |
| Reto | 9 etiquetas de promesas | `/promesas-enero/` … `/promesas-setiembre/` |
| Reto | «Descargar certificado» | `certificado` (PDF) |
| Autora | «Seguir en Instagram» | `instagram` |
| Apoyo | PayPal | `paypal` |
| Apoyo | Zelle | no navega: copia el correo al portapapeles |
| Apoyo | Western Union | `westernUnion` |
| Apoyo | QR de Yape | imagen, no navega |
| CTA final | «Conseguir el libro» | `amazon40` |
| CTA final | «Escríbeme» | `mailto:` |
| Flotante | «Volver arriba» | no navega: sube la página |

#### Pie de página

| Elemento | Destino |
|---|---|
| 6 iconos sociales | `facebook` · `instagram` · `youtube` · `spotify` · `apple` · `amazon365` |
| Explora | `/#libro` · `/#digital` · `/#podcast` · `/#reto` · `/#autora` |
| Plan 365 | `/la-biblia-en-365-dias/` · `/enero/` · `/promesas-enero/` · `certificado` |
| Correo | no navega: copia `wen.neciosup@gmail.com` |

#### Páginas de mes y de promesas

| Elemento | Destino |
|---|---|
| Miga de pan | `/` · `/la-biblia-en-365-dias/` |
| Barra de meses (12 o 9 enlaces) | `/<slug>/` de la misma serie |
| Enlace cruzado | la contraparte del mismo mes (`/marzo/` ↔ `/promesas-marzo/`) |
| Lámina del día | no navega: abre el visor |
| «Ver» | el episodio de **YouTube** de ese día |
| «Escuchar» | el episodio de **Spotify** de ese día |
| «Anterior» / «Siguiente» | el mes vecino de la misma serie |
| Franja inferior | `spotify` · `youtubePlaylist` · `apple` |

#### Plan de lectura

| Elemento | Destino |
|---|---|
| 12 portadas | `/enero/` … `/diciembre/` |
| 9 etiquetas de promesas | `/promesas-enero/` … `/promesas-setiembre/` |
| «Empezar por enero» | `/enero/` |
| «Certificado del reto» | `certificado` (PDF) |
| Franja inferior | `spotify` · `youtubePlaylist` · `amazon365` |

### Enlaces por lámina

Cada día tiene sus propios botones **Ver** y **Escuchar**, con destinos únicos guardados en
`src/data/routes.json`. Cuando falta uno, el botón sencillamente no se dibuja.

| | Enlaces | Láminas sin él |
|---|---|---|
| YouTube (**Ver**) | 602 | 21 |
| Spotify (**Escuchar**) | 609 | 14 |
| **Total** | **1211** | |

Dominios usados: `open.spotify.com` (605), `youtu.be` (577), `www.youtube.com` (25), `spotify.link` (4).

Ejemplos:

```
https://youtu.be/szH_FZ2zy5Q?si=JpQmdqZ_ktQa4EC6
https://open.spotify.com/episode/0PRZ5UMXwziVck9jmJSIcr?si=0FQ2ZNEHSmq1oMXoiwxrwA
```

> **Corregido:** en el sitio original, la promesa del 26 de febrero apuntaba a
> `https://youtube/QkMwjLr6GJA`, un dominio inexistente. Se reapuntó a
> `https://youtu.be/QkMwjLr6GJA`, que responde correctamente.
