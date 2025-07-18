import { toValue } from 'vue'
import z from 'zod'

export function getDefaults<T extends z.ZodObject>(schema: T): z.infer<T> {
  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      if (value instanceof z.ZodDefault)
        return [key, toValue(value.def.defaultValue)]
      return [key, undefined]
    }),
  ) as z.infer<T>
}
