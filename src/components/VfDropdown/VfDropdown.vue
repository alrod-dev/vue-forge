<template>
  <div class="vf-dropdown" ref="containerRef" @click.stop>
    <button
      class="vf-dropdown__trigger"
      :aria-expanded="isOpen"
      @click="toggleOpen"
    >
      <slot name="trigger">
        <span>Menu</span>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </slot>
    </button>

    <div
      v-if="isOpen"
      class="vf-dropdown__menu"
      role="menu"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useClickOutside } from '@composables/useClickOutside'

const containerRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)

const toggleOpen = (): void => {
  isOpen.value = !isOpen.value
}

const closeMenu = (): void => {
  isOpen.value = false
}

useClickOutside(containerRef, closeMenu)
</script>

<style scoped>
.vf-dropdown {
  position: relative;
  display: inline-block;
}

.vf-dropdown__trigger {
  display: flex;
  align-items: center;
  gap: var(--vf-space-2);
  padding: var(--vf-space-2) var(--vf-space-3);
  border: 1px solid var(--vf-border-default);
  background-color: var(--vf-bg-primary);
  border-radius: var(--vf-radius-md);
  cursor: pointer;
  transition: all var(--vf-transition-base);
}

.vf-dropdown__trigger:hover {
  border-color: var(--vf-border-dark);
  box-shadow: var(--vf-shadow-sm);
}

.vf-dropdown__trigger:focus-visible {
  outline: 2px solid var(--vf-color-primary);
  outline-offset: 2px;
}

.vf-dropdown__menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: var(--vf-space-2);
  background-color: var(--vf-bg-primary);
  border: 1px solid var(--vf-border-default);
  border-radius: var(--vf-radius-md);
  box-shadow: var(--vf-shadow-lg);
  z-index: var(--vf-z-dropdown);
  min-width: 200px;
}
</style>
