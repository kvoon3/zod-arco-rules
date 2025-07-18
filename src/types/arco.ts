/**
 * vender: @arco-design/web-vue
 */

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
