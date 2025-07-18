import * as v from 'valibot'
import { describe, expect, it } from 'vitest'
import { checkFormRules } from '../utils'
import { arcoRules } from './rule'

describe('rule', () => {
  it('check', () => {
    const schema = v.object({
      username: v.pipe(v.string(), v.nonEmpty()),
      password: v.pipe(v.string(), v.nonEmpty()),
      email: v.pipe(v.string(), v.email()),
    })

    const rules = arcoRules(schema)

    const errors = checkFormRules(rules, {
      username: '',
      password: 12345678,
      email: 'foo@bar.com',
    })

    expect(errors).toMatchInlineSnapshot(`
      {
        "password": "Invalid type: Expected string but received 12345678",
        "username": "Invalid length: Expected !0 but received 0",
      }
    `)
  })
})
