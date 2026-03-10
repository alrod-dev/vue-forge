import './variables.css'
import './dark.css'

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto'
  preferredDark?: boolean
}

export class ThemeManager {
  private mode: 'light' | 'dark' | 'auto' = 'auto'
  private isDarkMode = false

  constructor(config?: ThemeConfig) {
    if (config?.mode) {
      this.mode = config.mode
    }
    this.init()
  }

  private init(): void {
    if (typeof window === 'undefined') return

    const stored = localStorage.getItem('vf-theme-mode') as 'light' | 'dark' | null
    if (stored) {
      this.mode = stored
    }

    this.applyTheme()

    // Watch system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addListener((e) => {
        if (this.mode === 'auto') {
          this.isDarkMode = e.matches
          this.applyTheme()
        }
      })
    }
  }

  private applyTheme(): void {
    if (typeof document === 'undefined') return

    const isDark =
      this.mode === 'dark' ||
      (this.mode === 'auto' &&
        window.matchMedia?.('(prefers-color-scheme: dark)').matches)

    this.isDarkMode = isDark

    const html = document.documentElement
    if (isDark) {
      html.classList.add('dark')
      html.classList.remove('light')
    } else {
      html.classList.add('light')
      html.classList.remove('dark')
    }

    html.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }

  setMode(mode: 'light' | 'dark' | 'auto'): void {
    this.mode = mode
    localStorage.setItem('vf-theme-mode', mode)
    this.applyTheme()
  }

  getMode(): 'light' | 'dark' | 'auto' {
    return this.mode
  }

  isDark(): boolean {
    return this.isDarkMode
  }

  toggle(): void {
    if (this.mode === 'auto') {
      this.setMode(this.isDarkMode ? 'light' : 'dark')
    } else {
      this.setMode(this.mode === 'light' ? 'dark' : 'light')
    }
  }
}

export const themeManager = new ThemeManager()
