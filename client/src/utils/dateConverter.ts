/**
 * Date Converter
 * Resolves time zone differences between client and server.
 */

// 1. Client -> Server: Convert to ISO 8601 string (Standard UTC)
export const toUTC = (date: Date): string => date.toISOString();

// 2. Server -> Client: Automatically convert to user's local time (Locale + Timezone)
export const toLocal = (date: string | Date): string =>
  new Date(date).toLocaleString();
