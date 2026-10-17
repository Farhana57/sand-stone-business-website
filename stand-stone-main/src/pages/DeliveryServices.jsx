import { Clock, Scale, Truck } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import PageHero from '../components/sections/PageHero.jsx'
import ServicesGrid from '../components/delivery/ServicesGrid.jsx'
import FaqAccordion from '../components/sections/FaqAccordion.jsx'
import CoverageSection from '../components/sections/CoverageSection.jsx'
import CtaBand from '../components/sections/CtaBand.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Icon from '../components/ui/Icon.jsx'

const FLEET_IMAGES = ['/images/loader.jpg', '/images/hero-sand-aerial.jpg', '/images/workers.jpg']

export function DeliveryServices() {
  const { t } = useLanguage()
  useDocumentTitle('meta.deliveryTitle')

  const processSteps = t('home.process.steps')
  const steps = Array.isArray(processSteps) ? processSteps : []
  const notes = t('deliveryPage.notes')
  const noteList = Array.isArray(notes) ? notes : []
  const faq = t('deliveryPage.faq')
  const faqList = Array.isArray(faq) ? faq : []
  const fleet = t('deliveryPage.fleet')
  const fleetList = Array.isArray(fleet) ? fleet : []

  return (
    <>
      <PageHero
        image="/images/truck-delivery.jpg"
        imageAlt={t('deliveryPage.imageAlt')}
        eyebrow={t('deliveryPage.eyebrow')}
        title={t('deliveryPage.title')}
        subtitle={t('deliveryPage.subtitle')}
      >
        <div className="flex flex-wrap gap-4 text-sm text-ink-200">
          <span className="flex items-center gap-2 rounded-full border border-gold-500/25 bg-ink-900/70 px-4 py-2">
            <Clock className="h-4 w-4 text-gold-400" aria-hidden="true" />
            {t('deliveryPage.services.0.title')}
          </span>
          <span className="flex items-center gap-2 rounded-full border border-gold-500/25 bg-ink-900/70 px-4 py-2">
            <Scale className="h-4 w-4 text-gold-400" aria-hidden="true" />
            {t('deliveryPage.services.2.title')}
          </span>
          <span className="flex items-center gap-2 rounded-full border border-gold-500/25 bg-ink-900/70 px-4 py-2">
            <Truck className="h-4 w-4 text-gold-400" aria-hidden="true" />
            {t('deliveryPage.services.1.title')}
          </span>
        </div>
      </PageHero>

      <section className="section bg-ink-950">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('deliveryPage.eyebrow')}
            title={t('deliveryPage.servicesTitle')}
          />
          <div className="mt-12">
            <ServicesGrid />
          </div>
        </div>
      </section>

      {/* Delivery process */}
      <section className="section bg-ink-900/40">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow={t('home.process.eyebrow')}
              title={t('deliveryPage.stepsTitle')}
              align="left"
            />
            <ol className="mt-8 space-y-5">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-500/40 bg-ink-950 text-sm font-bold text-gold-300">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-300">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={120} className="grid gap-4 sm:grid-cols-2">
            <img
              src="/images/aerial-loading.jpg"
              alt={t('home.about.imageAlt')}
              loading="lazy"
              className="h-64 w-full rounded-3xl border border-gold-500/20 object-cover sm:h-full"
            />
            <img
              src="/images/stone-chips.jpg"
              alt={t('productsPage.eyebrow')}
              loading="lazy"
              className="h-64 w-full rounded-3xl border border-gold-500/20 object-cover sm:h-full"
            />
          </Reveal>
        </div>
      </section>

      {/* Fleet */}
      <section className="section bg-ink-950">
        <div className="container-x">
          <SectionHeading eyebrow={t('deliveryPage.eyebrow')} title={t('deliveryPage.fleetTitle')} />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {fleetList.map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <article className="card-lift overflow-hidden rounded-3xl border border-ink-800 bg-ink-900/50">
                  <img
                    src={FLEET_IMAGES[index % FLEET_IMAGES.length]}
                    alt={item.title}
                    loading="lazy"
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                      <Icon name="truck" className="h-5 w-5 text-gold-400" />
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-300">{item.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 rounded-3xl border border-gold-500/20 bg-ink-900/50 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-white">{t('deliveryPage.notesTitle')}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-300">
              {noteList.map((note) => (
                <li key={note} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                  {note}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CoverageSection />

      <section className="section bg-ink-950">
        <div className="container-x">
          <SectionHeading eyebrow={t('deliveryPage.eyebrow')} title={t('deliveryPage.faqTitle')} />
          <div className="mx-auto mt-12 max-w-3xl">
            <FaqAccordion items={faqList} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

export default DeliveryServices
