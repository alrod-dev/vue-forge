<template>
  <span :class="['vf-badge', `vf-badge--${variant}`, `vf-badge--${size}`]">
    <slot />
  </span>
</template>

<script setup lang="ts">
export interface VfBadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<VfBadgeProps>(), {
  variant: 'primary',
  size: 'md',
})
</script>

<style scoped>
.vf-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--vf-font-semibold);
  border-radius: var(--vf-radius-full);
  white-space: nowrap;
}

.vf-badge--sm {
  padding: var(--vf-space-1) var(--vf-space-2);
  font-size: var(--vf-text-xs);
}

.vf-badge--md {
  padding: var(--vf-space-2) var(--vf-space-3);
  font-size: var(--vf-text-sm);
}

.vf-badge--lg {
  padding: var(--vf-space-2) var(--vf-space-4);
  font-size: var(--vf-text-base);
}

.vf-badge--primary {
  background-color: var(--vf-color-primary-light);
  color: var(--vf-color-primary-dark);
}

.vf-badge--success {
  background-color: var(--vf-color-success-light);
  color: var(--vf-color-success);
}

.vf-badge--warning {
  background-color: var(--vf-color-warning-light);
  color: var(--vf-color-warning);
}

.vf-badge--danger {
  background-color: var(--vf-color-danger-light);
  color: var(--vf-color-danger);
}

.vf-badge--info {
  background-color: var(--vf-color-info-light);
  color: var(--vf-color-info);
}
</style>
