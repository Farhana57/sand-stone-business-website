const BANGLA_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']

/** Convert ASCII digits to Bangla digits (used when the site is in Bangla mode). */
export function toBanglaDigits(input) {
  return String(input).replace(/[0-9]/g, (digit) => BANGLA_DIGITS[Number(digit)])
}

/** Group a number with thousands separators, using Bangla digits for `bn`. */
export function formatNumber(value, lang = 'en') {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return ''
  const grouped = new Intl.NumberFormat('en-US').format(numeric)
  return lang === 'bn' ? toBanglaDigits(grouped) : grouped
}

/**
 * Prices are stored as plain numbers (BDT). Returns null when no price has been
 * published, so callers can show "Price on request" instead of inventing one.
 */
export function formatPrice(price, lang = 'en') {
  if (price == null || price === '' || Number.isNaN(Number(price))) return null
  return `৳ ${formatNumber(price, lang)}`
}

/** e.g. "200 CFT" / "২০০ ঘনফুট" */
export function formatQuantity(quantity, unitLabel, lang = 'en') {
  if (quantity == null || quantity === '') return ''
  return `${formatNumber(quantity, lang)}${unitLabel ? ` ${unitLabel}` : ''}`
}

export default { toBanglaDigits, formatNumber, formatPrice, formatQuantity }
