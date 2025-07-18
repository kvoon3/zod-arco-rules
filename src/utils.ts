import type { ArcoRules, HandleSubmit } from './types'
import { toArray } from '@antfu/utils'

export const handleSubmit: HandleSubmit = (handler, { rules, onSuccess, onError } = {}) => {
  return ({ values }) => {
    if (rules) {
      const errors = checkFormRules(rules, values)
      if (Object.keys(errors).length) {
        onError?.(errors)
        return
      }
    }

    handler(values)
    onSuccess?.(values)
  }
}

export function checkFormRules(
  rules: ArcoRules,
  form: object,
): Record<string, string> {
  const errors: Record<string, string> = {}

  for (const key in rules) {
    toArray(rules[key]).forEach(({ validator }) => {
      // @ts-expect-error type error
      validator?.(form[key], (error) => {
        if (!error)
          return

        errors[key] = error
      })
    })
  }

  return errors
}
