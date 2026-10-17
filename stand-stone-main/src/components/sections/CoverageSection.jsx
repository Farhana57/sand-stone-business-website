import { MapPin, Truck } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage.js'
import { company } from '../../data/company.js'
import { buildMapsLink } from '../../lib/contact.js'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'

/** Delivery area list for the home page and contact page. */
export function CoverageSection() {
  const { t, pick } = useLanguage()
  const zones = pick(company.deliveryAreas.dhakaZone) ?? []

  return (
    <section className="section bg-ink-950">
      <div className="container-x">
        <SectionHeading
          eyebrow={t('home.coverage.eyebrow')}
          title={t('home.coverage.title')}
          subtitle={t('home.coverage.subtitle')}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-gold-500/20 bg-ink-900/60 p-6 sm:p-8">
              <h3 className="flex items-center gap-3 text-lg font-semibold text-white">
                <MapPin className="h-5 w-5 text-gold-400" aria-hidden="true" />
                {t('home.coverage.dhakaZone')}
              </h3>
              <ul className="mt-5 grid grid-cols-2 gap-3 text-sm text-ink-200">
                {zones.map((zone) => (
                  <li key={zone} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />
                    {zone}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-gold-500/20 bg-gradient-to-br from-ink-900 via-ink-900 to-ink-950 p-6 sm:p-8">
              <div>
                <h3 className="flex items-center gap-3 text-lg font-semibold text-white">
                  <Truck className="h-5 w-5 text-gold-400" aria-hidden="true" />
                  {t('home.coverage.longHaul')}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-200">{pick(company.deliveryAreas.longHaul)}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={buildMapsLink(company.mapQuery)} variant="outline" size="sm" icon={MapPin}>
                  {t('actions.openInMaps')}
                </Button>
                <Button to="/delivery" variant="dark" size="sm">
                  {t('actions.viewDelivery')}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default CoverageSection
