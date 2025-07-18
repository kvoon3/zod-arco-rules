import { describe, expect, it } from 'vitest'
import * as z from 'zod'
import { getDefaults } from './defaults'

describe('test', () => {
  it('zod', () => {
    const schema = z.object({
      name: z.string().default('kwongliegaai'),
      age: z.number(),
    })

    expect(getDefaults(schema)).toMatchInlineSnapshot(`
      {
        "age": undefined,
        "name": "kwongliegaai",
      }
    `)
  })
})
