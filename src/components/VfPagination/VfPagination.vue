<template>
  <div class="vf-pagination">
    <button
      class="vf-pagination__button"
      :disabled="currentPage === 1"
      aria-label="Previous page"
      @click="$emit('update:currentPage', currentPage - 1)"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>

    <div class="vf-pagination__info">
      <input
        type="number"
        :value="currentPage"
        class="vf-pagination__input"
        :min="1"
        :max="totalPages"
        @change="$emit('update:currentPage', Math.max(1, Math.min(totalPages, Number(($event.target as HTMLInputElement).value))))"
      />
      <span class="vf-pagination__separator">/</span>
      <span class="vf-pagination__total">{{ totalPages }}</span>
    </div>

    <button
      class="vf-pagination__button"
      :disabled="currentPage === totalPages"
      aria-label="Next page"
      @click="$emit('update:currentPage', currentPage + 1)"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>

    <select
      v-if="showPageSize"
      :value="pageSize"
      class="vf-pagination__select"
      @change="$emit('update:pageSize', Number(($event.target as HTMLSelectElement).value))"
    >
      <option v-for="size in [10, 20, 50, 100]" :key="size" :value="size">
        {{ size }} per page
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface VfPaginationProps {
  currentPage: number
  pageSize: number
  totalItems: number
  showPageSize?: boolean
}

const props = withDefaults(defineProps<VfPaginationProps>(), {
  showPageSize: true,
})

defineEmits<{
  'update:currentPage': [value: number]
  'update:pageSize': [value: number]
}>()

const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize))
</script>

<style scoped>
.vf-pagination {
  display: flex;
  align-items: center;
  gap: var(--vf-space-3);
  padding: var(--vf-space-4);
  background-color: var(--vf-bg-secondary);
  border-radius: var(--vf-radius-md);
}

.vf-pagination__button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--vf-border-default);
  background-color: var(--vf-bg-primary);
  border-radius: var(--vf-radius-md);
  cursor: pointer;
  transition: all var(--vf-transition-base);
}

.vf-pagination__button:hover:not(:disabled) {
  border-color: var(--vf-color-primary);
  color: var(--vf-color-primary);
}

.vf-pagination__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.vf-pagination__info {
  display: flex;
  align-items: center;
  gap: var(--vf-space-2);
}

.vf-pagination__input {
  width: 50px;
  padding: var(--vf-space-2) var(--vf-space-1);
  border: 1px solid var(--vf-border-default);
  border-radius: var(--vf-radius-sm);
  text-align: center;
  font-size: var(--vf-text-sm);
}

.vf-pagination__separator,
.vf-pagination__total {
  font-size: var(--vf-text-sm);
  color: var(--vf-text-secondary);
}

.vf-pagination__select {
  padding: var(--vf-space-2) var(--vf-space-3);
  border: 1px solid var(--vf-border-default);
  border-radius: var(--vf-radius-sm);
  background-color: var(--vf-bg-primary);
  font-size: var(--vf-text-sm);
  cursor: pointer;
}
</style>
