import axios from 'axios';

// Usar proxy interno de Next.js en lugar de URL absoluta
const baseURL = '/api';

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function extractDigits(raw: string | undefined | null): string {
  if (!raw) return '';
  return String(raw).replace(/\D/g, '');
}

export function lastNDigits(raw: string, n: number): string {
  if (!raw) return '';
  return raw.slice(-n);
}


