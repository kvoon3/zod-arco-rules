import type { ZodObject } from 'zod'
import type { ArcoRules, Res } from '../types'
import { checkFormRules } from '../test-utils'

export function zodArcoRules(zodObject: ZodObject): Res {
  const rules: ArcoRules = {}

  for (const key in zodObject.shape) {
    rules[key] = {
      validator(value, callback) {
        const output = zodObject.shape[key].safeParse(value)
        if (!output.success) {
          callback(output.error.issues[0].message)
        }
      },
    }
  }

  return {
    rules,
    handleSubmit(handler, opts) {
      const { onSuccess, onError } = opts || {}

      return ({ values }) => {
        const errors = checkFormRules(rules, values)
        if (Object.keys(errors).length) {
          onError?.(errors)
          return
        }

        handler(values)
        onSuccess?.(values)
      }
    },
  }
}
