/**
 * Google Analytics loader (port of google-analytics.html). Prod-only by
 * contract: callers gate on import.meta.env.PROD before invoking.
 */

const loaded = new Set<string>()

export function loadGtag(id: string): void {
  if (typeof window === 'undefined' || loaded.has(id)) return
  loaded.add(id)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', id)
}

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}
