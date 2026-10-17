import { getProductById } from '../data/products.js'

/**
 * Bangladeshi mobile numbers: 01XXXXXXXXX (11 digits) or +8801XXXXXXXXX / 8801XXXXXXXXX.
 * Spaces, dashes and brackets are ignored before matching.
 */
export const BD_PHONE_PATTERN = /^(?:\+?880|0)1[3-9]\d{8}$/

export const emptyOrderValues = {
  name: '',
  phone: '',
  productId: '',
  quantity: '',
  unit: '',
  address: '',
  message: '',
}

export function normalizePhone(phone = '') {
  return String(phone).replace(/[\s\-()]/g, '')
}

/**
 * Validate the order/quote form.
 *
 * Returns an object of `{ fieldName: translationKey }` — the component decides
 * how to phrase the message, which keeps the rules language independent.
 * An empty object means the form is valid.
 */
export function validateOrder(values = {}) {
  const errors = {}
  const name = String(values.name ?? '').trim()
  const phone = normalizePhone(values.phone)
  const quantityRaw = String(values.quantity ?? '').trim()
  const address = String(values.address ?? '').trim()

  if (!name) errors.name = 'nameRequired'
  else if (name.length < 3) errors.name = 'nameShort'

  if (!phone) errors.phone = 'phoneRequired'
  else if (!BD_PHONE_PATTERN.test(phone)) errors.phone = 'phoneInvalid'

  const product = getProductById(values.productId)
  if (!product) errors.productId = 'productRequired'

  if (!quantityRaw) errors.quantity = 'quantityRequired'
  else if (!/^\d+(?:\.\d+)?$/.test(quantityRaw)) errors.quantity = 'quantityInvalid'
  else {
    const quantity = Number(quantityRaw)
    if (quantity <= 0) errors.quantity = 'quantityPositive'
    else if (
      product &&
      product.minQuantity &&
      values.unit &&
      values.unit === product.minUnit &&
      quantity < product.minQuantity
    ) {
      errors.quantity = 'minQuantity'
    }
  }

  if (!values.unit) errors.unit = 'unitRequired'

  if (!address) errors.address = 'addressRequired'
  else if (address.length < 10) errors.address = 'addressShort'

  return errors
}

/** Shape the form values into the payload the API (and the WhatsApp text) uses. */
export function toOrderPayload(values = {}) {
  const product = getProductById(values.productId)
  return {
    name: String(values.name ?? '').trim(),
    phone: normalizePhone(values.phone),
    productId: product?.id ?? '',
    productName: product?.name?.en ?? '',
    quantity: Number(values.quantity),
    unit: values.unit,
    address: String(values.address ?? '').trim(),
    message: String(values.message ?? '').trim(),
  }
}

export default validateOrder
