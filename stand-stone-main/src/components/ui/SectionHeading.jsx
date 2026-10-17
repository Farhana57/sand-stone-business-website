import Reveal from './Reveal.jsx'

/** Eyebrow + title + subtitle block shared by every section. */
export function SectionHeading({ eyebrow, title, subtitle, align = 'center', light = false, className = '' }) {
  const alignment = align === 'left' ? 'items-start text-left' : 'items-center text-center'

  return (
    <Reveal className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow ? (
        <span
          className={`mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] ${
            light ? 'text-gold-700' : 'text-gold-400'
          }`}
        >
          <span className="h-px w-6 bg-current opacity-70" aria-hidden="true" />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={`max-w-3xl text-3xl font-bold leading-tight sm:text-4xl ${
          light ? 'text-ink-950' : 'text-white'
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 max-w-2xl text-base leading-relaxed ${light ? 'text-ink-600' : 'text-ink-300'}`}>
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  )
}

export default SectionHeading
