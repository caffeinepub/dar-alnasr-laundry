/**
 * Formats a price from backend (stored as Nat representing AED) to display format.
 * Backend stores prices as whole numbers (e.g., 4 = AED 4.00)
 * Uses direct string formatting to guarantee exact "AED {amount}.00" output.
 */
export function formatPrice(price: bigint): string {
  // Convert bigint to string and format as AED with .00
  const priceStr = price.toString();
  return `AED ${priceStr}.00`;
}
