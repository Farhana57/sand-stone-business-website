import { MessageCircle, Phone } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage.js'
import { company } from '../../data/company.js'
import { buildTelLink, buildWhatsAppLink } from '../../lib/contact.js'

/** Always-visible WhatsApp + click-to-call buttons. */
export function FloatingActions() {
  const { t } = useLanguage()

  const labelBase =
    'pointer-events-none absolute top-1/2 hidden -translate-y-1/2 rounded-full border border-gold-500/25 bg-ink-900/95 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-ink-100 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:block'

  return (
    <div className="fixed right-4 bottom-5 z-40 flex flex-col items-end gap-3">
      <a
        href={buildWhatsAppLink(company.whatsapp, t('actions.whatsappOrder'))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('actions.whatsappOrder')}
        className="pulse-ring group relative flex h-13 w-13 items-center justify-center rounded-full bg-[#25d366] text-ink-950 shadow-[0_12px_30px_-12px_rgba(37,211,102,0.9)] transition hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
        <span className={`${labelBase} right-16`}>{t('actions.whatsappOrder')}</span>
      </a>

      <a
        href={buildTelLink(company.phone)}
        aria-label={t('actions.callNow')}
        className="group relative flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 text-ink-950 shadow-gold transition hover:scale-105"
      >
        <Phone className="h-6 w-6" aria-hidden="true" />
        <span className={`${labelBase} right-16`}>
          {t('actions.callNow')} · {company.phoneDisplay}
        </span>
      </a>
    </div>
  )
}

export default FloatingActions
