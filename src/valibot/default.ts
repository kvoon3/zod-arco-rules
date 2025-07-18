import type { InferInput } from 'valibot'
import type { AnyObjectSchema } from '../types/valibot'
import { objectEntries } from '@antfu/utils'
import { toValue } from 'vue'

export function getDefaults<T extends AnyObjectSchema = AnyObjectSchema>(schema: T): InferInput<T> {
  return Object.fromEntries(objectEntries(
    schema.entries,
  ).map(([key, schemaItem]) => [key, toValue(schemaItem?.default)]))
}
