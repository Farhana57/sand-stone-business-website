import { Outlet } from 'react-router-dom'
import { useQuote } from '../../context/useQuote.js'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import FloatingActions from './FloatingActions.jsx'
import ScrollManager from './ScrollManager.jsx'
import QuoteModal from '../order/QuoteModal.jsx'

/**
 * Application shell. Header is fixed, so the main area is padded by the header
 * height (utility strip + navbar on desktop).
 */
export function Layout() {
  const { open, productId, closeQuote } = useQuote()

  return (
    <div className="flex min-h-screen flex-col bg-ink-950">
      <ScrollManager />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-ink-950"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 pt-16 lg:pt-[116px]">
        <Outlet />
      </main>
      <Footer />
      {/* Room for the floating action buttons on small screens */}
      <div className="h-16 lg:h-0" aria-hidden="true" />
      <FloatingActions />
      <QuoteModal open={open} productId={productId} onClose={closeQuote} />
    </div>
  )
}

export default Layout
