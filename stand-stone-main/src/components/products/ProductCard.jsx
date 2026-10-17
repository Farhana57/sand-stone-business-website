import { Phone } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage.js'
import { company } from '../../data/company.js'
import { getUnitById } from '../../data/products.js'
import { buildTelLink } from '../../lib/contact.js'
import { formatPrice, formatQuantity } from '../../lib/format.js'
import { useQuote } from '../../context/useQuote.js'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'

/**
 * Material card. Prices are only shown when one has been published in
 * src/data/products.js — otherwise the card invites a quote request.
 */
export function ProductCard({ product }) {
  const { t, pick, lang } = useLanguage()
  const { openQuote } = useQuote()

  const name = pick(product.name)
  const price = formatPrice(product.price, lang)
  const minUnit = getUnitById(product.minUnit)
  const minOrder = product.minQuantity
    ? formatQuantity(product.minQuantity, minUnit ? pick(minUnit.short) : '', lang)
    : null

  return (
    <article className="card-lift group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-800 bg-ink-900/50">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-800">
        <img
          src={product.image}
          alt={name}
          loading="lazy"
          className="zoom-img h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
        {product.featured ? (
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-ink-950">
            <Icon name="star" className="h-3.5 w-3.5" />
            {t('common.popular')}
          </span>
        ) : null}
        <span className="absolute right-4 bottom-4 rounded-full border border-white/15 bg-ink-950/80 px-3 py-1 text-xs text-ink-100 backdrop-blur">
          {price ? `${t('common.priceFrom')} ${price}` : t('common.priceOnRequest')}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="mt-1 text-sm text-gold-300/90">{pick(product.tagline)}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-300">{pick(product.description)}</p>

        <dl className="mt-5 space-y-2 text-xs text-ink-400">
          {product.specs?.slice(0, 3).map((spec) => (
            <div key={pick(spec.label)} className="flex items-start justify-between gap-4 border-b border-white/5 pb-1.5 last:border-0">
              <dt>{pick(spec.label)}</dt>
              <dd className="text-right text-ink-200">{pick(spec.value)}</dd>
            </div>
          ))}
        </dl>

        {minOrder ? (
          <p className="mt-4 text-xs text-ink-400">
            {t('common.minOrder')}: <span className="text-ink-200">{minOrder}</span>
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2.5">
          <Button
            onClick={() => openQuote(product.id)}
            size="sm"
            aria-label={t('productsPage.requestQuoteFor', { name })}
          >
            {t('actions.requestQuote')}
          </Button>
          <Button href={buildTelLink(company.phone)} variant="outline" size="sm" icon={Phone}>
            {t('actions.callNow')}
          </Button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
