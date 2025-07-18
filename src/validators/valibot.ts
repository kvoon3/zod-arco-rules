import type { BaseIssue, BaseSchema, InferIssue, ObjectSchema } from 'valibot'
import type { ArcoRules } from '../types'
import * as v from 'valibot'

type Config = v.Config<InferIssue<BaseSchema<unknown, unknown, BaseIssue<unknown>>>>

export function genValibotRules(schema: ObjectSchema<any, any>, config?: Config): ArcoRules {
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
