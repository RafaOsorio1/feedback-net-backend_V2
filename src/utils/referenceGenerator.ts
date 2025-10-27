/**
 * Generates a unique reference number in the format PQR-XXXXXX
 * where XXXXXX is a 6-character alphanumeric string
 */
export function generateReferenceNumber(): string {
  // Generate a random 6-character alphanumeric string
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluding similar-looking characters
  let result = 'PQR-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
