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

export type ArcoRuleFactory = (schemaObject: object) => Res

export interface Res {
  rules: ArcoRules
  handleSubmit: (
    handler: (values: object) => void,
    options?: {
      onSuccess?: (values: object) => void
      onError?: (error: ArcoErrors) => void
    },
  ) => ArcoSubmitHandler
}

type ArcoSubmitHandler = (arg: {
  values: object
  errors: ArcoErrors | undefined
}, ev: Event) => any

export type ArcoRules = Record<PropertyKey, FieldRule>

export type ArcoErrors = Record<PropertyKey, ValidatedError>
