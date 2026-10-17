import { createContext } from 'react'

/** Shape of the value provided by <LanguageProvider>. */
export const LanguageContext = createContext(null)

/** localStorage key used to remember the visitor's language between visits. */
export const LANGUAGE_STORAGE_KEY = 'sandstone.language'

export default LanguageContext
