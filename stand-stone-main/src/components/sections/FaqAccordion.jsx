import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Reveal from '../ui/Reveal.jsx'

/** Simple, accessible accordion: one panel open at a time. */
export function FaqAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const open = openIndex === index
        const panelId = `faq-panel-${index}`
        const buttonId = `faq-button-${index}`

        return (
          <Reveal key={item.q} delay={index * 60}>
            <div className="overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/50">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-white transition hover:text-gold-300"
                >
                  {item.q}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-gold-400 transition-transform duration-300 ${
                      open ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!open}
                className="px-5 pb-5 text-sm leading-relaxed text-ink-300"
              >
                {item.a}
              </div>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}

export default FaqAccordion
