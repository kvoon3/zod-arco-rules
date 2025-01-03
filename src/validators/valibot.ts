import type { ObjectSchema } from 'valibot'
import type { ArcoFormRules, ArcoHandleSubmitFunction, Options } from '../types'
import * as v from 'valibot'
import { checkFormRules } from '../utils'

export function valibotArcoRules<T extends Record<string, any> >(valibotObject: ObjectSchema<T, any>): {
  rules: ArcoFormRules<keyof T>
  handleSubmit: (
    handler: (values: Record<keyof T, any>) => void,
    opts?: Options<T>,
  ) => ArcoHandleSubmitFunction<keyof T>
} {
  const rules = {} as ArcoFormRules<keyof T>

  const entries = valibotObject.entries

  for (const key in entries) {
    rules[key as keyof T] = {
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
    handleSubmit(handler, opts): ArcoHandleSubmitFunction<keyof T> {
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
