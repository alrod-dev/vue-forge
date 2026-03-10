import { ref, computed, onMounted, Ref } from 'vue'

export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export type Breakpoint = keyof typeof breakpoints

export function useMediaQuery(query: string): Ref<boolean> {
  const matches = ref(false)

  onMounted(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    matches.value = mediaQuery.matches

    const handler = (e: MediaQueryListEvent) => {
      matches.value = e.matches
    }

    mediaQuery.addListener(handler)

    return () => {
      mediaQuery.removeListener(handler)
    }
  })

  return matches
}

export function useBreakpoint(): {
  isMobile: Readonly<Ref<boolean>>
  isTablet: Readonly<Ref<boolean>>
  isDesktop: Readonly<Ref<boolean>>
  isLargeDesktop: Readonly<Ref<boolean>>
  current: Readonly<Ref<Breakpoint>>
} {
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.sm - 1}px)`)
  const isTablet = useMediaQuery(`(min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.md - 1}px)`)
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`)
  const isLargeDesktop = useMediaQuery(`(min-width: ${breakpoints.lg}px)`)

  const current = computed<Breakpoint>(() => {
    if (isLargeDesktop.value) return 'lg'
    if (isDesktop.value) return 'md'
    if (isTablet.value) return 'sm'
    return 'xs'
  })

  return {
    isMobile: computed(() => isMobile.value),
    isTablet: computed(() => isTablet.value),
    isDesktop: computed(() => isDesktop.value),
    isLargeDesktop: computed(() => isLargeDesktop.value),
    current: computed(() => current.value),
  }
}
