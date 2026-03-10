<template>
  <Teleport to="body">
    <Transition name="vf-modal-fade">
      <div v-if="modelValue" class="vf-modal__backdrop" @click="closeModal" />
    </Transition>

    <Transition name="vf-modal-slide">
      <div
        v-if="modelValue"
        ref="modalRef"
        :class="['vf-modal', `vf-modal--${size}`]"
        role="dialog"
        :aria-modal="true"
        :aria-labelledby="titleId"
        @keydown.escape="closeModal"
      >
        <div class="vf-modal__header" v-if="$slots.header || title">
          <slot v-if="$slots.header" name="header" />
          <h2 v-else :id="titleId" class="vf-modal__title">
            {{ title }}
          </h2>
          <button
            class="vf-modal__close"
            aria-label="Close dialog"
            @click="closeModal"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div class="vf-modal__content">
          <slot />
        </div>

        <div v-if="$slots.footer" class="vf-modal__footer">
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useClickOutside } from '@composables/useClickOutside'

export interface VfModalProps {
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg'
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
}

const props = withDefaults(defineProps<VfModalProps>(), {
  size: 'md',
  closeOnBackdrop: true,
  closeOnEscape: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const modalRef = ref<HTMLElement | null>(null)
const titleId = computed(() => `vf-modal-title-${Math.random().toString(36).slice(2)}`)

const closeModal = (): void => {
  emit('update:modelValue', false)
}

const handleBackdropClick = (): void => {
  if (props.closeOnBackdrop) {
    closeModal()
  }
}

onMounted(() => {
  if (props.modelValue) {
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  document.body.style.overflow = 'auto'
})

useClickOutside(modalRef, handleBackdropClick)
</script>

<style scoped>
.vf-modal__backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--vf-bg-overlay);
  z-index: var(--vf-z-modal-backdrop);
}

.vf-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--vf-bg-primary);
  border-radius: var(--vf-radius-lg);
  box-shadow: var(--vf-shadow-xl);
  z-index: var(--vf-z-modal);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow: hidden;
}

.vf-modal--sm {
  width: 90%;
  max-width: 400px;
}

.vf-modal--md {
  width: 90%;
  max-width: 600px;
}

.vf-modal--lg {
  width: 90%;
  max-width: 900px;
}

.vf-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--vf-space-6);
  border-bottom: 1px solid var(--vf-border-light);
}

.vf-modal__title {
  margin: 0;
  font-size: var(--vf-text-xl);
  font-weight: var(--vf-font-semibold);
  color: var(--vf-text-primary);
}

.vf-modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background-color: transparent;
  color: var(--vf-text-secondary);
  cursor: pointer;
  border-radius: var(--vf-radius-md);
  transition: all var(--vf-transition-base);
}

.vf-modal__close:hover {
  background-color: var(--vf-bg-secondary);
  color: var(--vf-text-primary);
}

.vf-modal__close:focus-visible {
  outline: 2px solid var(--vf-color-primary);
  outline-offset: 2px;
}

.vf-modal__content {
  flex: 1;
  overflow-y: auto;
  padding: var(--vf-space-6);
}

.vf-modal__footer {
  padding: var(--vf-space-6);
  border-top: 1px solid var(--vf-border-light);
  display: flex;
  gap: var(--vf-space-3);
  justify-content: flex-end;
}

/* Transitions */
.vf-modal-fade-enter-active,
.vf-modal-fade-leave-active {
  transition: opacity var(--vf-transition-base);
}

.vf-modal-fade-enter-from,
.vf-modal-fade-leave-to {
  opacity: 0;
}

.vf-modal-slide-enter-active,
.vf-modal-slide-leave-active {
  transition: all var(--vf-transition-base);
}

.vf-modal-slide-enter-from,
.vf-modal-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, -48%);
}
</style>
