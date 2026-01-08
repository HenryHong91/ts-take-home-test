import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { ZodError } from "zod";
import { validateCreateInsight, validateId } from "./validator.ts";

describe("Validator Utils", () => {
  describe("validateId", () => {
    it("should pass for positive integers", () => {
      expect(validateId(1)).toBe(1);
      expect(validateId("123")).toBe(123);
    });

    it("should fail for negative numbers", () => {
      expect(() => validateId(-1)).toThrow(ZodError);
    });

    it("should fail for zero", () => {
      expect(() => validateId(0)).toThrow(ZodError);
    });

    it("should fail for non-numeric strings", () => {
      expect(() => validateId("abc")).toThrow(ZodError);
    });

    it("should fail for null or undefined", () => {
      expect(() => validateId(null)).toThrow(ZodError);
      expect(() => validateId(undefined)).toThrow(ZodError);
    });
  });

  describe("validateCreateInsight", () => {
    it("should pass for valid payload", () => {
      const validPayload = {
        brandId: 1,
        date: new Date().toISOString(),
        text: "Valid Insight",
      };
      expect(validateCreateInsight(validPayload)).toEqual(validPayload);
    });

    it("should fail if text is empty", () => {
      const invalidPayload = {
        brandId: 1,
        date: new Date().toISOString(),
        text: "", // Empty text
      };
      expect(() => validateCreateInsight(invalidPayload)).toThrow(ZodError);
    });

    it("should fail if brandId is missing", () => {
      const invalidPayload = {
        date: new Date().toISOString(),
        text: "Text",
      };
      expect(() => validateCreateInsight(invalidPayload)).toThrow(ZodError);
    });

    it("should fail if date is invalid", () => {
      const invalidPayload = {
        brandId: 1,
        date: "invalid-date-string",
        text: "Text",
      };
      expect(() => validateCreateInsight(invalidPayload)).toThrow(ZodError);
    });
  });
});
