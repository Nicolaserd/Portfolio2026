import 'dotenv/config'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import {
  ApiError,
  createComentario,
  likeComentario,
  listComentarios,
} from './api/comentarios.logic'

function readJsonBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    let raw = ''
    req.on('data', (chunk) => { raw += chunk })
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {})
      } catch (error) {
        reject(error)
      }
    })
    req.on('error', reject)
  })
}

/**
 * Sirve las rutas /api/comentarios contra Neon durante `pnpm dev` (vite),
 * reutilizando la MISMA logica que las Vercel Functions de produccion.
 * Asi el formulario guarda datos en desarrollo sin necesitar `vercel dev`.
 */
function devApiPlugin(): PluginOption {
  return {
    name: 'dev-api-comentarios',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next) => {
        const url = new URL(req.url ?? '', 'http://localhost')
        if (!url.pathname.startsWith('/api/comentarios')) return next()

        res.setHeader('Content-Type', 'application/json')

        try {
          if (url.pathname === '/api/comentarios' && req.method === 'GET') {
            const data = await listComentarios({
              page: Number(url.searchParams.get('page') ?? 1),
              itemsPerPage: Number(url.searchParams.get('itemsPorPagina') ?? 10),
            })
            res.statusCode = 200
            return res.end(JSON.stringify(data))
          }

          if (url.pathname === '/api/comentarios' && req.method === 'POST') {
            const data = await createComentario(await readJsonBody(req))
            res.statusCode = 201
            return res.end(JSON.stringify(data))
          }

          if (url.pathname === '/api/comentarios/corazones' && req.method === 'POST') {
            const data = await likeComentario(await readJsonBody(req))
            res.statusCode = 200
            return res.end(JSON.stringify(data))
          }

          res.statusCode = 405
          return res.end(JSON.stringify({ message: 'Metodo no permitido.' }))
        } catch (error) {
          const status = error instanceof ApiError ? error.status : 500
          const message = error instanceof Error ? error.message : 'Error interno del servidor.'
          res.statusCode = status
          return res.end(JSON.stringify({ message }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devApiPlugin()],
})
