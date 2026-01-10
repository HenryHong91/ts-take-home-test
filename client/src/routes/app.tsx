import { useCallback, useEffect } from "react";
import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import {
  useCreateInsight,
  useDeleteInsight,
  useInsights,
} from "../hooks/useInsight.ts";
import type {
  CreateInsightProp,
  InsightId,
} from "../../../lib/schemas/insight.ts";

export const App = () => {
  const {
    data,
    loading: isFetching,
    error: fetchError,
    fetchAll,
  } = useInsights();
  const { create, loading: isCreating } = useCreateInsight();
  const { remove, loading: isDeleting } = useDeleteInsight();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleCreate = useCallback(async (payload: CreateInsightProp) => {
    const result = await create(payload);
    if (result.ok) {
      fetchAll();
    }
  }, [create, fetchAll]);

  const handleDelete = useCallback(async (id: InsightId) => {
    if (confirm("Are you sure you want to delete this insight?")) {
      const result = await remove(id);
      if (result.ok) {
        fetchAll();
      }
    }
  }, [remove, fetchAll]);

  return (
    <main className={styles.main}>
      <Header onAdd={handleCreate} />
      {(isFetching || isCreating || isDeleting) && <p>Processing...</p>}
      {/* follow up global error styling. */}
      {fetchError && <p style={{ color: "red" }}>Error: {fetchError}</p>}
      {!isFetching && data?.data && (
        <Insights
          className={styles.insights}
          insights={data.data}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
};
