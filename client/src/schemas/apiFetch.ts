/**
 * @param url - API endpoint
 * @param key - API key for which API is used
 * @param options - Request options
 */
export type apiProps = {
  url: string;
  key: string;
  options?: RequestInit;
};
