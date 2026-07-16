/**
 * Tipos minimos para las Vercel Functions (firma Node http compatible con Vercel).
 * Evita depender de @vercel/node; el runtime real lo provee Vercel en produccion.
 */
export interface VercelRequest {
  method?: string;
  query: Record<string, string | string[] | undefined>;
  body: unknown;
  headers: Record<string, string | string[] | undefined>;
}

export interface VercelResponse {
  status(code: number): VercelResponse;
  json(body: unknown): VercelResponse;
  setHeader(name: string, value: string): void;
}
