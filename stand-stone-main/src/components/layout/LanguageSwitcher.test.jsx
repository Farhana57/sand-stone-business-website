import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import LanguageProvider from '../../i18n/LanguageProvider.jsx'
import { useLanguage } from '../../i18n/useLanguage.js'
import { LANGUAGE_STORAGE_KEY } from '../../i18n/languageContext.js'
import LanguageSwitcher from './LanguageSwitcher.jsx'

/** Small consumer that proves the whole tree re-renders in the new language. */
function Sample() {
  const { t, pick } = useLanguage()
  return (
    <div>
      <p data-testid="nav">{t('nav.products')}</p>
      <p data-testid="unit">{pick({ bn: 'ট্রাক লোড', en: 'Truck load' })}</p>
    </div>
  )
}

const renderSwitcher = (initialLanguage = 'en') =>
  render(
    <MemoryRouter>
      <LanguageProvider initialLanguage={initialLanguage}>
        <LanguageSwitcher />
        <Sample />
      </LanguageProvider>
    </MemoryRouter>,
  )

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.lang = 'en'
  })

  it('renders both language buttons', () => {
    renderSwitcher()
    expect(screen.getByRole('button', { name: 'বাংলা' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'English' })).toBeInTheDocument()
  })

  it('switches every consumer to Bangla instantly, without a reload', async () => {
    const user = userEvent.setup()
    renderSwitcher()

    expect(screen.getByTestId('nav')).toHaveTextContent('Products')

    await user.click(screen.getByRole('button', { name: 'বাংলা' }))

    expect(screen.getByTestId('nav')).toHaveTextContent('পণ্যসমূহ')
    expect(screen.getByTestId('unit')).toHaveTextContent('ট্রাক লোড')
    expect(document.documentElement.lang).toBe('bn')
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('bn')
  })

  it('switches back to English and marks the active button', async () => {
    const user = userEvent.setup()
    renderSwitcher()

    await user.click(screen.getByRole('button', { name: 'বাংলা' }))
    expect(screen.getByRole('button', { name: 'বাংলা' })).toHaveAttribute('aria-pressed', 'true')

    await user.click(screen.getByRole('button', { name: 'English' }))
    expect(screen.getByTestId('nav')).toHaveTextContent('Products')
    expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'true')
    expect(document.documentElement.lang).toBe('en')
  })

  it('starts in Bangla when the stored preference is Bangla', () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'bn')
    render(<MemoryRouter><LanguageProvider><Sample /></LanguageProvider></MemoryRouter>)
    expect(screen.getByTestId('nav')).toHaveTextContent('পণ্যসমূহ')
  })
})
