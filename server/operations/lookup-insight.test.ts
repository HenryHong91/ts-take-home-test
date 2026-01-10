import { beforeAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { withDB } from "../testing.ts";
import type { Row } from "$tables/insights.ts";
import lookupInsight from "./lookup-insight.ts";

describe("listing insights in the database", () => {
  describe("specified insight not in the DB", () => {
    withDB((fixture) => {
      let result: Row | undefined;

      beforeAll(() => {
        result = lookupInsight({ ...fixture, id: 0 });
      });

      it("returns nothing", () => {
        expect(result).toBeUndefined();
      });
    });
  });

  describe("insight is in the DB", () => {
    withDB((fixture) => {
      const insights: Row[] = [
        { id: 1, brand: 0, createdAt: new Date().toISOString(), text: "1" },
        { id: 2, brand: 0, createdAt: new Date().toISOString(), text: "2" },
        { id: 3, brand: 1, createdAt: new Date().toISOString(), text: "3" },
        { id: 4, brand: 4, createdAt: new Date().toISOString(), text: "4" },
      ];

      let result: Row | undefined;

      beforeAll(() => {
        fixture.insights.insert(insights);
        result = lookupInsight({ ...fixture, id: 3 });
      });

      it("returns the expected insight", () => {
        expect(result).toEqual(insights[2]);
      });
    });
  });
});
