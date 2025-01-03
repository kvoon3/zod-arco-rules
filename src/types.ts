import type { FieldRule, ValidatedError } from '@arco-design/web-vue'

export type ObjectKey = string | number | symbol

export type ArcoFormRules<T extends ObjectKey> = Record<T, FieldRule>
export type ArcoHandleSubmitFunction<T extends ObjectKey> = (arg: {
  values: Record<T, any>
  errors: Record<T, ValidatedError> | undefined
}, ev: Event) => any
export type ArcoFormStatus = 'validating' | 'success' | 'error' | 'warning' | undefined

export interface Options<T extends Record<ObjectKey, any> = Record<ObjectKey, any>> {
  onSuccess?: (values: Record<keyof T, any>) => void
  onError?: (error: Partial<Record<keyof T, string | string[]>>) => void
}
