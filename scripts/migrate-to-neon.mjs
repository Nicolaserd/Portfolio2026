/**
 * Migracion unica a Neon: crea el esquema (usuarios, comentarios) e importa
 * los datos existentes desde el backend anterior preservando UUIDs y likes.
 * Idempotente: se puede correr varias veces sin duplicar (ON CONFLICT DO NOTHING).
 *
 * Uso: node scripts/migrate-to-neon.mjs
 * Requiere DATABASE_URL en .env (Neon).
 */
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
const LEGACY_BACKEND_URL = process.env.VITE_BACKEND_URL ?? 'https://backendportfolio-alpha.vercel.app';

if (!DATABASE_URL) {
  console.error('Falta DATABASE_URL en el entorno.');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function createSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS usuarios (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      nombre text NOT NULL,
      correo text,
      fecha_creacion timestamptz NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS comentarios (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      usuario_id uuid NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
      contenido text NOT NULL,
      cantidad_likes integer NOT NULL DEFAULT 0,
      fecha_creacion timestamptz NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_comentarios_fecha ON comentarios (fecha_creacion ASC)`;
  console.log('Esquema listo (usuarios, comentarios).');
}

async function fetchLegacyComments() {
  const items = [];
  let page = 1;

  while (true) {
    const url = `${LEGACY_BACKEND_URL.replace(/\/+$/, '')}/comentarios?page=${page}&itemsPorPagina=10`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Backend anterior respondio ${res.status} en pagina ${page}`);
    const data = await res.json();
    items.push(...data.items);

    if (page >= (data.totalPages ?? 1)) break;
    page += 1;
  }

  return items;
}

async function migrate() {
  await createSchema();

  const legacy = await fetchLegacyComments();
  console.log(`Descargados ${legacy.length} comentarios del backend anterior.`);

  // Preserva el orden original asignando fecha_creacion incremental.
  const base = Date.now() - legacy.length * 1000;
  let inserted = 0;

  for (let i = 0; i < legacy.length; i += 1) {
    const c = legacy[i];
    const fecha = new Date(base + i * 1000).toISOString();

    await sql`
      INSERT INTO usuarios (id, nombre)
      VALUES (${c.idUsuario}, ${c.nombreUsuario})
      ON CONFLICT (id) DO NOTHING
    `;
    const result = await sql`
      INSERT INTO comentarios (id, usuario_id, contenido, cantidad_likes, fecha_creacion)
      VALUES (${c.idComentario}, ${c.idUsuario}, ${c.comentario}, ${Number(c.corazonesRecibidos ?? 0)}, ${fecha})
      ON CONFLICT (id) DO NOTHING
      RETURNING id
    `;
    if (result.length > 0) inserted += 1;
  }

  const [{ count: totalUsuarios }] = await sql`SELECT count(*)::int AS count FROM usuarios`;
  const [{ count: totalComentarios }] = await sql`SELECT count(*)::int AS count FROM comentarios`;

  console.log(`Insertados ${inserted} comentarios nuevos.`);
  console.log(`Total en Neon -> usuarios: ${totalUsuarios}, comentarios: ${totalComentarios}`);
}

migrate()
  .then(() => {
    console.log('Migracion completada.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error en la migracion:', err);
    process.exit(1);
  });
