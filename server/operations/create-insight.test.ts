import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { withDB } from "../testing.ts";
import createInsight from "./create-insight.ts";

describe("create-insight operation", () => {
  withDB((fixture) => {
    it("should create a new insight and return it", () => {
      const input = {
        db: fixture.db,
        brand: 1,
        createdAt: new Date().toISOString(),
        text: "Test Insight",
      };

      const result = createInsight(input);

      // Verify returned data
      expect(result.brand).toEqual(input.brand);
      expect(result.text).toEqual(input.text);
      expect(result.createdAt).toEqual(input.createdAt);
      expect(typeof result.id).toBe("number");

      // Verify data is actually stored in DB
      const [stored] = fixture.db
        .sql`SELECT * FROM insights WHERE id = ${result.id}`;
      expect(stored.text).toEqual("Test Insight");
    });
  });
});
