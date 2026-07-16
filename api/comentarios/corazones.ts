import type { VercelRequest, VercelResponse } from '../_types';
import { ApiError, likeComentario } from '../comentarios.logic';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Metodo no permitido.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body ?? {});
    const data = await likeComentario(body);
    return res.status(200).json(data);
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.status).json({ message: error.message });
    }
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
}
