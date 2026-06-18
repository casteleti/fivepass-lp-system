type Params = Record<string, unknown>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

/**
 * Dispara um evento de tracking pro dataLayer (GTM) e direto pro GA4 (gtag).
 * Não chama fbq diretamente: o Meta Pixel já está instalado via tag no GTM,
 * que escuta esses mesmos eventos do dataLayer — chamar fbq aqui duplicaria
 * o PageView/eventos no Pixel.
 * Best-effort e guardado: no-op no server e se a lib não estiver carregada.
 * `page` (pathname) entra em todo evento pra segmentar por página/campanha.
 */
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return
  const payload = { page: window.location.pathname, ...params }
  try { window.dataLayer?.push({ event, ...payload }) } catch { /* noop */ }
  try { window.gtag?.("event", event, payload) } catch { /* noop */ }
}
