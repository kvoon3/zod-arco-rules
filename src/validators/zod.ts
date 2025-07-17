import type { ZodObject } from 'zod'
import type { ArcoRules } from '../types'

export function genZodRules(zodObject: ZodObject): ArcoRules {
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

  return rules
}
