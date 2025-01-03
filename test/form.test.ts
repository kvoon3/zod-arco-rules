import * as v from 'valibot'
import { describe, expect, it } from 'vitest'
import * as z from 'zod'
import { valibotArcoRules, zodArcoRules } from '../src'
import { checkFormRules } from '../src/utils'

describe('form', () => {
  it('zod', () => {
    const schema = z.object({
      username: z.string().nonempty(),
      password: z.string().nonempty(),
      email: z.string().email(),
    })

    const { rules } = zodArcoRules(schema)

    const errors = checkFormRules(rules, {
      username: '',
      password: 12345678,
      email: 'foo@bar.com',
    })

    expect(errors).toEqual({
      username: 'String must contain at least 1 character(s)',
      password: 'Expected string, received number',
    })
  })

  it('valibot', () => {
    const schema = v.object({
      username: v.pipe(v.string(), v.nonEmpty()),
      password: v.pipe(v.string(), v.nonEmpty()),
      email: v.pipe(v.string(), v.email()),
    })

    const { rules } = valibotArcoRules(schema)

    const errors = checkFormRules(rules, {
      username: '',
      password: 12345678,
      email: 'foo@bar.com',
    })

    expect(errors).toEqual({
      username: 'Invalid length: Expected !0 but received 0',
      password: 'Invalid type: Expected string but received 12345678',
    })
  })
})
