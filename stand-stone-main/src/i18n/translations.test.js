import { describe, expect, it } from 'vitest'
import { translations } from './translations.js'
import { interpolate, resolvePath } from './translate.js'

/** Collect every key path in an object, marking array lengths. */
function keyPaths(value, prefix = '') {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => keyPaths(item, `${prefix}[${index}]`))
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      keyPaths(child, prefix ? `${prefix}.${key}` : key),
    )
  }
  return [prefix]
}

describe('translations', () => {
  it('exposes the same key structure in Bangla and English', () => {
    const bn = keyPaths(translations.bn).sort()
    const en = keyPaths(translations.en).sort()
    expect(bn).toEqual(en)
  })

  it('has no empty strings', () => {
    for (const lang of ['bn', 'en']) {
      const empties = keyPaths(translations[lang]).filter((path) => {
        const value = resolvePath(translations[lang], path)
        return typeof value === 'string' && value.trim() === ''
      })
      expect(empties, `empty strings in ${lang}: ${empties.join(', ')}`).toEqual([])
    }
  })

  it('translates the navigation and the five page titles', () => {
    for (const path of [
      'nav.home',
      'nav.products',
      'nav.delivery',
      'nav.about',
      'nav.contact',
      'meta.homeTitle',
      'meta.productsTitle',
      'meta.deliveryTitle',
      'meta.aboutTitle',
      'meta.contactTitle',
    ]) {
      for (const lang of ['bn', 'en']) {
        const value = resolvePath(translations[lang], path)
        expect(typeof value, `${lang}.${path}`).toBe('string')
        expect(value.length).toBeGreaterThan(0)
      }
    }
  })

  it('keeps form validation messages for every field in both languages', () => {
    const keys = [
      'nameRequired',
      'nameShort',
      'phoneRequired',
      'phoneInvalid',
      'productRequired',
      'quantityRequired',
      'quantityInvalid',
      'quantityPositive',
      'unitRequired',
      'addressRequired',
      'addressShort',
      'minQuantity',
    ]
    for (const key of keys) {
      expect(translations.bn.order.validation[key]).toBeTruthy()
      expect(translations.en.order.validation[key]).toBeTruthy()
    }
  })

  it('uses Bangla script in the Bangla copy', () => {
    expect(translations.bn.nav.home).toMatch(/[\u0980-\u09FF]/)
    expect(translations.en.nav.home).not.toMatch(/[\u0980-\u09FF]/)
  })
})

describe('interpolate', () => {
  it('replaces named placeholders', () => {
    expect(interpolate('Minimum is {{value}}', { value: '100 CFT' })).toBe('Minimum is 100 CFT')
  })

  it('leaves unknown placeholders untouched', () => {
    expect(interpolate('Hi {{name}}', {})).toBe('Hi {{name}}')
  })
})
