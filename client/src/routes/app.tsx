import { useCallback, useEffect } from "react";
import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import { useInsight } from "../hooks/useInsight.ts";
import type {
  CreateInsightProp,
  InsightId,
} from "../../../lib/schemas/insight.ts";

export const App = () => {
  const { data, loading, error, fetchAll, create, remove } = useInsight();

  useEffect(() => {
    fetchAll();
  }, []);

  const handleCreate = useCallback(async (payload: CreateInsightProp) => {
    const success = await create(payload);
    if (success) {
      fetchAll();
    }
  }, [create, fetchAll]);

  const handleDelete = useCallback(async (id: InsightId) => {
    if (confirm("Are you sure you want to delete this insight?")) {
      const success = await remove(id);
      if (success) {
        fetchAll();
      }
    }
  }, [remove, fetchAll]);

  return (
    <main className={styles.main}>
      <Header onAdd={handleCreate} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && data?.data && (
        <Insights
          className={styles.insights}
          insights={data.data}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
};
