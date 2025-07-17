import type { ZodObject, ZodType } from 'zod'
import type { ArcoFormRules, ArcoHandleSubmitFunction, Options } from '../types'
import { checkFormRules } from '../utils'

export function zodArcoRules<T extends Record<string, any>>(zodObject: ZodObject<Record<keyof T, ZodType>>): {
  rules: ArcoFormRules<keyof T>
  handleSubmit: (
    handler: (values: Record<keyof T, any>) => void,
    opts?: Options<T>,
  ) => ArcoHandleSubmitFunction<keyof T>
} {
  const rules = {} as ArcoFormRules<keyof T>

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
