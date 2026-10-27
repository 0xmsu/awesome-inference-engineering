import type { APIRoute } from 'astro';
import { catalogPayload } from '../lib/data.ts';

/** Compact payload for the catalog's client-side filtering. */
export const GET: APIRoute = () =>
  new Response(JSON.stringify(catalogPayload()), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
