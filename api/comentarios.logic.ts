import { getSql } from './_db';

/** Error con codigo HTTP para mapear en cada capa (Vercel Function / dev de Vite). */
export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export interface ListParams {
  page?: number;
  itemsPerPage?: number;
}

export async function listComentarios({ page = 1, itemsPerPage = 10 }: ListParams) {
  const sql = getSql();
  const safePage = Math.max(1, Number(page) || 1);
  const safePerPage = Math.min(50, Math.max(1, Number(itemsPerPage) || 10));
  const offset = (safePage - 1) * safePerPage;

  const [{ total }] = await sql`SELECT count(*)::int AS total FROM comentarios`;
  const totalItems = Number(total);
  const totalPages = Math.max(1, Math.ceil(totalItems / safePerPage));

  const items = await sql`
    SELECT
      u.id             AS "idUsuario",
      c.id             AS "idComentario",
      u.nombre         AS "nombreUsuario",
      c.cantidad_likes AS "corazonesRecibidos",
      c.contenido      AS "comentario"
    FROM comentarios c
    JOIN usuarios u ON u.id = c.usuario_id
    ORDER BY c.fecha_creacion ASC, c.id ASC
    LIMIT ${safePerPage} OFFSET ${offset}
  `;

  return { page: safePage, itemsPerPage: safePerPage, totalItems, totalPages, items };
}

export interface CreateParams {
  nombre_usuario?: string;
  comentario?: string;
  correo?: string;
}

export async function createComentario(input: CreateParams) {
  const sql = getSql();
  const nombre = String(input.nombre_usuario ?? '').trim();
  const contenido = String(input.comentario ?? '').trim();
  const correo = input.correo ? String(input.correo).trim() : null;

  if (!nombre) throw new ApiError(400, 'nombre_usuario es obligatorio.');
  if (!contenido) throw new ApiError(400, 'comentario es obligatorio.');

  const [usuario] = await sql`
    INSERT INTO usuarios (nombre, correo)
    VALUES (${nombre}, ${correo})
    RETURNING id, nombre, correo
  `;
  const [comentario] = await sql`
    INSERT INTO comentarios (usuario_id, contenido)
    VALUES (${usuario.id}, ${contenido})
    RETURNING
      id,
      contenido,
      cantidad_likes AS "cantidadLikes",
      fecha_creacion AS "fechaCreacion"
  `;

  return { usuario, comentario };
}

export interface LikeParams {
  comentario_id?: string;
}

export async function likeComentario(input: LikeParams) {
  const sql = getSql();
  const comentarioId = String(input.comentario_id ?? '').trim();

  if (!comentarioId) throw new ApiError(400, 'comentario_id es obligatorio.');

  const rows = await sql`
    UPDATE comentarios
    SET cantidad_likes = cantidad_likes + 1
    WHERE id = ${comentarioId}
    RETURNING id AS "comentarioId", cantidad_likes AS "corazonesRecibidos"
  `;

  if (rows.length === 0) throw new ApiError(404, 'Comentario no encontrado.');

  return rows[0];
}
