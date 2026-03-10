<template>
  <div class="vf-tabs">
    <div class="vf-tabs__header" role="tablist">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="[
          'vf-tabs__tab',
          { 'vf-tabs__tab--active': activeTab === index },
        ]"
        :aria-selected="activeTab === index"
        :aria-controls="`tab-content-${index}`"
        role="tab"
        @click="activeTab = index"
      >
        {{ tab }}
      </button>
    </div>

    <div class="vf-tabs__content">
      <div
        v-for="(_, index) in tabs"
        :key="index"
        :id="`tab-content-${index}`"
        :class="[
          'vf-tabs__panel',
          { 'vf-tabs__panel--active': activeTab === index },
        ]"
        role="tabpanel"
        :aria-labelledby="`tab-${index}`"
      >
        <slot :name="`tab-${index}`" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface VfTabsProps {
  tabs: string[]
  defaultTab?: number
}

const props = withDefaults(defineProps<VfTabsProps>(), {
  defaultTab: 0,
})

const activeTab = ref(props.defaultTab)
</script>

<style scoped>
.vf-tabs {
  display: flex;
  flex-direction: column;
}

.vf-tabs__header {
  display: flex;
  border-bottom: 1px solid var(--vf-border-default);
}

.vf-tabs__tab {
  flex: 1;
  padding: var(--vf-space-4);
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: var(--vf-font-medium);
  color: var(--vf-text-secondary);
  border-bottom: 2px solid transparent;
  transition: all var(--vf-transition-base);
  position: relative;
}

.vf-tabs__tab:hover {
  color: var(--vf-text-primary);
}

.vf-tabs__tab--active {
  color: var(--vf-color-primary);
  border-bottom-color: var(--vf-color-primary);
}

.vf-tabs__tab:focus-visible {
  outline: 2px solid var(--vf-color-primary);
  outline-offset: -2px;
}

.vf-tabs__content {
  position: relative;
  overflow: hidden;
}

.vf-tabs__panel {
  display: none;
  padding: var(--vf-space-4);
  animation: fadeIn var(--vf-transition-base);
}

.vf-tabs__panel--active {
  display: block;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
