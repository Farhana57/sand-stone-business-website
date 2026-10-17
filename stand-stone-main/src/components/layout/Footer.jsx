import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage.js'
import { company } from '../../data/company.js'
import { navItems } from '../../data/navigation.js'
import { products } from '../../data/products.js'
import { buildMailtoLink, buildMapsLink, buildTelLink, buildWhatsAppLink } from '../../lib/contact.js'

/**
 * lucide-react v1 dropped brand logos, so the Facebook mark is inlined here
 * (simple brand glyph, decorative).
 */
function FacebookGlyph({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-7.2h2.5l.4-2.9h-2.9V9.2c0-.8.2-1.4 1.4-1.4h1.6V5.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v2.9h2.5V21h3.2Z" />
    </svg>
  )
}

export function Footer() {
  const { t, pick } = useLanguage()

  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-24 border-t border-gold-500/20 bg-ink-950">
      <div className="hairline absolute inset-x-0 -top-px" />
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 text-ink-950">
              <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
                <path d="M16 3 27 25H5L16 3Z" fill="currentColor" />
                <path d="M9 25.5h14l-7 5-7-5Z" fill="currentColor" opacity="0.6" />
              </svg>
            </span>
            <span className="text-lg font-bold text-white">{pick(company.name)}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-300">{t('footer.aboutBody')}</p>
          {company.social?.facebook ? (
            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-700 text-ink-300 transition hover:border-gold-500/60 hover:text-gold-300"
            >
              <FacebookGlyph className="h-4 w-4" />
            </a>
          ) : null}
        </div>

        {/* Quick links */}
        <nav aria-label={t('footer.quickLinks')}>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            {t('footer.quickLinks')}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-ink-300 transition hover:text-gold-300">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Materials */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            {t('footer.materials')}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {products.slice(0, 6).map((product) => (
              <li key={product.id}>
                <Link
                  to={`/products?category=${product.category}`}
                  className="text-ink-300 transition hover:text-gold-300"
                >
                  {pick(product.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            {t('footer.contactTitle')}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-300">
            <li>
              <a href={buildTelLink(company.phone)} className="flex items-start gap-3 transition hover:text-gold-300">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                <span>{company.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={buildWhatsAppLink(company.whatsapp, t('actions.whatsappOrder'))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition hover:text-gold-300"
              >
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                <span>{t('actions.whatsapp')}</span>
              </a>
            </li>
            <li>
              <a
                href={buildMailtoLink(company.email, pick(company.name))}
                className="flex items-start gap-3 transition hover:text-gold-300"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                <span>{company.email}</span>
              </a>
            </li>
            <li>
              <a
                href={buildMapsLink(company.mapQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition hover:text-gold-300"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                <span>{pick(company.address)}</span>
              </a>
            </li>
          </ul>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            {t('footer.hoursTitle')}
          </h3>
          <p className="mt-3 flex items-start gap-3 text-sm text-ink-300">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
            <span>{pick(company.hours)}</span>
          </p>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {pick(company.name)}. {t('footer.rights')}
          </p>
          <p className="max-w-2xl text-ink-500">{t('common.demoNotice')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
