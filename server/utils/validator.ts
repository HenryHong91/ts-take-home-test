import type { z } from "zod";
import { CreateInsightSchema, IdSchema } from "../../lib/schemas/insight.ts";

/**
 * Basic generic validator function
 */
export const validator = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  return schema.parse(data);
};

/**
 * ID Validation (converts to number and checks if positive)
 */
export const validateId = (data: unknown) => {
  return validator(IdSchema, data);
};

/**
 * Validate body data for creating an Insight
 */
export const validateCreateInsight = (data: unknown) => {
  return validator(CreateInsightSchema, data);
};
