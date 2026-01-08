import type {
  CreateInsightProp,
  InsightId,
} from "../../../lib/schemas/insight.ts";
import { CreateInsightSchema, IdSchema } from "../../../lib/schemas/insight.ts";
import { insightFetcher } from "./insightFetcher.ts";

/**
 * Get all insights
 */
export const getAllInsights = async () => {
  const props = { url: "/api/insights", key: "Get All Insights" };
  const raw = await insightFetcher(props);
  return raw;
};

/**
 * Get single insight by ID
 * @param id - Insight ID
 */
export const getSingleInsights = async (id: InsightId) => {
  // Runtime validation for ID
  const validatedId = IdSchema.parse(id);
  const props = {
    url: `/api/insights/${validatedId}`,
    key: "Get Single Insights",
  };
  const raw = await insightFetcher(props);
  return raw;
};

/**
 * Create a new insight
 * @param payloads - Insight payload
 */
export const createInsights = async (payloads: CreateInsightProp) => {
  // Runtime validation
  const validatedPayload = CreateInsightSchema.parse(payloads);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedPayload),
  };
  const props = {
    url: "/api/insights/create",
    key: "Create Insights",
    options,
  };
  const raw = await insightFetcher(props);
  return raw;
};

/**
 * Delete an insight by ID
 * @param id - Insight ID
 */
export const deleteInsights = async (id: InsightId) => {
  // Runtime validation for ID
  const validatedId = IdSchema.parse(id);

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const props = {
    url: `/api/insights/${validatedId}`,
    key: "Delete Insights",
    options,
  };
  const raw = await insightFetcher(props);
  return raw;
};
