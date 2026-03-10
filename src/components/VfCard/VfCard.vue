<template>
  <article class="vf-card" :class="{ 'vf-card--interactive': interactive }">
    <div v-if="$slots.header" class="vf-card__header">
      <slot name="header" />
    </div>

    <div class="vf-card__body">
      <slot />
    </div>

    <div v-if="$slots.footer" class="vf-card__footer">
      <slot name="footer" />
    </div>
  </article>
</template>

<script setup lang="ts">
export interface VfCardProps {
  interactive?: boolean
}

withDefaults(defineProps<VfCardProps>(), {
  interactive: false,
})
</script>

<style scoped>
.vf-card {
  background-color: var(--vf-bg-primary);
  border: 1px solid var(--vf-border-light);
  border-radius: var(--vf-radius-lg);
  box-shadow: var(--vf-shadow-sm);
  overflow: hidden;
  transition: all var(--vf-transition-base);
}

.vf-card--interactive {
  cursor: pointer;
}

.vf-card--interactive:hover {
  box-shadow: var(--vf-shadow-md);
  border-color: var(--vf-border-default);
  transform: translateY(-2px);
}

.vf-card__header {
  padding: var(--vf-space-4);
  border-bottom: 1px solid var(--vf-border-light);
}

.vf-card__body {
  padding: var(--vf-space-4);
}

.vf-card__footer {
  padding: var(--vf-space-4);
  border-top: 1px solid var(--vf-border-light);
  background-color: var(--vf-bg-secondary);
}
</style>
