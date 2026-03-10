import { ref, computed, Ref } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'auto'

export function useDarkMode(initialMode: ThemeMode = 'auto'): {
  isDark: Readonly<Ref<boolean>>
  mode: Ref<ThemeMode>
  setMode: (newMode: ThemeMode) => void
  toggle: () => void
} {
  const mode = ref<ThemeMode>(initialMode)

  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('vf-dark-mode') as ThemeMode | null
    if (stored) {
      mode.value = stored
    }
  }

  const isDark = computed(() => {
    if (mode.value === 'dark') {
      return true
    }
    if (mode.value === 'light') {
      return false
    }

    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    return false
  })

  const setMode = (newMode: ThemeMode): void => {
    mode.value = newMode
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('vf-dark-mode', newMode)
    }

    if (typeof document !== 'undefined') {
      const html = document.documentElement
      if (isDark.value) {
        html.classList.add('dark')
        html.classList.remove('light')
      } else {
        html.classList.add('light')
        html.classList.remove('dark')
      }
    }
  }

  const toggle = (): void => {
    if (mode.value === 'auto') {
      setMode(isDark.value ? 'light' : 'dark')
    } else {
      setMode(mode.value === 'light' ? 'dark' : 'light')
    }
  }

  // Apply initial theme
  setMode(mode.value)

  return {
    isDark: computed(() => isDark.value),
    mode,
    setMode,
    toggle,
  }
}
