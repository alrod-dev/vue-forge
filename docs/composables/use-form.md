# useForm Composable

A comprehensive form management composable for handling form state, validation, and submission.

## Basic Usage

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <VfInput
      v-model="values.email"
      label="Email"
      type="email"
      :error="errors.email?.[0]"
      @blur="validateField('email')"
    />

    <VfInput
      v-model="values.password"
      label="Password"
      type="password"
      :error="errors.password?.[0]"
      @blur="validateField('password')"
    />

    <VfButton type="submit" :disabled="!isValid || isSubmitting">
      Submit
    </VfButton>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vue-forge'

const { values, errors, isValid, isSubmitting, handleSubmit, validateField } = useForm(
  { email: '', password: '' },
  {
    email: [
      { validate: (v) => v.length > 0, message: 'Email is required' },
      { validate: (v) => v.includes('@'), message: 'Invalid email address' },
    ],
    password: [
      { validate: (v) => v.length >= 8, message: 'Password must be at least 8 characters' },
    ],
  }
)

const submit = handleSubmit(async (formValues) => {
  // Submit form
  await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(formValues),
  })
})
</script>
```

## API Reference

### useForm(initialValues, validators)

#### Parameters

- `initialValues` - Initial form values object
- `validators` - Optional validation rules object

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `values` | `Ref<T>` | Form values |
| `errors` | `FormErrors` | Form errors |
| `touched` | `Record<string, boolean>` | Touched fields |
| `isDirty` | `Computed<boolean>` | Form has changes |
| `isValid` | `Computed<boolean>` | All validations pass |
| `isSubmitting` | `Ref<boolean>` | Form is submitting |
| `validateField` | `(field: string) => boolean` | Validate single field |
| `validateForm` | `() => boolean` | Validate all fields |
| `setFieldValue` | `(field: K, value: T[K]) => void` | Set field value |
| `setFieldError` | `(field: string, error: string) => void` | Set field error |
| `setFieldTouched` | `(field: string, isTouched?: boolean) => void` | Mark field as touched |
| `resetForm` | `() => void` | Reset to initial values |
| `handleSubmit` | `(callback: (values: T) => Promise<void> \| void) => void` | Handle form submission |

## Advanced Example

```vue
<script setup lang="ts">
import { useForm } from 'vue-forge'

interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

const { values, errors, isValid, handleSubmit, resetForm } = useForm<LoginForm>(
  {
    email: '',
    password: '',
    rememberMe: false,
  },
  {
    email: [
      { validate: (v: string) => v.length > 0, message: 'Email is required' },
      { validate: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), message: 'Invalid email' },
    ],
    password: [
      { validate: (v: string) => v.length >= 8, message: 'Password too short' },
    ],
  }
)

const onSubmit = handleSubmit(async (formValues) => {
  await loginUser(formValues)
  resetForm()
})
</script>
```

## Validation Rules

Create custom validation rules:

```typescript
const rules = {
  username: [
    { validate: (v) => v.length > 0, message: 'Username is required' },
    { validate: (v) => v.length >= 3, message: 'Username must be at least 3 characters' },
    { validate: (v) => /^[a-zA-Z0-9_]+$/.test(v), message: 'Username can only contain letters, numbers, and underscores' },
  ],
}
```
