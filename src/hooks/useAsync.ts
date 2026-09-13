import { useState, useCallback } from 'react';

interface UseAsyncReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (...args: unknown[]) => Promise<T | null>;
}

/**
 * Custom React hook to execute async functions with data, loading, and error states.
 */
export function useAsync<T>(
  asyncFunction: (...args: unknown[]) => Promise<T>
): UseAsyncReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (...args: unknown[]): Promise<T | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await asyncFunction(...args);
        setData(response);
        setLoading(false);
        return response;
      } catch (err) {
        const catchedError = err instanceof Error ? err : new Error(String(err));
        setError(catchedError);
        setLoading(false);
        return null;
      }
    },
    [asyncFunction]
  );

  return { data, loading, error, execute };
}
