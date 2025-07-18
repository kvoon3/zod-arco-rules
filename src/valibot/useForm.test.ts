import * as v from 'valibot'
import { describe, expect, it } from 'vitest'
import { ref, toValue } from 'vue'
import { checkFormRules } from '../utils'
import { useForm } from './useForm'

describe('useForm', () => {
  it('optional', () => {
    const { form, rules } = useForm(v.object({
      name: v.optional(v.string(), 'kwongliegaai'),
      age: v.optional(v.number(), 18),
      sex: v.number(),
    }))

    expect(toValue(form)).toMatchInlineSnapshot(`
      {
        "age": 18,
        "name": "kwongliegaai",
        "sex": undefined,
      }
    `)

    expect(checkFormRules(rules, form)).toMatchInlineSnapshot(`
      {
        "sex": "Invalid type: Expected number but received undefined",
      }
    `)

    form.sex = 1
    expect(checkFormRules(rules, form)).toMatchInlineSnapshot(`{}`)
  })

  it('reset', () => {
    const userInfo = ref({
      name: 'kwongliegaai',
      age: 18,
    })

    const { form, reset } = useForm(v.object({
      name: v.optional(v.string(), () => userInfo.value.name),
      age: v.optional(v.number(), () => userInfo.value.age),
    }))

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
