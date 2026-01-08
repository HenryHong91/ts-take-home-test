import { useCallback, useState } from "react";
import {
  createInsights,
  deleteInsights,
  getAllInsights,
  getSingleInsights,
} from "../services/insightAPIs.ts";
import type {
  CreateInsightProp,
  InsightAPIRes,
  InsightId,
} from "../../../lib/schemas/insight.ts";

/**
 * Custom hook for managing Insight data and API interactions.
 * Handles loading state, error handling, and data updates.
 */
export const useInsight = () => {
  const [data, setData] = useState<InsightAPIRes | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Common fetch handler
   * Manages loading/error states and updates data.
   */
  const baseFetch = useCallback(
    async (action: () => Promise<InsightAPIRes>) => {
      setLoading(true);
      setError(null);
      try {
        const result = await action();
        setData(result);
        return true;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred.",
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  /** Fetch all insights */
  const fetchAll = () => baseFetch(() => getAllInsights());

  /** Fetch a single insight by ID */
  const fetchSingle = (id: InsightId) => baseFetch(() => getSingleInsights(id));

  /** Create a new insight */
  const create = (payload: CreateInsightProp) =>
    baseFetch(() => createInsights(payload));

  /** Remove an insight by ID */
  const remove = (id: InsightId) => baseFetch(() => deleteInsights(id));

  return { data, loading, error, fetchAll, fetchSingle, create, remove };
};
