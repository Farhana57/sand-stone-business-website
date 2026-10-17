import { useContext } from 'react'
import { LanguageContext } from './languageContext.js'

/**
 * Access the active language, the switcher and the translation helpers.
 * Must be used inside <LanguageProvider>.
 */
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage() must be used inside a <LanguageProvider>.')
  }
  return context
}

export default useLanguage
