import type { Database } from "@db/sqlite";
import type {
  CreateInsightProp,
  Insight,
  InsightId,
} from "../../lib/schemas/insight.ts";
import listInsights from "../operations/list-insights.ts";
import lookupInsight from "../operations/lookup-insight.ts";
import createInsight from "../operations/create-insight.ts";
import deleteInsight from "../operations/delete-insight.ts";
import type { Row } from "../tables/insights.ts";
import { notFoundError } from "../utils/errors.ts";

/**
 * Service responsible for Insight related business logic
 */
export const insightService = (db: Database) => {
  const mapRowToInsight = (row: Row): Insight => ({
    id: row.id,
    brandId: row.brand,
    date: new Date(row.createdAt),
    text: row.text,
  });

  return {
    getAll(): Promise<Insight[]> {
      const rows = listInsights({ db });
      return Promise.resolve((rows || []).map(mapRowToInsight));
    },

    getById(id: InsightId): Promise<Insight> {
      const row = lookupInsight({ db, id });
      if (!row) {
        throw notFoundError("Insight");
      }
      return Promise.resolve(mapRowToInsight(row));
    },

    create(payload: CreateInsightProp): Promise<Insight> {
      const row = createInsight({
        db,
        brand: payload.brandId,
        createdAt: payload.date,
        text: payload.text,
      });
      return Promise.resolve(mapRowToInsight(row));
    },

    remove(id: InsightId): Promise<Insight> {
      const row = lookupInsight({ db, id });
      if (!row) {
        throw notFoundError("Insight");
      }
      deleteInsight({ db, id });
      return Promise.resolve(mapRowToInsight(row));
    },
  };
};

export type InsightService = ReturnType<typeof insightService>;
