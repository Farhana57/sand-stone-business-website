/** Shared input styling for all order form controls. */
export function inputClass(invalid) {
  return [
    'w-full rounded-xl border bg-ink-900/70 px-4 py-3 text-sm text-white transition placeholder:text-ink-500',
    'focus:outline-none focus:ring-2 focus:ring-gold-500/40',
    invalid ? 'border-red-500/70 focus:border-red-500' : 'border-ink-700 focus:border-gold-500',
  ].join(' ')
}

export default inputClass
