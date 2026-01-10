import { z } from "zod";

/**
 * Common HTTP Status Codes
 */
export enum HttpStatus {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

/**
 * Common HTTP Methods
 */
export enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
}

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
// to fix
export const InsightAPIRes = z.object({
  statusCode: z.number().int(),
  message: z.string(),
  data: z.union([InsightArraySchema, z.null()]),
});

/** API response type */
export type InsightAPIRes = z.infer<typeof InsightAPIRes>;
