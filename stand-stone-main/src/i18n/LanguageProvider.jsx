import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  defaultLanguage,
  supportedLanguages,
  translations,
} from './translations.js'
import { LANGUAGE_STORAGE_KEY, LanguageContext } from './languageContext.js'
import { interpolate, pickLanguage, resolvePath } from './translate.js'

function readStoredLanguage() {
  if (typeof window === 'undefined') return defaultLanguage
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (stored && supportedLanguages.includes(stored)) return stored
  } catch {
    /* storage can be unavailable in private mode — fall through */
  }
  const browser = typeof navigator !== 'undefined' ? navigator.language || '' : ''
  return browser.toLowerCase().startsWith('en') ? 'en' : defaultLanguage
}

/**
 * Provides the current language, a setter, `t()` for UI copy and `pick()` for
 * the `{ bn, en }` shaped values used by the data files.
 */
export function LanguageProvider({ children, initialLanguage }) {
  const [lang, setLangState] = useState(
    () => (initialLanguage && supportedLanguages.includes(initialLanguage) ? initialLanguage : readStoredLanguage()),
  )

  const setLang = useCallback((next) => {
    if (!supportedLanguages.includes(next)) return
    setLangState(next)
  }, [])

  const toggleLanguage = useCallback(() => {
    setLangState((current) => (current === 'bn' ? 'en' : 'bn'))
  }, [])

  // Keep <html lang> in sync: CSS uses it to switch to the Hind Siliguri font
  // for Bangla, and screen readers use it to pick a pronunciation.
  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.lang = lang
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
    } catch {
      /* ignore storage failures */
    }
  }, [lang])

  /**
   * Translate a key path. Returns arrays/objects untouched so lists of steps,
   * services or FAQ entries can live in the translation file too.
   */
  const t = useCallback(
    (path, params) => {
      const value = resolvePath(translations[lang], path)
      const fallback = value === undefined ? resolvePath(translations[defaultLanguage], path) : value
      if (fallback === undefined) {
        if (import.meta.env.DEV) console.warn(`[i18n] Missing translation for "${path}"`)
        return path
      }
      return typeof fallback === 'string' ? interpolate(fallback, params) : fallback
    },
    [lang],
  )

  /** Pick the current language out of a `{ bn, en }` data value. */
  const pick = useCallback((value) => pickLanguage(value, lang, defaultLanguage), [lang])

  const value = useMemo(
    () => ({ lang, setLang, toggleLanguage, t, pick, isBangla: lang === 'bn' }),
    [lang, setLang, toggleLanguage, t, pick],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export default LanguageProvider
