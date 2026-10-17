import { useSearchParams } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage.js'
import { categories } from '../data/products.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import PageHero from '../components/sections/PageHero.jsx'
import ProductGrid from '../components/products/ProductGrid.jsx'
import CtaBand from '../components/sections/CtaBand.jsx'

export function Products() {
  const { t } = useLanguage()
  const [searchParams] = useSearchParams()
  useDocumentTitle('meta.productsTitle')

  // Deep links such as /products?category=stone (used by the footer) preselect a filter.
  const requested = searchParams.get('category')
  const initialCategory = categories.some((category) => category.id === requested) ? requested : 'all'

  return (
    <>
      <PageHero
        image="/images/quarry.jpg"
        imageAlt={t('productsPage.title')}
        eyebrow={t('productsPage.eyebrow')}
        title={t('productsPage.title')}
        subtitle={t('productsPage.subtitle')}
      />

      <section className="section bg-ink-950">
        <div className="container-x">
          <ProductGrid key={initialCategory} initialCategory={initialCategory} />
        </div>
      </section>

      <CtaBand />
    </>
  )
}

export default Products
