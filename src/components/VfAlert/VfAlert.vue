<template>
  <div
    v-if="visible"
    :class="['vf-alert', `vf-alert--${variant}`]"
    role="alert"
    :aria-live="variant === 'danger' ? 'assertive' : 'polite'"
  >
    <div class="vf-alert__icon">
      <slot name="icon">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
      </slot>
    </div>

    <div class="vf-alert__content">
      <h3 v-if="title" class="vf-alert__title">{{ title }}</h3>
      <p class="vf-alert__message">
        <slot />
      </p>
    </div>

    <button
      v-if="dismissible"
      class="vf-alert__close"
      aria-label="Dismiss alert"
      @click="dismiss"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface VfAlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger'
  title?: string
  dismissible?: boolean
}

withDefaults(defineProps<VfAlertProps>(), {
  variant: 'info',
  dismissible: false,
})

const visible = ref(true)

const dismiss = (): void => {
  visible.value = false
}
</script>

<style scoped>
.vf-alert {
  display: flex;
  align-items: flex-start;
  gap: var(--vf-space-3);
  padding: var(--vf-space-4);
  border-radius: var(--vf-radius-md);
  border-left: 4px solid;
  animation: slideIn var(--vf-transition-base);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.vf-alert--info {
  background-color: var(--vf-color-info-light);
  color: var(--vf-color-info);
  border-left-color: var(--vf-color-info);
}

.vf-alert--success {
  background-color: var(--vf-color-success-light);
  color: var(--vf-color-success);
  border-left-color: var(--vf-color-success);
}

.vf-alert--warning {
  background-color: var(--vf-color-warning-light);
  color: var(--vf-color-warning);
  border-left-color: var(--vf-color-warning);
}

.vf-alert--danger {
  background-color: var(--vf-color-danger-light);
  color: var(--vf-color-danger);
  border-left-color: var(--vf-color-danger);
}

.vf-alert__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.vf-alert__content {
  flex: 1;
  margin: 0;
}

.vf-alert__title {
  margin: 0 0 var(--vf-space-1) 0;
  font-weight: var(--vf-font-semibold);
  font-size: var(--vf-text-sm);
}

.vf-alert__message {
  margin: 0;
  font-size: var(--vf-text-sm);
  line-height: var(--vf-line-height-relaxed);
}

.vf-alert__close {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  color: currentColor;
  width: 20px;
  height: 20px;
  padding: 0;
  flex-shrink: 0;
  transition: opacity var(--vf-transition-base);
}

.vf-alert__close:hover {
  opacity: 0.7;
}

.vf-alert__close:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
</style>
