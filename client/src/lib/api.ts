/**
 * API base resolution:
 * - If VITE_API_URL is set → use it as real backend (https://api.example.com).
 * - Else (GH Pages) → serve static JSON under BASE_URL (/cnovoidline/).
 */
const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
const REAL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export const apiUrl = (path: string) =>
  REAL ? `${REAL}/api${path}` : `${BASE}/api${path}.json`

export async function getJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const url = apiUrl(path)
  const res = await fetch(url, { credentials: 'include', ...init })
  if (!res.ok) {
    const text = (await res.text()) || res.statusText
    throw new Error(`${res.status}: ${text}`)
  }
  return res.json() as Promise<T>
}
