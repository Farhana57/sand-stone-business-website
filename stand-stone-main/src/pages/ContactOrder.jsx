import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage.js'
import { company } from '../data/company.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { buildMailtoLink, buildMapEmbedLink, buildMapsLink, buildTelLink, buildWhatsAppLink } from '../lib/contact.js'
import PageHero from '../components/sections/PageHero.jsx'
import OrderForm from '../components/order/OrderForm.jsx'
import CtaBand from '../components/sections/CtaBand.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'

export function ContactOrder() {
  const { t, pick } = useLanguage()
  useDocumentTitle('meta.contactTitle')

  const cards = [
    {
      icon: Phone,
      label: t('contactPage.phoneLabel'),
      value: company.phoneDisplay,
      href: buildTelLink(company.phone),
    },
    {
      icon: MessageCircle,
      label: t('contactPage.whatsappLabel'),
      value: t('actions.whatsappOrder'),
      href: buildWhatsAppLink(company.whatsapp, t('actions.whatsappOrder')),
    },
    {
      icon: Mail,
      label: t('contactPage.emailLabel'),
      value: company.email,
      href: buildMailtoLink(company.email, pick(company.name)),
    },
    {
      icon: MapPin,
      label: t('contactPage.addressLabel'),
      value: pick(company.address),
      href: buildMapsLink(company.mapQuery),
    },
  ]

  return (
    <>
      <PageHero
        image="/images/aerial-loading.jpg"
        imageAlt={t('deliveryPage.imageAlt')}
        eyebrow={t('contactPage.eyebrow')}
        title={t('contactPage.title')}
        subtitle={t('contactPage.subtitle')}
      />

      {/* Contact details */}
      <section className="section bg-ink-950 pb-0">
        <div className="container-x">
          <SectionHeading eyebrow={t('contactPage.eyebrow')} title={t('contactPage.infoTitle')} />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, index) => {
              const CardIcon = card.icon
              return (
                <Reveal key={card.label} delay={index * 80}>
                  <a
                    href={card.href}
                    {...(card.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="card-lift flex h-full flex-col rounded-2xl border border-ink-800 bg-ink-900/50 p-6"
                  >
                    <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/10 text-gold-300">
                      <CardIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-xs tracking-wide text-ink-500 uppercase">{card.label}</span>
                    <span className="mt-1 text-sm font-medium text-ink-100">{card.value}</span>
                  </a>
                </Reveal>
              )
            })}
          </div>

          <Reveal className="mt-6 flex flex-col gap-3 rounded-2xl border border-gold-500/20 bg-ink-900/60 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-3 text-sm text-ink-200">
              <Clock className="h-4 w-4 text-gold-400" aria-hidden="true" />
              {t('contactPage.hoursLabel')}: {pick(company.hours)}
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Button href={buildTelLink(company.phone)} size="sm" icon={Phone}>
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
          </Reveal>
        </div>
      </section>

      {/* Order form */}
      <section id="order" className="section bg-ink-950">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('contactPage.eyebrow')}
            title={t('contactPage.formTitle')}
            subtitle={t('contactPage.formSubtitle')}
          />
          <div className="mt-12">
            <OrderForm variant="page" />
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section bg-ink-900/40">
        <div className="container-x">
          <SectionHeading eyebrow={t('contactPage.eyebrow')} title={t('contactPage.mapTitle')} subtitle={t('contactPage.mapNote')} />
          <Reveal className="mt-10 overflow-hidden rounded-3xl border border-gold-500/20">
            <iframe
              title={t('contactPage.mapTitle')}
              src={buildMapEmbedLink(company.mapQuery)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full grayscale-[35%]"
            />
          </Reveal>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button href={buildMapsLink(company.mapQuery)} variant="outline" icon={MapPin}>
              {t('actions.openInMaps')}
            </Button>
            <Button to="/delivery" variant="dark">
              {t('actions.viewDelivery')}
            </Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

export default ContactOrder
