import { useRef, useState } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Phone,
  RotateCcw,
  Send,
} from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage.js'
import { company } from '../../data/company.js'
import { getProductById, getUnitById, products, units } from '../../data/products.js'
import { emptyOrderValues, toOrderPayload, validateOrder } from '../../lib/validation.js'
import { isOrderApiConfigured, submitOrder } from '../../lib/api.js'
import { buildOrderMessage, buildTelLink, buildWhatsAppLink } from '../../lib/contact.js'
import { formatPrice, formatQuantity } from '../../lib/format.js'
import Button from '../ui/Button.jsx'
import FormField from './FormField.jsx'
import { inputClass } from '../../lib/formStyles.js'
import OrderSummary from './OrderSummary.jsx'

const FIELD_ORDER = ['name', 'phone', 'productId', 'quantity', 'unit', 'address']

/**
 * Order / quote request form.
 *
 * Two honest submission paths:
 *  1. `VITE_API_URL` configured  -> POST to the API; success is only reported
 *     after the server confirms, and the returned reference is shown.
 *  2. not configured             -> the details are handed to WhatsApp (and the
 *     visitor is told plainly that nothing was saved online).
 * It never claims an order was saved when it was not.
 */
export function OrderForm({ initialProductId = '', variant = 'page', onDone }) {
  const { t, pick, lang } = useLanguage()
  const formRef = useRef(null)

  const initialProduct = getProductById(initialProductId)

  const [values, setValues] = useState(() => ({
    ...emptyOrderValues,
    productId: initialProduct?.id ?? '',
    unit: initialProduct?.units?.[0] ?? '',
  }))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed
  const [showSummaryError, setShowSummaryError] = useState(false)
  const [outcome, setOutcome] = useState(null) // { mode: 'saved' | 'whatsapp', reference? }

  const product = getProductById(values.productId)
  const unit = getUnitById(values.unit)
  const minUnit = product ? getUnitById(product.minUnit) : null

  const quantityLabel = formatQuantity(values.quantity, unit ? pick(unit.short) : '', lang)
  const minOrderLabel = product?.minQuantity
    ? formatQuantity(product.minQuantity, minUnit ? pick(minUnit.short) : '', lang)
    : ''
  const priceLabel = formatPrice(product?.price, lang)

  const whatsappMessage = buildOrderMessage(t, {
    brand: pick(company.name),
    name: values.name,
    phone: values.phone,
    material: product ? pick(product.name) : '',
    quantityLabel,
    address: values.address,
    message: values.message,
  })
  const whatsappUrl = buildWhatsAppLink(company.whatsapp, whatsappMessage)

  const errorText = (field) => {
    const key = errors[field]
    if (!key) return ''
    return t(`order.validation.${key}`, { value: minOrderLabel })
  }

  const update = (field, value) => {
    setValues((current) => {
      const next = { ...current, [field]: value }
      // Changing the material can change the available units / minimum order.
      if (field === 'productId') {
        const nextProduct = getProductById(value)
        next.unit = nextProduct?.units?.[0] ?? ''
      }
      return next
    })
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current))
  }

  const handleBlur = (field) => {
    const nextErrors = validateOrder(values)
    setErrors((current) => ({ ...current, [field]: nextErrors[field] }))
  }

  const focusFirstInvalid = (nextErrors) => {
    const first = FIELD_ORDER.find((field) => nextErrors[field])
    if (!first) return
    const node = formRef.current?.querySelector(`[name="${first}"]`)
    node?.focus()
    // Guarded: some environments (jsdom, very old browsers) lack scrollIntoView.
    node?.scrollIntoView?.({ behavior: 'smooth', block: 'center' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validateOrder(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).some((key) => nextErrors[key])) {
      setShowSummaryError(true)
      focusFirstInvalid(nextErrors)
      return
    }

    setShowSummaryError(false)
    setStatus('sending')

    if (!isOrderApiConfigured) {
      // No backend: hand the request to WhatsApp and say so plainly.
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
      setOutcome({ mode: 'whatsapp' })
      setStatus('sent')
      return
    }

    const payload = { ...toOrderPayload(values), language: lang }
    const result = await submitOrder(payload)

    if (result.ok) {
      setOutcome({
        mode: 'saved',
        reference: result.order?.reference ?? result.order?._id ?? null,
      })
      setStatus('sent')
    } else {
      setOutcome({ mode: 'error', reason: result.reason, status: result.status })
      setStatus('failed')
    }
  }

  const resetForm = () => {
    setValues({ ...emptyOrderValues })
    setErrors({})
    setOutcome(null)
    setStatus('idle')
    setShowSummaryError(false)
  }

  /* ------------------------------------------------------------------ *
   * Success / failure panel
   * ------------------------------------------------------------------ */
  if (status === 'sent' || status === 'failed') {
    const saved = outcome?.mode === 'saved'
    const failed = status === 'failed'

    return (
      <div className="space-y-5" role="status" aria-live="polite">
        <div
          className={`flex items-start gap-3 rounded-2xl border p-5 ${
            failed ? 'border-red-500/40 bg-red-500/5' : 'border-gold-500/30 bg-gold-500/5'
          }`}
        >
          {failed ? (
            <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-400" aria-hidden="true" />
          ) : (
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-gold-400" aria-hidden="true" />
          )}
          <div>
            <p className="font-semibold text-white">
              {failed ? t('order.errorTitle') : t('order.successTitle')}
            </p>
            <p className="mt-1 text-sm text-ink-200">
              {failed
                ? t('order.errorBody')
                : saved
                  ? t('order.successSaved', { ref: outcome?.reference ?? '—' })
                  : t('order.successWhatsapp')}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button href={whatsappUrl} variant="whatsapp" icon={MessageCircle}>
            {t('actions.sendViaWhatsapp')}
          </Button>
          <Button href={buildTelLink(company.phone)} variant="outline" icon={Phone}>
            {t('actions.callNow')} · {company.phoneDisplay}
          </Button>
          <Button variant="dark" icon={RotateCcw} onClick={resetForm}>
            {t('actions.newRequest')}
          </Button>
          {onDone && variant === 'modal' ? (
            <Button variant="ghost" onClick={onDone}>
              {t('actions.close')}
            </Button>
          ) : null}
        </div>

        {!saved && !failed ? (
          <p className="text-xs text-ink-400">{t('common.notConnectedNotice')}</p>
        ) : null}
      </div>
    )
  }

  const isSending = status === 'sending'
  const errorList = showSummaryError
    ? FIELD_ORDER.filter((field) => errors[field]).map((field) => ({ field, message: errorText(field) }))
    : []

  /* ------------------------------------------------------------------ *
   * Form
   * ------------------------------------------------------------------ */
  const form = (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
      {errorList.length > 0 ? (
        <div role="alert" className="rounded-2xl border border-red-500/40 bg-red-500/5 p-4">
          <p className="flex items-center gap-2 font-semibold text-red-300">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            {t('order.validation.summaryTitle')}
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-red-200/90">
            {errorList.map((item) => (
              <li key={item.field}>{item.message}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="order-name" label={t('order.fields.name')} required error={errorText('name')}>
          {({ describedBy, invalid }) => (
            <input
              id="order-name"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(event) => update('name', event.target.value)}
              onBlur={() => handleBlur('name')}
              placeholder={t('order.fields.namePlaceholder')}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={inputClass(invalid)}
            />
          )}
        </FormField>

        <FormField id="order-phone" label={t('order.fields.phone')} required error={errorText('phone')}>
          {({ describedBy, invalid }) => (
            <input
              id="order-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(event) => update('phone', event.target.value)}
              onBlur={() => handleBlur('phone')}
              placeholder={t('order.fields.phonePlaceholder')}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={inputClass(invalid)}
            />
          )}
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="order-product" label={t('order.fields.product')} required error={errorText('productId')}>
          {({ describedBy, invalid }) => (
            <select
              id="order-product"
              name="productId"
              value={values.productId}
              onChange={(event) => update('productId', event.target.value)}
              onBlur={() => handleBlur('productId')}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={inputClass(invalid)}
            >
              <option value="">{t('order.fields.productPlaceholder')}</option>
              {products.map((item) => (
                <option key={item.id} value={item.id}>
                  {pick(item.name)}
                </option>
              ))}
            </select>
          )}
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            id="order-quantity"
            label={t('order.fields.quantity')}
            required
            error={errorText('quantity')}
            hint={
              product?.minQuantity
                ? `${t('common.minOrder')}: ${minOrderLabel}`
                : undefined
            }
          >
            {({ describedBy, invalid }) => (
              <input
                id="order-quantity"
                name="quantity"
                type="text"
                inputMode="decimal"
                value={values.quantity}
                onChange={(event) => update('quantity', event.target.value)}
                onBlur={() => handleBlur('quantity')}
                placeholder={t('order.fields.quantityPlaceholder')}
                aria-invalid={invalid}
                aria-describedby={describedBy}
                className={inputClass(invalid)}
              />
            )}
          </FormField>

          <FormField id="order-unit" label={t('order.fields.unit')} required error={errorText('unit')}>
            {({ describedBy, invalid }) => (
              <select
                id="order-unit"
                name="unit"
                value={values.unit}
                onChange={(event) => update('unit', event.target.value)}
                onBlur={() => handleBlur('unit')}
                aria-invalid={invalid}
                aria-describedby={describedBy}
                className={inputClass(invalid)}
              >
                <option value="">—</option>
                {(product ? product.units.map(getUnitById) : units).filter(Boolean).map((item) => (
                  <option key={item.id} value={item.id}>
                    {pick(item.label)}
                  </option>
                ))}
              </select>
            )}
          </FormField>
        </div>
      </div>

      <FormField id="order-address" label={t('order.fields.address')} required error={errorText('address')}>
        {({ describedBy, invalid }) => (
          <textarea
            id="order-address"
            name="address"
            rows={3}
            value={values.address}
            onChange={(event) => update('address', event.target.value)}
            onBlur={() => handleBlur('address')}
            placeholder={t('order.fields.addressPlaceholder')}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className={inputClass(invalid)}
          />
        )}
      </FormField>

      <FormField id="order-message" label={t('order.fields.message')} optional>
        {({ describedBy }) => (
          <textarea
            id="order-message"
            name="message"
            rows={3}
            value={values.message}
            onChange={(event) => update('message', event.target.value)}
            placeholder={t('order.fields.messagePlaceholder')}
            aria-describedby={describedBy}
            className={inputClass(false)}
          />
        )}
      </FormField>

      {/* Honest status of the submission channel */}
      <p
        className={`flex items-start gap-2 rounded-xl border p-3 text-xs ${
          isOrderApiConfigured
            ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-200/90'
            : 'border-gold-500/25 bg-gold-500/5 text-gold-100/80'
        }`}
      >
        {isOrderApiConfigured ? (
          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        ) : (
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        )}
        <span>
          {isOrderApiConfigured ? t('order.statusConnected') : t('order.statusNotConnected')}
          {!isOrderApiConfigured ? <span className="ml-1 text-ink-400">{t('order.statusNotConnectedHelp')}</span> : null}
        </span>
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg" icon={isSending ? Loader2 : Send} disabled={isSending} className={isSending ? 'animate-pulse' : ''}>
          {isSending ? t('actions.sending') : t('actions.sendOrder')}
        </Button>
        <Button href={whatsappUrl} variant="outline" size="lg" icon={MessageCircle}>
          {t('actions.sendViaWhatsapp')}
        </Button>
      </div>
    </form>
  )

  if (variant === 'modal') {
    return (
      <div className="space-y-5">
        {form}
        <OrderSummary
          productName={product ? pick(product.name) : ''}
          quantityLabel={values.quantity ? quantityLabel : ''}
          unitLabel=""
          address={values.address}
          priceLabel={priceLabel}
        />
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
      {form}
      <div className="space-y-5 lg:sticky lg:top-32">
        <OrderSummary
          productName={product ? pick(product.name) : ''}
          quantityLabel={values.quantity ? quantityLabel : ''}
          unitLabel=""
          address={values.address}
          priceLabel={priceLabel}
        />
        <div className="rounded-2xl border border-gold-500/20 bg-ink-900/60 p-5">
          <h3 className="text-sm font-semibold tracking-wide text-gold-300 uppercase">
            {t('order.preferTalk')}
          </h3>
          <p className="mt-2 text-sm text-ink-300">{t('order.preferTalkBody')}</p>
          <div className="mt-4 flex flex-col gap-2">
            <Button href={buildTelLink(company.phone)} variant="outline" size="sm" fullWidth icon={Phone}>
              {company.phoneDisplay}
            </Button>
            <Button
              href={whatsappUrl}
              variant="whatsapp"
              size="sm"
              fullWidth
              icon={MessageCircle}
            >
              {t('actions.sendViaWhatsapp')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderForm
