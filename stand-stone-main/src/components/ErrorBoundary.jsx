import { Component } from 'react'

/** Catches render errors and shows a readable fallback instead of a blank page. */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info)
    }
  }

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-950 p-6">
        <div className="max-w-lg rounded-3xl border border-gold-500/25 bg-ink-900 p-8 text-center">
          <h1 className="text-xl font-bold text-white">Something went wrong</h1>
          <p className="mt-3 text-sm text-ink-300">
            {/* Kept in English: this is a developer-facing safety net. */}
            The page could not be rendered. Reload the page, or call us on the number in the footer.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-6 py-3 font-semibold text-ink-950"
          >
            Reload
          </button>
        </div>
      </div>
    )
  }
}

export default ErrorBoundary
