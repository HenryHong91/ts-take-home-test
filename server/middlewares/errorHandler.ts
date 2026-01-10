import { type Context, isHttpError } from "@oak/oak";
import { ZodError } from "zod";
import type { AppError } from "../utils/errors.ts";

/**
 * Type guard for AppError
 */
const isAppError = (err: unknown): err is AppError =>
  !!err && typeof err === "object" && "isAppError" in err;

export const errorHandler = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  try {
    await next();
  } catch (err: unknown) {
    let statusCode = 500;
    let message = "Internal Server Error";
    let details: unknown = null;

    if (isAppError(err) || isHttpError(err)) {
      statusCode = err.status;
      message = err.message;
    } else if (err instanceof ZodError) {
      statusCode = 400;
      message = "Validation Failed";
      details = err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      }));
    } else if (err instanceof Error) {
      message = err.message;
    }

    // 2. Log error (Observability)
    console.error(`[ERROR ${statusCode}]: ${message}`);

    // 3. Set response
    ctx.response.status = statusCode;
    ctx.response.body = {
      statusCode,
      message,
      details,
      data: null,
    };
  }
};
