import type { ObjectSchema } from 'valibot'
import type { ArcoRules } from '../types'
import * as v from 'valibot'

export function genValibotRules(schema: ObjectSchema<any, any>): ArcoRules {
  const rules: ArcoRules = {}

  const entries = schema.entries

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

  return rules
}
