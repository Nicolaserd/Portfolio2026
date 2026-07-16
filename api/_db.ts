import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

/**
 * Cliente SQL contra Neon, inicializado de forma perezosa para que importar
 * este modulo (p. ej. desde el middleware de dev de Vite) no falle si aun no
 * hay DATABASE_URL. La conexion se crea en la primera consulta real.
 *
 * DATABASE_URL se configura en las variables de entorno del proyecto
 * (local: .env; Vercel: Project Settings -> Environment Variables).
 */
let client: NeonQueryFunction<false, false> | null = null;

export function getSql(): NeonQueryFunction<false, false> {
  if (!client) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('Falta DATABASE_URL en el entorno.');
    }
    client = neon(connectionString);
  }
  return client;
}
