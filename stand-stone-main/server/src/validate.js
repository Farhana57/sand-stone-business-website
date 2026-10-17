/**
 * Server-side validation. The browser validates too, but never trust the client:
 * these rules mirror src/lib/validation.js so a bad request is rejected here.
 */

export const BD_PHONE_PATTERN = /^(?:\+?880|0)1[3-9]\d{8}$/

export const ALLOWED_UNITS = ['cft', 'truck', 'ton', 'bag', 'piece']

const asString = (value) => (typeof value === 'string' ? value.trim() : '')

/**
 * @returns {{ valid: boolean, errors: Record<string, string>, value: object }}
 */
export function validateOrderInput(body = {}) {
  const errors = {}

  const value = {
    name: asString(body.name),
    phone: asString(body.phone).replace(/[\s\-()]/g, ''),
    productId: asString(body.productId),
    productName: asString(body.productName),
    quantity: Number(body.quantity),
    unit: asString(body.unit),
    address: asString(body.address),
    message: asString(body.message).slice(0, 1000),
    language: body.language === 'bn' ? 'bn' : 'en',
  }

  if (!value.name) errors.name = 'Name is required.'
  else if (value.name.length < 3) errors.name = 'Name must be at least 3 characters.'

  if (!value.phone) errors.phone = 'A phone number is required.'
  else if (!BD_PHONE_PATTERN.test(value.phone)) errors.phone = 'Enter a valid Bangladeshi mobile number.'

  if (!value.productId) errors.productId = 'A material is required.'

  if (body.quantity === '' || body.quantity == null) errors.quantity = 'A quantity is required.'
  else if (!Number.isFinite(value.quantity)) errors.quantity = 'Quantity must be a number.'
  else if (value.quantity <= 0) errors.quantity = 'Quantity must be greater than zero.'
  else if (value.quantity > 100000) errors.quantity = 'Quantity looks unrealistic — please confirm it with us.'

  if (!value.unit) errors.unit = 'A unit is required.'
  else if (!ALLOWED_UNITS.includes(value.unit)) errors.unit = 'Unknown unit.'

  if (!value.address) errors.address = 'A delivery address is required.'
  else if (value.address.length < 10) errors.address = 'Please give a more specific delivery address.'

  return { valid: Object.keys(errors).length === 0, errors, value }
}

export default validateOrderInput
