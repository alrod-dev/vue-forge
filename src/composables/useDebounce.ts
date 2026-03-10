import { ref, watch, Ref } from 'vue'

export function useDebounce<T>(
  value: Ref<T>,
  delay: number = 300
): Ref<T> {
  const debouncedValue = ref(value.value) as Ref<T>

  const timer = ref<ReturnType<typeof setTimeout> | null>(null)

  watch(
    value,
    (newValue) => {
      if (timer.value) {
        clearTimeout(timer.value)
      }

      timer.value = setTimeout(() => {
        debouncedValue.value = newValue
      }, delay)
    },
    { immediate: false }
  )

  return debouncedValue
}

export function useDebounceFn<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300
): T {
  let timer: ReturnType<typeof setTimeout> | null = null

  return ((...args: any[]) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }) as T
}
