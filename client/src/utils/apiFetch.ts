import type { apiProps } from "../schemas/apiFetch.ts";

/**
 * Base API fetch function
 * @param props - API props
 * @returns Promise<T>
 */

export const apiFetch = async <T>(props: apiProps): Promise<T> => {
  const { url, options, key } = props;
  try {
    const res = await fetch(url, options);

    // Server Error
    if (!res.ok) {
      throw new Error(
        `[Server Error] ${key} : ${res.status} ${res.statusText}`,
      );
    }

    const data = await res.json();
    return data as T;
  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : "Unknown error";

    if (errorMessage.startsWith("[Server Error]")) {
      throw error;
    }
    // Network Error
    throw new Error(
      `[Network Error] ${key} : ${errorMessage}`,
    );
  }
};
