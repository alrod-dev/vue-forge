<template>
  <div class="vf-select-wrapper">
    <label v-if="label" :for="selectId" class="vf-select__label">
      {{ label }}
      <span v-if="required" class="vf-select__required">*</span>
    </label>

    <div
      class="vf-select__container"
      :class="{ 'vf-select__container--open': isOpen }"
      @click.stop="toggleOpen"
      @keydown="handleKeydown"
    >
      <div class="vf-select__value">
        {{ selectedLabel || placeholder }}
      </div>

      <div class="vf-select__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      <div v-if="isOpen" class="vf-select__menu">
        <input
          v-if="searchable"
          v-model="searchQuery"
          type="text"
          class="vf-select__search"
          :placeholder="`Search ${label || 'options'}`"
          @click.stop
          @keydown.escape="closeOpen"
        />

        <div class="vf-select__options">
          <div
            v-for="(option, index) in filteredOptions"
            :key="getOptionKey(option)"
            :class="[
              'vf-select__option',
              {
                'vf-select__option--selected': isSelected(option),
                'vf-select__option--highlighted': index === highlightedIndex,
              },
            ]"
            @click.stop="selectOption(option)"
            @mouseenter="highlightedIndex = index"
          >
            <slot name="option" :option="option">
              {{ getOptionLabel(option) }}
            </slot>
          </div>

          <div v-if="filteredOptions.length === 0" class="vf-select__empty">
            No options found
          </div>
        </div>
      </div>
    </div>

    <div v-if="error" class="vf-select__error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref, computed } from 'vue'
import { useClickOutside } from '@composables/useClickOutside'

export interface VfSelectProps<T> {
  modelValue: T | T[]
  options: T[]
  label?: string
  placeholder?: string
  multiple?: boolean
  searchable?: boolean
  error?: string
  disabled?: boolean
  required?: boolean
  valueKey?: string
  labelKey?: string
}

const props = withDefaults(defineProps<VfSelectProps<T>>(), {
  multiple: false,
  searchable: false,
  valueKey: 'value',
  labelKey: 'label',
})

const emit = defineEmits<{
  'update:modelValue': [value: T | T[]]
}>()

const isOpen = ref(false)
const searchQuery = ref('')
const highlightedIndex = ref(0)
const containerRef = ref<HTMLElement | null>(null)

const selectId = computed(
  () => `vf-select-${Math.random().toString(36).slice(2)}`
)

const getOptionLabel = (option: T): string => {
  if (typeof option === 'string') return option
  if (typeof option === 'object' && option !== null) {
    return (option as any)[props.labelKey] || (option as any)[props.valueKey] || String(option)
  }
  return String(option)
}

const getOptionKey = (option: T): string => {
  if (typeof option === 'string' || typeof option === 'number') return String(option)
  if (typeof option === 'object' && option !== null) {
    return (option as any)[props.valueKey] || String(option)
  }
  return String(option)
}

const isSelected = (option: T): boolean => {
  if (props.multiple) {
    return (props.modelValue as T[]).some(
      (v) => getOptionKey(v) === getOptionKey(option)
    )
  }
  return getOptionKey(props.modelValue as T) === getOptionKey(option)
}

const selectedLabel = computed((): string => {
  if (props.multiple) {
    const values = props.modelValue as T[]
    return values.length > 0 ? `${values.length} selected` : ''
  }
  return getOptionLabel(props.modelValue as T)
})

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options

  return props.options.filter((option) =>
    getOptionLabel(option)
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  )
})

const toggleOpen = (): void => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
      highlightedIndex.value = 0
      searchQuery.value = ''
    }
  }
}

const closeOpen = (): void => {
  isOpen.value = false
}

const selectOption = (option: T): void => {
  if (props.multiple) {
    const values = props.modelValue as T[]
    if (isSelected(option)) {
      emit(
        'update:modelValue',
        values.filter((v) => getOptionKey(v) !== getOptionKey(option))
      )
    } else {
      emit('update:modelValue', [...values, option])
    }
  } else {
    emit('update:modelValue', option)
    closeOpen()
  }
}

const handleKeydown = (e: KeyboardEvent): void => {
  if (!isOpen.value) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleOpen()
    }
    return
  }

  switch (e.key) {
    case 'Escape':
      closeOpen()
      break
    case 'ArrowDown':
      e.preventDefault()
      highlightedIndex.value = Math.min(
        highlightedIndex.value + 1,
        filteredOptions.value.length - 1
      )
      break
    case 'ArrowUp':
      e.preventDefault()
      highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
      break
    case 'Enter':
      e.preventDefault()
      selectOption(filteredOptions.value[highlightedIndex.value])
      break
  }
}

useClickOutside(containerRef, closeOpen)
</script>

<style scoped>
.vf-select-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--vf-space-2);
}

.vf-select__label {
  display: block;
  font-size: var(--vf-text-sm);
  font-weight: var(--vf-font-medium);
  color: var(--vf-text-primary);
}

.vf-select__required {
  color: var(--vf-color-danger);
}

.vf-select__container {
  position: relative;
  border: 1px solid var(--vf-border-default);
  border-radius: var(--vf-radius-md);
  background-color: var(--vf-bg-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: var(--vf-space-3);
  transition: all var(--vf-transition-base);
}

.vf-select__container:hover {
  border-color: var(--vf-border-dark);
}

.vf-select__container--open {
  border-color: var(--vf-color-primary);
  box-shadow: 0 0 0 3px var(--vf-color-primary-light);
}

.vf-select__value {
  flex: 1;
  font-size: var(--vf-text-base);
  color: var(--vf-text-primary);
}

.vf-select__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: var(--vf-text-secondary);
  transition: transform var(--vf-transition-base);
  margin-left: var(--vf-space-2);
}

.vf-select__container--open .vf-select__icon {
  transform: rotate(180deg);
}

.vf-select__menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--vf-space-2);
  background-color: var(--vf-bg-primary);
  border: 1px solid var(--vf-border-default);
  border-radius: var(--vf-radius-md);
  box-shadow: var(--vf-shadow-lg);
  z-index: var(--vf-z-dropdown);
  max-height: 300px;
  display: flex;
  flex-direction: column;
}

.vf-select__search {
  padding: var(--vf-space-3);
  border: none;
  border-bottom: 1px solid var(--vf-border-light);
  font-family: var(--vf-font-sans);
  font-size: var(--vf-text-base);
}

.vf-select__options {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.vf-select__option {
  padding: var(--vf-space-3);
  cursor: pointer;
  transition: background-color var(--vf-transition-base);
  color: var(--vf-text-primary);
  border-bottom: 1px solid var(--vf-border-light);
}

.vf-select__option:last-child {
  border-bottom: none;
}

.vf-select__option:hover,
.vf-select__option--highlighted {
  background-color: var(--vf-bg-secondary);
}

.vf-select__option--selected {
  background-color: var(--vf-color-primary-light);
  color: var(--vf-color-primary-dark);
  font-weight: var(--vf-font-semibold);
}

.vf-select__empty {
  padding: var(--vf-space-4);
  text-align: center;
  color: var(--vf-text-tertiary);
}

.vf-select__error {
  font-size: var(--vf-text-sm);
  color: var(--vf-color-danger);
  font-weight: var(--vf-font-medium);
}
</style>
