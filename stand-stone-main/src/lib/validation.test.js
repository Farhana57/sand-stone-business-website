import { describe, expect, it } from 'vitest'
import { emptyOrderValues, normalizePhone, toOrderPayload, validateOrder } from './validation.js'

const validValues = {
  ...emptyOrderValues,
  name: 'Rakib Hasan',
  phone: '01712345678',
  productId: 'coarse-sand',
  quantity: '200',
  unit: 'cft',
  address: 'House 12, Road 4, West Rampura, Dhaka',
}

describe('validateOrder', () => {
  it('accepts a complete order', () => {
    expect(validateOrder(validValues)).toEqual({})
  })

  it('requires a name of at least three characters', () => {
    expect(validateOrder({ ...validValues, name: '' }).name).toBe('nameRequired')
    expect(validateOrder({ ...validValues, name: ' Jo ' }).name).toBe('nameShort')
  })

  it('accepts Bangladeshi mobile formats and rejects others', () => {
    const accepted = ['01712345678', '017 1234 5678', '+8801712345678', '8801912345678']
    accepted.forEach((phone) => {
      expect(validateOrder({ ...validValues, phone }).phone, phone).toBeUndefined()
    })

    const rejected = ['0171234567', '017123456789', '02712345678', 'abcd', '']
    rejected.forEach((phone) => {
      expect(validateOrder({ ...validValues, phone }).phone, phone).toBeTruthy()
    })
  })

  it('requires a known product', () => {
    expect(validateOrder({ ...validValues, productId: 'not-a-material' }).productId).toBe('productRequired')
  })

  it('requires a positive numeric quantity', () => {
    expect(validateOrder({ ...validValues, quantity: '' }).quantity).toBe('quantityRequired')
    expect(validateOrder({ ...validValues, quantity: '200 cft' }).quantity).toBe('quantityInvalid')
    expect(validateOrder({ ...validValues, quantity: '0' }).quantity).toBe('quantityPositive')
  })

  it('enforces the minimum order in the product unit', () => {
    // coarse-sand: minimum 100 CFT
    expect(validateOrder({ ...validValues, quantity: '80' }).quantity).toBe('minQuantity')
    // same quantity is fine in another unit (no meaningful comparison)
    expect(validateOrder({ ...validValues, quantity: '80', unit: 'truck' }).quantity).toBeUndefined()
  })

  it('requires a detailed address', () => {
    expect(validateOrder({ ...validValues, address: '' }).address).toBe('addressRequired')
    expect(validateOrder({ ...validValues, address: 'Dhaka' }).address).toBe('addressShort')
  })

  it('strips spaces and dashes from phone numbers', () => {
    expect(normalizePhone('+880 1712-345678')).toBe('+8801712345678')
  })
})

describe('toOrderPayload', () => {
  it('builds the payload the API expects', () => {
    const payload = toOrderPayload(validValues)
    expect(payload).toMatchObject({
      name: 'Rakib Hasan',
      phone: '01712345678',
      productId: 'coarse-sand',
      productName: 'Coarse River Sand',
      quantity: 200,
      unit: 'cft',
    })
  })
})
