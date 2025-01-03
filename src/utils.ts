import type { ArcoFormRules, ObjectKey } from './types'

export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value)
    ? value
    : [value]
}

export function checkFormRules<T extends ArcoFormRules<ObjectKey>>(
  rules: T,
  form: Record<keyof T, any>,
): Partial<Record<keyof T, string | string[]>> {
  const errors: Partial<Record<keyof T, string | string[]>> = {}

  for (const key in rules) {
    toArray(rules[key]).forEach(({ validator }) => {
      validator?.(form[key], (error) => {
        if (!error)
          return

        if (!errors[key])
          errors[key] = error
        else
          errors[key] = [...toArray(errors[key]), error]
      })
    })
  }

  return errors
}
