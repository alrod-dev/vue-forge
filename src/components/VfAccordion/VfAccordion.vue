<template>
  <div class="vf-accordion">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="vf-accordion__item"
    >
      <button
        :class="[
          'vf-accordion__header',
          { 'vf-accordion__header--open': openIndex === index },
        ]"
        :aria-expanded="openIndex === index"
        :aria-controls="`accordion-content-${index}`"
        @click="openIndex = openIndex === index ? -1 : index"
      >
        <span class="vf-accordion__title">{{ item.title }}</span>
        <span class="vf-accordion__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      <div
        :id="`accordion-content-${index}`"
        :class="[
          'vf-accordion__content',
          { 'vf-accordion__content--open': openIndex === index },
        ]"
      >
        <div class="vf-accordion__body">
          <slot :name="`item-${index}`">
            {{ item.content }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface AccordionItem {
  title: string
  content?: string
}

export interface VfAccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
}

const props = withDefaults(defineProps<VfAccordionProps>(), {
  allowMultiple: false,
})

const openIndex = ref(-1)
</script>

<style scoped>
.vf-accordion {
  border: 1px solid var(--vf-border-default);
  border-radius: var(--vf-radius-md);
  overflow: hidden;
}

.vf-accordion__item {
  border-bottom: 1px solid var(--vf-border-light);
}

.vf-accordion__item:last-child {
  border-bottom: none;
}

.vf-accordion__header {
  width: 100%;
  padding: var(--vf-space-4);
  background-color: var(--vf-bg-secondary);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--vf-space-3);
  transition: all var(--vf-transition-base);
  text-align: left;
}

.vf-accordion__header:hover {
  background-color: var(--vf-bg-tertiary);
}

.vf-accordion__header:focus-visible {
  outline: 2px solid var(--vf-color-primary);
  outline-offset: -2px;
}

.vf-accordion__title {
  font-weight: var(--vf-font-semibold);
  color: var(--vf-text-primary);
}

.vf-accordion__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  transition: transform var(--vf-transition-base);
}

.vf-accordion__header--open .vf-accordion__icon {
  transform: rotate(180deg);
}

.vf-accordion__content {
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--vf-transition-base);
}

.vf-accordion__content--open {
  max-height: 1000px;
}

.vf-accordion__body {
  padding: var(--vf-space-4);
  background-color: var(--vf-bg-primary);
  color: var(--vf-text-primary);
  line-height: var(--vf-line-height-relaxed);
}
</style>
