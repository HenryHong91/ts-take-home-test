import { z } from "zod";
import { apiFetch } from "../utils/apiFetch.ts";
import { InsightAPIRes } from "../../../lib/schemas/insight.ts";
import type { apiProps } from "../schemas/apiFetch.ts";

/**
 * Handles API response validation using Zod schema
 */
export const insightFetcher = async (props: apiProps) => {
  const { url, key, options } = props;

  try {
    const res = await apiFetch({ url, key, options });
    // Validate API response structure
    return InsightAPIRes.parse(res);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `${key} : [Validation Error] ${
          error.errors.map((e) => e.message).join(", ")
        }`,
      );
    }
    throw error;
  }
};
