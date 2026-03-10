<template>
  <div :class="['vf-skeleton', `vf-skeleton--${variant}`]" aria-busy="true" />
</template>

<script setup lang="ts">
export interface VfSkeletonProps {
  variant?: 'text' | 'circle' | 'rectangle' | 'button'
}

withDefaults(defineProps<VfSkeletonProps>(), {
  variant: 'text',
})
</script>

<style scoped>
.vf-skeleton {
  background: linear-gradient(
    90deg,
    var(--vf-bg-secondary) 0%,
    var(--vf-bg-tertiary) 50%,
    var(--vf-bg-secondary) 100%
  );
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.vf-skeleton--text {
  height: 1rem;
  border-radius: var(--vf-radius-sm);
}

.vf-skeleton--circle {
  width: 40px;
  height: 40px;
  border-radius: var(--vf-radius-full);
}

.vf-skeleton--rectangle {
  width: 100%;
  height: 200px;
  border-radius: var(--vf-radius-md);
}

.vf-skeleton--button {
  height: 40px;
  border-radius: var(--vf-radius-md);
  width: 120px;
}
</style>
