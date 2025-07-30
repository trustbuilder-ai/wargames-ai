import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "./useAuth";
import type { Options } from "../backend_client/sdk.gen";

interface UseApiDataOptions<TParams> {
  requiresAuth?: boolean;
  enabled?: boolean;
  initialParams?: TParams;
}

// Extract the parameter type from the SDK function
type ExtractParams<T> = T extends (params: infer P) => any ? P : never;

/**
 * Universal hook for fetching data from API endpoints.
 * Works with both public and protected endpoints.
 * Automatically handles authentication, loading states, and parameter updates.
 */
export function useApiData<
  TData,
  TError = Error,
  TFetcher extends (
    params?: any,
  ) => Promise<{ data?: TData; error?: TError }> = any,
>(fetcher: TFetcher, options: UseApiDataOptions<ExtractParams<TFetcher>> = {}) {
  type TParams = ExtractParams<TFetcher>;

  const { requiresAuth = false, enabled = true, initialParams } = options;
  const { session, loading: authLoading } = useAuth();
  const [params, setParams] = useState<TParams | undefined>(initialParams);
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<TError | null>(null);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(
    async (fetchParams?: TParams) => {
      // Skip if disabled
      if (!enabled) return;

      // Skip if auth is required but no session exists
      if (requiresAuth && !session) {
        setData(null);
        setError(null);
        return;
      }

      // Skip if we're still loading auth state for protected endpoints
      if (requiresAuth && authLoading) return;

      // Cancel any in-flight requests
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setLoading(true);
      try {
        const response = await fetcher({
          ...fetchParams,
          signal: abortControllerRef.current.signal,
        } as any);

        if (response.error) {
          setError(response.error);
          setData(null);
        } else {
          setData(response.data!);
          setError(null);
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err as TError);
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    },
    [session, authLoading, requiresAuth, enabled, fetcher],
  );

  // Initial fetch and refetch when params change
  useEffect(() => {
    fetchData(params);

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchData, params]);

  // Imperative refetch with optional new params
  const refetch = useCallback(
    (newParams?: TParams) => {
      if (newParams !== undefined) {
        setParams(newParams);
      } else {
        fetchData(params);
      }
    },
    [fetchData, params],
  );

  // Update params (triggers automatic refetch)
  const updateParams = useCallback((newParams: TParams) => {
    setParams(newParams);
  }, []);

  return {
    data,
    error,
    loading,
    params,
    refetch,
    updateParams,
  };
}
