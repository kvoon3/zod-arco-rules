import type { ArcoErrors, ArcoRules } from './types'

export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value)
    ? value
    : [value]
}

export function checkFormRules(
  rules: ArcoRules,
  form: object,
): ArcoErrors {
  const errors: ArcoErrors = {}

  for (const key in rules) {
    toArray(rules[key]).forEach(({ validator }) => {
      // @ts-expect-error type error
      validator?.(form[key], (error) => {
        if (!error)
          return

        if (!errors[key])
          // @ts-expect-error type error
          errors[key] = error
        else
          // @ts-expect-error type error
          errors[key] = [...toArray(errors[key]), error]
      })
    })
  }

  return errors
}
