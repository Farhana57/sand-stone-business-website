/**
 * Order API client.
 *
 * The site works without any backend: when VITE_API_URL is not set, the order
 * form routes the request through WhatsApp instead (see OrderForm.jsx). When it
 * is set, orders are POSTed to `<VITE_API_URL>/api/orders`, implemented in the
 * optional `server/` folder.
 */

const rawBase = import.meta.env?.VITE_API_URL ?? ''
export const API_BASE_URL = String(rawBase).trim().replace(/\/+$/, '')

/** True when a real backend is configured for this build. */
export const isOrderApiConfigured = API_BASE_URL.length > 0

/**
 * Submit an order.
 * Always resolves — never throws — so the form can show an honest message
 * instead of a silent failure:
 *   { ok: true, order }                       -> saved on the server
 *   { ok: false, reason: 'not-configured' }   -> no backend, use WhatsApp
 *   { ok: false, reason: 'server'|'network', ... }
 */
export async function submitOrder(payload) {
  if (!isOrderApiConfigured) {
    return { ok: false, reason: 'not-configured' }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    let data = null
    try {
      data = await response.json()
    } catch {
      data = null
    }

    if (!response.ok) {
      return {
        ok: false,
        reason: 'server',
        status: response.status,
        message: data?.message,
        fieldErrors: data?.errors,
      }
    }

    return { ok: true, order: data?.order ?? data }
  } catch (error) {
    return { ok: false, reason: 'network', message: error?.message }
  }
}

export default submitOrder
