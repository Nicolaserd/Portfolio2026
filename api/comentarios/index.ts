import type { VercelRequest, VercelResponse } from '../_types';
import { ApiError, createComentario, listComentarios } from '../comentarios.logic';

function parseBody(body: unknown): Record<string, unknown> {
  if (typeof body === 'string') return JSON.parse(body || '{}');
  return (body as Record<string, unknown>) ?? {};
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const data = await listComentarios({
        page: Number(req.query.page ?? 1),
        itemsPerPage: Number(req.query.itemsPorPagina ?? 10),
      });
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const data = await createComentario(parseBody(req.body));
      return res.status(201).json(data);
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ message: 'Metodo no permitido.' });
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.status).json({ message: error.message });
    }
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
}
