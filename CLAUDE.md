# CLAUDE.md

Guía para trabajar en este proyecto. Estas instrucciones son obligatorias y tienen prioridad sobre comportamientos por defecto.

Portafolio personal de Nicolás Inchaustegui. SPA en **React 19 + TypeScript + Vite**, con navegación por hash (sin router externo). Estética *neo-brutalista / claymórfica de inspiración andina*. El idioma del proyecto (UI, comentarios, mensajes) es **español**.

---

## 1. Gestor de paquetes: pnpm (obligatorio)

- **Instalar / actualizar / eliminar cualquier dependencia se hace SIEMPRE con `pnpm`.** Nunca `npm` ni `yarn`.
  - Instalar: `pnpm add <paquete>` · dev: `pnpm add -D <paquete>` · quitar: `pnpm remove <paquete>`
  - Instalar todo: `pnpm install` · Scripts: `pnpm run <script>` (`dev`, `build`, `lint`, `preview`)
- El único lockfile válido es **`pnpm-lock.yaml`**. Si aparece `package-lock.json` o `yarn.lock`, es un error: elimínalo.
- La versión de pnpm está fijada en `package.json` (`packageManager`). No la cambies sin motivo.
- Tras cambios en dependencias: `pnpm audit` debe reportar **0 vulnerabilidades** y `pnpm run build` debe pasar.
- Al agregar una dependencia, prefiere la última versión estable **compatible con el resto del stack**; si un `major` rompe peer dependencies (p. ej. TypeScript vs typescript-eslint), quédate en la última versión compatible en lugar de forzar el major.

## 2. Comandos

| Acción | Comando |
|---|---|
| Desarrollo (solo UI, sin API) | `pnpm run dev` |
| Desarrollo full-stack (UI + API + Neon) | `pnpm run dev:api` (`vercel dev`) |
| Build producción | `pnpm run build` (`tsc -b && vite build`) |
| Lint | `pnpm run lint` |
| Preview del build | `pnpm run preview` |
| Migrar datos a Neon | `pnpm run db:migrate` |

La API es **same-origin** en `/api/*` (Vercel Functions). El frontend las llama con base vacía (`VITE_BACKEND_URL=` en `.env`). Para probar la API localmente usa `vercel dev`; `pnpm run dev` (vite puro) sirve la UI pero las llamadas a `/api` fallan de forma controlada.

## 3. Arquitectura y scaffolding

Estructura real (fuente de verdad también en [.agents/rules/arquitectura.md](.agents/rules/arquitectura.md)):

```
src/
├── components/common/     # Componentes compartidos entre páginas (TopNav, BottomNav)
├── pages/<Pagina>/        # Una carpeta por página
│   ├── <Pagina>.tsx       # Componente principal de la página
│   ├── <Pagina>.css       # Estilos exclusivos de la página
│   ├── components/        # Componentes exclusivos de esa página
│   └── <pagina>.api.ts    # Capa cliente que llama a /api/* (si aplica)
├── styles/index.css       # Estilos globales: tokens (variables CSS), reset, tipografía
├── App.tsx                # Raíz + enrutamiento por hash (#home/#projects/#about/#comments)
└── main.tsx               # Punto de entrada

api/                       # Vercel Functions (backend serverless sobre Neon)
├── _db.ts                 # Cliente SQL compartido (@neondatabase/serverless)
├── _types.ts              # Tipos VercelRequest/VercelResponse mínimos
└── comentarios/
    ├── index.ts           # GET (listar paginado) + POST (crear comentario)
    └── corazones.ts       # POST (sumar corazón/like)

scripts/migrate-to-neon.mjs # Migración única de datos al esquema de Neon
```

**Convenciones al crear/modificar código:**
- **Co-localización estricta:** cada página vive en su carpeta con su `.tsx`, su `.css` y sus `components/` propios. Lo que usan ≥2 páginas va a `components/common/`.
- **Nombres:** carpetas y componentes en `PascalCase`; archivos de API en `<nombre>.api.ts`.
- **Separación de capas:** las llamadas `fetch`/backend viven en el `*.api.ts` de la página con sus tipos (`interface`) exportados, no dentro del componente. Los componentes consumen esas funciones.
- **Enrutamiento:** se hace por `window.location.hash` en `App.tsx`. Al agregar una página nueva, extiende el tipo `Page`, `VALID_PAGES` y el mapa `pages`.
- **CSS:** un `.css` por componente/página, importado desde su `.tsx`. Los estilos globales y variables van solo en `src/styles/index.css`.
- **Comentarios:** solo los importantes sobre el funcionamiento de funciones/componentes. Nada de comentarios obvios o decorativos.

**DRY — antes de escribir código:**
1. Analiza la arquitectura actual (patrones, carpetas, dependencias, flujo de datos).
2. Evalúa si puedes **reutilizar** algo existente, **extender** un componente, o si **justifica** crear uno nuevo.
3. Respeta la separación de capas, la modularidad y las convenciones. Evita duplicar lógica.
4. Si la solución rompe la arquitectura o mete deuda técnica, propón una alternativa mejor alineada antes de implementar.

**Datos y backend (Neon):**
- La base de datos es **Neon (PostgreSQL)**. El acceso vive **solo** en las Vercel Functions de `api/`; nunca desde el navegador.
- Toda función usa el cliente compartido `api/_db.ts` (`sql` de `@neondatabase/serverless`). No crees clientes nuevos ni conexiones sueltas.
- La conexión viene de `DATABASE_URL` (env var). **En Vercel debe configurarse en Project Settings → Environment Variables**; en local en `.env` (que está en `.gitignore` — nunca commitear credenciales).
- **`@neondatabase/serverless` es dependencia de producción** (la usan las funciones en runtime), no devDependency.
- Esquema:
  - `usuarios (id uuid pk, nombre text, correo text null, fecha_creacion timestamptz)`
  - `comentarios (id uuid pk, usuario_id uuid fk→usuarios, contenido text, cantidad_likes int, fecha_creacion timestamptz)`
- Contrato de la API (no romperlo sin actualizar el cliente `comments.api.ts`):
  - `GET /api/comentarios?page&itemsPorPagina` → `{ page, itemsPerPage, totalItems, totalPages, items[] }`
  - `POST /api/comentarios` `{ nombre_usuario, comentario, correo? }` → `{ usuario, comentario }`
  - `POST /api/comentarios/corazones` `{ comentario_id }` → `{ comentarioId, corazonesRecibidos }`

## 4. Sistema de diseño

Todos los valores de diseño se toman de las **variables CSS** definidas en `src/styles/index.css`. **No hardcodees colores ni sombras**; usa los tokens.

- **Paleta (Material-style tokens):** superficies `--surface*`, texto `--on-surface*`, primario rojo `--primary: #ad0017` / `--primary-container`, `--secondary`, `--outline`, `--error`. Fondo claro por defecto.
- **Tipografía:** `--font: 'Space Grotesk'`. Iconos con **Material Symbols Outlined** (`<span className="material-symbols-outlined">`).
- **Estilo neo-brutalista / claymórfico:** sombras duras `--neo-shadow`, `--neo-shadow-lg`, `--neo-shadow-up` (offset sólido, sin blur) y relieve `--clay-inner`. Bordes marcados, botones con capa "shadow" + "face" (ver `Home.tsx`).
- **Toque andino:** patrón de puntos `.chakana-pattern` y `.scanlines` como texturas sutiles.
- **Responsive:** enfoque *mobile-first* con secciones separadas mobile/desktop cuando hace falta; breakpoint principal `@media (min-width: 768px)`. `BottomNav` solo en mobile (`.mobile-nav-wrapper`), `TopNav` en desktop. Usa unidades relativas y `100dvh`.
- **Coherencia:** cualquier elemento nuevo debe verse parte del mismo sistema (mismos tokens, sombras, tipografía y lenguaje visual). Si necesitas un valor nuevo recurrente, agrégalo como variable en `index.css`, no inline.

## 5. Verificación antes de terminar

- `pnpm run build` pasa.
- `pnpm run lint` sin **nuevos** errores (los preexistentes en `src/pages/Comments/Comments.tsx` no son parte de tu cambio salvo que se pida arreglarlos).
- `pnpm audit`: 0 vulnerabilidades.
- Reporta con honestidad qué se verificó y qué quedó pendiente.
