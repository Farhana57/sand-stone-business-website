import { Check } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage.js'
import { products } from '../../data/products.js'
import { toBanglaDigits } from '../../lib/format.js'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'

/** Bangla numerals in Bangla mode, plain digits otherwise. */
const toBanglaDigitsOrPlain = (value, lang) => (lang === 'bn' ? toBanglaDigits(value) : String(value))

/** Compact "about us" block that introduces the business on the home page. */
export function AboutStrip() {
  const { t, lang } = useLanguage()
  const points = t('home.about.points')

  return (
    <section className="section bg-ink-950">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="overflow-hidden rounded-3xl border border-gold-500/20">
            <img
              src="/images/workers.jpg"
              alt={t('home.about.imageAlt')}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -right-4 -bottom-6 hidden rounded-2xl border border-gold-500/30 bg-ink-900/95 p-5 shadow-premium sm:block">
            <p className="text-3xl font-bold text-gradient-gold">{toBanglaDigitsOrPlain(products.length, lang)}</p>
            <p className="mt-1 text-xs tracking-wide text-ink-300 uppercase">{t('home.about.badgeLabel')}</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-gold-400 uppercase">
            <span className="h-px w-6 bg-current opacity-70" aria-hidden="true" />
            {t('home.about.eyebrow')}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{t('home.about.title')}</h2>
          <p className="mt-5 leading-relaxed text-ink-300">{t('home.about.body')}</p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {(Array.isArray(points) ? points : []).map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-ink-100">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/about">{t('actions.learnMore')}</Button>
            <Button to="/contact" variant="outline">
              {t('actions.contactUs')}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default AboutStrip
