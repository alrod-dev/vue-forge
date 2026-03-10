import { ref, computed, reactive, Ref } from 'vue'

export interface ValidationRule {
  validate: (value: any) => boolean
  message: string
}

export interface FieldValidator {
  [key: string]: ValidationRule[]
}

export interface FormState {
  [key: string]: any
}

export interface FormErrors {
  [key: string]: string[]
}

export function useForm<T extends FormState = FormState>(
  initialValues: T,
  validators?: FieldValidator
) {
  const values = reactive<T>(JSON.parse(JSON.stringify(initialValues)))
  const errors = reactive<FormErrors>({})
  const touched = reactive<Record<string, boolean>>({})
  const isSubmitting = ref(false)

  const isDirty = computed(() => {
    return JSON.stringify(values) !== JSON.stringify(initialValues)
  })

  const isValid = computed(() => {
    return Object.keys(errors).every((field) => errors[field].length === 0)
  })

  const validateField = (fieldName: string): boolean => {
    const rules = validators?.[fieldName] || []
    const fieldErrors: string[] = []

    for (const rule of rules) {
      if (!rule.validate(values[fieldName])) {
        fieldErrors.push(rule.message)
      }
    }

    errors[fieldName] = fieldErrors
    return fieldErrors.length === 0
  }

  const validateForm = (): boolean => {
    if (!validators) return true

    let isFormValid = true
    for (const fieldName in validators) {
      if (!validateField(fieldName)) {
        isFormValid = false
      }
    }
    return isFormValid
  }

  const setFieldValue = <K extends keyof T>(field: K, value: T[K]): void => {
    values[field] = value
  }

  const setFieldError = (field: string, error: string): void => {
    errors[field] = error ? [error] : []
  }

  const setFieldTouched = (field: string, isTouched = true): void => {
    touched[field] = isTouched
  }

  const resetForm = (): void => {
    Object.keys(values).forEach((key) => {
      values[key as keyof T] = JSON.parse(
        JSON.stringify(initialValues[key as keyof T])
      )
    })
    Object.keys(errors).forEach((key) => {
      errors[key] = []
    })
    Object.keys(touched).forEach((key) => {
      touched[key] = false
    })
    isSubmitting.value = false
  }

  const handleSubmit = async (callback: (values: T) => Promise<void> | void) => {
    return async (e?: Event) => {
      if (e) {
        e.preventDefault()
      }

      if (!validateForm()) {
        return
      }

      isSubmitting.value = true
      try {
        await callback(values)
      } finally {
        isSubmitting.value = false
      }
    }
  }

  const getFieldProps = (fieldName: keyof T) => {
    return computed(() => ({
      modelValue: values[fieldName],
      'onUpdate:modelValue': (value: any) => setFieldValue(fieldName, value),
      error: errors[fieldName]?.[0] || '',
      onBlur: () => setFieldTouched(fieldName as string),
    }))
  }

  return {
    values: values as Ref<T>,
    errors,
    touched,
    isDirty,
    isValid,
    isSubmitting,
    validateField,
    validateForm,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    resetForm,
    handleSubmit,
    getFieldProps,
  }
}
