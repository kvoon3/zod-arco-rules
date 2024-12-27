import type { FieldRule, ValidatedError } from '@arco-design/web-vue'
import type { ZodObject, ZodTypeAny } from 'zod'
import { toArray } from './utils'

export type ObjectKey = string | number | symbol
export type ArcoFormRules<T extends ObjectKey> = Record<T, FieldRule>
export type ArcoHandleSubmitFunction<T extends ObjectKey> = (arg: {
  values: Record<T, any>
  errors: Record<T, ValidatedError> | undefined
}, ev: Event) => any
export type Status = 'validating' | 'success' | 'error' | 'warning' | undefined

export function valiFormRules<T extends ArcoFormRules<ObjectKey>>(
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

export interface Options<T extends Record<ObjectKey, any> = Record<ObjectKey, any>> {
  onSuccess?: (values: Record<keyof T, any>) => void
  onError?: (error: Partial<Record<keyof T, string | string[]>>) => void
}

export function zodArcoRules< T extends Record<string, any> >(zodObject: ZodObject<Record<keyof T, ZodTypeAny>>): {
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

  // TODO: report validation statuts
  // const status = {} as Record<keyof T, Status>

  return {
    rules,
    handleSubmit(handler, opts): ArcoHandleSubmitFunction<keyof T> {
      const { onSuccess, onError } = opts || {}

      return ({ values }) => {
        const errors = valiFormRules(rules, values)
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
