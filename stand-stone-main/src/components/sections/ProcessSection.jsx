import { useLanguage } from '../../i18n/useLanguage.js'
import { toBanglaDigits } from '../../lib/format.js'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'

/** Four-step ordering process, with Bangla numerals when the site is in Bangla. */
export function ProcessSection() {
  const { t, lang } = useLanguage()
  const steps = t('home.process.steps')
  const list = Array.isArray(steps) ? steps : []

  return (
    <section className="section bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950">
      <div className="container-x">
        <SectionHeading
          eyebrow={t('home.process.eyebrow')}
          title={t('home.process.title')}
          subtitle={t('home.process.subtitle')}
        />

        <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {list.map((step, index) => {
            const number = String(index + 1)
            return (
              <Reveal as="li" key={step.title} delay={index * 110} className="relative">
                <div className="flex h-full flex-col rounded-2xl border border-ink-800 bg-ink-900/50 p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/40 bg-ink-950 text-xl font-bold text-gold-300">
                    {lang === 'bn' ? toBanglaDigits(number) : number}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">{step.body}</p>
                </div>
                {index < list.length - 1 ? (
                  <span
                    className="absolute top-12 -right-4 hidden h-px w-8 bg-gradient-to-r from-gold-500/60 to-transparent lg:block"
                    aria-hidden="true"
                  />
                ) : null}
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default ProcessSection
