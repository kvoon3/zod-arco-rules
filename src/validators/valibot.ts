import type { ObjectSchema } from 'valibot'
import type { ArcoRules, Res } from '../types'
import * as v from 'valibot'
import { checkFormRules } from '../test-utils'

export function valibotArcoRules(valibotObject: ObjectSchema<any, any>): Res {
  const rules: ArcoRules = {}

  const entries = valibotObject.entries

  for (const key in entries) {
    rules[key] = {
      validator(value, callback) {
        const output = v.safeParse(entries[key], value)
        if (!output.success) {
          callback(output.issues[0].message)
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
