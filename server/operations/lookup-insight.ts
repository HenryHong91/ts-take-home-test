import type * as insightsTable from "$tables/insights.ts";
import type { HasDBClient } from "../shared.ts";
import type { InsightId } from "../../lib/schemas/insight.ts";

type Input = HasDBClient & {
  id: InsightId;
};

export default (input: Input): insightsTable.Row | undefined => {
  const [row] = input.db.sql<
    insightsTable.Row
  >`SELECT * FROM insights WHERE id = ${input.id} LIMIT 1`;

  if (row) {
    return row;
  }

  return;
};
