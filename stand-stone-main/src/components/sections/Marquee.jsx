import { useLanguage } from '../../i18n/useLanguage.js'

/** Thin gold strip that scrolls the material list continuously. */
export function Marquee() {
  const { t } = useLanguage()
  const items = t('home.marquee')
  const list = Array.isArray(items) ? items : []

  return (
    <div className="relative overflow-hidden border-y border-gold-500/20 bg-ink-900/80 py-3.5">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {list.map((item) => (
              <li key={`${copy}-${item}`} className="flex items-center px-6 text-sm text-ink-200">
                <span className="mr-6 h-1.5 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink-950 to-transparent" />
    </div>
  )
}

export default Marquee
