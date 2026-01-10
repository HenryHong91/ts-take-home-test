/**
 * Extended Error type with status code and identifier.
 */
export interface AppError extends Error {
  status: number;
  isAppError: true;
}

/**
 * Factory function to create operational errors.
 */
export const createAppError = (message: string, status = 500): AppError => {
  const error = new Error(message) as AppError;
  error.status = status;
  error.isAppError = true;
  return error;
};

/**
 * 400 - Bad Request
 * Server cannot process the request due to client error.
 */
export const badRequestError = (message: string) =>
  createAppError(message, 400);

/**
 * 404 - Not Found
 * Used when a requested resource does not exist.
 */
export const notFoundError = (resource: string) =>
  createAppError(`${resource} not found`, 404);
