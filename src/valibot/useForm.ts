import type { Config } from 'valibot'
import type { MultiWatchSources, Ref } from 'vue'
import type { HandleSubmit } from '../types'
import type { UseFormResult } from '../types/useForm'
import type { AnyObjectSchema } from '../types/valibot'
import * as v from 'valibot'
import { ref, watch } from 'vue'
import { handleSubmit } from '../utils'
import { arcoRules } from './rule'

export interface UseFormOptions extends Config<any> {
  watch?: MultiWatchSources
}

export function useForm<T extends AnyObjectSchema = AnyObjectSchema>(
  schema: T,
  options?: UseFormOptions,
): UseFormResult<v.InferInput<T>> {
  const {
    watch: watchList = [],
  } = options || {}

  const form = ref<v.InferInput<T>>(v.getDefaults(schema))

  const rules = arcoRules(schema, options)

  const reset = (): void => {
    form.value = v.getDefaults(schema)
  }

  const _handleSubmit: HandleSubmit = (handler, options) => {
    return handleSubmit(handler, {
      ...options,
      rules,
    })
  }

  watch(watchList, () => reset())

  return {
    rules,
    // TODO: improve type
    form: form as Ref<v.InferInput<T>>,
    reset,
    handleSubmit: _handleSubmit,
  }
}
