import { ref, onMounted, onBeforeUnmount, Ref } from 'vue'

export interface UseInfiniteScrollOptions {
  distance?: number
  onLoadMore: () => void | Promise<void>
  disabled?: boolean
}

export function useInfiniteScroll(
  target: Ref<HTMLElement | null>,
  options: UseInfiniteScrollOptions
): {
  isLoading: Ref<boolean>
} {
  const isLoading = ref(false)
  const { distance = 100, onLoadMore, disabled = false } = options

  const handler = async (event: Event) => {
    if (disabled || isLoading.value) return

    const element = event.target as HTMLElement
    if (
      element.scrollHeight - element.scrollTop - element.clientHeight <=
      distance
    ) {
      isLoading.value = true
      try {
        await onLoadMore()
      } finally {
        isLoading.value = false
      }
    }
  }

  onMounted(() => {
    const element = target.value
    if (element) {
      element.addEventListener('scroll', handler, { passive: true })
    }
  })

  onBeforeUnmount(() => {
    const element = target.value
    if (element) {
      element.removeEventListener('scroll', handler)
    }
  })

  return { isLoading }
}
