/**
 * Utility to get environment variables.
 * In production (Cloud Run), the Express server injects window.ENV into index.html at runtime.
 * In development (Vite), we fallback to import.meta.env.
 */
export function getEnv(key: string): string {
  if (typeof window !== 'undefined' && (window as any).ENV && (window as any).ENV[key] !== undefined) {
    return (window as any).ENV[key];
  }
  // @ts-ignore
  return import.meta.env[key] || '';
}
