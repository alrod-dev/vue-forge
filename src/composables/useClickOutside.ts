import { ref, onMounted, onBeforeUnmount, Ref } from 'vue'

export function useClickOutside(
  target: Ref<HTMLElement | null>,
  callback: (event: MouseEvent) => void
): void {
  const handler = (event: MouseEvent) => {
    if (target.value && !target.value.contains(event.target as Node)) {
      callback(event)
    }
  }

  onMounted(() => {
    document.addEventListener('mousedown', handler, true)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handler, true)
  })
}

export function useClickOutsideElement(
  callback: (event: MouseEvent) => void
): {
  targetRef: Ref<HTMLElement | null>
} {
  const targetRef = ref<HTMLElement | null>(null)
  useClickOutside(targetRef, callback)
  return { targetRef }
}
