import { useLanguage } from '../../i18n/useLanguage.js'

const OPTIONS = [
  { code: 'bn', label: 'বাংলা' },
  { code: 'en', label: 'English' },
]

/**
 * Bangla | English switcher. Updates the whole site instantly through the
 * language context — no reload, no navigation reset.
 */
export function LanguageSwitcher({ size = 'md', className = '' }) {
  const { lang, setLang, t } = useLanguage()

  const base =
    size === 'sm'
      ? 'px-2.5 py-1 text-xs'
      : 'px-3.5 py-1.5 text-sm'

  return (
    <div
      role="group"
      aria-label={t('lang.switchTo')}
      className={`inline-flex items-center gap-0.5 rounded-full border border-gold-500/35 bg-ink-900/70 p-0.5 ${className}`}
    >
      {OPTIONS.map((option, index) => {
        const active = lang === option.code
        return (
          <span key={option.code} className="flex items-center">
            {index > 0 ? (
              <span className="mx-0.5 h-4 w-px bg-gold-500/35" aria-hidden="true" />
            ) : null}
            <button
              type="button"
              lang={option.code}
              onClick={() => setLang(option.code)}
              aria-pressed={active}
              className={`rounded-full font-semibold transition-colors duration-200 ${base} ${
                option.code === 'bn' ? 'font-bangla' : ''
              } ${
                active
                  ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-ink-950'
                  : 'text-ink-200 hover:text-gold-300'
              }`}
            >
              {option.label}
            </button>
          </span>
        )
      })}
    </div>
  )
}

export default LanguageSwitcher
