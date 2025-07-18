import type * as v from 'valibot'
import type { MultiWatchSources, Reactive } from 'vue'
import type { ArcoRules, HandleSubmit } from '../types'
import type { AnyObjectSchema, ValibotConfig } from './types'
import { objectEntries } from '@antfu/utils'
import { reactive, toValue, watch } from 'vue'
import { handleSubmit } from '../utils'
import { genValibotRules } from './rule'

interface UseFormResult<T = any> {
  rules: ArcoRules
  form: Reactive<T>
  reset: () => void
  handleSubmit: HandleSubmit
}

interface UseFormOptions extends ValibotConfig {
  watch?: MultiWatchSources
}

export function useForm<T extends AnyObjectSchema>(
  schema: T,
  options?: UseFormOptions,
): UseFormResult<v.InferInput<T>> {
  const {
    watch: watchList = [],
  } = options || {}

  const form = reactive<v.InferInput<T>>(
    Object.fromEntries(objectEntries(
      schema.entries,
    ).map(([key, schemaItem]) => [key, toValue(schemaItem?.default)])),
  )

  const rules = genValibotRules(schema, options)

  const reset = (): void => {
    for (const [key, value] of objectEntries(schema.entries)) {
      form[key] = toValue(value?.default)
    }
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
    form,
    reset,
    handleSubmit: _handleSubmit,
  }
}
