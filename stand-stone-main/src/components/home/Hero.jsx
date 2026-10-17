import { CheckCircle2, MessageCircle, Phone } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage.js'
import { company } from '../../data/company.js'
import { buildTelLink, buildWhatsAppLink } from '../../lib/contact.js'
import Button from '../ui/Button.jsx'

/** Home page hero: full-bleed photograph, headline, CTAs and a contact card. */
export function Hero() {
  const { t, pick } = useLanguage()
  const trustPoints = t('home.hero.trustPoints')

  return (
    <section className="relative isolate overflow-hidden">
      <img
        src="/images/hero-truck.jpg"
        alt={t('home.hero.imageAlt')}
        className="absolute inset-0 h-full w-full object-cover object-center"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-950/90 to-ink-950/50" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 to-transparent" />

      <div className="container-x relative grid items-center gap-12 py-20 lg:grid-cols-[1.35fr_1fr] lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/35 bg-ink-900/70 px-4 py-1.5 text-xs font-medium tracking-wide text-gold-200 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400" aria-hidden="true" />
            {t('home.hero.badge')}
          </span>

          <h1 className="mt-6 text-4xl leading-[1.1] font-bold text-white sm:text-5xl lg:text-6xl">
            {t('home.hero.title')}{' '}
            <span className="text-gradient-gold">{t('home.hero.titleAccent')}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-200 sm:text-lg">
            {t('home.hero.subtitle')}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/contact" size="lg">
              {t('home.hero.primaryCta')}
            </Button>
            <Button to="/products" variant="outline" size="lg">
              {t('home.hero.secondaryCta')}
            </Button>
          </div>

          <ul className="mt-9 flex flex-col gap-3 text-sm text-ink-200 sm:flex-row sm:flex-wrap sm:gap-6">
            {(Array.isArray(trustPoints) ? trustPoints : []).map((point) => (
              <li key={point} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick contact card */}
        <div className="glass rounded-3xl p-6 shadow-premium sm:p-7">
          <p className="text-xs font-semibold tracking-[0.25em] text-gold-400 uppercase">
            {t('home.hero.cardTitle')}
          </p>
          <p className="mt-2 text-sm text-ink-200">{t('home.hero.cardSubtitle')}</p>

          <dl className="mt-5 space-y-3 text-sm">
            <div>
              <dt className="text-xs text-ink-500">{t('contactPage.phoneLabel')}</dt>
              <dd>
                <a
                  href={buildTelLink(company.phone)}
                  className="text-lg font-semibold text-white transition hover:text-gold-300"
                >
                  {company.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-ink-500">{t('contactPage.addressLabel')}</dt>
              <dd className="text-ink-200">{pick(company.address)}</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-500">{t('footer.hoursTitle')}</dt>
              <dd className="text-ink-200">{pick(company.hours)}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-col gap-2.5">
            <Button
              href={buildWhatsAppLink(company.whatsapp, t('actions.whatsappOrder'))}
              variant="whatsapp"
              fullWidth
              icon={MessageCircle}
            >
              {t('actions.whatsappOrder')}
            </Button>
            <Button href={buildTelLink(company.phone)} variant="outline" fullWidth icon={Phone}>
              {t('actions.callNow')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
