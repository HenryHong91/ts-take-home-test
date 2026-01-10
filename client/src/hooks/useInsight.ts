import { useCallback, useState } from "react";
import {
  createInsights,
  deleteInsights,
  getAllInsights,
} from "../services/insightAPIs.ts";
import type {
  CreateInsightProp,
  InsightAPIRes,
  InsightId,
} from "../../../lib/schemas/insight.ts";

/**
 * Type for standardizing API call results.
 * This improves visibility by making the success/failure state explicit.
 */
export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

const useApiState = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseFetch = useCallback(
    async (action: () => Promise<T>): Promise<ApiResult<T>> => {
      setLoading(true);
      setError(null);
      try {
        const result = await action();
        setData(result);
        return { ok: true, data: result };
      } catch (err) {
        const message = err instanceof Error
          ? err.message
          : "An unexpected error occurred.";
        setError(message);
        return { ok: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { data, loading, error, baseFetch };
};

export const useInsights = () => {
  const { data, loading, error, baseFetch } = useApiState<InsightAPIRes>();
  const fetchAll = useCallback(() => baseFetch(() => getAllInsights()), [
    baseFetch,
  ]);

  return { data, loading, error, fetchAll };
};

export const useCreateInsight = () => {
  const { loading, error, baseFetch } = useApiState<InsightAPIRes>();
  const create = (payload: CreateInsightProp) =>
    baseFetch(() => createInsights(payload));

  return { create, loading, error };
};

export const useDeleteInsight = () => {
  const { loading, error, baseFetch } = useApiState<InsightAPIRes>();
  const remove = (id: InsightId) => baseFetch(() => deleteInsights(id));

  return { remove, loading, error };
};
