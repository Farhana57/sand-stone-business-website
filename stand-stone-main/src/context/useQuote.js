import { useContext } from 'react'
import { QuoteContext } from './quoteContext.js'

/** Open and close the quote modal: `const { openQuote } = useQuote()`. */
export function useQuote() {
  const context = useContext(QuoteContext)
  if (!context) {
    throw new Error('useQuote() must be used inside a <QuoteProvider>.')
  }
  return context
}

export default useQuote
