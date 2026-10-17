import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'
import LanguageProvider from './i18n/LanguageProvider.jsx'
import QuoteProvider from './context/QuoteProvider.jsx'

function renderAt(path = '/', initialLanguage = 'en') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <LanguageProvider initialLanguage={initialLanguage}>
        <QuoteProvider>
          <App />
        </QuoteProvider>
      </LanguageProvider>
    </MemoryRouter>,
  )
}

const h1 = () => screen.getByRole('heading', { level: 1 })

/** Header links exist in the navbar and the mobile drawer, so pick the first. */
const navLink = (name) => within(screen.getByRole('banner')).getAllByRole('link', { name })[0]

describe('site routes', () => {
  const pages = [
    ['/', 'Dependable supply of sand, stone'],
    ['/products', 'Materials and pricing'],
    ['/delivery', 'Fast, measured and dependable delivery'],
    ['/about', 'How we approach material supply'],
    ['/contact', 'Contact & order'],
    ['/order', 'Contact & order'],
  ]

  it.each(pages)('renders %s', (path, heading) => {
    renderAt(path)
    expect(h1().textContent).toContain(heading)
  })

  it('renders the same pages in Bangla', () => {
    renderAt('/products', 'bn')
    expect(h1().textContent).toContain('সামগ্রী ও দামের তালিকা')
    expect(screen.getAllByText('দাম জানতে চান').length).toBeGreaterThan(0)
  })

  it('shows the not-found page for an unknown route', () => {
    renderAt('/does-not-exist')
    expect(h1().textContent).toContain('Page not found')
  })

  it('navigates between pages with the header links', async () => {
    const user = userEvent.setup()
    renderAt('/')

    await user.click(navLink('Products'))
    expect(h1().textContent).toContain('Materials and pricing')

    await user.click(navLink('Delivery & Services'))
    expect(h1().textContent).toContain('Fast, measured and dependable delivery')

    await user.click(navLink('Contact & Order'))
    expect(h1().textContent).toContain('Contact & order')
  })

  it('keeps the language when navigating between pages', async () => {
    const user = userEvent.setup()
    renderAt('/', 'en')

    const header = screen.getByRole('banner')
    await user.click(within(header).getAllByRole('button', { name: 'বাংলা' })[0])
    expect(h1().textContent).toContain('বালু, পাথর ও নির্মাণ সামগ্রীর')

    await user.click(navLink('পণ্যসমূহ'))
    expect(h1().textContent).toContain('সামগ্রী ও দামের তালিকা')
    expect(document.documentElement.lang).toBe('bn')
  })

  it('opens the quote modal from a product card with the material preselected', async () => {
    const user = userEvent.setup()
    renderAt('/products')

    const quoteButtons = screen.getAllByRole('button', { name: /Request a quote for/ })
    await user.click(quoteButtons[0])

    const dialog = await screen.findByRole('dialog')
    expect(within(dialog).getByText('Request a quote')).toBeInTheDocument()
    expect(within(dialog).getByLabelText(/Which material\?/)).toHaveValue('filling-sand')

    // Escape closes it again.
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('applies the category filter from a deep link', () => {
    renderAt('/products?category=stone')
    expect(screen.getByRole('tab', { name: 'Stone & Chips' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('4 materials found')).toBeInTheDocument()
  })

  it('filters the catalogue from a footer material link', async () => {
    const user = userEvent.setup()
    renderAt('/')

    const footer = screen.getByRole('contentinfo')
    await user.click(within(footer).getByRole('link', { name: 'Filling Sand' }))

    expect(h1().textContent).toContain('Materials and pricing')
    expect(screen.getByRole('tab', { name: 'Sand' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('3 materials found')).toBeInTheDocument()
  })

  it('shows the order form and the WhatsApp/call buttons on the contact page', () => {
    renderAt('/contact')
    expect(screen.getByLabelText(/Delivery address/)).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /WhatsApp/ }).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/\+880 1712-345678/).length).toBeGreaterThan(0)
  })
})
