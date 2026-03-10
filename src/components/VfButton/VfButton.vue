<template>
  <button
    :class="[
      'vf-button',
      `vf-button--${variant}`,
      `vf-button--${size}`,
      {
        'vf-button--loading': loading,
        'vf-button--disabled': disabled,
      },
    ]"
    :disabled="disabled || loading"
    :aria-busy="loading"
    :type="buttonType"
    v-bind="$attrs"
  >
    <span v-if="$slots.icon && !loading" class="vf-button__icon vf-button__icon--start">
      <slot name="icon" />
    </span>

    <span v-if="loading" class="vf-button__spinner">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        class="vf-button__spinner-icon"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    </span>

    <span class="vf-button__text">
      <slot />
    </span>

    <span v-if="$slots.icon" class="vf-button__icon vf-button__icon--end">
      <slot name="icon" />
    </span>
  </button>
</template>

<script setup lang="ts">
export interface VfButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

withDefaults(defineProps<VfButtonProps>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  type: 'button',
})
</script>

<style scoped>
.vf-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--vf-space-2);
  font-family: var(--vf-font-sans);
  font-weight: var(--vf-font-semibold);
  border: none;
  border-radius: var(--vf-radius-md);
  cursor: pointer;
  transition: all var(--vf-transition-base);
  white-space: nowrap;
  position: relative;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
}

/* Sizes */
.vf-button--sm {
  padding: var(--vf-space-2) var(--vf-space-3);
  font-size: var(--vf-text-sm);
  min-height: 32px;
}

.vf-button--md {
  padding: var(--vf-space-3) var(--vf-space-4);
  font-size: var(--vf-text-base);
  min-height: 40px;
}

.vf-button--lg {
  padding: var(--vf-space-4) var(--vf-space-6);
  font-size: var(--vf-text-lg);
  min-height: 48px;
}

/* Variants */
.vf-button--primary {
  background-color: var(--vf-color-primary);
  color: white;
  box-shadow: var(--vf-shadow-sm);
}

.vf-button--primary:hover:not(:disabled) {
  background-color: var(--vf-color-primary-dark);
  box-shadow: var(--vf-shadow-md);
}

.vf-button--primary:focus-visible {
  outline: 2px solid var(--vf-color-primary);
  outline-offset: 2px;
}

.vf-button--secondary {
  background-color: var(--vf-color-secondary-light);
  color: var(--vf-color-secondary-dark);
}

.vf-button--secondary:hover:not(:disabled) {
  background-color: var(--vf-color-secondary-light);
  box-shadow: var(--vf-shadow-md);
}

.vf-button--ghost {
  background-color: transparent;
  color: var(--vf-color-primary);
  border: 1px solid var(--vf-border-default);
}

.vf-button--ghost:hover:not(:disabled) {
  background-color: var(--vf-color-primary-light);
  border-color: var(--vf-color-primary);
}

.vf-button--danger {
  background-color: var(--vf-color-danger);
  color: white;
}

.vf-button--danger:hover:not(:disabled) {
  background-color: #dc2626;
}

/* States */
.vf-button--disabled,
.vf-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.vf-button--loading {
  color: transparent;
}

/* Icon spacing */
.vf-button__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
}

.vf-button__icon--start {
  margin-right: -var(--vf-space-2);
}

.vf-button__icon--end {
  margin-left: -var(--vf-space-2);
}

/* Spinner */
.vf-button__spinner {
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.vf-button__spinner-icon {
  width: 1em;
  height: 1em;
  animation: vf-spin 1s linear infinite;
}

@keyframes vf-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
