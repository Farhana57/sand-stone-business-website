import { useCallback, useMemo, useState } from 'react'
import { QuoteContext } from './quoteContext.js'

/**
 * Holds the material selected for the quote modal and renders nothing itself —
 * <Layout /> mounts the modal so it sits above every route.
 */
export function QuoteProvider({ children }) {
  const [state, setState] = useState({ open: false, productId: '' })

  const openQuote = useCallback((productId = '') => {
    setState({ open: true, productId })
  }, [])

  const closeQuote = useCallback(() => {
    setState((current) => ({ ...current, open: false }))
  }, [])

  const value = useMemo(
    () => ({ ...state, openQuote, closeQuote }),
    [state, openQuote, closeQuote],
  )

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
}

export default QuoteProvider
