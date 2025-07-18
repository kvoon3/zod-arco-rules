import { describe, expect, it } from 'vitest'
import { ref, toValue } from 'vue'
import { z } from 'zod'
import { checkFormRules } from '../utils'
import { useForm } from './useForm'

describe('useForm', () => {
  it('optional', () => {
    const { form, rules } = useForm(
      z.object({
        name: z.string().optional().default('kwongliegaai'),
        age: z.number().optional().default(18),
        sex: z.number(),
      }),
    )

    expect(toValue(form)).toMatchInlineSnapshot(`
      {
        "age": 18,
        "name": "kwongliegaai",
        "sex": undefined,
      }
    `)

    expect(checkFormRules(rules, toValue(form))).toMatchInlineSnapshot(`
      {
        "sex": "Invalid input: expected number, received undefined",
      }
    `)

    form.value.sex = 1
    expect(checkFormRules(rules, toValue(form))).toMatchInlineSnapshot(`{}`)
  })

  it('reset', () => {
    const userInfo = ref({
      name: 'kwongliegaai',
      age: 18,
    })

    const { form, reset } = useForm(
      z.object({
        name: z.string().optional().default(() => userInfo.value.name),
        age: z.number().optional().default(() => userInfo.value.age),
      }),
    )

    expect(toValue(form)).toEqual({
      age: 18,
      name: 'kwongliegaai',
    })

    userInfo.value.name = 'Guoodli'
    reset()

    expect(toValue(form)).toEqual({
      age: 18,
      name: 'Guoodli',
    })
  })
})
