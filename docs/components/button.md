# Button Component

The `VfButton` component is a versatile button component with multiple variants, sizes, and states.

## Basic Usage

```vue
<template>
  <VfButton>Click me</VfButton>
</template>
```

## Variants

The button supports four variants: `primary`, `secondary`, `ghost`, and `danger`.

```vue
<template>
  <div class="space-y-4">
    <VfButton variant="primary">Primary</VfButton>
    <VfButton variant="secondary">Secondary</VfButton>
    <VfButton variant="ghost">Ghost</VfButton>
    <VfButton variant="danger">Delete</VfButton>
  </div>
</template>
```

## Sizes

Choose from three sizes: `sm`, `md` (default), and `lg`.

```vue
<template>
  <div class="space-y-4">
    <VfButton size="sm">Small</VfButton>
    <VfButton size="md">Medium</VfButton>
    <VfButton size="lg">Large</VfButton>
  </div>
</template>
```

## Loading State

Use the `loading` prop to show a loading spinner:

```vue
<template>
  <VfButton :loading="isLoading" @click="handleSubmit">
    Submit
  </VfButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isLoading = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  // Perform async action
  isLoading.value = false
}
</script>
```

## With Icons

Use the `icon` slot for icon placement:

```vue
<template>
  <VfButton>
    <template #icon>
      <svg><!-- icon --></svg>
    </template>
    Icon Button
  </VfButton>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Button visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `loading` | `boolean` | `false` | Show loading state |
| `disabled` | `boolean` | `false` | Disable the button |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Fired when button is clicked |

## Accessibility

The button component is fully accessible with:
- Proper `aria-busy` attribute when loading
- Support for disabled state
- Keyboard navigation support
- Clear focus indicators
