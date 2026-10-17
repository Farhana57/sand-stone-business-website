import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

/**
 * Accessible dialog: closes on Escape and backdrop click, locks background
 * scrolling, and moves focus into the panel when it opens.
 */
export function Modal({ open, onClose, title, subtitle, children, labelledBy = 'modal-title' }) {
  const panelRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    previouslyFocused.current = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      const target = panelRef.current?.querySelector(
        'input, select, textarea, button, [href], [tabindex]:not([tabindex="-1"])',
      )
      target?.focus()
    }, 40)

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      previouslyFocused.current?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink-950/80 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-gold-500/25 bg-ink-900 p-5 shadow-premium sm:rounded-3xl sm:p-7"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id={labelledBy} className="text-xl font-bold text-white sm:text-2xl">
              {title}
            </h2>
            {subtitle ? <p className="mt-1 text-sm text-ink-300">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full border border-ink-700 p-2 text-ink-300 transition hover:border-gold-500/50 hover:text-gold-300"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  )
}

export default Modal
