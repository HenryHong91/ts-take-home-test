import { type Context, isHttpError } from "@oak/oak";
import { ZodError } from "zod";
import type { AppError } from "../utils/errors.ts";

/**
 * Type guard to check if the error is an AppError
 */
function isAppError(err: unknown): err is AppError {
  return (
    typeof err === "object" &&
    err !== null &&
    "isAppError" in err &&
    err.isAppError === true
  );
}

export const errorHandler = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  try {
    await next();
  } catch (err: unknown) {
    let status = 500;
    let message = "Internal Server Error";
    let details = null;

    // 1. Handle functional errors (AppError)
    if (isAppError(err)) {
      status = err.status;
      message = err.message;
    } // 2. Handle Zod validation errors
    else if (err instanceof ZodError) {
      status = 400;
      message = "Validation Failed";
      details = err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      }));
    } // 3. Handle Oak's internal HTTP errors
    else if (isHttpError(err)) {
      status = err.status;
      message = err.message;
    } // 4. Handle generic errors
    else if (err instanceof Error) {
      message = err.message;
    }

    console.error(`[ERROR ${status}]: ${message}`);

    ctx.response.status = status;
    ctx.response.body = {
      statusCode: status,
      message,
      details,
      data: null,
    };
  }
};
