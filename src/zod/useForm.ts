import type { MultiWatchSources, Ref } from 'vue'
import type { ZodObject } from 'zod'
import type * as z from 'zod'
import type { HandleSubmit } from '../types'
import type { UseFormResult } from '../types/useForm'
import { ref, watch } from 'vue'
import { handleSubmit } from '../utils'
import { getDefaults } from './defaults'
import { arcoRules } from './rule'

interface UseFormOptions {
  watch?: MultiWatchSources
}

export function useForm<T extends ZodObject = ZodObject>(
  schema: T,
  options?: UseFormOptions,
): UseFormResult<z.infer<T>> {
  const {
    watch: watchList = [],
  } = options || {}

  const form = ref<z.infer<T>>(getDefaults(schema))

  const rules = arcoRules(schema)

  const reset = (): void => {
    form.value = getDefaults(schema)
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
    form: form as Ref<z.infer<T>>,
    reset,
    handleSubmit: _handleSubmit,
  }
}
