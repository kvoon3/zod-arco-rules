import { describe, expect, it } from 'vitest'
import * as z from 'zod'
import { valiFormRules, zodArcoRules } from '../src'

describe('form', () => {
  it('test', () => {
    const schema = z.object({
      username: z.string().nonempty(),
      password: z.string().nonempty(),
      email: z.string().email(),
    })

    const { rules } = zodArcoRules(schema)

    const errors = valiFormRules(rules, {
      username: '',
      password: 12345678,
      email: 'foo@bar.com',
    })

    expect(errors).toEqual({
      username: 'String must contain at least 1 character(s)',
      password: 'Expected string, received number',
    })
  })
})
