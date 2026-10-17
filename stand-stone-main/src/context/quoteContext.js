import { createContext } from 'react'

/**
 * Context for the "Request a Quote" modal so any product card on any page can
 * open the quote form without prop drilling.
 */
export const QuoteContext = createContext(null)

export default QuoteContext
