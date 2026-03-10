<template>
  <Teleport to="body">
    <div class="vf-toast-container">
      <TransitionGroup name="vf-toast" tag="div">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="['vf-toast', `vf-toast--${toast.variant}`]"
          role="alert"
          :aria-live="toast.variant === 'error' ? 'assertive' : 'polite'"
        >
          <div class="vf-toast__icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>

          <div class="vf-toast__content">
            {{ toast.message }}
          </div>

          <button
            class="vf-toast__close"
            aria-label="Close notification"
            @click="removeToast(toast.id)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from './useToast'

const { toasts, removeToast } = useToast()
</script>

<style scoped>
.vf-toast-container {
  position: fixed;
  top: var(--vf-space-4);
  right: var(--vf-space-4);
  z-index: var(--vf-z-tooltip);
  display: flex;
  flex-direction: column;
  gap: var(--vf-space-3);
  pointer-events: none;
}

.vf-toast {
  display: flex;
  align-items: center;
  gap: var(--vf-space-3);
  padding: var(--vf-space-4);
  background-color: var(--vf-bg-primary);
  border: 1px solid var(--vf-border-default);
  border-radius: var(--vf-radius-md);
  box-shadow: var(--vf-shadow-lg);
  border-left: 4px solid;
  animation: slideIn var(--vf-transition-base);
  pointer-events: auto;
  min-width: 300px;
  max-width: 400px;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(400px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.vf-toast--success {
  border-left-color: var(--vf-color-success);
  background-color: var(--vf-color-success-light);
  color: var(--vf-color-success);
}

.vf-toast--error {
  border-left-color: var(--vf-color-danger);
  background-color: var(--vf-color-danger-light);
  color: var(--vf-color-danger);
}

.vf-toast--info {
  border-left-color: var(--vf-color-info);
  background-color: var(--vf-color-info-light);
  color: var(--vf-color-info);
}

.vf-toast--warning {
  border-left-color: var(--vf-color-warning);
  background-color: var(--vf-color-warning-light);
  color: var(--vf-color-warning);
}

.vf-toast__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.vf-toast__content {
  flex: 1;
  font-size: var(--vf-text-sm);
  line-height: var(--vf-line-height-normal);
}

.vf-toast__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: currentColor;
  padding: 0;
  flex-shrink: 0;
  transition: opacity var(--vf-transition-base);
}

.vf-toast__close:hover {
  opacity: 0.7;
}

/* Transition group animations */
.vf-toast-move {
  transition: all var(--vf-transition-base);
}

.vf-toast-enter-active {
  transition: all var(--vf-transition-base);
}

.vf-toast-leave-active {
  transition: all var(--vf-transition-base);
}

.vf-toast-enter-from {
  opacity: 0;
  transform: translateX(400px);
}

.vf-toast-leave-to {
  opacity: 0;
  transform: translateX(400px);
}
</style>
