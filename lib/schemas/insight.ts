import { z } from "zod";

/**
 * Insight Model
 */
export const Insight = z.object({
  id: z.coerce.number().int().min(1, "Invalided ID"),
  brandId: z.coerce.number().int().min(1, "Invalided Brand ID"),
  date: z.coerce.date({
    invalid_type_error: "Invalid date format",
    required_error: "Date is required",
  }),
  text: z.string().trim().min(1, "Insight text cannot be empty"),
});

export type Insight = z.infer<typeof Insight>;

/** Insight array schema */
export const InsightArraySchema = z.array(Insight);

/**
 * ID schema for validation
 */
export const IdSchema = Insight.shape.id;
export type InsightId = z.infer<typeof IdSchema>;

/**
 * Create Insight schema
 */
export const CreateInsightSchema = z.object({
  brandId: z.number().int().min(1, "Invalided Brand ID"),
  date: z.string().datetime({ message: "Invalid ISO datetime format" }),
  text: z.string().trim().min(1, "Insight text cannot be empty"),
});

export type CreateInsightProp = z.infer<typeof CreateInsightSchema>;

/**
 * Common API response schema
 */
export const InsightAPIRes = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.union([InsightArraySchema, z.null()]),
});

/** API response type */
export type InsightAPIRes = z.infer<typeof InsightAPIRes>;
