/**
 * Port of jekyll-theme-isotc211 _frontend/js/theme.js: `html.dark` class +
 * 'iso-tc211-theme' localStorage key + OS-preference sync + window.__theme.
 */

export const STORAGE_KEY = 'iso-tc211-theme'
export const DARK_CLASS = 'dark'

export type Theme = 'dark' | 'light'

export function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function setTheme(theme: Theme): void {
  if (theme === 'dark') {
    document.documentElement.classList.add(DARK_CLASS)
  } else {
    document.documentElement.classList.remove(DARK_CLASS)
  }
  localStorage.setItem(STORAGE_KEY, theme)
}

export function toggleTheme(): Theme {
  const current = getPreferredTheme()
  const next: Theme = current === 'dark' ? 'light' : 'dark'
  setTheme(next)
  return next
}

/**
 * Synchronize the OS color-scheme preference while the user has no stored
 * preference. Returns a disposer. Safe to call multiple times.
 */
export function watchSystemTheme(): () => void {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const onChange = (e: MediaQueryListEvent) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setTheme(e.matches ? 'dark' : 'light')
    }
  }
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

declare global {
  interface Window {
    __theme?: { toggle: typeof toggleTheme; get: typeof getPreferredTheme; set: typeof setTheme }
  }
}

/** Mirror the legacy gem's window.__theme contract for parity. */
export function exposeGlobalTheme(): void {
  if (typeof window !== 'undefined') {
    window.__theme = { toggle: toggleTheme, get: getPreferredTheme, set: setTheme }
  }
}
