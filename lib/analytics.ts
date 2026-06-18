type Params = Record<string, unknown>
type ClarityApi = { event: (eventName: string) => void }

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

// Setado pelo componente Clarity (components/Analytics/Clarity.tsx) depois que o
// @microsoft/clarity termina de inicializar. Fica undefined em dev/sem env — track()
// segue funcionando normalmente pro GTM/GA4 nesse caso.
let clarityApi: ClarityApi | undefined

export function setClarityReady(api: ClarityApi) {
  clarityApi = api
}

/**
 * Dispara um evento de tracking pro dataLayer (GTM), direto pro GA4 (gtag) e pro
 * Microsoft Clarity (clarity.event). Não chama fbq diretamente: o Meta Pixel já está
 * instalado via tag no GTM, que escuta esses mesmos eventos do dataLayer — chamar fbq
 * aqui duplicaria o PageView/eventos no Pixel.
 * Best-effort e guardado: no-op no server e se alguma lib não estiver carregada.
 * `page` (pathname) entra em todo evento pra segmentar por página/campanha.
 */
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return
  const payload = { page: window.location.pathname, ...params }
  try { window.dataLayer?.push({ event, ...payload }) } catch { /* noop */ }
  try { window.gtag?.("event", event, payload) } catch { /* noop */ }
  try { clarityApi?.event(event) } catch { /* noop */ }
}
