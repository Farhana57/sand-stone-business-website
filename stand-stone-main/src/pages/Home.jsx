import { useLanguage } from '../i18n/useLanguage.js'
import { featuredProducts } from '../data/products.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import Hero from '../components/home/Hero.jsx'
import AboutStrip from '../components/home/AboutStrip.jsx'
import Marquee from '../components/sections/Marquee.jsx'
import GuaranteesSection from '../components/sections/GuaranteesSection.jsx'
import ProcessSection from '../components/sections/ProcessSection.jsx'
import CoverageSection from '../components/sections/CoverageSection.jsx'
import CtaBand from '../components/sections/CtaBand.jsx'
import ProductCard from '../components/products/ProductCard.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'

export function Home() {
  const { t } = useLanguage()
  useDocumentTitle('meta.homeTitle')

  return (
    <>
      <Hero />
      <Marquee />
      <GuaranteesSection />
      <AboutStrip />

      {/* Featured materials */}
      <section className="section bg-gradient-to-b from-ink-950 via-ink-900/60 to-ink-950">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('home.products.eyebrow')}
            title={t('home.products.title')}
            subtitle={t('home.products.subtitle')}
          />

          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 90}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button to="/products" variant="outline" size="lg">
              {t('actions.viewAllProducts')}
            </Button>
          </div>
        </div>
      </section>

      <ProcessSection />
      <CoverageSection />
      <CtaBand />
    </>
  )
}

export default Home
