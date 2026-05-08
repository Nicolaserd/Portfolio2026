export interface BackendComment {
  idUsuario: string;
  idComentario: string;
  nombreUsuario: string;
  corazonesRecibidos: number;
  comentario: string;
}

export interface PaginatedCommentsResponse {
  page: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  items: BackendComment[];
}

interface LikeCommentResponse {
  comentarioId: string;
  corazonesRecibidos: number | null;
}

export interface CreateCommentPayload {
  nombre_usuario: string;
  comentario: string;
  correo?: string;
}

export interface CreateCommentResponse {
  usuario: {
    id: string;
    nombre: string;
    correo?: string | null;
  };
  comentario: {
    id: string;
    contenido: string;
    cantidadLikes: number;
    fechaCreacion: string;
  };
}

const API_BASE_URL = (import.meta.env.VITE_BACKEND_URL ?? '').replace(/\/+$/, '');

function buildApiUrl(path: string): string {
  if (!API_BASE_URL) return path;
  return `${API_BASE_URL}${path}`;
}

export async function fetchComentariosPage(page = 1, itemsPerPage = 10): Promise<PaginatedCommentsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    itemsPorPagina: String(itemsPerPage),
  });

  const response = await fetch(buildApiUrl(`/comentarios?${params.toString()}`));

  if (!response.ok) {
    throw new Error(`No se pudo cargar la pagina ${page} de comentarios: ${response.status}`);
  }

  return (await response.json()) as PaginatedCommentsResponse;
}

export async function addCorazonToComentario(comentarioId: string): Promise<LikeCommentResponse> {
  const response = await fetch(buildApiUrl('/comentarios/corazones'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      comentario_id: comentarioId,
    }),
  });

  if (!response.ok) {
    throw new Error(`No se pudo registrar el corazon para ${comentarioId}: ${response.status}`);
  }

  return (await response.json()) as LikeCommentResponse;
}

export async function createComentario(payload: CreateCommentPayload): Promise<CreateCommentResponse> {
  const response = await fetch(buildApiUrl('/comentarios'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = `No se pudo crear el comentario: ${response.status}`;

    try {
      const errorData = (await response.json()) as { message?: string };

      if (errorData.message) {
        message = errorData.message;
      }
    } catch {
      // Si el backend no responde JSON, conservamos el mensaje base.
    }

    throw new Error(message);
  }

  return (await response.json()) as CreateCommentResponse;
}
