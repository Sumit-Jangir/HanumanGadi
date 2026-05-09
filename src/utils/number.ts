/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param currency - Currency code (default: USD)
 */
export const formatCurrency = (amount: number, currency: string = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);

/**
 * Convert a number to a fixed decimal value
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 2)
 */
export const toFixed = (value: number, decimals: number = 2) =>
  Number(value.toFixed(decimals));

export const formatDecimalValue = (value: string): string => {
  if (value === '' || value === '.') return value;
  if (value.includes('.')) {
    const parts = value.split('.');
    if (parts[1] && parts[1].length > 3) {
      return parseFloat(value).toFixed(3);
    }
  }
  return value;
};