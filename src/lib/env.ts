const DEFAULT_ADMIN_PASSWORD = "vivanel123";
const DEFAULT_AUTH_SECRET = "vivanelhome-auth-secret-local";
const DEFAULT_SUPABASE_BUCKET = "product-images";

function readEnvValue(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

function stripWrappingQuotes(value: string) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

export function getAdminPassword() {
  return readEnvValue(process.env.ADMIN_PASSWORD, DEFAULT_ADMIN_PASSWORD);
}

export function getAdminPasswordHash() {
  const hash = process.env.ADMIN_PASSWORD_HASH?.trim();
  return hash && hash.length > 0 ? stripWrappingQuotes(hash) : null;
}

export function getAuthSecret() {
  return readEnvValue(process.env.AUTH_SECRET, DEFAULT_AUTH_SECRET);
}

export function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || null;
}

export function getSupabaseServiceRoleKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || null;
}

export function getSupabaseStorageBucket() {
  return readEnvValue(process.env.SUPABASE_STORAGE_BUCKET, DEFAULT_SUPABASE_BUCKET);
}

export function isSupabaseConfigured() {
  const url = getSupabaseUrl();
  const key = getSupabaseServiceRoleKey();

  if (!url || !key) {
    return false;
  }

  if (!url.startsWith("https://")) {
    return false;
  }

  if (url.includes("YOUR-PROJECT") || key.includes("YOUR_SUPABASE")) {
    return false;
  }

  return true;
}
