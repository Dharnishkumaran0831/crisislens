/**
 * Environment Variable Validation Utility
 */

export interface EnvValidationResult {
  isValid: boolean;
  missingKeys: string[];
}

const REQUIRED_ENV_KEYS = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_PUBLISHABLE_KEY',
];

/**
 * Validates that all required runtime environment variables are defined.
 */
export function validateEnv(env: Record<string, string | undefined> = import.meta.env): EnvValidationResult {
  const missingKeys: string[] = [];

  for (const key of REQUIRED_ENV_KEYS) {
    if (!env[key]) {
      missingKeys.push(key);
    }
  }

  const isValid = missingKeys.length === 0;

  if (!isValid && process.env.NODE_ENV !== 'production') {
    console.warn(`[EnvValidator] Missing required environment variables: ${missingKeys.join(', ')}`);
  }

  return { isValid, missingKeys };
}
