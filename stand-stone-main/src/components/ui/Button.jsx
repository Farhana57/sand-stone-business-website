import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  gold: 'bg-gradient-to-r from-gold-400 to-gold-600 text-ink-950 hover:from-gold-300 hover:to-gold-500 shadow-[0_14px_35px_-15px_rgba(208,155,31,0.7)] hover:shadow-[0_18px_40px_-12px_rgba(208,155,31,0.85)]',
  outline:
    'border border-gold-500/60 text-gold-200 hover:bg-gold-500/12 hover:border-gold-400 hover:text-gold-100',
  dark: 'bg-ink-900 text-ink-100 border border-ink-700 hover:bg-ink-800 hover:border-gold-500/50',
  light: 'bg-white text-ink-950 hover:bg-gold-100',
  whatsapp: 'bg-[#25d366] text-ink-950 hover:bg-[#1fbe5b] shadow-[0_14px_35px_-15px_rgba(37,211,102,0.75)]',
  ghost: 'text-ink-200 hover:text-gold-300',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm sm:text-base',
  lg: 'px-6 py-3 text-base sm:px-7 sm:py-3.5',
}

/**
 * One button component for links, anchors and form buttons.
 * Pass `to` for an internal route, `href` for an external link,
 * otherwise a plain <button> is rendered.
 */
export function Button({
  to,
  href,
  variant = 'gold',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  fullWidth = false,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    base,
    variants[variant] ?? variants.gold,
    sizes[size] ?? sizes.md,
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {Icon ? <Icon className="h-[1.15em] w-[1.15em] shrink-0" aria-hidden="true" /> : null}
      <span>{children}</span>
      {IconRight ? <IconRight className="h-[1.15em] w-[1.15em] shrink-0" aria-hidden="true" /> : null}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    const external = /^https?:/i.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}

export default Button
