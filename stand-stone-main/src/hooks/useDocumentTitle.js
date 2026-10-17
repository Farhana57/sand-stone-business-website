import { useEffect } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'
import { company } from '../data/company.js'

/**
 * Sets `document.title` from a translation key and keeps it in sync when the
 * visitor switches language.
 */
export function useDocumentTitle(titleKey) {
  const { t, pick } = useLanguage()

  useEffect(() => {
    const page = t(titleKey)
    const brand = pick(company.name)
    document.title = `${page} | ${brand}`
  }, [t, pick, titleKey])
}

export default useDocumentTitle
