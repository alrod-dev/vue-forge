<template>
  <div :class="['vf-avatar', `vf-avatar--${size}`]">
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="vf-avatar__image"
    />
    <div v-else class="vf-avatar__fallback">
      {{ initials }}
    </div>
    <div v-if="status" :class="['vf-avatar__status', `vf-avatar__status--${status}`]" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface VfAvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  status?: 'online' | 'offline' | 'away' | 'busy'
}

const props = withDefaults(defineProps<VfAvatarProps>(), {
  size: 'md',
})

const initials = computed(() => {
  if (!props.name) return '?'
  return props.name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2)
})
</script>

<style scoped>
.vf-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--vf-radius-full);
  overflow: hidden;
  background-color: var(--vf-color-primary-light);
  color: var(--vf-color-primary-dark);
  flex-shrink: 0;
  font-weight: var(--vf-font-semibold);
}

.vf-avatar--sm {
  width: 32px;
  height: 32px;
  font-size: var(--vf-text-xs);
}

.vf-avatar--md {
  width: 40px;
  height: 40px;
  font-size: var(--vf-text-sm);
}

.vf-avatar--lg {
  width: 48px;
  height: 48px;
  font-size: var(--vf-text-base);
}

.vf-avatar--xl {
  width: 64px;
  height: 64px;
  font-size: var(--vf-text-lg);
}

.vf-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vf-avatar__fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.vf-avatar__status {
  position: absolute;
  bottom: 0;
  right: 0;
  border: 2px solid var(--vf-bg-primary);
  border-radius: var(--vf-radius-full);
}

.vf-avatar--sm .vf-avatar__status {
  width: 10px;
  height: 10px;
}

.vf-avatar--md .vf-avatar__status,
.vf-avatar--lg .vf-avatar__status {
  width: 12px;
  height: 12px;
}

.vf-avatar--xl .vf-avatar__status {
  width: 16px;
  height: 16px;
}

.vf-avatar__status--online {
  background-color: var(--vf-color-success);
}

.vf-avatar__status--offline {
  background-color: var(--vf-color-gray-400);
}

.vf-avatar__status--away {
  background-color: var(--vf-color-warning);
}

.vf-avatar__status--busy {
  background-color: var(--vf-color-danger);
}
</style>
