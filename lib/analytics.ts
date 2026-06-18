type Params = Record<string, unknown>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Dispara um evento de tracking pro GA4 (gtag) e pro Meta Pixel (fbq).
 * Best-effort e guardado: no-op no server e se a lib não estiver carregada.
 * `page` (pathname) entra em todo evento pra segmentar por página/campanha.
 */
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return
  const payload = { page: window.location.pathname, ...params }
  try { window.gtag?.("event", event, payload) } catch { /* noop */ }
  try { window.fbq?.("trackCustom", event, payload) } catch { /* noop */ }
}
