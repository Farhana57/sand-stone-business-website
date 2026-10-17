import { useLanguage } from '../../i18n/useLanguage.js'
import { company } from '../../data/company.js'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import Icon from '../ui/Icon.jsx'

/** "Why choose us" grid — content comes from company.guarantees (editable). */
export function GuaranteesSection() {
  const { t, pick } = useLanguage()

  return (
    <section className="section bg-ink-950">
      <div className="container-x">
        <SectionHeading
          eyebrow={t('home.why.eyebrow')}
          title={t('home.why.title')}
          subtitle={t('home.why.subtitle')}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {company.guarantees.map((item, index) => (
            <Reveal key={item.icon + index} delay={index * 90}>
              <article className="card-lift h-full rounded-2xl border border-ink-800 bg-gradient-to-b from-ink-900 to-ink-900/40 p-6">
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/10 text-gold-300">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-semibold text-white">{pick(item.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{pick(item.body)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GuaranteesSection
