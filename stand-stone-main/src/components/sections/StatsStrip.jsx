import { useLanguage } from '../../i18n/useLanguage.js'
import { toBanglaDigits } from '../../lib/format.js'
import Reveal from '../ui/Reveal.jsx'

/** Small "at a glance" strip. Figures live in translations so they can be edited. */
export function StatsStrip({ items }) {
  const { t, lang } = useLanguage()
  const stats = items ?? t('aboutPage.stats')
  const list = Array.isArray(stats) ? stats : []

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {list.map((stat, index) => (
        <Reveal key={stat.label} delay={index * 90}>
          <div className="rounded-2xl border border-gold-500/20 bg-ink-900/60 p-6 text-center">
            <p className="text-4xl font-bold text-gradient-gold">
              {lang === 'bn' ? toBanglaDigits(stat.value) : stat.value}
            </p>
            <p className="mt-2 text-sm text-ink-300">{stat.label}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export default StatsStrip
