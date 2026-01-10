import type { HasDBClient } from "../shared.ts";
import type * as insightsTable from "$tables/insights.ts";

type Input = HasDBClient & {
  brand: number;
  createdAt: string;
  text: string;
};

/**
 * Insert a new insight into the database.
 * Any SQL errors will be caught by the global error handler.
 */

//check
export default (input: Input): insightsTable.Row => {
  const [row] = input.db.sql<insightsTable.Row>`
    INSERT INTO insights (brand, createdAt, text)
    VALUES (${input.brand}, ${input.createdAt}, ${input.text})
    RETURNING *
  `;

  if (row) {
    console.log(`[DB] Created Insight: ID=${row.id}, Brand=${row.brand}`);
  }
  return row;
};
