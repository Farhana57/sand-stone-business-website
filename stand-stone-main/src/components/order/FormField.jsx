import { AlertCircle } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage.js'

/** Label + control + error/hint wrapper so every field looks and behaves the same. */
export function FormField({ id, label, required = false, optional = false, error, hint, children }) {
  const { t } = useLanguage()
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink-200">
        {label}
        {required ? (
          <span className="ml-1 text-gold-400" aria-hidden="true">
            *
          </span>
        ) : null}
        {optional ? (
          <span className="ml-2 text-xs font-normal text-ink-500">
            ({t('common.optional')})
          </span>
        ) : null}
      </label>

      {typeof children === 'function' ? children({ describedBy, invalid: Boolean(error) }) : children}

      {error ? (
        <p id={`${id}-error`} role="alert" className="flex items-start gap-1.5 text-xs text-red-400">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-ink-500">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export default FormField
