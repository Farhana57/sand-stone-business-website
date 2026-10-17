/**
 * Pure helpers behind the language layer. Kept in their own module so the
 * provider file only exports a component (React Fast Refresh friendly).
 */

/** Resolve a dotted path such as `home.hero.title` inside a nested object. */
export function resolvePath(source, path) {
  if (!source) return undefined
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), source)
}

/** Replace {{placeholders}} in a translated string. */
export function interpolate(template, params) {
  if (typeof template !== 'string' || !params) return template
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(params, key) ? String(params[key]) : match,
  )
}

/** Pick a `{ bn, en }` pair, falling back to the default language. */
export function pickLanguage(value, lang, fallback = 'bn') {
  if (value == null || typeof value !== 'object') return value
  return value[lang] ?? value[fallback] ?? ''
}
