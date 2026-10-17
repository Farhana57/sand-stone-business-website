import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LanguageProvider from '../../i18n/LanguageProvider.jsx'
import { isOrderApiConfigured } from '../../lib/api.js'
import OrderForm from './OrderForm.jsx'

const renderForm = (props = {}, initialLanguage = 'en') =>
  render(
    <LanguageProvider initialLanguage={initialLanguage}>
      <OrderForm {...props} />
    </LanguageProvider>,
  )

describe('OrderForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('shows validation messages for an empty submit and sends nothing', async () => {
    const user = userEvent.setup()
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    renderForm()

    await user.click(screen.getByRole('button', { name: 'Send order request' }))

    expect(screen.getByText('Please check these fields')).toBeInTheDocument()
    // Each message appears twice: in the summary box and under its field.
    for (const message of [
      'Please enter your name.',
      'A mobile number is required.',
      'Please choose a material.',
      'Please enter the quantity you need.',
      'Please choose a unit.',
      'The delivery address is required.',
    ]) {
      expect(screen.getAllByText(message).length, message).toBeGreaterThan(0)
    }
    expect(openSpy).not.toHaveBeenCalled()
  })

  it('reports an invalid phone number', async () => {
    const user = userEvent.setup()
    renderForm()

    await user.type(screen.getByLabelText(/Mobile number/), '12345')
    await user.tab()

    expect(await screen.findByText(/valid Bangladeshi mobile number/)).toBeInTheDocument()
  })

  it('enforces the minimum order quantity of the selected material', async () => {
    const user = userEvent.setup()
    renderForm()

    await user.selectOptions(screen.getByLabelText(/Which material\?/), 'coarse-sand')
    await user.type(screen.getByLabelText(/Quantity/), '20')
    await user.click(screen.getByRole('button', { name: 'Send order request' }))

    const matches = await screen.findAllByText(/minimum order for this material is 100 CFT/i)
    expect(matches.length).toBeGreaterThan(0)
  })

  it('routes a valid order to WhatsApp and never claims it was saved', async () => {
    const user = userEvent.setup()
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

    // No VITE_API_URL in the test environment, so the WhatsApp path is used.
    expect(isOrderApiConfigured).toBe(false)

    renderForm()

    await user.type(screen.getByLabelText(/Name/), 'Rakib Hasan')
    await user.type(screen.getByLabelText(/Mobile number/), '01712345678')
    await user.selectOptions(screen.getByLabelText(/Which material\?/), 'sylhet-sand')
    await user.type(screen.getByLabelText(/Quantity/), '150')
    await user.type(
      screen.getByLabelText(/Delivery address/),
      'House 12, Road 4, West Rampura, Dhaka',
    )

    await user.click(screen.getByRole('button', { name: 'Send order request' }))

    await waitFor(() => expect(openSpy).toHaveBeenCalledTimes(1))

    const [url] = openSpy.mock.calls[0]
    expect(url).toContain('https://wa.me/')
    expect(decodeURIComponent(url)).toContain('Rakib Hasan')
    expect(decodeURIComponent(url)).toContain('Sylhet Sand')

    // Honest messaging: nothing was stored server-side.
    expect(await screen.findByText('Your request has been sent')).toBeInTheDocument()
    expect(screen.getByText(/ready in WhatsApp/)).toBeInTheDocument()
    expect(screen.queryByText(/Order reference/)).not.toBeInTheDocument()
  })

  it('translates the validation messages into Bangla', async () => {
    const user = userEvent.setup()
    renderForm({}, 'bn')

    await user.click(screen.getByRole('button', { name: 'অর্ডার পাঠান' }))

    expect(screen.getByText('নিচের ঘরগুলো একবার দেখে নিন')).toBeInTheDocument()
    expect(screen.getAllByText('নাম লেখা আবশ্যক।').length).toBeGreaterThan(0)
    expect(screen.getAllByText('মোবাইল নম্বর দেওয়া আবশ্যক।').length).toBeGreaterThan(0)
  })

  it('preselects the material passed in by the quote modal', () => {
    renderForm({ initialProductId: 'gravel-pebbles', variant: 'modal' })
    expect(screen.getByLabelText(/Which material\?/)).toHaveValue('gravel-pebbles')
    expect(screen.getByLabelText(/Unit/)).toHaveValue('cft')
  })
})
