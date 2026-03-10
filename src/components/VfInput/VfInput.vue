<template>
  <div class="vf-input-wrapper">
    <label v-if="label" :for="inputId" class="vf-input__label">
      {{ label }}
      <span v-if="required" class="vf-input__required">*</span>
    </label>

    <div class="vf-input__container">
      <slot v-if="$slots.prefix" name="prefix" class="vf-input__prefix" />

      <input
        :id="inputId"
        :class="['vf-input', { 'vf-input--error': error }]"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete"
        :aria-label="label || placeholder"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${inputId}-error` : undefined"
        v-bind="$attrs"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
      />

      <slot v-if="$slots.suffix" name="suffix" class="vf-input__suffix" />
    </div>

    <div v-if="error" :id="`${inputId}-error`" class="vf-input__error">
      {{ error }}
    </div>

    <div v-if="hint" class="vf-input__hint">
      {{ hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface VfInputProps {
  modelValue: string
  label?: string
  placeholder?: string
  type?: string
  error?: string
  hint?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  autocomplete?: string
}

const props = withDefaults(defineProps<VfInputProps>(), {
  type: 'text',
  autocomplete: 'off',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: []
  focus: []
}>()

const inputId = computed(() => `vf-input-${Math.random().toString(36).slice(2)}`)
</script>

<style scoped>
.vf-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--vf-space-2);
}

.vf-input__label {
  display: block;
  font-size: var(--vf-text-sm);
  font-weight: var(--vf-font-medium);
  color: var(--vf-text-primary);
}

.vf-input__required {
  color: var(--vf-color-danger);
}

.vf-input__container {
  display: flex;
  align-items: center;
  gap: var(--vf-space-2);
  padding: 0 var(--vf-space-3);
  border: 1px solid var(--vf-border-default);
  border-radius: var(--vf-radius-md);
  background-color: var(--vf-bg-primary);
  transition: all var(--vf-transition-base);
  overflow: hidden;
}

.vf-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: var(--vf-space-3) 0;
  font-size: var(--vf-text-base);
  color: var(--vf-text-primary);
  outline: none;
  font-family: var(--vf-font-sans);
}

.vf-input::placeholder {
  color: var(--vf-text-disabled);
}

.vf-input:focus ~ .vf-input__container {
  border-color: var(--vf-color-primary);
  box-shadow: 0 0 0 3px var(--vf-color-primary-light);
}

.vf-input:disabled {
  background-color: var(--vf-bg-tertiary);
  color: var(--vf-text-disabled);
  cursor: not-allowed;
}

.vf-input--error {
  border-color: var(--vf-color-danger);
}

.vf-input-wrapper:has(.vf-input--error) .vf-input__container {
  border-color: var(--vf-color-danger);
}

.vf-input-wrapper:has(.vf-input--error) .vf-input__container:focus-within {
  box-shadow: 0 0 0 3px var(--vf-color-danger-light);
}

.vf-input__error {
  font-size: var(--vf-text-sm);
  color: var(--vf-color-danger);
  font-weight: var(--vf-font-medium);
}

.vf-input__hint {
  font-size: var(--vf-text-sm);
  color: var(--vf-text-tertiary);
}

.vf-input__prefix,
.vf-input__suffix {
  display: inline-flex;
  align-items: center;
  color: var(--vf-text-secondary);
}
</style>
