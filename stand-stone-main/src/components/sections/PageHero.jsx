import Reveal from '../ui/Reveal.jsx'

/**
 * Shared hero for inner pages: background photograph, dark overlay, eyebrow,
 * title and subtitle. Keeps every page's top section consistent.
 */
export function PageHero({ image, imageAlt = '', eyebrow, title, subtitle, children }) {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/45" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950 to-transparent" />

      <div className="container-x relative py-20 md:py-28">
        <Reveal className="max-w-3xl">
          {eyebrow ? (
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-gold-400 uppercase">
              <span className="h-px w-8 bg-current opacity-70" aria-hidden="true" />
              {eyebrow}
            </span>
          ) : null}
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">{title}</h1>
          {subtitle ? <p className="mt-4 max-w-2xl text-base text-ink-200 md:text-lg">{subtitle}</p> : null}
          {children ? <div className="mt-7 flex flex-wrap gap-3">{children}</div> : null}
        </Reveal>
      </div>
    </section>
  )
}

export default PageHero
