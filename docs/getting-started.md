# Getting Started

## Installation

Install vue-forge using your preferred package manager:

::: code-group
```bash [npm]
npm install vue-forge
```

```bash [yarn]
yarn add vue-forge
```

```bash [pnpm]
pnpm add vue-forge
```
:::

## Quick Start

### Register as a Vue Plugin

```typescript
import { createApp } from 'vue'
import VueForge from 'vue-forge'
import 'vue-forge/styles'
import App from './App.vue'

const app = createApp(App)
app.use(VueForge)
app.mount('#app')
```

### Use Components

Once registered, you can use vue-forge components in your templates:

```vue
<template>
  <div>
    <VfButton variant="primary">Click me</VfButton>
    <VfInput v-model="email" label="Email" type="email" />
    <VfAlert variant="success">All systems operational!</VfAlert>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
</script>
```

## Individual Component Import

You can also import individual components:

```vue
<script setup lang="ts">
import { VfButton, VfInput } from 'vue-forge'
</script>

<template>
  <VfButton variant="primary">Submit</VfButton>
  <VfInput v-model="name" label="Name" />
</template>
```

## Using Composables

Import and use composables for form handling, dark mode, media queries, and more:

```vue
<script setup lang="ts">
import { useForm, useDarkMode } from 'vue-forge'

const { isDark, toggle } = useDarkMode()

const { values, validateForm } = useForm(
  { email: '', password: '' },
  {
    email: [{ validate: (v) => v.includes('@'), message: 'Invalid email' }],
  }
)
</script>
```

## Theme Customization

Override theme variables using CSS custom properties:

```css
:root {
  /* Primary Color */
  --vf-color-primary: #your-color;

  /* Spacing */
  --vf-space-4: 1rem;

  /* Font */
  --vf-font-sans: 'Your Font', sans-serif;
}
```

## Dark Mode

Enable dark mode automatically or manually:

```vue
<script setup lang="ts">
import { useDarkMode } from 'vue-forge'

const { isDark, toggle, setMode } = useDarkMode('auto')

// Toggle between light and dark
const handleToggle = () => toggle()

// Set to specific mode
const setDarkMode = () => setMode('dark')
</script>
```

## What's Next?

- Explore [Components](/components/button)
- Learn about [Composables](/composables/use-form)
- Check out our [GitHub Repository](https://github.com/alrod-dev/vue-forge)
