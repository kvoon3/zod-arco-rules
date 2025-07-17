// @arco-design/web-vue type vender
export interface FieldRule<FieldValue = any> {
  type?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'email' | 'url' | 'ip'
  required?: boolean
  message?: string
  length?: number
  maxLength?: number
  minLength?: number
  match?: RegExp
  uppercase?: boolean
  lowercase?: boolean
  min?: number
  max?: number
  equal?: number
  positive?: boolean
  negative?: boolean
  true?: boolean
  false?: boolean
  includes?: any[]
  deepEqual?: any
  empty?: boolean
  hasKeys?: string[]
  validator?: (value: FieldValue | undefined, callback: (error?: string) => void) => void
}
export interface ValidatedError {
  label: string
  field: string
  value: any
  type: string
  isRequiredError: boolean
  message: string
}

export type ObjectKey = string | number | symbol

export type ArcoFormRules<T extends ObjectKey> = Record<T, FieldRule>
export type ArcoHandleSubmitFunction<T extends ObjectKey> = (arg: {
  values: Record<T, any>
  errors: Record<T, ValidatedError> | undefined
}, ev: Event) => any

export interface Options<T extends Record<ObjectKey, any> = Record<ObjectKey, any>> {
  onSuccess?: (values: Record<keyof T, any>) => void
  onError?: (error: Partial<Record<keyof T, string | string[]>>) => void
}
