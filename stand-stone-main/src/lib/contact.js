/** Strip everything except digits. */
export function digitsOnly(value = '') {
  return String(value).replace(/\D/g, '')
}

/**
 * Convert any local Bangladeshi format into the international digits wa.me wants.
 * 01712345678 -> 8801712345678, +8801712345678 -> 8801712345678.
 */
export function toWhatsAppNumber(phone = '') {
  const digits = digitsOnly(phone)
  if (digits.startsWith('880')) return digits
  if (digits.startsWith('0')) return `88${digits}`
  if (digits.length === 10) return `880${digits}`
  return digits
}

/** `tel:` link that keeps a leading + when present. */
export function buildTelLink(phone = '') {
  const trimmed = String(phone).trim()
  const hasPlus = trimmed.startsWith('+')
  return `tel:${hasPlus ? '+' : ''}${digitsOnly(trimmed)}`
}

/** wa.me link with an optional pre-filled message. */
export function buildWhatsAppLink(phone, message) {
  const number = toWhatsAppNumber(phone)
  const base = `https://wa.me/${number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function buildMapsLink(query = '') {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function buildMapEmbedLink(query = '') {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
}

export function buildMailtoLink(email, subject, body) {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const query = params.toString()
  return `mailto:${email}${query ? `?${query}` : ''}`
}

/**
 * Compose the WhatsApp order message. Labels come from the translation file so
 * the message arrives in the language the visitor was browsing in.
 */
export function buildOrderMessage(t, order = {}) {
  const lines = [
    `*${order.brand ?? ''}* — ${t('contactPage.formTitle')}`,
    '',
    `${t('order.fields.name')}: ${order.name}`,
    `${t('order.fields.phone')}: ${order.phone}`,
    `${t('order.summaryMaterial')}: ${order.material}`,
    `${t('order.summaryQuantity')}: ${order.quantityLabel}`,
    `${t('order.summaryAddress')}: ${order.address}`,
  ]
  if (order.message) lines.push('', `${t('order.messageLabel')}: ${order.message}`)
  return lines.join('\n')
}

export default {
  digitsOnly,
  toWhatsAppNumber,
  buildTelLink,
  buildWhatsAppLink,
  buildMapsLink,
  buildMapEmbedLink,
  buildMailtoLink,
  buildOrderMessage,
}
