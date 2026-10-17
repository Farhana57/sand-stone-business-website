import { MessageCircle, Phone } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage.js'
import { company } from '../../data/company.js'
import { buildTelLink, buildWhatsAppLink } from '../../lib/contact.js'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'

/** High-contrast conversion band used at the bottom of most pages. */
export function CtaBand({ title, subtitle }) {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, #08090c 0 2px, transparent 2px 14px)',
        }}
        aria-hidden="true"
      />
      <div className="container-x relative flex flex-col items-start gap-6 py-14 lg:flex-row lg:items-center lg:justify-between">
        <Reveal className="max-w-2xl">
          <h2 className="text-2xl font-bold text-ink-950 sm:text-3xl">{title ?? t('home.cta.title')}</h2>
          <p className="mt-3 text-ink-800">{subtitle ?? t('home.cta.subtitle')}</p>
        </Reveal>

        <Reveal delay={120} className="flex flex-wrap gap-3">
          <Button href={buildTelLink(company.phone)} variant="dark" size="lg" icon={Phone}>
            {company.phoneDisplay}
          </Button>
          <Button
            href={buildWhatsAppLink(company.whatsapp, t('actions.whatsappOrder'))}
            variant="light"
            size="lg"
            icon={MessageCircle}
          >
            {t('actions.whatsappOrder')}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

export default CtaBand
