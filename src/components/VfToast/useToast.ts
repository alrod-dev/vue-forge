import { reactive, computed } from 'vue'

export type ToastVariant = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  message: string
  variant: ToastVariant
  duration?: number
}

const toasts = reactive<Toast[]>([])

export function useToast() {
  const addToast = (
    message: string,
    variant: ToastVariant = 'info',
    duration: number = 3000
  ): string => {
    const id = `toast-${Date.now()}-${Math.random()}`
    const toast: Toast = { id, message, variant, duration }

    toasts.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  const removeToast = (id: string): void => {
    const index = toasts.findIndex((t) => t.id === id)
    if (index > -1) {
      toasts.splice(index, 1)
    }
  }

  const clearAll = (): void => {
    toasts.length = 0
  }

  const success = (message: string, duration?: number): string => {
    return addToast(message, 'success', duration)
  }

  const error = (message: string, duration?: number): string => {
    return addToast(message, 'error', duration)
  }

  const info = (message: string, duration?: number): string => {
    return addToast(message, 'info', duration)
  }

  const warning = (message: string, duration?: number): string => {
    return addToast(message, 'warning', duration)
  }

  return {
    toasts: computed(() => toasts),
    addToast,
    removeToast,
    clearAll,
    success,
    error,
    info,
    warning,
  }
}
