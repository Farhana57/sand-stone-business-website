import { useLanguage } from '../../i18n/useLanguage.js'
import Reveal from '../ui/Reveal.jsx'
import Icon from '../ui/Icon.jsx'

/** Service cards for the Delivery & Services page. */
export function ServicesGrid() {
  const { t } = useLanguage()
  const services = t('deliveryPage.services')
  const list = Array.isArray(services) ? services : []

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((service, index) => (
        <Reveal key={service.title} delay={(index % 3) * 90}>
          <article className="card-lift h-full rounded-2xl border border-ink-800 bg-ink-900/50 p-6">
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/10 text-gold-300">
              <Icon name={service.icon} className="h-6 w-6" />
            </span>
            <h3 className="text-lg font-semibold text-white">{service.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-300">{service.body}</p>
          </article>
        </Reveal>
      ))}
    </div>
  )
}

export default ServicesGrid
