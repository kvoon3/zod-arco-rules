import type { HandleSubmit } from './types'
import { checkFormRules } from './test-utils'

export * from './validators/valibot'
export * from './validators/zod'

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
