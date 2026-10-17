import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Mail, Menu, MessageCircle, Phone, X } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage.js'
import { company } from '../../data/company.js'
import { navItems } from '../../data/navigation.js'
import { buildTelLink, buildWhatsAppLink } from '../../lib/contact.js'
import Button from '../ui/Button.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'

export function Navbar() {
  const { t, pick, language } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!menuOpen) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [menuOpen])

  // "Padma" শব্দ সরিয়ে দিয়ে শুধু "Sand & Stone" বা "স্যান্ড অ্যান্ড স্টোন" ফিল্টার
  const fullBrand = pick(company.name) || ''
  const brand = fullBrand.replace(/পদ্মা\s*/i, '').replace(/Padma\s*/i, '').trim() || (language === 'bn' ? 'স্যান্ড অ্যান্ড স্টোন' : 'Sand & Stone')
  const tagline = pick(company.tagline)

  const linkClass = ({ isActive }) =>
    `relative rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-amber-400 font-semibold' : 'text-slate-200 hover:text-amber-300'
    }`

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      {/* Utility strip — desktop only */}
      <div className="hidden border-b border-blue-800/40 bg-blue-950/95 text-xs text-slate-300 backdrop-blur lg:block">
        <div className="container-x flex h-9 items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={buildTelLink(company.phone)} className="flex items-center gap-2 transition hover:text-amber-300">
              <Phone className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
              {company.phoneDisplay}
            </a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-2 transition hover:text-amber-300">
              <Mail className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
              {company.email}
            </a>
          </div>
          <LanguageSwitcher size="sm" />
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${
          scrolled || menuOpen
            ? 'border-b border-amber-500/20 bg-slate-900 shadow-xl backdrop-blur-md'
            : 'bg-slate-900/90 backdrop-blur-md lg:bg-gradient-to-b lg:from-blue-950/90 lg:to-transparent'
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
          {/* Brand with Icon */}
          <Link to="/" onClick={closeMenu} className="group flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 text-slate-950 shadow-md">
              <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
                <path d="M16 3 27 25H5L16 3Z" fill="currentColor" opacity="0.95" />
                <path d="M9 25.5h14l-7 5-7-5Z" fill="currentColor" opacity="0.6" />
              </svg>
            </span>
            <span className="leading-tight">
              <span className="block text-base font-bold text-white transition group-hover:text-amber-300 sm:text-lg">
                {brand}
              </span>
              <span className="hidden text-[11px] text-slate-300 sm:block">{tagline}</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
                {t(item.key)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href={buildTelLink(company.phone)}
              variant="outline"
              size="sm"
              icon={Phone}
              className="hidden border-amber-400/50 text-amber-300 hover:bg-amber-400/10 sm:inline-flex"
            >
              {t('nav.callNow')}
            </Button>
            <Button to="/contact" size="sm" className="hidden bg-amber-500 font-semibold text-slate-950 hover:bg-amber-600 md:inline-flex">
              {t('nav.orderNow')}
            </Button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/40 text-amber-300 transition hover:bg-amber-500/10 lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer with scroll support */}
      <div
        id="mobile-menu"
        className={`overflow-y-auto border-b border-amber-500/20 bg-slate-950 transition-all duration-300 lg:hidden ${
          menuOpen ? 'max-h-[calc(100vh-4rem)] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="container-x flex flex-col gap-1 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-base font-medium transition ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300'
                    : 'text-slate-100 hover:bg-white/5 hover:text-amber-300'
                }`
              }
            >
              {t(item.key)}
            </NavLink>
          ))}

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
            <span className="text-sm text-slate-300">{t('lang.label')}</span>
            <LanguageSwitcher />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button href={buildTelLink(company.phone)} variant="outline" size="sm" icon={Phone}>
              {t('actions.callNow')}
            </Button>
            <Button
              href={buildWhatsAppLink(company.whatsapp, t('actions.whatsappOrder'))}
              variant="whatsapp"
              size="sm"
              icon={MessageCircle}
            >
              {t('actions.whatsapp')}
            </Button>
          </div>
          <Button to="/contact" size="md" fullWidth className="mt-2 bg-amber-500 font-semibold text-slate-950 hover:bg-amber-600" onClick={closeMenu}>
            {t('nav.orderNow')}
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar