<template>
  <div class="vf-table-wrapper">
    <table class="vf-table">
      <thead class="vf-table__head">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="['vf-table__th', { 'vf-table__th--sortable': column.sortable }]"
            @click="column.sortable && toggleSort(column.key)"
          >
            <div class="vf-table__header-content">
              {{ column.label }}
              <svg
                v-if="column.sortable"
                :class="[
                  'vf-table__sort-icon',
                  {
                    'vf-table__sort-icon--asc': sortColumn === column.key && sortDirection === 'asc',
                    'vf-table__sort-icon--desc': sortColumn === column.key && sortDirection === 'desc',
                  },
                ]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="vf-table__body">
        <tr v-for="(row, index) in sortedRows" :key="index" class="vf-table__row">
          <td
            v-for="column in columns"
            :key="column.key"
            class="vf-table__td"
          >
            <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
        <tr v-if="rows.length === 0" class="vf-table__empty">
          <td :colspan="columns.length" class="vf-table__empty-cell">
            No data available
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, computed } from 'vue'

export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
}

export interface VfTableProps<T> {
  rows: T[]
  columns: TableColumn[]
  defaultSortKey?: string
  defaultSortDirection?: 'asc' | 'desc'
}

const props = withDefaults(defineProps<VfTableProps<T>>(), {
  defaultSortDirection: 'asc',
})

const sortColumn = ref(props.defaultSortKey || '')
const sortDirection = ref<'asc' | 'desc'>(props.defaultSortDirection)

const toggleSort = (key: string): void => {
  if (sortColumn.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = key
    sortDirection.value = 'asc'
  }
}

const sortedRows = computed(() => {
  if (!sortColumn.value) return props.rows

  const sorted = [...props.rows].sort((a, b) => {
    const aVal = a[sortColumn.value]
    const bVal = b[sortColumn.value]

    if (aVal < bVal) return sortDirection.value === 'asc' ? -1 : 1
    if (aVal > bVal) return sortDirection.value === 'asc' ? 1 : -1
    return 0
  })

  return sorted
})
</script>

<style scoped>
.vf-table-wrapper {
  overflow-x: auto;
  border-radius: var(--vf-radius-md);
  border: 1px solid var(--vf-border-default);
}

.vf-table {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--vf-bg-primary);
}

.vf-table__head {
  background-color: var(--vf-bg-secondary);
  border-bottom: 1px solid var(--vf-border-default);
}

.vf-table__th {
  padding: var(--vf-space-4);
  text-align: left;
  font-weight: var(--vf-font-semibold);
  color: var(--vf-text-primary);
  white-space: nowrap;
}

.vf-table__th--sortable {
  cursor: pointer;
  user-select: none;
}

.vf-table__th--sortable:hover {
  background-color: var(--vf-bg-tertiary);
}

.vf-table__header-content {
  display: flex;
  align-items: center;
  gap: var(--vf-space-2);
}

.vf-table__sort-icon {
  width: 16px;
  height: 16px;
  opacity: 0.5;
  transition: opacity var(--vf-transition-base);
}

.vf-table__sort-icon--asc,
.vf-table__sort-icon--desc {
  opacity: 1;
}

.vf-table__sort-icon--desc {
  transform: rotate(180deg);
}

.vf-table__row {
  border-bottom: 1px solid var(--vf-border-light);
  transition: background-color var(--vf-transition-base);
}

.vf-table__row:hover {
  background-color: var(--vf-bg-secondary);
}

.vf-table__td {
  padding: var(--vf-space-3) var(--vf-space-4);
  color: var(--vf-text-primary);
  font-size: var(--vf-text-sm);
}

.vf-table__empty {
  display: table-row;
}

.vf-table__empty-cell {
  padding: var(--vf-space-8) var(--vf-space-4);
  text-align: center;
  color: var(--vf-text-tertiary);
  background-color: var(--vf-bg-secondary);
}
</style>
