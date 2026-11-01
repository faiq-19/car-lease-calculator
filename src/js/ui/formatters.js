/**
 * Formatting utilities for Pakistani Currency (PKR / Rs.) and numeric percentages.
 */

/**
 * Formats a numeric value into standard Pakistani Rupee representation.
 * Example: 3050000 -> "Rs. 3,050,000"
 *
 * @param {number} value - Numeric amount
 * @param {boolean} [includeDecimals=false] - Whether to show paise/cents
 * @returns {string} Formatted currency string
 */
export function formatPKR(value, includeDecimals = false) {
  const num = Number(value) || 0;
  if (includeDecimals) {
    return 'Rs. ' + num.toLocaleString('en-PK', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  return 'Rs. ' + Math.round(num).toLocaleString('en-PK');
}

/**
 * Formats a percentage value.
 * Example: 15.5 -> "15.5%"
 *
 * @param {number} value - Numeric percentage
 * @param {number} [decimals=1] - Decimal precision
 * @returns {string} Formatted percentage string
 */
export function formatPercent(value, decimals = 1) {
  const num = Number(value) || 0;
  return num.toFixed(decimals) + '%';
}

/**
 * Parses a string input (which might contain commas or "Rs.") into a clean integer or float.
 * @param {string|number} input - Raw user input
 * @returns {number} Clean numeric value
 */
export function parseCleanNumber(input) {
  if (typeof input === 'number') return isNaN(input) ? 0 : input;
  if (!input) return 0;
  const cleaned = String(input).replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Escapes HTML special characters to prevent Cross-Site Scripting (XSS).
 * @param {string} str - Raw string
 * @returns {string} Sanitized string safe for HTML rendering
 */
export function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

