import type { InsightId } from "../../lib/schemas/insight.ts";
import type { HasDBClient } from "../shared.ts";
import type * as insightsTable from "$tables/insights.ts";

type Input = HasDBClient & {
  id: InsightId;
};

/**
 * Delete an insight and return the deleted row.
 */
export default (input: Input): insightsTable.Row => {
  const [row] = input.db.sql<insightsTable.Row>`
    DELETE FROM insights WHERE id = ${input.id}
    RETURNING *
  `;

  if (row) {
    console.log(`[DB] Deleted Insight: ID=${row.id}, Brand=${row.brand}`);
  }

  return row;
};
