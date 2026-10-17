import { describe, expect, it } from 'vitest'
import {
  buildOrderMessage,
  buildTelLink,
  buildWhatsAppLink,
  digitsOnly,
  toWhatsAppNumber,
} from './contact.js'
import { translations } from '../i18n/translations.js'
import { interpolate, resolvePath } from '../i18n/translate.js'

/** Minimal translator that mirrors the one provided by LanguageProvider. */
const tFor = (lang) => (path, params) => interpolate(resolvePath(translations[lang], path), params)

describe('toWhatsAppNumber', () => {
  it('normalises local and international Bangladeshi numbers', () => {
    expect(toWhatsAppNumber('01712345678')).toBe('8801712345678')
    expect(toWhatsAppNumber('+8801712345678')).toBe('8801712345678')
    expect(toWhatsAppNumber('017 1234-5678')).toBe('8801712345678')
    expect(toWhatsAppNumber('1712345678')).toBe('8801712345678')
  })
})

describe('link builders', () => {
  it('keeps the plus in tel links but removes formatting', () => {
    expect(buildTelLink('+880 1712-345678')).toBe('tel:+8801712345678')
    expect(digitsOnly('+880 1712-345678')).toBe('8801712345678')
  })

  it('encodes the WhatsApp message', () => {
    const link = buildWhatsAppLink('01712345678', 'Order: 200 CFT')
    expect(link.startsWith('https://wa.me/8801712345678?text=')).toBe(true)
    expect(decodeURIComponent(link.split('text=')[1])).toBe('Order: 200 CFT')
  })
})

describe('buildOrderMessage', () => {
  const order = {
    brand: 'Padma Sand & Stone',
    name: 'Rakib',
    phone: '01712345678',
    material: 'Coarse River Sand',
    quantityLabel: '200 CFT',
    address: 'West Rampura, Dhaka',
    message: 'Morning delivery please',
  }

  it('writes the order in the active language', () => {
    const english = buildOrderMessage(tFor('en'), order)
    expect(english).toContain('Name: Rakib')
    expect(english).toContain('Quantity: 200 CFT')
    expect(english).toContain('Morning delivery please')

    const bangla = buildOrderMessage(tFor('bn'), { ...order, material: 'মোটা নদীর বালু' })
    expect(bangla).toContain('নাম: Rakib')
    expect(bangla).toContain('মোটা নদীর বালু')
    expect(bangla).not.toBe(english)
  })
})
