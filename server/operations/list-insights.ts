import type { HasDBClient } from "../shared.ts";
import type * as insightsTable from "$tables/insights.ts";

type Input = HasDBClient;

export default (input: Input): insightsTable.Row[] => {
  const rows = input.db.sql<insightsTable.Row>`SELECT * FROM insights`;

  return rows;
};
