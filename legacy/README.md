# Versión estática (histórica)

Instantánea del sitio antes de migrarlo a React. No forma parte del build.

- `index.static.html` — la portada escrita a mano.
- `js/main.js`, `js/inner.js` — las interacciones, hoy portadas a hooks y componentes.
- `build-pages.py` — generaba las 22 carpetas con su `index.html`. Ya no se usa:
  las rutas las resuelve React Router desde `src/data/routes.json`.
- `serve.py` — servidor de desarrollo sin caché. Lo reemplaza `npm run dev`.

Se puede borrar esta carpeta entera sin afectar al proyecto.
