import { useMemo, useState } from 'react'
import { useLanguage } from '../../i18n/useLanguage.js'
import { categories, products } from '../../data/products.js'
import { formatNumber } from '../../lib/format.js'
import ProductCard from './ProductCard.jsx'
import Reveal from '../ui/Reveal.jsx'

/** Category filter + responsive grid of material cards. */
export function ProductGrid({ initialCategory = 'all' }) {
  const { t, pick, lang } = useLanguage()
  const [active, setActive] = useState(initialCategory)

  const visible = useMemo(
    () => (active === 'all' ? products : products.filter((product) => product.category === active)),
    [active],
  )

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" aria-label={t('productsPage.filterLabel')} className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const selected = category.id === active
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(category.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  selected
                    ? 'border-gold-500 bg-gold-500 text-ink-950'
                    : 'border-ink-700 text-ink-200 hover:border-gold-500/60 hover:text-gold-200'
                }`}
              >
                {pick(category.label)}
              </button>
            )
          })}
        </div>

        <p className="text-sm text-ink-400" aria-live="polite">
          {t('productsPage.resultCount', { count: formatNumber(visible.length, lang) })}
        </p>
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-center text-ink-400">{t('common.noResults')}</p>
      ) : (
        <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product, index) => (
            <Reveal key={product.id} delay={(index % 3) * 90}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductGrid
