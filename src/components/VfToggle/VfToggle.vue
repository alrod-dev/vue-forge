<template>
  <div class="vf-toggle-wrapper">
    <label v-if="label" class="vf-toggle__label">
      <div class="vf-toggle__control">
        <input
          type="checkbox"
          :checked="modelValue"
          class="vf-toggle__input"
          :disabled="disabled"
          :aria-label="label"
          @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
        />
        <span class="vf-toggle__track">
          <span class="vf-toggle__thumb" />
        </span>
      </div>
      <span class="vf-toggle__text">{{ label }}</span>
    </label>
    <div v-else class="vf-toggle__control">
      <input
        type="checkbox"
        :checked="modelValue"
        class="vf-toggle__input"
        :disabled="disabled"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
      <span class="vf-toggle__track">
        <span class="vf-toggle__thumb" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface VfToggleProps {
  modelValue: boolean
  label?: string
  disabled?: boolean
}

withDefaults(defineProps<VfToggleProps>(), {
  disabled: false,
})

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<style scoped>
.vf-toggle-wrapper {
  display: inline-block;
}

.vf-toggle__label {
  display: flex;
  align-items: center;
  gap: var(--vf-space-3);
  cursor: pointer;
  user-select: none;
}

.vf-toggle__control {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.vf-toggle__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.vf-toggle__input:disabled {
  cursor: not-allowed;
}

.vf-toggle__track {
  display: inline-flex;
  align-items: center;
  width: 48px;
  height: 24px;
  background-color: var(--vf-color-gray-300);
  border-radius: var(--vf-radius-full);
  position: relative;
  transition: background-color var(--vf-transition-base);
}

.vf-toggle__thumb {
  display: block;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: var(--vf-radius-full);
  position: absolute;
  top: 2px;
  left: 2px;
  transition: all var(--vf-transition-base);
  box-shadow: var(--vf-shadow-sm);
}

.vf-toggle__input:checked ~ .vf-toggle__track {
  background-color: var(--vf-color-primary);
}

.vf-toggle__input:checked ~ .vf-toggle__track .vf-toggle__thumb {
  transform: translateX(24px);
}

.vf-toggle__input:focus-visible ~ .vf-toggle__track {
  outline: 2px solid var(--vf-color-primary);
  outline-offset: 2px;
}

.vf-toggle__input:disabled ~ .vf-toggle__track {
  opacity: 0.5;
  cursor: not-allowed;
}

.vf-toggle__text {
  font-size: var(--vf-text-sm);
  color: var(--vf-text-primary);
}

.vf-toggle__label:has(.vf-toggle__input:disabled) {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
