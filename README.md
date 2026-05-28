# diegoalegil.github.io

Portfolio personal de **Diego Gil** — desarrollador backend (Java · Spring Boot · PostgreSQL), estudiante de DAM en Tenerife.

Sitio web estático servido con **GitHub Pages**: [diegoalegil.github.io](https://diegoalegil.github.io/)

## Stack

- HTML5 semántico, CSS3 (un único `main.css`, mobile-first) y JavaScript vanilla.
- Sin framework, sin build, sin dependencias de runtime.
- Fuentes (Orbitron, Inter) e iconos de tecnologías **auto-hospedados** — cero peticiones a terceros.

## Estructura

```
.
├── index.html              # Página única
├── 404.html                # Página de error
├── assets/
│   ├── css/
│   │   ├── main.css         # Estilos del sitio
│   │   └── fonts.css        # @font-face locales
│   ├── fonts/               # Orbitron + Inter (woff2, subset latin)
│   ├── img/
│   │   ├── tech/            # Iconos de tecnologías (SVG)
│   │   └── *.webp / *.png   # Hero responsive, foto, favicon, OG
│   └── js/main.js           # Menú móvil + reveal on scroll
├── robots.txt
├── sitemap.xml
└── site.webmanifest
```

## Desarrollo local

No requiere instalación. Sirve la carpeta con cualquier servidor estático:

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Despliegue

Automático vía GitHub Pages al hacer push a `main`. El archivo `.nojekyll` desactiva el procesado Jekyll.
