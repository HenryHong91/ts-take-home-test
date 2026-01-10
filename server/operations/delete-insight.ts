import type { InsightId } from "../../lib/schemas/insight.ts";
import type { HasDBClient } from "../shared.ts";

type Input = HasDBClient & {
  id: InsightId;
};

export default (input: Input): void => {
  input.db.sql`DELETE FROM insights WHERE id = ${input.id}`;
};
