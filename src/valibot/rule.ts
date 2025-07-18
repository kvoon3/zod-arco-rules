import type { ArcoRules } from '../types'
import type { AnyObjectSchema } from '../types/valibot'
import * as v from 'valibot'

export function arcoRules(schema: AnyObjectSchema, config?: { lang?: string }): ArcoRules {
  const rules: ArcoRules = {}

  const entries = schema.entries

  for (const key in entries) {
    rules[key] = {
      validator(value, callback) {
        const output = v.safeParse(entries[key], value, config)
        if (!output.success) {
          callback(output.issues[0].message)
        }
      },
    }
  }

  return rules
}
