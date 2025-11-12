// Environment configuration helper
// Supports both VITE_ prefixed (local dev) and non-prefixed (Vercel) variables

const getEnvVar = (key: string): string => {
  // Try with VITE_ prefix first (local development)
  const viteKey = `VITE_${key}`;
  return import.meta.env[viteKey] || import.meta.env[key] || "";
};

export const env = {
  TMDB_API_BASE_URL: getEnvVar("TMDB_API_BASE_URL"),
  TMDB_API_KEY: getEnvVar("TMDB_API_KEY"),
  FIREBASE_API_KEY: getEnvVar("FIREBASE_API_KEY"),
  FIREBASE_AUTH_DOMAIN: getEnvVar("FIREBASE_AUTH_DOMAIN"),
  FIREBASE_PROJECT_ID: getEnvVar("FIREBASE_PROJECT_ID"),
  FIREBASE_STORAGE_BUCKET: getEnvVar("FIREBASE_STORAGE_BUCKET"),
  FIREBASE_MESSAGING_SENDER_ID: getEnvVar("FIREBASE_MESSAGING_SENDER_ID"),
  FIREBASE_APP_ID: getEnvVar("FIREBASE_APP_ID"),
  OPENROUTER_API_KEY: getEnvVar("OPENROUTER_API_KEY"),
};
