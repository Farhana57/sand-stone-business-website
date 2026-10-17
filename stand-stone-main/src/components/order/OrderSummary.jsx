import { ClipboardList } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage.js'

/** Live recap of what the visitor is about to send, so nothing is ambiguous. */
export function OrderSummary({ productName, quantityLabel, unitLabel, address, priceLabel, className = '' }) {
  const { t } = useLanguage()

  const hasContent = Boolean(productName || quantityLabel || address)

  const rows = [
    { label: t('order.summaryMaterial'), value: productName },
    {
      label: t('order.summaryQuantity'),
      value: [quantityLabel, unitLabel].filter(Boolean).join(' '),
    },
    { label: t('order.summaryAddress'), value: address },
  ]

  return (
    <div className={`rounded-2xl border border-gold-500/20 bg-ink-900/60 p-5 ${className}`}>
      <h3 className="flex items-center gap-2 text-sm font-semibold tracking-wide text-gold-300 uppercase">
        <ClipboardList className="h-4 w-4" aria-hidden="true" />
        {t('order.summaryTitle')}
      </h3>

      {hasContent ? (
        <dl className="mt-4 space-y-3 text-sm">
          {rows
            .filter((row) => row.value)
            .map((row) => (
              <div key={row.label} className="flex flex-col gap-0.5 border-b border-white/5 pb-2 last:border-0">
                <dt className="text-xs text-ink-500">{row.label}</dt>
                <dd className="text-ink-100">{row.value}</dd>
              </div>
            ))}
          {priceLabel ? (
            <div className="flex flex-col gap-0.5">
              <dt className="text-xs text-ink-500">{t('common.priceOnRequest')}</dt>
              <dd className="text-gold-300">{priceLabel}</dd>
            </div>
          ) : null}
        </dl>
      ) : (
        <p className="mt-3 text-sm text-ink-400">{t('order.summaryEmpty')}</p>
      )}
    </div>
  )
}

export default OrderSummary
