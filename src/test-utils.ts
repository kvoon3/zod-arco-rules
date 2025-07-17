import type { ArcoRules } from './types'
import { toArray } from '@antfu/utils'

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
