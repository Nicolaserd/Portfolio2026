# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Portafolio personal de Nicolás Inchaustegui. SPA en React 19 + TypeScript + Vite con navegación por hash (sin router externo), y una API serverless propia (Vercel Functions) sobre Neon Postgres. Estética neo-brutalista / claymórfica de inspiración andina. El idioma del proyecto (UI, comentarios, mensajes de commit, nombres de variables) es español.

## Comandos

```
pnpm install              # instalar dependencias (único gestor permitido, ver abajo)
pnpm run dev              # solo UI (vite). Las llamadas a /api fallan con 404: no hay servidor de funciones detrás.
pnpm run dev:api          # UI + API + Neon vía `vercel dev` (requiere Vercel CLI y sesión iniciada)
pnpm run build            # tsc -b && vite build
pnpm run lint             # eslint . (sin flag para un solo archivo; pasa el path: `pnpm exec eslint src/App.tsx`)
pnpm run preview           # sirve el build de dist/
pnpm run db:migrate       # node scripts/migrate-to-neon.mjs — migración única/idempotente de datos a Neon
pnpm audit                # debe reportar 0 vulnerabilidades tras tocar dependencias
```

No hay test runner configurado en este repo (no existe script `test`).

**Gestor de paquetes: pnpm, siempre.** Nunca `npm` ni `yarn`. El único lockfile válido es `pnpm-lock.yaml`; si aparece `package-lock.json` o `yarn.lock`, es un error y hay que borrarlo. La versión está fijada en `package.json` (`packageManager`). Al agregar una dependencia, usa la última estable **compatible con el resto del stack**: si un major rompe peer dependencies (p. ej. pasó con TypeScript 7 vs `typescript-eslint`, que aún exige `<6.1.0`), quédate en la última versión compatible en vez de forzarlo.

## Arquitectura

### Frontend (`src/`)

Enrutamiento sin librería: `App.tsx` lee/escribe `window.location.hash` (`home`/`projects`/`about`/`comments`), mantiene el tipo `Page` y el array `VALID_PAGES` como fuente de verdad, y renderiza desde un mapa `Record<Page, ReactElement>`. Al agregar una página hay que tocar los tres puntos.

Co-localización estricta por página — no hay carpeta `components/` global salvo para lo verdaderamente compartido:
```
src/
├── components/common/     # Solo lo usado por ≥2 páginas (TopNav, BottomNav)
├── pages/<Pagina>/
│   ├── <Pagina>.tsx        # componente principal
│   ├── <Pagina>.css        # estilos exclusivos de la página
│   ├── components/         # subcomponentes exclusivos de esa página
│   └── <pagina>.api.ts     # funciones fetch + tipos hacia /api/* (si la página habla con el backend)
├── styles/index.css        # único lugar para tokens de diseño, reset, tipografía
├── App.tsx
└── main.tsx
```
Las llamadas de red viven siempre en el `*.api.ts` de la página, con sus `interface` exportadas — nunca `fetch` inline en el componente (ver `src/pages/Comments/comments.api.ts` como referencia).

### Backend (`api/`) — Vercel Functions sobre Neon

No hay servidor Node propio; el CRUD vive en funciones serverless desplegadas junto al frontend, y la lógica de negocio está factorizada para poder reutilizarse en dos runtimes distintos:

- `api/comentarios.logic.ts` — funciones puras (`listComentarios`, `createComentario`, `likeComentario`) con acceso a Neon. Aquí vive toda la lógica real; lanza `ApiError(status, message)` para errores de negocio.
- `api/_db.ts` — cliente Neon compartido (lazy: `getSql()` crea la conexión en el primer uso, para poder importar el módulo sin `DATABASE_URL` presente).
- `api/_types.ts` — tipos mínimos `VercelRequest`/`VercelResponse` (no se depende de `@vercel/node` a propósito: arrastraba un build script de `esbuild` que pnpm bloqueaba).
- `api/comentarios/index.ts` (`GET`/`POST`) y `api/comentarios/corazones.ts` (`POST`) — son wrappers delgados: parsean `req`, llaman a `comentarios.logic.ts`, mapean `ApiError` a status HTTP.
- **El mismo `comentarios.logic.ts` se reutiliza en dev**: `vite.config.ts` define un plugin (`devApiPlugin`) que registra un middleware de Vite sirviendo `/api/comentarios*` durante `pnpm run dev`, para no depender de `vercel dev` en el día a día. Si cambias el contrato de un endpoint, hazlo en `comentarios.logic.ts` una sola vez — nunca dupliques la query en el middleware de Vite y en la función de Vercel por separado.

Contrato HTTP (no romper sin actualizar `comments.api.ts` en el frontend):
- `GET /api/comentarios?page&itemsPorPagina` → `{ page, itemsPerPage, totalItems, totalPages, items[] }`
- `POST /api/comentarios` `{ nombre_usuario, comentario, correo? }` → `{ usuario, comentario }`
- `POST /api/comentarios/corazones` `{ comentario_id }` → `{ comentarioId, corazonesRecibidos }`

Esquema Neon:
- `usuarios (id uuid pk, nombre text, correo text null, fecha_creacion timestamptz)`
- `comentarios (id uuid pk, usuario_id uuid fk→usuarios, contenido text, cantidad_likes int, fecha_creacion timestamptz)`

Reglas de esta capa:
- El acceso a Postgres vive **solo** en `api/`, nunca desde el navegador.
- `DATABASE_URL` viene de env vars: local en `.env` (gitignored, nunca commitear), en producción en Vercel → Project Settings → Environment Variables.
- `@neondatabase/serverless` es dependencia de **producción** (runtime de las funciones), no dev.
- El frontend llama a la API same-origin (`VITE_BACKEND_URL` vacío en `.env`); no reintroducir una URL absoluta de un backend externo.

### Sistema de diseño

Todos los valores visuales salen de las variables CSS en `src/styles/index.css` — no hardcodear colores/sombras en componentes; si falta un token, añadirlo ahí.

- Paleta Material-style: `--surface*`, `--on-surface*`, `--primary: #ad0017` / `--primary-container`, `--secondary`, `--outline`, `--error`.
- Tipografía `--font: 'Space Grotesk'`; iconos con Material Symbols Outlined (`<span className="material-symbols-outlined">`).
- Estilo neo-brutalista/claymórfico: sombras duras sin blur (`--neo-shadow`, `--neo-shadow-lg`, `--neo-shadow-up`) y relieve `--clay-inner`; botones con capa "shadow" + "face" superpuestas (ver `Home.tsx`).
- Motivo andino: `.chakana-pattern` (puntos) y `.scanlines` como texturas sutiles de fondo.
- Mobile-first con breakpoint principal `@media (min-width: 768px)`; `BottomNav` solo mobile (`.mobile-nav-wrapper`), `TopNav` solo desktop. Varias páginas (Home, Comments) renderizan secciones `*-mobile` y `*-desktop` separadas en vez de una sola con CSS responsive — seguir ese patrón si aplica.

## Notas conocidas

- `src/pages/Comments/Comments.tsx` tiene 4 errores preexistentes de `eslint-plugin-react-hooks` (`react-hooks/purity`, `react-hooks/set-state-in-effect` por usos de `Date.now()` durante el render y `setState` síncrono en un efecto). No son parte de cambios nuevos salvo que se pida arreglarlos explícitamente.
