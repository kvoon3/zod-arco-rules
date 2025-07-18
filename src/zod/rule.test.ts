import { describe, expect, it } from 'vitest'
import * as z from 'zod'
import { checkFormRules } from '../utils'
import { arcoRules } from './rule'

describe('form', () => {
  it('zod', () => {
    const schema = z.object({
      username: z.string().nonempty(),
      password: z.string().nonempty(),
      email: z.string().email(),
    })

    const rules = arcoRules(schema)

    const errors = checkFormRules(rules, {
      username: '',
      password: 12345678,
      email: 'foo@bar.com',
    })

    expect(errors).toMatchInlineSnapshot(`
      {
        "password": "Invalid input: expected string, received number",
        "username": "Too small: expected string to have >=1 characters",
      }
    `)
  })
})
