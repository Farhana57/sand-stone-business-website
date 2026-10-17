import { useLanguage } from '../i18n/useLanguage.js'
import { company } from '../data/company.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import PageHero from '../components/sections/PageHero.jsx'
import StatsStrip from '../components/sections/StatsStrip.jsx'
import GuaranteesSection from '../components/sections/GuaranteesSection.jsx'
import CoverageSection from '../components/sections/CoverageSection.jsx'
import CtaBand from '../components/sections/CtaBand.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Icon from '../components/ui/Icon.jsx'

export function About() {
  const { t, pick } = useLanguage()
  useDocumentTitle('meta.aboutTitle')

  const story = t('aboutPage.story')
  const storyList = Array.isArray(story) ? story : []
  const values = t('aboutPage.values')
  const valueList = Array.isArray(values) ? values : []

  return (
    <>
      <PageHero
        image="/images/site-city.jpg"
        imageAlt={t('aboutPage.imageAlt')}
        eyebrow={t('aboutPage.eyebrow')}
        title={t('aboutPage.title')}
        subtitle={t('aboutPage.subtitle')}
      />

      <section className="section bg-ink-950">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <Reveal>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">{t('aboutPage.storyTitle')}</h2>
            <div className="mt-6 space-y-5 leading-relaxed text-ink-300">
              {storyList.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-gold-500/20 bg-ink-900/60 p-5">
              <p className="text-xs tracking-[0.2em] text-gold-400 uppercase">{t('contactPage.addressLabel')}</p>
              <p className="mt-2 text-ink-100">{pick(company.address)}</p>
              <p className="mt-1 text-sm text-ink-400">{pick(company.hours)}</p>
            </div>
          </Reveal>

          <Reveal delay={120} className="grid gap-4 sm:grid-cols-2">
            <img
              src="/images/site-aerial.jpg"
              alt={t('aboutPage.imageAlt')}
              loading="lazy"
              className="col-span-2 h-64 w-full rounded-3xl border border-gold-500/20 object-cover"
            />
            <img
              src="/images/workers.jpg"
              alt={t('home.about.imageAlt')}
              loading="lazy"
              className="h-44 w-full rounded-3xl border border-gold-500/20 object-cover"
            />
            <img
              src="/images/bricks.jpg"
              alt={t('productsPage.eyebrow')}
              loading="lazy"
              className="h-44 w-full rounded-3xl border border-gold-500/20 object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-ink-900/40">
        <div className="container-x">
          <SectionHeading eyebrow={t('aboutPage.eyebrow')} title={t('aboutPage.valuesTitle')} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueList.map((value, index) => (
              <Reveal key={value.title} delay={index * 90}>
                <article className="card-lift h-full rounded-2xl border border-ink-800 bg-ink-950/60 p-6">
                  <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/10 text-gold-300">
                    <Icon name={value.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">{value.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section className="section bg-ink-950">
        <div className="container-x">
          <SectionHeading eyebrow={t('aboutPage.eyebrow')} title={t('aboutPage.statsTitle')} />
          <div className="mt-12">
            <StatsStrip />
          </div>
        </div>
      </section>

      <GuaranteesSection />
      <CoverageSection />

      <section className="section bg-ink-950 pt-0">
        <div className="container-x">
          <SectionHeading eyebrow={t('aboutPage.eyebrow')} title={t('aboutPage.coverageTitle')} />
          <Reveal className="mt-8 overflow-hidden rounded-3xl border border-gold-500/20">
            <img
              src="/images/truck-delivery.jpg"
              alt={t('deliveryPage.imageAlt')}
              loading="lazy"
              className="h-72 w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      <CtaBand title={t('aboutPage.cta.title')} subtitle={t('aboutPage.cta.subtitle')} />
    </>
  )
}

export default About
